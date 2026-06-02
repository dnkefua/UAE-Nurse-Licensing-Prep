/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Plus, Clock, Video, UserCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { StudySession } from '../types';

interface CalendarProps {
  user: any;
  sessions: StudySession[];
  onAddSession: (title: string, dateTime: string, duration: number, topic: string, isExpertQA: boolean, expertName?: string) => Promise<void>;
  onJoinSession: (sessionId: string) => Promise<void>;
  onLogin: () => void;
}

export default function CalendarComp({
  user,
  sessions,
  onAddSession,
  onJoinSession,
  onLogin
}: CalendarProps) {
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
              className={`
                p-6 rounded-2xl border flex flex-col justify-between space-y-4 shadow-xs transition-all
                ${session.isExpertQA 
                  ? 'bg-amber-50/50 border-amber-200 hover:border-amber-350 hover:shadow-xs' 
                  : 'bg-white border-slate-205 hover:border-blue-300 hover:shadow-xs'}
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

                <h3 className="font-bold text-sm text-slate-800 mt-2.5 font-sans leading-tight">
                  {session.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-1">{session.topic}</p>

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

                <button
                  onClick={() => {
                    if (!user) {
                      onLogin();
                      return;
                    }
                    onJoinSession(session.id);
                  }}
                  className={`
                    py-1.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer
                    ${isUserAttending 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-rose-50 hover:text-rose-705' 
                      : 'bg-blue-650 hover:bg-blue-600 text-white'}
                  `}
                >
                  {isUserAttending ? 'Leave Slot' : 'Join Session'}
                </button>
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
