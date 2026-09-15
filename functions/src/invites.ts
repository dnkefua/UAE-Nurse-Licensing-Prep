import { randomBytes } from 'node:crypto';
import { Router } from 'express';
import { Timestamp, FieldPath } from 'firebase-admin/firestore';
import type { UserRecord } from 'firebase-admin/auth';
import { db, auth, body, text, emailAddress, uidValue, stamp, hash, identity,
  route, requireAdmin, quota, HttpError } from './security';

function inviteCode(value: unknown): string {
  const code = text(value, 64);
  if (!/^[A-Za-z0-9_-]{43}$/.test(code)) throw new HttpError(400, 'invalid_invite');
  return code;
}

export function registerInvites(app: Router): void {
  app.post('/api/admin/invites', requireAdmin, quota('invite-create', 30, 3600000), route(async (req, res) => {
    const email = emailAddress(body(req, ['email']).email);
    const code = randomBytes(32).toString('base64url');
    const ref = db.doc(`invites/${hash(code)}`);
    const emailRef = db.doc(`inviteEmails/${hash(email)}`);
    await db.runTransaction(async tx => {
      const [revoked, current] = await tx.getAll(db.doc(`inviteRevocations/${hash(email)}`), emailRef);
      if (current.data()?.status === 'redeemed') throw new HttpError(409, 'already_a_member');
      if (current.data()?.status === 'pending' && current.data()?.expiresAt instanceof Timestamp
        && current.data()!.expiresAt.toMillis() > Date.now()) throw new HttpError(409, 'invite_already_pending');
      const generation = revoked.data()?.generation || 0;
      tx.create(ref, { email, generation, status: 'pending', createdAt: stamp(),
        expiresAt: Timestamp.fromMillis(Date.now() + 7 * 86400000), createdBy: identity(res).uid });
      tx.set(emailRef, { email, inviteHash: ref.id, status: 'pending', expiresAt: Timestamp.fromMillis(Date.now() + 7 * 86400000), updatedAt: stamp() });
    });
    res.status(201).json({ code });
  }));

  app.post('/api/admin/invites/revoke', requireAdmin, quota('invite-revoke', 60, 3600000), route(async (req, res) => {
    const code = inviteCode(body(req, ['code']).code);
    const ref = db.doc(`invites/${hash(code)}`);
    await db.runTransaction(async tx => {
      const invite = await tx.get(ref);
      if (!invite.exists) throw new HttpError(404, 'invite_not_found');
      if (invite.data()?.status === 'redeemed') throw new HttpError(409, 'revoke_membership_instead');
      tx.update(ref, { status: 'revoked', revokedAt: stamp() });
      const email = invite.data()?.email;
      if (typeof email === 'string') tx.set(db.doc(`inviteEmails/${hash(email)}`), { email, inviteHash: ref.id, status: 'revoked', updatedAt: stamp() }, { merge: true });
    });
    res.json({ success: true });
  }));

  app.post('/api/admin/invites/revoke-email', requireAdmin, quota('invite-revoke', 60, 3600000), route(async (req, res) => {
    const email = emailAddress(body(req, ['email']).email);
    const emailRef = db.doc(`inviteEmails/${hash(email)}`);
    await db.runTransaction(async tx => {
      const index = await tx.get(emailRef);
      const inviteHash = index.data()?.inviteHash;
      if (index.data()?.status !== 'pending' || typeof inviteHash !== 'string' || !/^[a-f0-9]{64}$/.test(inviteHash)) {
        throw new HttpError(404, 'pending_invite_not_found');
      }
      const inviteRef = db.doc(`invites/${inviteHash}`);
      const invite = await tx.get(inviteRef);
      if (invite.data()?.status === 'pending') tx.update(inviteRef, { status: 'revoked', revokedAt: stamp() });
      tx.set(emailRef, { email, inviteHash, status: 'revoked', updatedAt: stamp() }, { merge: true });
    });
    res.json({ success: true });
  }));

  app.post('/api/redeem-invite', quota('invite-redeem', 10, 3600000), route(async (req, res) => {
    const token = identity(res);
    if (token.email_verified !== true || !token.email) throw new HttpError(403, 'verified_email_required');
    const email = emailAddress(token.email);
    const code = inviteCode(body(req, ['code']).code);
    const ref = db.doc(`invites/${hash(code)}`);
    const memberRef = db.doc(`memberships/${token.uid}`);
    await db.runTransaction(async tx => {
      const emailRef = db.doc(`inviteEmails/${hash(email)}`);
      const [snap, revoked, deletion, member] = await tx.getAll(ref,
        db.doc(`inviteRevocations/${hash(email)}`), db.doc(`accountDeletions/${token.uid}`), memberRef);
      const invite = snap.data();
      if (deletion.exists) throw new HttpError(403, 'account_deleting');
      if (!invite || invite.email !== email || invite.generation !== (revoked.data()?.generation || 0)) {
        throw new HttpError(400, 'invalid_invite');
      }
      // Safe retries for an already committed redemption never reactivate revoked access.
      if (invite.status === 'redeemed' && invite.redeemedBy === token.uid && member.data()?.status === 'active') return;
      if (invite.status !== 'pending' || !(invite.expiresAt instanceof Timestamp) || invite.expiresAt.toMillis() <= Date.now()) {
        throw new HttpError(400, 'invalid_invite');
      }
      tx.set(memberRef, { status: 'active', role: 'member', email, updatedAt: stamp(), inviteHash: ref.id });
      tx.update(ref, { status: 'redeemed', redeemedBy: token.uid, redeemedAt: stamp() });
      tx.set(emailRef, { email, inviteHash: ref.id, status: 'redeemed', uid: token.uid, updatedAt: stamp() }, { merge: true });
    });
    res.json({ admin: token.admin === true, active: true });
  }));

  app.get('/api/admin/members', requireAdmin, quota('member-list', 60, 60000), route(async (req, res) => {
    const after = req.query.after === undefined ? undefined : uidValue(req.query.after);
    let query = db.collection('memberships').orderBy(FieldPath.documentId()).limit(500);
    if (after) query = query.startAfter(after);
    const [snapshot, invitations] = await Promise.all([query.get(), db.collection('inviteEmails').limit(500).get()]);
    const byEmail = new Map<string, { uid: string; email: string | null; status: 'active' | 'revoked' | 'pending' }>();
    for (const invite of invitations.docs) {
      const data = invite.data();
      if (typeof data.email === 'string' && data.status === 'pending' && data.expiresAt instanceof Timestamp && data.expiresAt.toMillis() > Date.now()) {
        byEmail.set(data.email, { uid: '', email: data.email, status: 'pending' });
      }
    }
    const memberRows = snapshot.docs.map(doc => ({ uid: doc.id,
      email: typeof doc.data().email === 'string' ? doc.data().email : null,
      status: doc.data().status === 'active' ? 'active' as const : 'revoked' as const }));
    for (const member of memberRows) {
      const key = member.email || `uid:${member.uid}`;
      if (member.status === 'active' || !byEmail.has(key)) byEmail.set(key, member);
    }
    const members = [...byEmail.values()].sort((a, b) => (a.email || a.uid).localeCompare(b.email || b.uid));
    res.json({ members, nextCursor: null });
  }));

  app.post('/api/admin/revoke', requireAdmin, quota('member-revoke', 60, 3600000), route(async (req, res) => {
    const uid = uidValue(body(req, ['uid']).uid);
    let user: UserRecord | undefined;
    try { user = await auth.getUser(uid); }
    catch (error) {
      if ((error as { code?: string }).code !== 'auth/user-not-found') throw error;
    }
    // Membership cannot override an admin claim. Do not claim to revoke an administrator.
    if (user?.customClaims?.admin === true) throw new HttpError(409, 'admin_claim_must_be_removed');
    await db.runTransaction(async tx => {
      const ref = db.doc(`memberships/${uid}`);
      const member = await tx.get(ref);
      const email = user?.email ? emailAddress(user.email) : member.data()?.email;
      const revocation = typeof email === 'string' ? db.doc(`inviteRevocations/${hash(email)}`) : null;
      const old = revocation ? await tx.get(revocation) : null;
      tx.set(ref, { status: 'revoked', role: 'member', ...(email ? { email } : {}), updatedAt: stamp() }, { merge: true });
      if (revocation) tx.set(revocation, { generation: (old?.data()?.generation || 0) + 1, updatedAt: stamp() });
      if (typeof email === 'string') tx.set(db.doc(`inviteEmails/${hash(email)}`), { email, uid, status: 'revoked', updatedAt: stamp() }, { merge: true });
    });
    if (user) await auth.revokeRefreshTokens(uid);
    res.json({ success: true });
  }));
}
