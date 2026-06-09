/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useTransition, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Award, Calendar, CheckSquare, Square, Zap, Bell, Shield, TrendingUp, AlertCircle, Sparkles, X, ChevronRight, Target, BarChart3, CheckCircle2 } from 'lucide-react';
import { ExamType, UserProfile, TestAttempt } from '../types';

interface DashboardProps {
  profile: UserProfile | null;
  testAttempts: TestAttempt[];
  onUpdateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  onTriggerMockNotification: () => void;
  notifications: { id: string; text: string; date: string; type: string }[];
  onDismissNotification: (id: string) => void;
}

export default function Dashboard({
  profile,
  testAttempts,
  onUpdateProfile,
  onTriggerMockNotification,
  notifications,
  onDismissNotification
}: DashboardProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.displayName || 'Aspiring Nurse');
  const [targetExam, setTargetExam] = useState<ExamType>(profile?.targetExam || 'DHA');
  const [examDate, setExamDate] = useState(profile?.examDate?.split('T')[0] || '2026-10-15');
  const [studyHoursGoal, setStudyHoursGoal] = useState(profile?.studyHoursGoal || 15);
  const [registeredForExam, setRegisteredForExam] = useState(profile?.registeredForExam || false);

  const [notificationPermissionRequested, setNotificationPermissionRequested] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'default' | 'granted' | 'denied'>('default');

  // Clickable stat-card detail modal
  const [detailCard, setDetailCard] = useState<'progress' | 'skills' | 'countdown' | null>(null);
  useEffect(() => {
    if (!detailCard) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDetailCard(null); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [detailCard]);

  const standardMilestones = [
    { id: '1_degree_verify', label: '1. MOH / MoFA Degree Attestation', desc: 'Certifying nursing qualifications from native foreign ministry & UAE consulate.' },
    { id: '2_good_standing', label: '2. Good Standing Certificate (GSC)', desc: 'From your native country licensing council (validity must cover past 6 months).' },
    { id: '3_dataflow', label: '3. DataFlow Primary Source Verification', desc: 'Verifying original school diploma and work background logs on DataFlow registry.' },
    { id: '4_eligibility', label: '4. Health Authority Eligibility Application', desc: 'Submitting files to DHA/MOHAP/DOH online portals to claim review approval.' },
    { id: '5_prometric_book', label: '5. Prometric Exam Sitting Booking', desc: 'Paying fees and booking dates with authorized regional Prometric testing center.' },
    { id: '6_exam_sit', label: '6. Sit UAE Licensing Written Exam', desc: 'Acing the exam MCQ database in person! Critical threshold score is 60%-70% depending on regulator.' }
  ];

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        await onUpdateProfile({
          displayName,
          targetExam,
          examDate: new Date(examDate).toISOString(),
          studyHoursGoal,
          registeredForExam
        });
        setIsEditing(false);
      } catch (err) {
        console.error("Save failure:", err);
      }
    });
  };

  const toggleMilestone = async (id: string) => {
    if (!profile) return;
    const currentList = [...profile.completedMilestones];
    const index = currentList.indexOf(id);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(id);
    }
    await onUpdateProfile({ completedMilestones: currentList });
  };

  const requestNotificationPermission = () => {
    setNotificationPermissionRequested(true);
    // Request mock/browser notification consent
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationStatus(permission);
        if (permission === 'granted') {
          try {
            new window.Notification("Verification Granted", {
              body: "You will receive immediate alerts for DHA/MOH exam deadlines!",
              icon: "https://cdn-icons-png.flaticon.com/512/822/822143.png"
            });
          } catch (e) {
            console.log("Iframe restricted notification delivery.");
          }
        }
      });
    } else {
      setNotificationStatus('granted');
    }
  };

  // Calculations for display
  const completedCount = profile?.completedMilestones?.length || 0;
  const progressPercent = Math.round((completedCount / standardMilestones.length) * 100);
  const averagePracticeScore = testAttempts.length > 0 
    ? Math.round(testAttempts.reduce((acc, curr) => acc + curr.score, 0) / testAttempts.length)
    : null;

  // Custom formatted date countdown helper
  const getDaysRemaining = () => {
    if (!profile?.examDate) return 0;
    const limit = new Date(profile.examDate).getTime();
    const current = new Date().getTime();
    const gap = limit - current;
    return Math.max(0, Math.ceil(gap / (1000 * 60 * 60 * 24)));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      {/* Visual Identity Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1a2e] to-[#07101c] border border-[#1d2f49] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#dfba6b]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dfba6b]/10 text-[#dfba6b] border border-[#dfba6b]/20 rounded-full text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#dfba6b]" />
            THE CENTERED NURSE OFFICIAL UAE SYLLABUS
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-wide leading-tight uppercase">
            The Centered Nurse Prep Grid
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Welcome to the official UAE nurse licensing portal. Track regulatory milestones, activate mock simulators, schedule 1-on-1 coaching, and lock down your DHA / MOHAP / HAAD licensure.
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1d31] border border-[#1b2f48] rounded-xl text-xs font-bold font-mono">
              <Zap className="w-4 h-4 text-[#dfba6b] animate-pulse" />
              <span>Streak: <strong className="text-[#dfba6b] font-extrabold">{profile?.currentStreak || 0} Days</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0f1d31] border border-[#1b2f48] rounded-xl text-xs font-bold font-mono">
              <Calendar className="w-4 h-4 text-slate-350" />
              <span>Exam Sitting: <strong className="text-[#dfba6b] font-extrabold">{(profile?.examDate ? new Date(profile.examDate) : new Date(examDate)).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span>
            </div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 md:flex-none py-3 px-5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md text-nowrap"
          >
            {isEditing ? 'Cancel Plan' : 'Modify Study Plan'}
          </button>
          <button
            onClick={onTriggerMockNotification}
            className="flex-1 md:flex-none py-3 px-5 bg-[#dfba6b] hover:bg-[#ebd095] text-slate-950 rounded-xl text-xs font-black font-mono uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#dfba6b]/10 text-nowrap"
          >
            Trigger Reminder
          </button>
        </div>
      </div>

      {isEditing && (
        <form onSubmit={handleProfileSave} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm text-slate-850">
          <h3 className="font-bold text-sm tracking-wide text-[#dfba6b] font-mono">EDIT TARGET ARCHITECTURE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Candidate Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Regulator Authority</label>
              <select
                value={targetExam}
                onChange={(e) => setTargetExam(e.target.value as ExamType)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-805 focus:outline-none focus:border-blue-500 font-sans"
              >
                <option value="DHA">DHA (Dubai Health Authority)</option>
                <option value="MOH">MOHAP (Ministry of Health & Prevention)</option>
                <option value="HAAD_DOH">HAAD / DOH (Abu Dhabi Health Authority)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Estimated Sitting Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:focus:border-blue-500 font-sans"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Goal (Weekly study hrs)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={studyHoursGoal}
                onChange={(e) => setStudyHoursGoal(Number(e.target.value))}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <input
              type="checkbox"
              id="registeredForExam"
              checked={registeredForExam}
              onChange={(e) => setRegisteredForExam(e.target.checked)}
              className="w-4 h-4 accent-[#dfba6b] rounded border-slate-300"
            />
            <label htmlFor="registeredForExam" className="text-xs text-slate-600 cursor-pointer">
              I have officially completed document checks and booked my Prometric seat!
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-[#0c1a2e] hover:bg-[#152741] text-[#dfba6b] border border-[#dfba6b]/40 disabled:opacity-50 rounded-lg text-xs font-bold uppercase tracking-wider font-mono"
            >
              {isPending ? 'Syncing...' : 'Save Plan Schema'}
            </button>
          </div>
        </form>
      )}

      {/* Bento Stats Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Milestone Circle Progress Panel */}
        <button
          type="button"
          onClick={() => setDetailCard('progress')}
          className="group text-left p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm text-slate-800 hover:border-[#dfba6b] hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-sans font-bold text-sm tracking-tight text-slate-900">Licensing Progression</h3>
              <p className="text-xs text-slate-500">Prerequisites completed towards UAE registration</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#dfba6b] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          <div className="flex items-center justify-center py-2">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#dfba6b"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-900 font-mono">{progressPercent}%</span>
                <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase font-mono">
                  {completedCount}/{standardMilestones.length} Done
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 text-center leading-normal">
            Follow the mandatory 6-step registration flow to practice legally as a Certified Nurse in the UAE.
          </p>
        </button>

        {/* Diagnostic Metrics Trends */}
        <button
          type="button"
          onClick={() => setDetailCard('skills')}
          className="group text-left p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm text-slate-800 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-sans font-bold text-sm tracking-tight text-slate-900">Skills Baseline Evaluation</h3>
              <p className="text-xs text-slate-500">Computed results from diagnostic practice tests</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          <div className="py-2 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Average Practice Accuracy</span>
              <span className={`text-sm font-extrabold font-mono ${averagePracticeScore && averagePracticeScore >= 70 ? 'text-emerald-600' : averagePracticeScore && averagePracticeScore >= 60 ? 'text-amber-500' : 'text-slate-500'}`}>
                {averagePracticeScore !== null ? `${averagePracticeScore}%` : 'N/A'}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${averagePracticeScore && averagePracticeScore >= 70 ? 'bg-emerald-600' : averagePracticeScore && averagePracticeScore >= 60 ? 'bg-amber-500' : 'bg-slate-400'}`}
                style={{ width: `${averagePracticeScore || 0}%` }}
              />
            </div>
            <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1 bg-slate-50 p-2 border border-slate-100 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>DHA & MOH recommend an accuracy target ≥ 70% to guarantee sitting success.</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-100 pt-2">
            <span>Tests Conducted: <strong className="text-slate-700 font-bold">{testAttempts.length}</strong></span>
            <span>Target Hours/wk: <strong className="text-slate-700 font-bold">{profile?.studyHoursGoal || 15}h</strong></span>
          </div>
        </button>

        {/* Schedule Target Countdown widget */}
        <button
          type="button"
          onClick={() => setDetailCard('countdown')}
          className="group text-left p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm text-slate-800 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-sans font-bold text-sm tracking-tight text-slate-900">Exam Countdown Timer</h3>
              <p className="text-xs text-slate-500">Estimated timeline till your prometric session</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
          <div className="flex items-baseline gap-1 py-1">
            <span className="text-5xl font-mono font-extrabold tracking-tight text-slate-800 bg-slate-50 px-3 py-1 rounded-2xl border border-slate-200">{daysRemaining}</span>
            <span className="text-sm text-slate-500 font-bold italic">Days Left</span>
          </div>
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${daysRemaining < 30 ? 'bg-rose-500 animate-ping' : daysRemaining < 90 ? 'bg-amber-400' : 'bg-emerald-500'}`} />
              <span className="text-xs font-semibold text-slate-600">
                {daysRemaining < 30 ? 'CRITICAL PHASE: Initiate Daily Question Drills!' : daysRemaining < 90 ? 'RECOIL PHASE: Deep Revision Completed Guide Chapters' : 'BUILDING PHASE: Systemic Attestations and Syllabus Study'}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-slate-450 border-t border-slate-100 pt-2 font-mono flex justify-between">
            <span>REGISTRATION STATUS:</span>
            <span className={profile?.registeredForExam ? 'text-emerald-600 font-bold' : 'text-amber-500 font-semibold'}>
              {profile?.registeredForExam ? '● SEAT BOOKED' : '○ UNBOOKED'}
            </span>
          </div>
        </button>
      </div>

      {/* Stat-card detail modal */}
      {detailCard && createPortal(
        <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm sm:p-4" onClick={() => setDetailCard(null)}>
          <div className="bg-white w-full sm:max-w-lg sm:rounded-3xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-hidden animate-modal-in" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                {detailCard === 'progress' && <><Target className="w-4 h-4 text-[#dfba6b]" /> Licensing Progression Detail</>}
                {detailCard === 'skills' && <><BarChart3 className="w-4 h-4 text-blue-600" /> Skills Evaluation Detail</>}
                {detailCard === 'countdown' && <><Calendar className="w-4 h-4 text-blue-600" /> Exam Timeline Detail</>}
              </h2>
              <button onClick={() => setDetailCard(null)} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4">
              {/* PROGRESS */}
              {detailCard === 'progress' && (
                <>
                  <div className="flex items-center justify-between bg-[#dfba6b]/10 border border-[#dfba6b]/30 rounded-2xl px-4 py-3">
                    <span className="text-xs font-bold text-[#a37d36]">Overall completion</span>
                    <span className="text-2xl font-extrabold font-mono text-[#a37d36]">{progressPercent}%</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Tap any item to jump to the full Milestone Tracker below and toggle it.</p>
                  <div className="space-y-2">
                    {standardMilestones.map(m => {
                      const done = profile?.completedMilestones?.includes(m.id) || false;
                      return (
                        <div key={m.id} className={`flex gap-3 p-3 rounded-xl border ${done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                          {done ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                          <div>
                            <p className={`text-xs font-bold ${done ? 'text-emerald-800' : 'text-slate-700'}`}>{m.label}</p>
                            <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">{m.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* SKILLS */}
              {detailCard === 'skills' && (
                <>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Avg Accuracy</p>
                      <p className={`text-xl font-extrabold font-mono mt-0.5 ${averagePracticeScore && averagePracticeScore >= 70 ? 'text-emerald-600' : averagePracticeScore && averagePracticeScore >= 60 ? 'text-amber-500' : 'text-slate-500'}`}>
                        {averagePracticeScore !== null ? `${averagePracticeScore}%` : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Tests Taken</p>
                      <p className="text-xl font-extrabold font-mono text-slate-800 mt-0.5">{testAttempts.length}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 bg-blue-50 border border-blue-100 p-3 rounded-xl text-[11px] text-blue-800">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>DHA, MOHAP &amp; DOH recommend an accuracy target ≥ 70% before booking your exam seat.</span>
                  </div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pt-1">Recent Attempts</h4>
                  {testAttempts.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-6">No practice tests yet. Head to the Practice Tests tab to begin.</p>
                  ) : (
                    <div className="space-y-2">
                      {testAttempts.slice(0, 8).map(a => (
                        <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{a.examType} Exam</p>
                            <p className="text-[10px] text-slate-400 font-mono">{new Date(a.completedAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })} · {a.correctAnswers}/{a.totalQuestions} correct</p>
                          </div>
                          <span className={`text-sm font-extrabold font-mono ${a.score >= 70 ? 'text-emerald-600' : a.score >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>{a.score}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* COUNTDOWN */}
              {detailCard === 'countdown' && (
                <>
                  <div className="flex items-baseline gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                    <span className="text-3xl font-extrabold font-mono text-slate-800">{daysRemaining}</span>
                    <span className="text-sm text-slate-500 font-bold">days until your exam sitting</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Target date: <strong className="text-slate-700">{(profile?.examDate ? new Date(profile.examDate) : new Date(examDate)).toLocaleDateString('en-AE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                  </p>
                  <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider pt-1">Your Phase</h4>
                  <div className="space-y-2">
                    {[
                      { range: '90+ days', label: 'Building Phase', desc: 'Systematic attestations, DataFlow, and full syllabus study.', active: daysRemaining >= 90, color: 'emerald' },
                      { range: '30–89 days', label: 'Revision Phase', desc: 'Deep revision of completed guide chapters and weak areas.', active: daysRemaining >= 30 && daysRemaining < 90, color: 'amber' },
                      { range: '< 30 days', label: 'Critical Phase', desc: 'Daily MCQ drills, timed mocks, and final exam readiness.', active: daysRemaining < 30, color: 'rose' },
                    ].map((p, i) => (
                      <div key={i} className={`flex gap-3 p-3 rounded-xl border ${p.active ? (p.color === 'emerald' ? 'bg-emerald-50 border-emerald-300' : p.color === 'amber' ? 'bg-amber-50 border-amber-300' : 'bg-rose-50 border-rose-300') : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                        <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-1 ${p.active ? (p.color === 'emerald' ? 'bg-emerald-500 animate-pulse' : p.color === 'amber' ? 'bg-amber-400 animate-pulse' : 'bg-rose-500 animate-ping') : 'bg-slate-300'}`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-slate-800">{p.label}</p>
                            <span className="text-[9px] font-mono text-slate-400">{p.range}</span>
                            {p.active && <span className="text-[8px] font-mono font-extrabold uppercase bg-slate-900 text-white px-1.5 py-0.5 rounded">You are here</span>}
                          </div>
                          <p className="text-[10.5px] text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono border-t border-slate-100 pt-3">
                    <span className="text-slate-400">Registration status:</span>
                    <span className={profile?.registeredForExam ? 'text-emerald-600 font-bold' : 'text-amber-500 font-semibold'}>
                      {profile?.registeredForExam ? '● SEAT BOOKED' : '○ NOT BOOKED YET'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="shrink-0 border-t border-slate-100 px-5 py-3 bg-slate-50/60">
              <button onClick={() => setDetailCard(null)} className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Push alerting simulation center & Deadlines Desk */}
      {notifications.length > 0 && (
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600 animate-swing" />
              <h4 className="text-xs font-bold font-mono tracking-wider text-amber-900 uppercase">IN-APP ALERTS & REGISTRATION DEADLINES</h4>
            </div>
            <span className="text-[9px] font-mono text-amber-600 uppercase bg-amber-100 px-2 py-0.5 rounded">Action Requested</span>
          </div>
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start justify-between bg-white p-3 rounded-xl border border-slate-205 text-xs gap-4 shadow-sm text-slate-800">
                <div>
                  <p className="text-slate-800 leading-normal">{notif.text}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{new Date(notif.date).toLocaleDateString('en-AE', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <button
                  onClick={() => onDismissNotification(notif.id)}
                  className="py-1 px-2.5 hover:bg-slate-50 rounded-lg border border-slate-200 text-[10px] font-medium text-slate-650 pointer"
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real Privacy Alert and Notification Access Control */}
      {!notificationPermissionRequested && (
        <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex gap-2.5">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 self-start sm:self-auto shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Private Study Lock / Encrypted Local Storage</h4>
              <p className="text-[11px] text-slate-500">All practice exam histories are protected under Firestore rules, kept fully isolated and verified with authorized tokens.</p>
            </div>
          </div>
          <button
            onClick={requestNotificationPermission}
            className="w-full sm:w-auto py-2 px-4 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer text-nowrap"
          >
            <Bell className="w-3.5 h-3.5" />
            Enable Notification Alerts
          </button>
        </div>
      )}

      {/* Licensing Milestones Interactivity Checklist */}
      <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-800">
        <div className="mb-4">
          <h3 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#dfba6b]" />
            UAE Licensing Board Milestone Tracker
          </h3>
          <p className="text-xs text-slate-550">Click each task to log completion. Progress calculates dynamically in your study dashboard.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {standardMilestones.map((milestone) => {
            const isCompleted = profile?.completedMilestones?.includes(milestone.id) || false;
            return (
              <button
                key={milestone.id}
                onClick={() => toggleMilestone(milestone.id)}
                className={`
                  p-4 rounded-xl border text-left flex gap-3 transition-all cursor-pointer
                  ${isCompleted 
                    ? 'bg-[#dfba6b]/10 border-[#dfba6b]/40 hover:bg-[#dfba6b]/15' 
                    : 'bg-white border-slate-200 hover:bg-slate-50'}
                `}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckSquare className="w-5 h-5 text-[#dfba6b]" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold leading-snug ${isCompleted ? 'text-[#a37d36] font-extrabold' : 'text-slate-800'}`}>
                    {milestone.label}
                  </h4>
                  <p className="text-[10.5px] text-slate-500 leading-relaxed mt-1">{milestone.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Misleading-Claims policy: independent-app disclaimer */}
      <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3.5 text-[11px] leading-relaxed text-amber-900">
        <p className="font-bold uppercase tracking-wider text-[10px] text-amber-700 mb-1.5">⚠ Independent App — Not Government Affiliated</p>
        <p>
          The Centered Nurse Academy is an independent study and exam-preparation app. It is <strong>not affiliated with, endorsed by, sponsored by, or authorized by</strong> the Dubai Health Authority (DHA), the Department of Health Abu Dhabi (DOH / HAAD), the Ministry of Health &amp; Prevention (MOHAP), Emirates Health Services (EHS), DataFlow, Prometric, Pearson VUE, the WHO, or any government, regulator, or examination body.
        </p>
        <p className="mt-1.5">
          For any official licensing, registration, application, payment or scheduling step, use the official portals:&nbsp;
          <a href="https://www.dha.gov.ae/en" target="_blank" rel="noopener noreferrer" className="underline font-bold">dha.gov.ae/en</a> ·&nbsp;
          <a href="https://www.doh.gov.ae/en" target="_blank" rel="noopener noreferrer" className="underline font-bold">doh.gov.ae/en</a> ·&nbsp;
          <a href="https://mohap.gov.ae/en/home" target="_blank" rel="noopener noreferrer" className="underline font-bold">mohap.gov.ae/en</a>
        </p>
      </div>
    </div>
  );
}
