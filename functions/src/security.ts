import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';
import { Request, Response, NextFunction, RequestHandler } from 'express';

if (!getApps().length) initializeApp();
export const db = getFirestore();
export const auth = getAuth();
export const stamp = () => FieldValue.serverTimestamp();
export const hash = (value: string) => createHash('sha256').update(value).digest('hex');

export class HttpError extends Error {
  constructor(public status: number, public code: string) { super(code); }
}
export function route(fn: (req: Request, res: Response) => Promise<void>): RequestHandler {
  return (req, res, next) => { void fn(req, res).catch(next); };
}
export function identity(res: Response): DecodedIdToken { return res.locals.token; }
export function body(req: Request, allowed: string[]): Record<string, unknown> {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body) ||
      Object.keys(req.body).some(key => !allowed.includes(key))) throw new HttpError(400, 'invalid_body');
  return req.body;
}
export function text(value: unknown, max: number, min = 1): string {
  if (typeof value !== 'string' || value.length > max || value.trim().length < min) {
    throw new HttpError(400, 'invalid_text');
  }
  return value.trim();
}
export function emailAddress(value: unknown): string {
  const email = text(value, 254).toLowerCase();
  if (!/^[^\s@/]+@[^\s@/]+\.[^\s@/]+$/.test(email)) throw new HttpError(400, 'invalid_email');
  return email;
}
export function uidValue(value: unknown): string {
  const uid = text(value, 128);
  if (uid.includes('/') || uid === '.' || uid === '..') throw new HttpError(400, 'invalid_uid');
  return uid;
}

// Middleware wrappers explicitly advance only after successful async work.
export function guard(check: (req: Request, res: Response) => Promise<void>): RequestHandler {
  return (req, res, next) => { void check(req, res).then(() => next(), next); };
}
export const verifyBearer = guard(async (req, res) => {
  const match = /^Bearer ([^\s]+)$/i.exec(req.get('authorization') || '');
  if (!match || match[1].length > 8192) throw new HttpError(401, 'unauthenticated');
  try { res.locals.token = await auth.verifyIdToken(match[1], true); }
  catch { throw new HttpError(401, 'unauthenticated'); }
  if ((await db.doc(`accountDeletions/${identity(res).uid}`).get()).exists) {
    throw new HttpError(403, 'account_deleting');
  }
});
export const requireAdmin = guard(async (_req, res) => {
  if (identity(res).admin !== true) throw new HttpError(403, 'admin_required');
});
export async function activeMember(uid: string, isAdmin: boolean): Promise<boolean> {
  if (isAdmin) return true;
  return (await db.doc(`memberships/${uid}`).get()).data()?.status === 'active';
}
export const requireMember = guard(async (_req, res) => {
  const token = identity(res);
  if (!await activeMember(token.uid, token.admin === true)) throw new HttpError(403, 'membership_required');
});

// One fixed-window document per identity and action: atomic across all instances.
export async function takeQuota(uid: string, action: string, limit: number, windowMs: number): Promise<void> {
  const ref = db.doc(`rateLimits/${hash(uid + ':' + action)}`);
  await db.runTransaction(async tx => {
    const now = Date.now();
    const [quotaDoc, deletion] = await tx.getAll(ref, db.doc(`accountDeletions/${uid}`));
    if (deletion.exists) throw new HttpError(403, 'account_deleting');
    const old = quotaDoc.data();
    const current = old && typeof old.startedAt === 'number' && now - old.startedAt < windowMs;
    const count = current ? old.count : 0;
    if (count >= limit) throw new HttpError(429, 'rate_limited');
    tx.set(ref, { uid, action, count: count + 1, startedAt: current ? old.startedAt : now,
      expiresAt: Timestamp.fromMillis(now + windowMs * 2) });
  });
}
export const quota = (action: string, limit: number, windowMs: number) =>
  guard(async (_req, res) => takeQuota(identity(res).uid, action, limit, windowMs));

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (error instanceof HttpError) {
    if (error.status === 429) res.set('Retry-After', '60');
    res.status(error.status).json({ error: error.code });
    return;
  }
  const type = (error as { type?: string })?.type;
  if (type === 'entity.too.large' || type === 'entity.parse.failed') {
    res.status(type === 'entity.too.large' ? 413 : 400).json({ error: 'invalid_body' });
    return;
  }
  // Never log tokens, request bodies, prompts, provider errors or emails.
  console.error(JSON.stringify({ event: 'api_failure', code: 'internal_error' }));
  res.status(503).json({ error: 'temporarily_unavailable' });
}
