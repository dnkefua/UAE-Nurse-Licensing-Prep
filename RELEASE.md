# Production and tester release runbook

## Access model

The public web/app shell can be opened by anyone, but study content and community data require both Firebase sign-in and an active membership. A tester signs in with the exact email address invited by an administrator, verifies that email, and redeems the one-time code. App-store testing enrollment alone does not grant in-app membership.

Administrators use one **Tester access** table. It merges pending invitations and redeemed memberships by normalized email, so the same person is not displayed in two lists. Shared access codes and hard-coded owner-email authorization are retired.

## First administrator

1. Have the owner create/sign in to the Firebase Authentication account.
2. Authenticate the Firebase/Google CLI with permission to the production project and Application Default Credentials.
3. Run `npm run admin:set -- owner@example.com true`.
4. The owner signs out and back in so Firebase issues a new ID token.

To remove the claim, run the same command with `false`. Do not grant admin claims to tester accounts.

## Pre-release checks

1. Use Node 22 for Cloud Functions and a supported Node version for the UI build.
2. For Android, install Android SDK Platform 36 and matching build tools, set `android/local.properties`, and retain the protected release keystore configuration. The project targets API 36 and has version code 6 / version 1.1.0.
3. Install root and `functions/` dependencies from the lockfiles.
4. Configure the `GEMINI_API_KEY` and `RAPIDAPI_KEY` Functions secrets. Jobs gracefully show an unconfigured state without RapidAPI.
5. Set `ALLOWED_ORIGINS` when using a custom production domain; defaults cover Firebase Hosting and Capacitor origins.
6. Run `npm run verify` and `npx cap sync android`.
7. Test the Firebase rules and Functions with the Emulator Suite using one admin, one active tester, one uninvited user, and one revoked tester.
8. Build Android with `cd android` then `gradlew test lint bundleRelease`.
9. Deploy together so the client, rules, indexes, and Functions do not drift: `firebase deploy --only firestore:rules,firestore:indexes,functions,hosting`.

## Acceptance checklist

- Unauthenticated users see sign-in, privacy, terms, and help only.
- An uninvited user cannot read Firestore app data or call member APIs.
- An invite cannot be redeemed by a different or unverified email, twice, or after expiry/revocation.
- The tester table contains one row per normalized email and correctly shows pending, active, or revoked.
- Revoked users lose API and Firestore access after token revocation/sign-in refresh.
- Practice options are shuffled with their correct-answer mapping intact; drafts survive reload; timed drafts retain their original deadline; results show rationales and can only be saved idempotently.
- Password reset, feedback, privacy links, and in-app account deletion are functional.
- News opens publisher links; the retired arbitrary article-fetch endpoint returns 410.
- Jobs, scholarships, workshops, consultation, AI output, and licensing material do not claim independent verification or government affiliation.

## Monitoring and rollback

Monitor Cloud Functions error rate/latency, account-deletion retries, invite redemption failures, and Firestore denied requests after release. Logs intentionally use hashed user identifiers and do not log tokens, emails, prompts, or request bodies. Roll back Hosting and Functions together if member access or sign-in regression is detected; do not relax Firestore rules as a workaround.
