/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  db,
  auth,
  signInWithGoogle,
  signInWithEmail,
  registerWithEmail,
  getRedirectResult,
  logoutUser,
  handleFirestoreError,
  OperationType
} from './lib/firebase';
import { 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';

import { UserProfile, ForumPost, ForumComment, StudySession, TestAttempt, ExamType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Study from './components/Study';
import Tests from './components/Tests';
import Forum from './components/Forum';
import CalendarComp from './components/CalendarComp';
import Consultation from './components/Consultation';
import NewsFeed from './components/NewsFeed';
import Jobs from './components/Jobs';
import Workshops from './components/Workshops';
import Scholarships from './components/Scholarships';
import CrestLogo from './components/CrestLogo';
import { Award, Lock, Key, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Real-time Auth States
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Firestore Data Collections
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [comments, setComments] = useState<{ [postId: string]: ForumComment[] }>({});
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([]);

  // In-App Notification alerting lists
  const [notifications, setNotifications] = useState<{ id: string; text: string; date: string; type: string }[]>([]);

  // ================= Access Gate Verification & Management =================
  const isAdmin = user && (user.email === 'loveline082022@gmail.com' || user.email === 'uncledez8@gmail.com');
  const isUnlocked = isAdmin || (profile?.completedMilestones && profile.completedMilestones.includes('portal_unlocked_vip'));

  const [activationInput, setActivationInput] = useState('');
  const [activationError, setActivationError] = useState<string | null>(null);
  const [activationSuccess, setActivationSuccess] = useState(false);
  const [validatingCode, setValidatingCode] = useState(false);

  // Admin and owner code supervisor states
  const [adminCurrentCode, setAdminCurrentCode] = useState<string>('UAE-NURSE-2026');
  const [adminNewCode, setAdminNewCode] = useState('');
  const [adminUpdatingCode, setAdminUpdatingCode] = useState(false);
  const [adminCodeFeedback, setAdminCodeFeedback] = useState<string | null>(null);

  // Auto-fetch active system access code for administrators
  useEffect(() => {
    if (isAdmin && user?.email) {
      fetch('/api/admin/get-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email })
      })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setAdminCurrentCode(data.code);
        }
      })
      .catch(err => console.error("Error fetching access code:", err));
    }
  }, [user, isAdmin]);

  const handleValidateActivationCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationInput.trim()) return;

    setValidatingCode(true);
    setActivationError(null);
    try {
      const res = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: activationInput })
      });
      const data = await res.json();
      if (data.valid) {
        setActivationSuccess(true);
        const currentMilestones = profile?.completedMilestones || [];
        if (!currentMilestones.includes('portal_unlocked_vip')) {
          await handleUpdateProfile({
            completedMilestones: [...currentMilestones, 'portal_unlocked_vip']
          });
        }
      } else {
        setActivationError('Incorrect activation code. Please contact loveline082022@gmail.com or uncledez8@gmail.com for your valid pass key.');
      }
    } catch (err) {
      console.error(err);
      setActivationError('Network communication error. Please check connection and try again.');
    } finally {
      setValidatingCode(false);
    }
  };

  const handleAdminUpdateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewCode.trim()) return;

    setAdminUpdatingCode(true);
    setAdminCodeFeedback(null);
    try {
      const res = await fetch('/api/admin/set-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.email, code: adminNewCode })
      });
      const data = await res.json();
      if (data.success) {
        setAdminCurrentCode(data.code);
        setAdminNewCode('');
        setAdminCodeFeedback('System Access Code updated matches updated registry details successfully!');
        setTimeout(() => setAdminCodeFeedback(null), 4000);
      } else {
        setAdminCodeFeedback('Failed to update system access code.');
      }
    } catch (err) {
      console.error(err);
      setAdminCodeFeedback('Endpoint communication error occurred.');
    } finally {
      setAdminUpdatingCode(false);
    }
  };

  // Initial Seed checklist to populate empty DBs so users get instant beautiful experiences
  const seedInitialDatabase = async () => {
    try {
      // 1. Seed Forum posts
      const postsRef = collection(db, 'forumPosts');
      const postSnap = await getDocs(query(postsRef, limit(1)));
      if (postSnap.empty) {
        const mockPosts: Partial<ForumPost>[] = [
          {
            title: "Dataflow Verification Timeline for DHA Exam",
            content: "Hey team! How long did your DataFlow degree and background check verification take? I submitted mine 2 weeks ago and it is still under progress. Any tips to expedite?",
            authorId: "system_seeder_1",
            authorName: "Nurse Jameela K. (Mentor)",
            category: "Licensing",
            commentsCount: 2,
            likes: ["system_seeder_2", "system_seeder_3"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            title: "High-Yield Fluid & Electrolytes Study Notes",
            content: "Quick summary of Potassium rules for Prometric: Normal Potassium level is 3.5 - 5.0 mEq/L. Hyperkalemia (>5.0) displays tall peaked T-waves on ECG. Hypokalemia (<3.5) displays flat T-waves and U-waves. Remember: Potassium is never pushed intravenously! Keep revision decks high-five active!",
            authorId: "system_seeder_4",
            authorName: "Rahul Sharma (Clinician)",
            category: "Study Notes",
            commentsCount: 0,
            likes: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];

        for (const p of mockPosts) {
          const docRef = await addDoc(postsRef, { ...p, id: 'temp_placeholder' });
          await updateDoc(docRef, { id: docRef.id });

          // Seed comments on first post
          if (p.title?.includes("Dataflow")) {
            const commentsRef = collection(db, `forumPosts/${docRef.id}/comments`);
            const mockComments: Partial<ForumComment>[] = [
              {
                postId: docRef.id,
                content: "Dataflow usually takes about 14 to 25 business days. Do not worry, you can apply for your DHA eligibility number right after! Good luck!",
                authorId: "system_seeder_4",
                authorName: "Rahul Sharma (Clinician)",
                createdAt: new Date().toISOString()
              },
              {
                postId: docRef.id,
                content: "Keep checking your email spam folder, sometimes the primary university requests extra authorization documents.",
                authorId: "system_seeder_3",
                authorName: "Dr. Fatima (HAAD)",
                createdAt: new Date().toISOString()
              }
            ];
            for (const c of mockComments) {
              const cRef = await addDoc(commentsRef, c);
              await updateDoc(cRef, { id: cRef.id });
            }
          }
        }
      }

      // 2. Seed Study Sessions
      const sessionsRef = collection(db, 'studySessions');
      const sessionSnap = await getDocs(query(sessionsRef, limit(1)));
      if (sessionSnap.empty) {
        const mockSessions: Partial<StudySession>[] = [
          {
            title: "Pharmacology speed math calculations masterclass",
            dateTime: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days out
            duration: 90,
            topic: "Drug Calculations & Pharmacology",
            hostId: "system_seeder_3",
            hostName: "Rahul Sharma (Clinician)",
            attendees: ["system_seeder_1", "system_seeder_2"],
            isExpertQA: true,
            expertName: "Rahul Sharma (Clinician)",
            createdAt: new Date().toISOString()
          },
          {
            title: "HAAD / DOH Licensure Q&A with Dr. Fatima",
            dateTime: new Date(Date.now() + 86400000 * 4).toISOString(), // 4 days out
            duration: 60,
            topic: "Nursing Code of Ethics & Regulations",
            hostId: "system_seeder_2",
            hostName: "Dr. Fatima (HAAD)",
            attendees: [],
            isExpertQA: true,
            expertName: "Dr. Fatima (HAAD)",
            createdAt: new Date().toISOString()
          }
        ];

        for (const s of mockSessions) {
          const sRef = await addDoc(sessionsRef, { ...s, id: 'temp_placeholder' });
          await updateDoc(sRef, { id: sRef.id });
        }
      }
    } catch (e) {
      console.warn("Pre-seeding error:", e);
    }
  };

  // Listen to Auth State changes
  useEffect(() => {
    // Pick up any pending Google redirect credential after OAuth returns to the app
    getRedirectResult(auth).catch(() => {/* first-load no-op */});

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch or create user profile
        const profileRef = doc(db, 'userProfiles', currentUser.uid);
        try {
          const profileDoc = await getDoc(profileRef);
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as UserProfile);
          } else {
            // New user registration profile initialization
            const defaultProfile: UserProfile = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'Candidate Nurse',
              targetExam: 'DHA',
              examDate: new Date(Date.now() + 86400000 * 90).toISOString(), // 90 days countdown limit
              registeredForExam: false,
              studyHoursGoal: 12,
              completedMilestones: [],
              currentStreak: 1, // Start on Day 1!
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(profileRef, defaultProfile);
            setProfile(defaultProfile);
          }
        } catch (e) {
          console.error("Profile access setup error:", e);
        }
      } else {
        setProfile(null);
      }
      setLoadingAuth(false);
    });

    seedInitialDatabase();

    // Set initial registration reminders inside notification array
    setNotifications([
      {
        id: 'promo_deadline_1',
        text: '🔔 DHA Licensing Alert: Check if MoFA Certificate attestation stamps are fully uploaded before completing Dataflow.',
        date: new Date().toISOString(),
        type: 'deadline'
      },
      {
        id: 'promo_deadline_2',
        text: '🎓 MOHAP Portal Deadline: Submit high-level nursing council good-conduct certificates to clear background check parameters.',
        date: new Date(Date.now() - 3600000).toISOString(),
        type: 'info'
      }
    ]);

    return () => unsubscribe();
  }, []);

  // Listen to global Forum posts
  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }
    const q = query(collection(db, 'forumPosts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: ForumPost[] = [];
      snapshot.forEach((doc) => {
        results.push(doc.data() as ForumPost);
      });
      setPosts(results);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'forumPosts');
    });

    return () => unsubscribe();
  }, [user]);

  // Listen to global study scheduling sessions
  useEffect(() => {
    if (!user) {
       setSessions([]);
       return;
    }
    const q = query(collection(db, 'studySessions'), orderBy('dateTime', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: StudySession[] = [];
      snapshot.forEach((doc) => {
        results.push(doc.data() as StudySession);
      });
      setSessions(results);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'studySessions');
    });

    return () => unsubscribe();
  }, [user]);

  // Listen to historical diagnostic test logs belonging strictly to current user profile
  useEffect(() => {
    if (!user) {
      setTestAttempts([]);
      return;
    }
    const q = query(
      collection(db, 'testAttempts'), 
      where('userId', '==', user.uid), 
      orderBy('completedAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results: TestAttempt[] = [];
      snapshot.forEach((doc) => {
        results.push(doc.data() as TestAttempt);
      });
      setTestAttempts(results);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'testAttempts');
    });

    return () => unsubscribe();
  }, [user]);

  // Handle active sub-comments loader on expand
  const loadPostComments = (postId: string) => {
    if (!user) return;
    const q = query(collection(db, `forumPosts/${postId}/comments`), orderBy('createdAt', 'asc'));
    onSnapshot(q, (snapshot) => {
      const results: ForumComment[] = [];
      snapshot.forEach((doc) => {
         results.push(doc.data() as ForumComment);
      });
      setComments(prev => ({ ...prev, [postId]: results }));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `forumPosts/${postId}/comments`);
    });
  };

  // Write actions matching Firestore Fortress specifications:

  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const profileRef = doc(db, 'userProfiles', user.uid);
    try {
      const payload = {
        ...profile,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      await setDoc(profileRef, payload);
      setProfile(payload as UserProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `userProfiles/${user.uid}`);
    }
  };

  const handleCreatePost = async (title: string, content: string, category: 'Licensing' | 'Study Notes' | 'Exam Tips' | 'Mentorship') => {
    if (!user) return;
    try {
      const newPost: Partial<ForumPost> = {
        title,
        content,
        category,
        authorId: user.uid,
        authorName: user.displayName || 'Candidate Nurse',
        commentsCount: 0,
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'forumPosts'), newPost);
      // Dual-sync id variable according to Fortress specifications
      await updateDoc(docRef, { id: docRef.id });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'forumPosts');
    }
  };

  const handleCreateComment = async (postId: string, content: string) => {
    if (!user) return;
    try {
      const newComment: Partial<ForumComment> = {
        postId,
        content,
        authorId: user.uid,
        authorName: user.displayName || 'Candidate Nurse',
        createdAt: new Date().toISOString()
      };
      const commRef = await addDoc(collection(db, `forumPosts/${postId}/comments`), newComment);
      await updateDoc(commRef, { id: commRef.id });

      // Atomically increment comment counter inside parent post
      const parentPost = posts.find((p) => p.id === postId);
      if (parentPost) {
        const postRef = doc(db, 'forumPosts', postId);
        await updateDoc(postRef, {
          commentsCount: (parentPost.commentsCount || 0) + 1,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `forumPosts/${postId}/comments`);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;
    const postRef = doc(db, 'forumPosts', postId);
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    try {
      const currentLikes = [...post.likes];
      const existIdx = currentLikes.indexOf(user.uid);
      if (existIdx > -1) {
        currentLikes.splice(existIdx, 1);
      } else {
        currentLikes.push(user.uid);
      }
      await updateDoc(postRef, {
        likes: currentLikes,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `forumPosts/${postId}`);
    }
  };

  const handleCreateSession = async (title: string, dateTime: string, duration: number, topic: string, isExpertQA: boolean, expertName?: string) => {
    if (!user) return;
    try {
      const newSession: Partial<StudySession> = {
        title,
        dateTime,
        duration,
        topic,
        hostId: user.uid,
        hostName: user.displayName || 'Candidate Nurse',
        attendees: [],
        isExpertQA,
        expertName,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'studySessions'), newSession);
      await updateDoc(docRef, { id: docRef.id });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'studySessions');
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    if (!user) return;
    const sessionRef = doc(db, 'studySessions', sessionId);
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    try {
      const currentAttendees = [...session.attendees];
      const index = currentAttendees.indexOf(user.uid);
      if (index > -1) {
        currentAttendees.splice(index, 1);
      } else {
        currentAttendees.push(user.uid);
      }
      await updateDoc(sessionRef, { attendees: currentAttendees });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `studySessions/${sessionId}`);
    }
  };

  const handleSaveAttempt = async (examType: ExamType, score: number, correctAnswers: number, totalQuestions: number) => {
    if (!user) return;
    try {
      const attempt: Partial<TestAttempt> = {
        userId: user.uid,
        examType,
        score,
        correctAnswers,
        totalQuestions,
        completedAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'testAttempts'), attempt);
      await updateDoc(docRef, { id: docRef.id });

      // Daily steak calculator logic bounds
      const currentStreak = profile ? profile.currentStreak : 1;
      await handleUpdateProfile({ currentStreak: currentStreak + 1 });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'testAttempts');
    }
  };

  // Connect backend AI Coach endpoint proxy
  const handleAskAICoach = async (prompt: string, context?: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          context,
          examType: profile?.targetExam || 'DHA'
        })
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.error || 'Server calculation failed.');
      }

      const data = await response.json();
      return data.text;
    } catch (e) {
      console.error("AI Coach integration prompt failed:", e);
      throw e;
    }
  };

  // Registration reminders generator
  const triggerMockNotification = () => {
    const list = [
      "⚠️ Prometric Seats Alert: Seat booking rates for June are currently 85% full. Finish DataFlow checks quickly to book your dates!",
      "🔔 MOH Registrations Open: Submit professional registration request via the MOHAP portal immediately to meet background check deadlines.",
      "📜 DOH Abu Dhabi Update: Licensing panel requires an active certificate of Good Standing scanned copy within 6 months post-graduation.",
      "🎓 MoFA Degree Legalization: Be advised that standard foreign degrees require validation from UAE Embassy before primary source evaluation."
    ];
    const pick = list[Math.floor(Math.random() * list.length)];
    const newAlert = {
      id: `alert_${Date.now()}`,
      text: pick,
      date: new Date().toISOString(),
      type: 'deadline'
    };
    setNotifications(prev => [newAlert, ...prev]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter((item) => item.id !== id));
  };

  // Email / password auth state
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'register'>('landing');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error("Google sign-in failed:", e);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      await signInWithEmail(authEmail, authPassword);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setAuthError('Incorrect email or password.');
      } else if (code === 'auth/invalid-email') {
        setAuthError('Please enter a valid email address.');
      } else {
        setAuthError('Sign-in failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    try {
      await registerWithEmail(authEmail, authPassword);
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || '';
      if (code === 'auth/email-already-in-use') {
        setAuthError('An account with this email already exists. Please sign in.');
      } else if (code === 'auth/weak-password') {
        setAuthError('Password must be at least 6 characters.');
      } else {
        setAuthError('Registration failed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 space-y-4 font-sans">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold tracking-wider font-mono text-slate-500 uppercase animate-pulse">Initializing UAE Security Grid...</p>
      </div>
    );
  }

  // Visual background frame container
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        user={user}
        onLogin={handleLogin}
        onLogout={logoutUser}
        notificationCount={notifications.length}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full flex flex-col justify-center">
        {user ? (
          !isUnlocked ? (
            /* Secure Client Access Activation Gate Overlay Screen */
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto space-y-6 bg-gradient-to-b from-[#0a1526] to-[#070e1a] border border-[#1b2b3f] shadow-2xl rounded-3xl self-center my-auto animate-fade-in text-slate-100 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#f5e4b3] to-[#dfba6b]" />
              <CrestLogo className="w-28 h-28 my-2 drop-shadow-[0_0_15px_rgba(223,186,107,0.2)]" />
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-[#dfba6b]/10 text-[#dfba6b] border border-[#dfba6b]/30 px-3 py-1 rounded-full">
                  Academy Gate Locked
                </span>
                <h2 className="text-xl font-black tracking-widest font-sans text-white uppercase mt-2">Activation Key Required</h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-sans">
                  Welcome, <span className="font-bold text-[#dfba6b]">{user.displayName || 'Candidate'}</span>. To unlock practice questions, study guides, interactive test simulators, 1-on-1 consultations, and collaborative channels, please enter your valid access pass.
                </p>
              </div>

              <form onSubmit={handleValidateActivationCode} className="w-full space-y-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">Enter Administrative Registry Code</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Key className="w-4 h-4 text-[#dfba6b]" />
                    </div>
                    <input
                      type="text"
                      required
                      value={activationInput}
                      onChange={(e) => setActivationInput(e.target.value)}
                      placeholder="e.g. UAE-NURSE-2026"
                      className="w-full pl-10 pr-3 py-3 bg-[#0d1b2e] border border-[#1b2b3f] text-white rounded-xl text-xs font-mono placeholder:text-slate-500 focus:border-[#dfba6b] focus:bg-[#122137] focus:outline-none transition-all uppercase tracking-widest text-center"
                    />
                  </div>
                </div>

                {activationError && (
                  <div className="p-3 bg-rose-950/60 border border-rose-900/50 text-rose-200 text-[11px] rounded-xl flex items-start gap-1.5 text-left leading-relaxed">
                    <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{activationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={validatingCode}
                  className="w-full py-3 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-xl text-xs font-black tracking-widest transition-all cursor-pointer shadow-lg shadow-[#dfba6b]/10 flex items-center justify-center gap-1.5 font-mono uppercase"
                >
                  {validatingCode ? 'Validating Registry...' : 'Validate and Unlock Platform'}
                </button>
              </form>

              <div className="border-t border-[#1b2b3f] pt-5 w-full text-center space-y-2.5">
                <p className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#dfba6b]">HOW TO SECURE ACCESS CODE</p>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Platform activation handles are distributed exclusively by app owners. Please request credentials from:
                </p>
                <div className="bg-[#0b1320] p-3 rounded-xl border border-[#1b2b3f] font-mono text-[10.5px] text-slate-350 flex flex-col gap-1.5 select-all">
                  <span>📧 loveline082022@gmail.com</span>
                  <span>📧 uncledez8@gmail.com</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Oversight panel section inside Dashboards view for Admins / Owners */}
              {activeTab === 'dashboard' && isAdmin && (
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 mb-6 border-l-4 border-l-amber-500 animate-fade-in text-slate-900">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 font-sans">
                        <span className="text-lg">👑</span> Owner & Administrator Registry Controls
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Oversight panel for <span className="font-semibold text-slate-750">{user.email}</span>. Configure platform-wide activation gates.
                      </p>
                    </div>
                    <span className="self-start sm:self-center text-[10px] font-mono font-extrabold bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-xs">
                      Platform Master Controls
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Current code view */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-mono text-slate-550 font-bold uppercase tracking-wide">ACTIVE ACTIVATION KEY</p>
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center shadow-inner relative overflow-hidden group">
                        <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Clients input this code to register</p>
                        <p className="text-2xl font-mono font-extrabold text-blue-900 mt-1.5 tracking-widest">{adminCurrentCode || 'LOADING...'}</p>
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
                      </div>
                    </div>

                    {/* Update system code form */}
                    <form onSubmit={handleAdminUpdateCode} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-550 font-bold uppercase tracking-wide block">PROPOSE NEW MASTER KEY</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            value={adminNewCode}
                            onChange={(e) => setAdminNewCode(e.target.value)}
                            placeholder="e.g. VIP-NURSE-2026"
                            className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-850 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none uppercase tracking-widest text-center"
                          />
                          <button
                            type="submit"
                            disabled={adminUpdatingCode}
                            className="py-2.5 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-xl text-xs font-bold font-mono tracking-wider transition-all cursor-pointer uppercase text-center focus:outline-none"
                          >
                            {adminUpdatingCode ? 'Updating...' : 'Publish'}
                          </button>
                        </div>
                      </div>

                      {adminCodeFeedback && (
                        <div className="p-2.5 bg-blue-50 border border-blue-105 text-blue-850 text-[10.5px] rounded-lg tracking-wide leading-relaxed font-sans font-medium">
                          {adminCodeFeedback}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <Dashboard
                  profile={profile}
                  testAttempts={testAttempts}
                  onUpdateProfile={handleUpdateProfile}
                  onTriggerMockNotification={triggerMockNotification}
                  notifications={notifications}
                  onDismissNotification={dismissNotification}
                />
              )}
              {activeTab === 'study' && (
                <Study 
                  onAskAI={handleAskAICoach} 
                />
              )}
              {activeTab === 'tests' && (
                <Tests
                  onSaveAttempt={handleSaveAttempt}
                  userId={user.uid}
                  testAttempts={testAttempts}
                />
              )}
              {activeTab === 'consultation' && (
                <Consultation />
              )}
              {activeTab === 'news' && (
                <NewsFeed />
              )}
              {activeTab === 'jobs' && (
                <Jobs />
              )}
              {activeTab === 'workshops' && (
                <Workshops />
              )}
              {activeTab === 'scholarships' && (
                <Scholarships />
              )}
              {activeTab === 'forum' && (
                <Forum
                  user={user}
                  posts={posts}
                  comments={comments}
                  onAddPost={handleCreatePost}
                  onAddComment={handleCreateComment}
                  onLikePost={handleLikePost}
                  onLoadComments={loadPostComments}
                  onLogin={handleLogin}
                />
              )}
              {activeTab === 'calendar' && (
                <CalendarComp
                  user={user}
                  sessions={sessions}
                  onAddSession={handleCreateSession}
                  onJoinSession={handleJoinSession}
                  onLogin={handleLogin}
                />
              )}
            </>
          )
        ) : (
          <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 sm:p-10 max-w-md mx-auto w-full self-center my-auto">
            <div className="w-full bg-gradient-to-b from-[#0a1526] to-[#070e1a] border border-[#1b2b3f] shadow-2xl rounded-3xl relative overflow-hidden text-slate-100">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#dfba6b] via-[#f5e4b3] to-[#dfba6b]" />

              {/* ── Header (always visible) ── */}
              <div className="flex flex-col items-center pt-8 pb-5 px-8 text-center space-y-3">
                <CrestLogo className="w-24 h-24 drop-shadow-[0_0_20px_rgba(223,186,107,0.25)]" />
                <div>
                  <h2 className="text-xl font-black text-white tracking-widest uppercase font-sans leading-tight">
                    The Centered Nurse<br />
                    <span className="text-[#dfba6b]">Academy</span>
                  </h2>
                  <p className="text-[10px] font-mono font-black text-slate-400 tracking-widest uppercase mt-1">UAE PROFESSIONAL LICENSING STUDY HUB</p>
                </div>
              </div>

              <div className="px-8 pb-8 space-y-4">

                {/* ── Landing buttons ── */}
                {authMode === 'landing' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => { setAuthError(null); setAuthMode('login'); }}
                      className="w-full py-3.5 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-xl text-xs font-black tracking-widest transition-all cursor-pointer font-sans shadow-lg shadow-[#dfba6b]/10 uppercase flex items-center justify-center gap-2"
                    >
                      🔑 Sign In to Your Account
                    </button>
                    <button
                      onClick={() => { setAuthError(null); setAuthMode('register'); }}
                      className="w-full py-3 bg-transparent border border-[#dfba6b]/40 hover:border-[#dfba6b] text-[#dfba6b] rounded-xl text-xs font-black tracking-widest transition-all cursor-pointer font-sans uppercase"
                    >
                      ✨ Create New Account
                    </button>
                  </div>
                )}

                {/* ── Sign In form ── */}
                {authMode === 'login' && (
                  <form onSubmit={handleEmailSignIn} className="space-y-3">
                    <p className="text-[10px] font-mono font-bold text-[#dfba6b] tracking-widest uppercase text-center">Sign In</p>
                    <input
                      type="email" required autoComplete="email"
                      placeholder="Email address"
                      value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d1b2e] border border-[#1b2b3f] text-white rounded-xl text-sm placeholder:text-slate-500 focus:border-[#dfba6b] focus:outline-none transition-all"
                    />
                    <input
                      type="password" required autoComplete="current-password"
                      placeholder="Password"
                      value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d1b2e] border border-[#1b2b3f] text-white rounded-xl text-sm placeholder:text-slate-500 focus:border-[#dfba6b] focus:outline-none transition-all"
                    />
                    {authError && (
                      <p className="text-rose-400 text-[11px] text-center">{authError}</p>
                    )}
                    <button type="submit" disabled={authLoading}
                      className="w-full py-3 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-xl text-xs font-black tracking-widest transition-all cursor-pointer uppercase disabled:opacity-60"
                    >
                      {authLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <button type="button" onClick={() => { setAuthError(null); setAuthMode('landing'); }}
                      className="w-full py-2 text-slate-400 text-[11px] hover:text-slate-200 transition-all"
                    >← Back</button>
                  </form>
                )}

                {/* ── Register form ── */}
                {authMode === 'register' && (
                  <form onSubmit={handleEmailRegister} className="space-y-3">
                    <p className="text-[10px] font-mono font-bold text-[#dfba6b] tracking-widest uppercase text-center">Create Account</p>
                    <input
                      type="email" required autoComplete="email"
                      placeholder="Email address"
                      value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d1b2e] border border-[#1b2b3f] text-white rounded-xl text-sm placeholder:text-slate-500 focus:border-[#dfba6b] focus:outline-none transition-all"
                    />
                    <input
                      type="password" required autoComplete="new-password" minLength={6}
                      placeholder="Password (min 6 characters)"
                      value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0d1b2e] border border-[#1b2b3f] text-white rounded-xl text-sm placeholder:text-slate-500 focus:border-[#dfba6b] focus:outline-none transition-all"
                    />
                    {authError && (
                      <p className="text-rose-400 text-[11px] text-center">{authError}</p>
                    )}
                    <button type="submit" disabled={authLoading}
                      className="w-full py-3 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-xl text-xs font-black tracking-widest transition-all cursor-pointer uppercase disabled:opacity-60"
                    >
                      {authLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <button type="button" onClick={() => { setAuthError(null); setAuthMode('landing'); }}
                      className="w-full py-2 text-slate-400 text-[11px] hover:text-slate-200 transition-all"
                    >← Back</button>
                  </form>
                )}

                <div className="pt-2 border-t border-[#1b2b3f] text-center">
                  <p className="text-[9px] text-[#dfba6b]/60 font-mono uppercase tracking-widest">
                    🔐 Protected by Firestore ABAC Fortress Rules
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
