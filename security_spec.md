# Security Specification: UAE Nurse Exam Hub

This document defines the strict data invariants, security guarantees, and rogue payloads checked against the Zero-Trust security rules designed for this application.

## 1. Data Invariants

1. **User Profiles (`userProfiles/{userId}`)**
   - Owners can only manage (read, write) their own profile.
   - Profile documents must exactly match the authenticated `request.auth.uid`.
   - Admin roles cannot be self-nominated or altered.
   - `createdAt` is immutable. `updatedAt` matches `request.time`.

2. **Forum Discussions (`forumPosts/{postId}` & `comments/{commentId}`)**
   - Any signed-in and email-verified user can read forum posts and comments.
   - Creating a post or comment requires `authorId` to strictly equal `request.auth.uid`.
   - System counters like `commentsCount` or list of `likes` require strict increments/modifications using atomic field-update schemas.
   - Deletions are only authorized for original authors or verified admins.

3. **Study Calendar Event Bookings (`studySessions/{sessionId}`)**
   - Signed-in and verified users can schedule collaborative sessions.
   - Any user can join an existing study session by adding their `uid` to the `attendees` array.
   - Only original hosts can edit parent settings.

4. **Test Evaluation Metrics (`testAttempts/{attemptId}`)**
   - Access is restricted to the specific owner (`userId == request.auth.uid`). No other students can view score reports or diagnostic results.
   - `score`, `correctAnswers`, and `totalQuestions` are immutable and strictly numeric.

---

## 2. The "Dirty Dozen" Rogue Payloads (Red Team Targets)

Here are twelve payloads designed to bypass security. Zero-Trust Rules will return `PERMISSION_DENIED` for all these injection scenarios.

### Scenario 1-3: Identity Hijacking and Profile Corruption
*   **Payload 1 (Profile Spoofing)**: Attacker attempts to write a user profile for a target user.
    *   *Path*: `/userProfiles/victimUserId`
    *   *Action*: `create` / `write`
    *   *Content*: `{"displayName": "Hacker", "uid": "attacker_uid", "targetExam": "DHA"}`
*   **Payload 2 (Admin Role Self-Escalation)**: Attacker tries to inject an administrator claim into their profile.
    *   *Path*: `/userProfiles/attackerUserId`
    *   *Action*: `update`
    *   *Content*: `{"displayName": "Attacker", "isAdmin": true, "uid": "attacker_uid"}`
*   **Payload 3 (System Field Poisoning)**: Attacker attempts to alter the strict immutable field `createdAt` of their profile.
    *   *Path*: `/userProfiles/attackerUserId`
    *   *Action*: `update`
    *   *Content*: `{"createdAt": "2020-01-01T00:00:00Z", "displayName": "Attacker"}`

### Scenario 4-6: Collaborative Forum Vandalism
*   **Payload 4 (Post Impersonation)**: Guest tries to post representing a respected Nurse Specialist.
    *   *Path*: `/forumPosts/roguePostId`
    *   *Action*: `create`
    *   *Content*: `{"id": "roguePostId", "title": "Scam Link", "authorId": "expertNurseUid", "authorName": "Dr. Specialist", "content": "Adware content"}`
*   **Payload 5 (Rogue Post Modification)**: User attempts to modify a post hosted by someone else to inject phishing URLs.
    *   *Path*: `/forumPosts/victimPostId`
    *   *Action*: `update`
    *   *Content*: `{"content": "Phishing site link..."}`
*   **Payload 6 (Shadow Key Injection on Comments)**: Attacker tries injection of non-defined payload attributes in Forum Comments (Vulnerability of incomplete `hasOnly`).
    *   *Path*: `/forumPosts/post_1/comments/comment_1`
    *   *Action*: `create`
    *   *Content*: `{"postId": "post_1", "content": "Nice post", "specialGhostClaim": "ROOT_BYPASS", "authorId": "attacker_uid", "authorName": "Rogue"}`

### Scenario 7-8: Calendar and Live Event Tampering
*   **Payload 7 (Calendar Host Hijack)**: Attacker attempts to change the `hostId` of a premium study session.
    *   *Path*: `/studySessions/session_123`
    *   *Action*: `update`
    *   *Content*: `{"hostId": "attacker_uid", "title": "Hijacked Session"}`
*   **Payload 8 (Bulk Session Corruptor)**: Inject massive arrays (Denial of Wallet) inside a session's `attendees` representing millions of fake entries.
    *   *Path*: `/studySessions/session_123`
    *   *Action*: `update` (Join)
    *   *Content*: `{"attendees": ["u1", "u2", "u3", ...1200 items...]}`

### Scenario 9-12: Diagnostic Progress Fraud and PII Leaks
*   **Payload 9 (Test Score Fraud)**: Attempting to update a recorded score attempt from `45%` to `100%` retroactively.
    *   *Path*: `/testAttempts/attempt_123`
    *   *Action*: `update`
    *   *Content*: `{"score": 100, "userId": "attacker_uid"}`
*   **Payload 10 (Direct Attempt Retrieval of Peer Progress)**: Reading diagnostic exam statistics belonging to someone else.
    *   *Path*: `/testAttempts/victimAttemptId`
    *   *Action*: `get`
    *   *Caller*: `unauthorized_student_uid`
*   **Payload 11 (Blanket Query scraping)**: Unauthorized guest query querying the entire list of user profiles.
    *   *Path*: `/userProfiles`
    *   *Action*: `list`
    *   *Query*: `select *` (No strict `userId` filter matching own UID)
*   **Payload 12 (Anonymity Spoof)**: Sign-in by unverified temp user attempting custom writes while bypassing email verification rules.
    *   *Path*: `/forumPosts/unverifiedPostId`
    *   *Action*: `create`
    *   *User*: `{"uid": "unverified", "email_verified": false}`

---

## 3. Test Runner Strategy
Test suite evaluates Firestore conditions synchronously under simulated local container environments, ensuring that matching operations are consistently captured, restricted, and securely bounded. Every rogue pattern outlined above returns a standard security verification fail (`PERMISSION_DENIED`).
