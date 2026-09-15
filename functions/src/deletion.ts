import { randomUUID } from 'node:crypto';
import { FieldPath, FieldValue, Query, QueryDocumentSnapshot, UpdateData, DocumentData } from 'firebase-admin/firestore';
import { db, auth, stamp, hash, emailAddress } from './security';

/** Admission marker and membership revocation commit before the API acknowledges.
 * This marker also blocks direct Firestore writes, including old admin ID tokens.
 * The worker is idempotent; durable scan cursors survive function timeouts.
 */
export async function queueDeletion(uid: string, tokenEmail?: string): Promise<void> {
  await db.runTransaction(async tx => {
    const ref = db.doc(`accountDeletions/${uid}`);
    const current = await tx.get(ref);
    if (current.exists) return;
    const email = tokenEmail ? emailAddress(tokenEmail) : null;
    const revocation = email ? db.doc(`inviteRevocations/${hash(email)}`) : null;
    const old = revocation ? await tx.get(revocation) : null;
    tx.create(ref, { status: 'pending', requestedAt: stamp(), phase: 0, email });
    tx.set(db.doc(`memberships/${uid}`), { status: 'revoked', updatedAt: stamp() }, { merge: true });
    if (revocation) tx.set(revocation, { generation: (old?.data()?.generation || 0) + 1, updatedAt: stamp() });
  });
}

async function ignoreMissing(action: () => Promise<unknown>): Promise<void> {
  try { await action(); }
  catch (error) { if ((error as { code?: string }).code !== 'auth/user-not-found') throw error; }
}

// Each commit is below Firestore's 500-write limit. Retrying starts at remaining matches.
async function drain(query: Query, update?: UpdateData<DocumentData>): Promise<void> {
  for (;;) {
    const page = await query.limit(200).get();
    if (page.empty) return;
    const batch = db.batch();
    for (const doc of page.docs) {
      if (update) batch.update(doc.ref, update); else batch.delete(doc.ref);
    }
    await batch.commit();
  }
}

export async function processDeletion(uid: string): Promise<void> {
  const ref = db.doc(`accountDeletions/${uid}`);
  const lease = randomUUID();
  const claimed = await db.runTransaction(async tx => {
    const data = (await tx.get(ref)).data();
    if (!data || data.status === 'complete' || (data.leaseUntil || 0) > Date.now()) return false;
    tx.update(ref, { status: 'running', lease, leaseUntil: Date.now() + 10 * 60000, updatedAt: stamp() });
    return true;
  });
  if (!claimed) return;
  try {
    const job = (await ref.get()).data()!;
    const phases: Array<() => Promise<unknown>> = [
      async () => {
        await ignoreMissing(() => auth.updateUser(uid, { disabled: true }));
        await ignoreMissing(() => auth.revokeRefreshTokens(uid));
      },
      () => db.recursiveDelete(db.doc(`userProfiles/${uid}`)),
      () => drain(db.collection('testAttempts').where('userId', '==', uid)),
      () => drain(db.collection('feedback').where('uid', '==', uid)),
      async () => {
        for (;;) {
          const posts = await db.collection('forumPosts').where('authorId', '==', uid).limit(30).get();
          if (posts.empty) return;
          for (const post of posts.docs) await db.recursiveDelete(post.ref);
        }
      },
      async () => {
        // Unfiltered collection-group scan requires no new composite/index override,
        // and also reaches orphan comments whose parent post no longer exists.
        let cursor = job.commentCursor as string | undefined;
        for (;;) {
          let query = db.collectionGroup('comments').orderBy(FieldPath.documentId()).limit(200);
          if (cursor) query = query.startAfter(db.doc(cursor));
          const page = await query.get();
          if (page.empty) return;
          const batch = db.batch();
          for (const comment of page.docs) {
            if (comment.ref.path.startsWith('forumPosts/') && comment.data().authorId === uid) batch.delete(comment.ref);
          }
          cursor = (page.docs[page.docs.length - 1] as QueryDocumentSnapshot).ref.path;
          batch.update(ref, { commentCursor: cursor });
          await batch.commit();
        }
      },
      () => drain(db.collection('studySessions').where('hostId', '==', uid)),
      () => drain(db.collection('studySessions').where('attendees', 'array-contains', uid), { attendees: FieldValue.arrayRemove(uid) }),
      () => drain(db.collection('forumPosts').where('likes', 'array-contains', uid), { likes: FieldValue.arrayRemove(uid) }),
      () => drain(db.collection('invites').where('redeemedBy', '==', uid)),
      () => drain(db.collection('invites').where('createdBy', '==', uid)),
      async () => { if (job.email) await drain(db.collection('invites').where('email', '==', job.email)); },
      async () => { if (job.email) await db.doc(`inviteEmails/${hash(job.email)}`).delete(); },
      () => drain(db.collection('rateLimits').where('uid', '==', uid)),
      () => db.recursiveDelete(db.doc(`memberships/${uid}`)),
      () => ignoreMissing(() => auth.deleteUser(uid)),
    ];
    for (let phase = job.phase || 0; phase < phases.length; phase++) {
      await phases[phase]();
      await ref.update({ phase: phase + 1, updatedAt: stamp() });
    }
    // Retain only a completion tombstone to reject outstanding ID tokens in rules.
    // In particular, discard the email and transient cursor/lease data.
    await ref.set({ status: 'complete', completedAt: stamp() });
  } catch {
    await db.runTransaction(async tx => {
      const job = (await tx.get(ref)).data();
      if (job?.lease === lease) tx.update(ref, { status: 'pending', leaseUntil: 0, lastError: 'cleanup_failed', updatedAt: stamp() });
    });
    console.error(JSON.stringify({ event: 'account_deletion_retry', subject: hash(uid) }));
    throw new Error('account_deletion_retry');
  }
}
