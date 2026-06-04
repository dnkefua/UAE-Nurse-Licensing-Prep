/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, Plus, Clock, Video, UserCheck, X, Link2, Copy,
  CheckCircle2, ExternalLink, PhoneOff, Loader2, CalendarDays
} from 'lucide-react';
import { StudySession } from '../types';

// Deterministic in-app video room derived from the session id (both attendees
// joining the same session land in the same Jitsi room — no schema change needed)
function getSessionRoom(session: StudySession): string {
  const slug = session.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 18);
  return `UAEStudy-${slug}`;
}
function getSessionLink(session: StudySession): string {
  return `https://meet.jit.si/${getSessionRoom(session)}`;
}

function formatSessionDateTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 'Date TBC';
  return d.toLocaleString('en-AE', {
    weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit'
  });
}

interface CalendarProps {
  user: any;
  sessions: StudySession[];
  onAddSession: (title: string, dateTime: string, duration: number, topic: string, isExpertQA: boolean, expertName?: string) => Promise<void>;
  onJoinSession: (sessionId: string) => Promise<void>;
  onLogin: () => void;
}

// ── Session detail + in-app video room modal ───────────────────────────────────
interface SessionModalProps {
  session: StudySession;
  user: any;
  isAttending: boolean;
  onJoinToggle: () => void;
  onClose: () => void;
  onLogin: () => void;
}

function SessionModal({ session, user, isAttending, onJoinToggle, onClose, onLogin }: SessionModalProps) {
  const [inCall, setInCall] = useState(false);
  const [callLoading, setCallLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (inCall) setInCall(false); else onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose, inCall]);

  const copyLink = () => {
    navigator.clipboard.writeText(getSessionLink(session)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const startCall = () => {
    if (!user) { onLogin(); return; }
    if (!isAttending) onJoinToggle(); // auto-join attendance when entering the room
    setCallLoading(true);
    setInCall(true);
  };

  const jitsiSrc =
    `${getSessionLink(session)}#config.prejoinPageEnabled=false&config.disableDeepLinking=true` +
    `&userInfo.displayName=%22${encodeURIComponent(user?.displayName || 'Nurse Candidate')}%22`;

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm sm:p-4" onClick={onClose}>
      <div className={`bg-white w-full ${inCall ? 'sm:max-w-4xl' : 'sm:max-w-lg'} sm:rounded-3xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[92vh] overflow-hidden animate-modal-in`} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
              session.isExpertQA ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {session.isExpertQA ? '⭐ Expert Q&A' : '👥 Peer Study'}
            </span>
            <h2 className="text-sm font-extrabold text-slate-900 truncate">{session.title}</h2>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {inCall ? (
          /* ── In-app video room ── */
          <div className="flex flex-col flex-1">
            <div className="relative flex-1 min-h-[380px] bg-slate-950">
              {callLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950 text-slate-300">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <p className="text-xs font-mono">Connecting to study room…</p>
                  <p className="text-[10px] text-slate-500">Allow camera &amp; microphone when prompted</p>
                </div>
              )}
              <iframe
                src={jitsiSrc}
                title="In-app study video room"
                onLoad={() => setCallLoading(false)}
                allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write"
                className="w-full h-full border-0"
              />
            </div>
            <div className="shrink-0 px-5 py-3 flex items-center justify-between gap-3 bg-slate-50 border-t border-slate-100">
              <button onClick={() => setInCall(false)} className="text-xs font-mono text-slate-500 hover:text-slate-700 cursor-pointer">← Back to details</button>
              <button onClick={onClose} className="py-2 px-5 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-extrabold text-white cursor-pointer flex items-center gap-1.5 transition-all">
                <PhoneOff className="w-3.5 h-3.5" /> Leave Room
              </button>
            </div>
          </div>
        ) : (
          /* ── Detail view ── */
          <>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4">
              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1"><CalendarDays className="w-3 h-3" /> When</p>
                  <p className="text-[12px] font-bold text-slate-800 mt-0.5">{formatSessionDateTime(session.dateTime)}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</p>
                  <p className="text-[12px] font-bold text-slate-800 mt-0.5">{session.duration} minutes</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Subject</p>
                  <p className="text-[12px] font-bold text-slate-800 mt-0.5">{session.topic}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1"><Users className="w-3 h-3" /> Attending</p>
                  <p className="text-[12px] font-bold text-slate-800 mt-0.5">{session.attendees.length} {session.attendees.length === 1 ? 'nurse' : 'nurses'}</p>
                </div>
              </div>

              {session.isExpertQA && session.expertName && (
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 p-3 rounded-xl text-xs">
                  <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-slate-600">Led by <strong className="text-blue-800 font-bold">{session.expertName}</strong> · Senior Coach</span>
                </div>
              )}

              <p className="text-xs text-slate-500">
                Hosted by <strong className="text-slate-700">{session.hostName}</strong>. Join the live video room below — it runs inside the app. Share the link to invite a study buddy.
              </p>

              {/* Meeting link */}
              <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2">
                <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-[10px] font-mono text-slate-600 truncate flex-1">{getSessionLink(session)}</span>
                <button onClick={copyLink} className={`shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${copied ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                  {copied ? <><CheckCircle2 className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 border-t border-slate-100 px-5 py-3 flex items-center gap-2 bg-slate-50/60">
              <button
                onClick={() => { if (!user) { onLogin(); return; } onJoinToggle(); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isAttending
                    ? 'bg-white border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isAttending ? 'Leave Slot' : 'Reserve Slot'}
              </button>
              <button
                onClick={startCall}
                className="flex-[2] py-2.5 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                <Video className="w-4 h-4" /> Join Live Video Room
              </button>
              <a
                href={getSessionLink(session)} target="_blank" rel="noopener noreferrer"
                className="shrink-0 py-2.5 px-3 rounded-xl text-[10px] font-bold font-mono text-slate-500 bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center gap-1"
                title="Open in browser"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CalendarComp({
  user,
  sessions,
  onAddSession,
  onJoinSession,
  onLogin
}: CalendarProps) {
  const [detailSession, setDetailSession] = useState<StudySession | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('Fundamentals of Nursing');
  const [newDate, setNewDate] = useState('2026-06-12');
  const [newTime, setNewTime] = useState('18:00');
  const [newDuration, setNewDuration] = useState(60);
  const [newIsExpert, setNewIsExpert] = useState(false);
  const [newExpertName, setNewExpertName] = useState('');

  const [filterExpert, setFilterExpert] = useState<boolean | null>(null); // null = all, true = expert, false = peer

  const studyTopics = [
    'Nursing Code of Ethics & Regulations',
    'Cardiac Shock Protocols & Fluids',
    'Postpartum Hemorrhage & Maternity Care',
    'Drug Calculations & Pharmacology',
    'Triage priority & Delegation'
  ];

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const combinedDateTime = new Date(`${newDate}T${newTime}:00`).toISOString();
      await onAddSession(
        newTitle,
        combinedDateTime,
        newDuration,
        newTopic,
        newIsExpert,
        newIsExpert ? newExpertName : undefined
      );
      setNewTitle('');
      setIsScheduling(false);
    } catch (e) {
      console.error("Create session failure:", e);
    }
  };

  const filteredSessions = filterExpert === null
    ? sessions
    : sessions.filter(s => s.isExpertQA === filterExpert);

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {detailSession && (
        <SessionModal
          session={detailSession}
          user={user}
          isAttending={!!(user && detailSession.attendees.includes(user.uid))}
          onJoinToggle={() => onJoinSession(detailSession.id)}
          onClose={() => setDetailSession(null)}
          onLogin={onLogin}
        />
      )}

      {/* Upper Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-1.5">
            <Calendar className="w-5.5 h-5.5 text-blue-600" />
            Live Q&As & Peer Study Calendar
          </h2>
          <p className="text-xs text-slate-550 font-sans">Schedule collaborative group study slots or book seats for Expert Q&A panels</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              if (!user) {
                onLogin();
                return;
              }
              setIsScheduling(!isScheduling);
            }}
            className="flex-1 sm:flex-none py-2 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/10 text-nowrap"
          >
            <Plus className="w-4 h-4" /> Book Session
          </button>
        </div>
      </div>

      {isScheduling && (
        <form onSubmit={handleCreateSession} className="p-6 bg-white border border-slate-205 rounded-2xl space-y-4 shadow-sm text-slate-800 animate-slide-in">
          <h3 className="font-bold text-xs font-mono tracking-wider text-blue-600 uppercase mb-2">CONFIGURE SESSION PARAMETERS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Session Label</label>
              <input
                type="text"
                placeholder="e.g. MCQ calculation drill, HAAD audit checklist..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Syllabus Subject Area</label>
              <select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-805 focus:outline-none focus:border-blue-500"
              >
                {studyTopics.map((item, id) => (
                  <option key={id} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Session Duration (minutes)</label>
              <select
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-805 focus:outline-none focus:border-blue-500 font-sans"
              >
                <option value={30}>30 Minutes</option>
                <option value={60}>1 Hour Session</option>
                <option value={90}>1.5 Hours Drill</option>
                <option value={120}>2 Hours Marathon</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Target Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-805 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase font-mono tracking-wider">Start Time (GST/Dubai Time)</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
                className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-805 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                <input
                  type="checkbox"
                  id="isExpert"
                  checked={newIsExpert}
                  onChange={(e) => setNewIsExpert(e.target.checked)}
                  className="w-4 h-4 text-blue-650 bg-white border-slate-300 rounded accent-blue-650 shrink-0 cursor-pointer"
                />
                <label htmlFor="isExpert" className="text-slate-700 font-medium cursor-pointer">This is an Expert-led Q&A</label>
              </div>
            </div>
          </div>

          {newIsExpert && (
            <div className="max-w-xs transition-all">
              <label className="block text-[10px] font-bold text-slate-450 mb-1 uppercase font-mono tracking-wider">Invited Expert / Mentor Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. Fatima or Senior Nurse Rahul"
                value={newExpertName}
                onChange={(e) => setNewExpertName(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-sky-500 placeholder:text-slate-600"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsScheduling(false)}
              className="py-1.5 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-350 text-xs rounded-lg"
            >
              Cancel
            </button>
            <button
               type="submit"
               className="py-1.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold"
            >
              Book Study Block
            </button>
          </div>
        </form>
      )}

      {/* Filter Sibling */}
      <div className="flex gap-2.5 border-b border-slate-205 pb-3">
        <button
          onClick={() => setFilterExpert(null)}
          className={`py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${filterExpert === null ? 'bg-blue-650 text-white shadow shadow-blue-500/10' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          All Sessions ({sessions.length})
        </button>
        <button
          onClick={() => setFilterExpert(true)}
          className={`py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${filterExpert === true ? 'bg-blue-650 text-white shadow shadow-blue-500/10' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
        >
          ⭐ Expert Live Q&As ({sessions.filter(s => s.isExpertQA).length})
        </button>
        <button
          onClick={() => setFilterExpert(false)}
          className={`py-1 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-all ${filterExpert === false ? 'bg-blue-650 text-white shadow shadow-blue-500/10' : 'bg-white border border-slate-200 text-slate-505 hover:bg-slate-50'}`}
        >
          👥 Peer Circles ({sessions.filter(s => !s.isExpertQA).length})
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((session) => {
          const isUserAttending = user && session.attendees.includes(user.uid);
          return (
            <div
              key={session.id}
              onClick={() => setDetailSession(session)}
              className={`
                group p-6 rounded-2xl border flex flex-col justify-between space-y-4 shadow-sm transition-all cursor-pointer
                ${session.isExpertQA
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400 hover:shadow-md'
                  : 'bg-white border-slate-205 hover:border-blue-300 hover:shadow-md'}
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className={`
                    text-[9px] font-mono font-bold px-2 py-0.5 rounded
                    ${session.isExpertQA
                      ? 'bg-amber-100 text-amber-850'
                      : 'bg-slate-100 text-slate-605'}
                  `}>
                    {session.isExpertQA ? '⭐ LIVE EXPERT Q&A' : '👥 PEER STUDY ROOM'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{session.duration} mins</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-800 mt-2.5 font-sans leading-tight group-hover:text-blue-700 transition-colors">
                  {session.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-1">{session.topic}</p>

                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 font-mono">
                  <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatSessionDateTime(session.dateTime)} (GST)</span>
                </div>

                {session.isExpertQA && session.expertName && (
                  <div className="flex items-center gap-1.5 mt-3 bg-blue-50 border border-blue-100 p-2 rounded-lg text-[11px]">
                    <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-slate-600">Expert: <strong className="text-blue-750 font-bold">{session.expertName}</strong> (Senior Coach)</span>
                  </div>
                )}
              </div>

              {/* Lower Section with Join buttons */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-505">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-500">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{session.attendees.length} attending</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!user) { onLogin(); return; }
                      onJoinSession(session.id);
                    }}
                    className={`
                      py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border
                      ${isUserAttending
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}
                    `}
                  >
                    {isUserAttending ? 'Leave' : 'Reserve'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDetailSession(session); }}
                    className="py-1.5 px-3 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Video className="w-3.5 h-3.5" /> Join
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredSessions.length === 0 && (
          <div className="col-span-full text-center py-12 bg-slate-50 border border-slate-205 rounded-2xl">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No scheduled study session structures exist in this tab.</p>
            <p className="text-[10px] text-slate-400 mt-1">Book an expert session or peer-to-peer circle to start collaborating!</p>
          </div>
        )}
      </div>
    </div>
  );
}
