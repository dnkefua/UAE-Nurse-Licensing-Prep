import { onRequest } from 'firebase-functions/v2/https';
import { onDocumentCreated, onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { FieldValue } from 'firebase-admin/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { app } from './app';
import { db } from './security';
import { processDeletion } from './deletion';

export const api = onRequest({ region: 'us-central1', memory: '256MiB', timeoutSeconds: 60,
  secrets: ['GEMINI_API_KEY', 'RAPIDAPI_KEY'] }, app);

export const deleteAccountData = onDocumentCreated({ document: 'accountDeletions/{uid}',
  region: 'us-central1', timeoutSeconds: 540, retry: true }, async event => {
  await processDeletion(event.params.uid);
});

// Recovery continues even if an event exhausts its delivery retry window.
export const retryAccountDeletions = onSchedule({ schedule: 'every 15 minutes',
  region: 'us-central1', timeoutSeconds: 540 }, async () => {
  const jobs = await db.collection('accountDeletions').where('status', 'in', ['pending', 'running']).limit(50).get();
  for (const job of jobs.docs) await processDeletion(job.id);
});

async function adjustCommentCount(postId: string, amount: number): Promise<void> {
  const ref = db.doc(`forumPosts/${postId}`);
  try { await ref.update({ commentsCount: FieldValue.increment(amount), updatedAt: new Date().toISOString() }); }
  catch (error) { if ((error as { code?: number }).code !== 5) throw error; }
}

export const countNewComment = onDocumentCreated({ document: 'forumPosts/{postId}/comments/{commentId}', region: 'us-central1' },
  event => adjustCommentCount(event.params.postId, 1));
export const countDeletedComment = onDocumentDeleted({ document: 'forumPosts/{postId}/comments/{commentId}', region: 'us-central1' },
  event => adjustCommentCount(event.params.postId, -1));
