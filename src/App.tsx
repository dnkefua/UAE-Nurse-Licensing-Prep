import React, { lazy, Suspense, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { Key, Lock, MailCheck, ShieldAlert } from 'lucide-react';
import { auth, db, getRedirectResult, logoutUser, registerWithEmail, resetPassword, signInWithEmail, signInWithGoogle } from './lib/firebase';
import { apiJson } from './lib/api';
import { nextStreak, studyDate } from './lib/progress';
import type { ExamType, ForumComment, ForumPost, StudySession, TestAttempt, UserProfile } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CrestLogo from './components/CrestLogo';
import AdminAccess from './components/AdminAccess';
import Account from './components/Account';

const Study = lazy(() => import('./components/Study'));
const Tests = lazy(() => import('./components/Tests'));
const Forum = lazy(() => import('./components/Forum'));
const CalendarComp = lazy(() => import('./components/CalendarComp'));
const Consultation = lazy(() => import('./components/Consultation'));
const NewsFeed = lazy(() => import('./components/NewsFeed'));
const Jobs = lazy(() => import('./components/Jobs'));
const Workshops = lazy(() => import('./components/Workshops'));
const Scholarships = lazy(() => import('./components/Scholarships'));

const MILESTONES = new Set(['1_degree_verify', '2_good_standing', '3_dataflow', '4_eligibility', '5_prometric_book', '6_exam_sit']);
const cleanMilestones = (values: string[] | undefined) => (values || []).filter(value => MILESTONES.has(value));

function Loader({ label = 'Loading secure workspace…' }: { label?: string }) {
  return <div className="min-h-[60vh] grid place-content-center text-center gap-3"><div className="mx-auto w-9 h-9 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" /><p className="text-xs text-slate-500">{label}</p></div>;
}

type AuthMode = 'landing' | 'login' | 'register' | 'reset';
function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('landing');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      if (mode === 'reset') { await resetPassword(email); setMessage('Password-reset email sent.'); return; }
      if (mode === 'register') { const result = await registerWithEmail(email, password); await sendEmailVerification(result.user); }
      else await signInWithEmail(email, password);
    } catch { setMessage(mode === 'register' ? 'Registration failed. Use a valid email and a password of at least 6 characters.' : 'The request failed. Check your details and try again.'); }
    finally { setBusy(false); }
  };
  return <div className="min-h-screen bg-[#081321] text-white grid place-content-center p-5"><div className="w-full max-w-md border border-slate-700 rounded-3xl p-7 bg-[#0d1b2e] space-y-5 shadow-2xl">
    <CrestLogo className="w-24 h-24 mx-auto" /><div className="text-center"><h1 className="text-xl font-black uppercase tracking-wider">The Centered Nurse</h1><p className="text-sm text-slate-300 mt-2">Independent UAE nursing licensing study support. Not affiliated with a government authority.</p></div>
    {mode === 'landing' ? <div className="space-y-3"><button onClick={() => void signInWithGoogle().catch(() => setMessage('Google sign-in is unavailable. Use email sign-in instead.'))} className="w-full p-3 bg-white text-slate-900 rounded-xl font-semibold">Continue with Google</button><button onClick={() => setMode('login')} className="w-full p-3 bg-[#dfba6b] text-slate-950 rounded-xl font-semibold">Sign in with email</button><button onClick={() => setMode('register')} className="w-full p-3 border border-[#dfba6b] text-[#dfba6b] rounded-xl">Create account</button></div>
      : <form onSubmit={submit} className="space-y-3"><h2 className="font-bold">{mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'}</h2><label className="block text-sm">Email<input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-900 border border-slate-600" /></label>{mode !== 'reset' && <label className="block text-sm">Password<input type="password" required minLength={6} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full p-3 rounded-xl bg-slate-900 border border-slate-600" /></label>}<button disabled={busy} className="w-full p-3 bg-[#dfba6b] text-slate-950 rounded-xl font-bold">{busy ? 'Please wait…' : 'Continue'}</button><div className="flex justify-between text-xs"><button type="button" onClick={() => setMode('landing')} className="underline">Back</button>{mode === 'login' && <button type="button" onClick={() => setMode('reset')} className="underline">Forgot password?</button>}</div></form>}
    {message && <p role="status" className="text-sm bg-slate-900 p-3 rounded-xl">{message}</p>}<p className="text-[11px] text-slate-400 text-center"><a className="underline" href="/privacy">Privacy</a> · <a className="underline" href="/terms.html">Terms</a> · <a className="underline" href="/help.html">Help</a></p>
  </div></div>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true); const [accessLoading, setAccessLoading] = useState(true);
  const [access, setAccess] = useState({ admin: false, active: false });
  const [posts, setPosts] = useState<ForumPost[]>([]); const [comments, setComments] = useState<Record<string, ForumComment[]>>({});
  const [sessions, setSessions] = useState<StudySession[]>([]); const [attempts, setAttempts] = useState<TestAttempt[]>([]);
  const [invite, setInvite] = useState(''); const [accessMessage, setAccessMessage] = useState(''); const [redeeming, setRedeeming] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const notifications = [{ id: 'independent', text: 'Always confirm licensing requirements, dates, fees, and providers with the relevant official authority.', date: new Date().toISOString(), type: 'info' }];
  const visibleNotifications = notifications.filter(item => !dismissed.includes(item.id));
  const isUnlocked = access.admin || access.active;

  const refreshAccess = async () => { setAccessLoading(true); try { setAccess(await apiJson<{ admin: boolean; active: boolean }>('/api/session')); setAccessMessage(''); } catch { setAccess({ admin: false, active: false }); setAccessMessage('Access status could not be checked. Check your connection and try again.'); } finally { setAccessLoading(false); } };
  useEffect(() => {
    void getRedirectResult(auth).catch(() => {});
    return onAuthStateChanged(auth, async current => {
      setUser(current); setProfile(null); setAccess({ admin: false, active: false });
      if (!current) { setAuthLoading(false); setAccessLoading(false); return; }
      try {
        const ref = doc(db, 'userProfiles', current.uid); const snapshot = await getDoc(ref);
        if (snapshot.exists()) { const existing = snapshot.data() as UserProfile; setProfile({ ...existing, completedMilestones: cleanMilestones(existing.completedMilestones) }); }
        else { const now = new Date().toISOString(); const created: UserProfile = { uid: current.uid, displayName: current.displayName || 'Candidate Nurse', targetExam: 'DHA', examDate: '', registeredForExam: false, studyHoursGoal: 12, completedMilestones: [], currentStreak: 0, createdAt: now, updatedAt: now }; await setDoc(ref, created); setProfile(created); }
        await refreshAccess();
      } catch { setAccessMessage('Your profile could not be loaded. Please sign out and try again.'); setAccessLoading(false); }
      finally { setAuthLoading(false); }
    });
  }, []);
  useEffect(() => {
    if (!user || !isUnlocked) { setPosts([]); setSessions([]); setAttempts([]); return; }
    const stopPosts = onSnapshot(query(collection(db, 'forumPosts'), orderBy('createdAt', 'desc'), limit(100)), snapshot => setPosts(snapshot.docs.map(item => item.data() as ForumPost)));
    const stopSessions = onSnapshot(query(collection(db, 'studySessions'), orderBy('dateTime', 'asc'), limit(100)), snapshot => setSessions(snapshot.docs.map(item => item.data() as StudySession)));
    const stopAttempts = onSnapshot(query(collection(db, 'testAttempts'), where('userId', '==', user.uid), orderBy('completedAt', 'desc'), limit(100)), snapshot => setAttempts(snapshot.docs.map(item => item.data() as TestAttempt)));
    return () => { stopPosts(); stopSessions(); stopAttempts(); };
  }, [user, isUnlocked]);

  const updateProfile = async (updates: Partial<UserProfile>) => { if (!user || !profile) throw new Error('profile_unavailable'); const payload: UserProfile = { ...profile, ...updates, uid: user.uid, completedMilestones: cleanMilestones(updates.completedMilestones ?? profile.completedMilestones), createdAt: profile.createdAt, updatedAt: new Date().toISOString() }; await setDoc(doc(db, 'userProfiles', user.uid), payload); setProfile(payload); };
  const addPost = async (title: string, content: string, category: ForumPost['category']) => { if (!user) return; const ref = doc(collection(db, 'forumPosts')); const now = new Date().toISOString(); await setDoc(ref, { id: ref.id, title, content, category, authorId: user.uid, authorName: user.displayName || 'Candidate Nurse', commentsCount: 0, likes: [], createdAt: now, updatedAt: now }); };
  const addComment = async (postId: string, content: string) => { if (!user) return; const ref = doc(collection(db, `forumPosts/${postId}/comments`)); await setDoc(ref, { id: ref.id, postId, content, authorId: user.uid, authorName: user.displayName || 'Candidate Nurse', createdAt: new Date().toISOString() }); };
  const loadComments = async (postId: string) => { const snapshot = await getDocs(query(collection(db, `forumPosts/${postId}/comments`), orderBy('createdAt', 'asc'), limit(200))); setComments(current => ({ ...current, [postId]: snapshot.docs.map(item => item.data() as ForumComment) })); };
  const likePost = async (postId: string) => { if (!user) return; const post = posts.find(item => item.id === postId); if (!post) return; await updateDoc(doc(db, 'forumPosts', postId), { likes: post.likes.includes(user.uid) ? arrayRemove(user.uid) : arrayUnion(user.uid), updatedAt: new Date().toISOString() }); };
  const addSession = async (title: string, dateTime: string, duration: number, topic: string) => { if (!user) return; const ref = doc(collection(db, 'studySessions')); await setDoc(ref, { id: ref.id, title, dateTime, duration, topic, hostId: user.uid, hostName: user.displayName || 'Candidate Nurse', attendees: [], isExpertQA: false, createdAt: new Date().toISOString() }); };
  const joinSession = async (sessionId: string) => { if (!user) return; const session = sessions.find(item => item.id === sessionId); if (!session) return; await updateDoc(doc(db, 'studySessions', sessionId), { attendees: session.attendees.includes(user.uid) ? arrayRemove(user.uid) : arrayUnion(user.uid) }); };
  const saveAttempt = async (examType: ExamType, score: number, correctAnswers: number, totalQuestions: number, attemptId?: string, assessmentVersion = 'practice-v2', completedAt = new Date().toISOString()) => { if (!user) throw new Error('sign_in_required'); const ref = attemptId ? doc(db, 'testAttempts', attemptId) : doc(collection(db, 'testAttempts')); await setDoc(ref, { id: ref.id, userId: user.uid, examType, score, correctAnswers, totalQuestions, completedAt, assessmentVersion }); const today = studyDate(); await updateProfile({ currentStreak: nextStreak(profile?.lastStudyDate, profile?.currentStreak || 0, today), lastStudyDate: today }); };
  const askAI = async (prompt: string, context?: string) => (await apiJson<{ text: string }>('/api/ai-tutor', { method: 'POST', body: JSON.stringify({ prompt, context, examType: profile?.targetExam || 'DHA' }) })).text;
  const redeem = async (event: React.FormEvent) => { event.preventDefault(); setRedeeming(true); setAccessMessage(''); try { const next = await apiJson<{ admin: boolean; active: boolean }>('/api/redeem-invite', { method: 'POST', body: JSON.stringify({ code: invite.trim() }) }); setAccess(next); setInvite(''); } catch (error) { setAccessMessage(error instanceof Error && error.message.includes('verified_email_required') ? 'Verify your email first, then refresh your account.' : 'This invite is invalid, expired, already used, or assigned to a different email.'); } finally { setRedeeming(false); } };

  if (authLoading) return <Loader label="Initializing secure workspace…" />;
  if (!user) return <AuthScreen />;
  return <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row"><Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} onLogin={() => void signInWithGoogle()} onLogout={() => void logoutUser()} notificationCount={visibleNotifications.length} isAdmin={access.admin} />
    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">{accessLoading ? <Loader label="Checking tester access…" /> : !isUnlocked ? <div className="min-h-[70vh] grid place-content-center"><section className="max-w-lg bg-[#0d1b2e] text-white rounded-3xl p-8 text-center space-y-5 shadow-xl"><CrestLogo className="w-24 h-24 mx-auto" /><Lock className="w-6 h-6 mx-auto text-[#dfba6b]" /><h1 className="text-xl font-bold">Tester invitation required</h1><p className="text-sm text-slate-300">Sign in with the exact verified email address invited by the app administrator, then enter its one-time code.</p>
      {!user.emailVerified && <div className="rounded-xl bg-amber-950 p-3 text-sm flex gap-2 text-left"><MailCheck className="shrink-0" /><span>Your email is not verified. <button className="underline" onClick={() => void sendEmailVerification(user).then(() => setAccessMessage('Verification email sent.'))}>Send verification email</button>, verify it, then sign in again.</span></div>}
      <form onSubmit={redeem} className="space-y-3"><label className="text-xs block text-left">One-time invite code</label><div className="relative"><Key className="absolute left-3 top-3 w-4 h-4 text-[#dfba6b]" /><input required value={invite} onChange={e => setInvite(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 pl-10 font-mono" autoComplete="one-time-code" /></div><button disabled={redeeming || !user.emailVerified} className="w-full p-3 bg-[#dfba6b] text-slate-950 rounded-xl font-bold">{redeeming ? 'Checking…' : 'Activate tester access'}</button></form>{accessMessage && <p role="alert" className="text-sm flex gap-2 text-left bg-slate-900 p-3 rounded-xl"><ShieldAlert className="shrink-0 w-4" />{accessMessage}</p>}<div className="flex justify-center gap-4 text-xs"><button onClick={() => void refreshAccess()} className="underline">Refresh access</button><button onClick={() => void logoutUser()} className="underline">Sign out</button><a href="/help.html" className="underline">Get help</a></div></section></div>
      : <Suspense fallback={<Loader />}>{activeTab === 'dashboard' && <div className="space-y-6">{access.admin && <AdminAccess />}<Dashboard profile={profile} testAttempts={attempts} onUpdateProfile={updateProfile} onTriggerMockNotification={() => {}} notifications={visibleNotifications} onDismissNotification={id => setDismissed(items => [...items, id])} /></div>}{activeTab === 'study' && <Study onAskAI={askAI} />}{activeTab === 'tests' && <Tests onSaveAttempt={saveAttempt} userId={user.uid} testAttempts={attempts} />}{activeTab === 'consultation' && <Consultation />}{activeTab === 'news' && <NewsFeed />}{activeTab === 'jobs' && <Jobs />}{activeTab === 'workshops' && <Workshops />}{activeTab === 'scholarships' && <Scholarships />}{activeTab === 'forum' && <Forum user={user} posts={posts} comments={comments} onAddPost={addPost} onAddComment={addComment} onLikePost={likePost} onLoadComments={postId => void loadComments(postId)} onLogin={() => void signInWithGoogle()} />}{activeTab === 'calendar' && <CalendarComp user={user} sessions={sessions} onAddSession={addSession} onJoinSession={joinSession} onLogin={() => void signInWithGoogle()} />}{activeTab === 'account' && <Account user={user} />}</Suspense>}</main>
  </div>;
}
