import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { initializeApp, deleteApp } = require('../functions/node_modules/firebase-admin/app');
const { getAuth } = require('../functions/node_modules/firebase-admin/auth');

const email = process.argv[2]?.trim().toLowerCase();
const enabled = process.argv[3] !== 'false';
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Usage: node scripts/set-admin.mjs owner@example.com [true|false]');
  process.exit(2);
}
const app = initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'uae-nurse-licensing-prep-feb76' });
const auth = getAuth(app);
try {
  const user = await auth.getUserByEmail(email);
  const claims = { ...(user.customClaims || {}) };
  if (enabled) claims.admin = true; else delete claims.admin;
  await auth.setCustomUserClaims(user.uid, claims);
  await auth.revokeRefreshTokens(user.uid);
  console.log(`${enabled ? 'Granted' : 'Removed'} administrator access for ${email}. The user must sign in again.`);
} finally { await deleteApp(app); }
