/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Video, PhoneOff, Calendar, Clock, MessageSquare, Send, BookOpen,
  Sparkles, CheckCircle2, Link2, Copy, ExternalLink, Users, Loader2
} from 'lucide-react';

interface Booking {
  id: string;
  educator: string;
  role: string;
  avatar: string;
  date: string;
  time: string;
  topic: string;
  status: 'scheduled' | 'live' | 'completed';
  meetingCode: string;
}

// Generate a unique, readable room code
function genMeetingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `UAENurse-${code}`;
}

function getMeetingLink(code: string): string {
  return `https://meet.jit.si/${code}`;
}

export default function Consultation() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'book-1',
      educator: 'Nurse Jameela Al-Mansoori',
      role: 'Senior Licensing Educator (DHA expert)',
      avatar: '👩‍⚕️',
      date: new Date().toLocaleDateString('en-AE'),
      time: '14:00 - 14:45 (GST)',
      topic: 'High-Alert Dosage Math & Priority Delegation Clinic',
      status: 'live',
      meetingCode: genMeetingCode()
    },
    {
      id: 'book-2',
      educator: 'Dr. Fatima Al-Hashemi',
      role: 'Director of Clinical Nursing Studies',
      avatar: '🩺',
      date: new Date(Date.now() + 86400000).toLocaleDateString('en-AE'),
      time: '11:00 - 11:45 (GST)',
      topic: 'Obstetric Emergencies, Placental abruption, and Fetal Heart monitoring',
      status: 'scheduled',
      meetingCode: genMeetingCode()
    }
  ]);

  const [activeCallBooking, setActiveCallBooking] = useState<Booking | null>(null);
  const [callLoading, setCallLoading] = useState(false);

  // ── Copy-link toast ───────────────────────────────────────────────────────
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copyLink = (booking: Booking) => {
    navigator.clipboard.writeText(getMeetingLink(booking.meetingCode)).then(() => {
      setCopiedId(booking.id);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  // ── Booking form ──────────────────────────────────────────────────────────
  const [newEducator, setNewEducator] = useState('Nurse Jameela Al-Mansoori');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('09:00 - 09:45 (GST)');
  const [newTopic, setNewTopic] = useState('');
  const [showSuccessBooking, setShowSuccessBooking] = useState(false);
  const [newBookingLink, setNewBookingLink] = useState<string | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTopic) return;

    const educatorRole = newEducator === 'Nurse Jameela Al-Mansoori'
      ? 'Senior Licensing Educator (DHA expert)'
      : 'Director of Clinical Nursing Studies';
    const educatorAvatar = newEducator === 'Nurse Jameela Al-Mansoori' ? '👩‍⚕️' : '🩺';
    const meetingCode = genMeetingCode();

    const newAppointment: Booking = {
      id: `book-${Date.now()}`,
      educator: newEducator,
      role: educatorRole,
      avatar: educatorAvatar,
      date: new Date(newDate).toLocaleDateString('en-AE'),
      time: newTime,
      topic: newTopic,
      status: 'scheduled',
      meetingCode
    };

    setBookings(prev => [...prev, newAppointment]);
    setNewBookingLink(getMeetingLink(meetingCode));
    setNewTopic('');
    setNewDate('');
    setShowSuccessBooking(true);
    setTimeout(() => {
      setShowSuccessBooking(false);
      setNewBookingLink(null);
    }, 12000);
  };

  // ── Chat ──────────────────────────────────────────────────────────────────
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'educator'; text: string; time: string }>>([
    { sender: 'educator', text: 'Welcome to your 1-on-1 licensing prep clinic! Today we focus on complex high-yield cases. How can I help you?', time: '14:01' },
    { sender: 'user', text: 'Thank you! Dosage calculations under pressure confuse me. Can you explain microdrip factor?', time: '14:02' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    const now = new Date();
    const t = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: t }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Understood. The critical factor is matching the patient category (pediatric vs adult). Any specific licensing question?";
      const lower = userMsg.toLowerCase();
      if (lower.includes('drip') || lower.includes('calculation') || lower.includes('math')) {
        reply = "For drip rate: if the question states 'microdrip', the drop factor is always 60. Double check whether it asks mL/hr or gtt/min.";
      } else if (lower.includes('burn') || lower.includes('parkland')) {
        reply = "Parkland formula: 4 mL × Weight(kg) × % TBSA burn. Give 50% in the first 8 hours, the rest over the next 16 hours.";
      } else if (lower.includes('cushing') || lower.includes('icp')) {
        reply = "Cushing's Triad (brain herniation): 1. Widening pulse pressure, 2. Bradycardia, 3. Irregular respirations (Cheyne-Stokes).";
      }
      setChatMessages(prev => [...prev, { sender: 'educator', text: reply, time: t }]);
    }, 1500);
  };

  // ── Whiteboard ─────────────────────────────────────────────────────────────
  const [whiteboardNotes, setWhiteboardNotes] = useState(
    "CLINICAL INSIGHTS:\n" +
    "==================================\n" +
    "● Microdrip factor: ALWAYS 60 gtt/mL\n" +
    "● Macrodrip: 10, 15, or 20 gtt/mL\n" +
    "● Rate (gtt/min) = (Vol mL × Drop Factor) ÷ Time(min)\n\n" +
    "CUSHING'S TRIAD (↑ICP):\n" +
    "  1. Bradycardia\n" +
    "  2. Wide-pulse hypertension\n" +
    "  3. Irregular respirations\n\n" +
    "● MgSO₄ toxicity antidote → CALCIUM GLUCONATE"
  );

  // ── Enter / leave call ──────────────────────────────────────────────────────
  const enterCall = (b: Booking) => {
    setCallLoading(true);
    setActiveCallBooking(b);
  };

  // Build the in-app Jitsi embed URL (skips the prejoin page, sets a display name)
  const jitsiSrc = activeCallBooking
    ? `${getMeetingLink(activeCallBooking.meetingCode)}#config.prejoinPageEnabled=false&config.disableDeepLinking=true&userInfo.displayName=%22Centered%20Nurse%20Academy%22`
    : '';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in text-slate-900 pb-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
            <Video className="w-5 h-5 text-rose-600 animate-pulse" />
            1-on-1 Video Consultation &amp; Mentorship
          </h2>
          <p className="text-xs text-slate-500">
            Live video calls run inside the app. Generate a meeting link, share it with your student, and they join instantly — no account or download.
          </p>
        </div>
        {activeCallBooking && (
          <button
            onClick={() => setActiveCallBooking(null)}
            className="py-1.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold font-mono tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow"
          >
            <PhoneOff className="w-3.5 h-3.5" /> End Session
          </button>
        )}
      </div>

      {!activeCallBooking ? (
        /* ═══════════════════ LOBBY ═══════════════════ */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Bookings list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold font-mono tracking-wider text-slate-800 uppercase flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Active Consultation Registries
              </h3>

              {bookings.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No upcoming sessions.</div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(item => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.status === 'live'
                          ? 'bg-rose-50/50 border-rose-200 shadow-sm'
                          : 'bg-slate-50/40 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-xl shrink-0">
                            {item.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-xs text-slate-800">{item.educator}</h4>
                              {item.status === 'live' && (
                                <span className="text-[9px] font-mono font-extrabold text-rose-600 px-1.5 py-0.5 bg-rose-100 rounded animate-pulse">
                                  ● LIVE NOW
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono italic">{item.role}</p>
                            <div className="flex flex-col md:flex-row md:items-center gap-x-4 gap-y-0.5 mt-1 text-[11px] text-slate-600">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.time}</span>
                            </div>
                            <p className="mt-1.5 text-[11.5px] font-medium text-slate-700 bg-white/80 px-2 py-1.5 rounded border border-slate-200">
                              <span className="text-slate-500 font-sans">Focus: </span>
                              <span className="font-semibold text-blue-900">{item.topic}</span>
                            </p>

                            {/* Meeting link row */}
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-600 truncate max-w-[200px]">
                                <Link2 className="w-3 h-3 text-blue-500 shrink-0" />
                                <span className="truncate">{getMeetingLink(item.meetingCode)}</span>
                              </div>
                              <button
                                onClick={() => copyLink(item)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                                  copiedId === item.id
                                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                                    : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
                                }`}
                              >
                                {copiedId === item.id
                                  ? <><CheckCircle2 className="w-3 h-3" /> Copied!</>
                                  : <><Copy className="w-3 h-3" /> Copy Link</>}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right actions */}
                        <div className="flex sm:flex-col items-stretch justify-end gap-2 shrink-0">
                          <button
                            onClick={() => enterCall(item)}
                            className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md text-center text-white ${
                              item.status === 'live'
                                ? 'bg-rose-600 hover:bg-rose-700 animate-bounce'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                          >
                            Join Video Call
                          </button>
                          <button
                            onClick={() => setBookings(prev => prev.filter(b => b.id !== item.id))}
                            className="text-[10px] text-center font-mono font-semibold text-slate-400 hover:text-rose-600 cursor-pointer py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4 text-xs leading-relaxed text-slate-700">
              <Users className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800">How the video room works</h4>
                <p className="text-[11px] text-slate-600">
                  Tap <strong>Join Video Call</strong> to open the live HD room right inside this app — your camera and microphone work directly here.
                  Share the meeting link with your student via WhatsApp, email, or any messenger; they tap it and join instantly in their browser.
                </p>
                <p className="text-[10px] font-mono text-blue-600 font-semibold pt-1">
                  💡 Admin access: loveline082022@gmail.com / uncledez8@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Booking form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Schedule Live Review
            </h3>

            {showSuccessBooking && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] space-y-2 animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Session created! Share this meeting link with your student:</span>
                </div>
                {newBookingLink && (
                  <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-lg px-2.5 py-2">
                    <span className="text-[10px] font-mono text-slate-700 flex-1 break-all">{newBookingLink}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(newBookingLink)}
                      className="shrink-0 p-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-700 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10.5px] font-mono text-slate-500 font-bold uppercase block">Specialist Instructor</label>
                <select
                  value={newEducator}
                  onChange={e => setNewEducator(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:border-blue-400 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="Nurse Jameela Al-Mansoori">Nurse Jameela Al-Mansoori (DHA/MOH Expert)</option>
                  <option value="Dr. Fatima Al-Hashemi">Dr. Fatima Al-Hashemi (HAAD/DOH Clinical Prof.)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] font-mono text-slate-500 font-bold uppercase block">Session Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:border-blue-400 focus:bg-white focus:outline-none cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] font-mono text-slate-500 font-bold uppercase block">Time Slot (GST)</label>
                <select
                  value={newTime}
                  onChange={e => setNewTime(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:border-blue-400 focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option>09:00 - 09:45 (GST)</option>
                  <option>11:00 - 11:45 (GST)</option>
                  <option>14:00 - 14:45 (GST)</option>
                  <option>16:00 - 16:45 (GST)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10.5px] font-mono text-slate-500 font-bold uppercase block">Topic / Request</label>
                <textarea
                  required
                  rows={3}
                  value={newTopic}
                  onChange={e => setNewTopic(e.target.value)}
                  placeholder="e.g. Parkland formula, pediatric medication dosages..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-blue-500/10 uppercase tracking-wider font-mono"
              >
                Create Session &amp; Generate Link
              </button>
            </form>
          </div>

        </div>
      ) : (
        /* ═══════════════════ CALL ROOM (in-app Jitsi) ═══════════════════ */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[560px]">

          {/* Video area (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-3">

            {/* Meeting link banner */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-sm flex-wrap">
              <Link2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-[10px] font-mono text-slate-400">Student link:</span>
              <span className="text-[10px] font-mono text-blue-700 font-bold truncate max-w-[180px]">
                {getMeetingLink(activeCallBooking.meetingCode)}
              </span>
              <button
                onClick={() => copyLink(activeCallBooking)}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ml-auto ${
                  copiedId === activeCallBooking.id
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                    : 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {copiedId === activeCallBooking.id
                  ? <><CheckCircle2 className="w-3 h-3" /> Copied!</>
                  : <><Copy className="w-3 h-3" /> Copy &amp; Send</>}
              </button>
              <a
                href={getMeetingLink(activeCallBooking.meetingCode)}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-bold font-mono transition-all"
              >
                <ExternalLink className="w-3 h-3" /> Open externally
              </a>
            </div>

            {/* In-app Jitsi iframe */}
            <div className="relative flex-1 min-h-[420px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
              {callLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950 text-slate-300">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                  <p className="text-xs font-mono">Connecting to secure video room…</p>
                  <p className="text-[10px] text-slate-500">Allow camera &amp; microphone access when prompted</p>
                </div>
              )}
              <iframe
                key={activeCallBooking.meetingCode}
                src={jitsiSrc}
                title="In-app video consultation"
                onLoad={() => setCallLoading(false)}
                allow="camera; microphone; fullscreen; display-capture; autoplay; clipboard-write; speaker-selection"
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer controls */}
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Session Topic</span>
                <span className="text-xs font-semibold text-slate-700 truncate max-w-[280px]">{activeCallBooking.topic}</span>
              </div>
              <button
                onClick={() => setActiveCallBooking(null)}
                className="py-2 px-5 bg-rose-600 hover:bg-rose-700 rounded-xl text-xs font-extrabold text-white cursor-pointer flex items-center gap-1.5 transition-all shadow"
              >
                <PhoneOff className="w-3.5 h-3.5" /> End Call
              </button>
            </div>
          </div>

          {/* Right panel: whiteboard + chat (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">

            {/* Whiteboard */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col shadow-sm flex-1 min-h-[200px]">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-800 uppercase flex items-center justify-between gap-1 border-b border-slate-100 pb-2 mb-3">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-emerald-600" /> Whiteboard</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold uppercase">Notes</span>
              </h3>
              <textarea
                value={whiteboardNotes}
                onChange={e => setWhiteboardNotes(e.target.value)}
                className="w-full flex-1 p-3 bg-emerald-50/20 hover:bg-emerald-50/40 border border-slate-200 focus:border-emerald-300 focus:bg-white focus:outline-none rounded-xl text-[11px] font-mono text-slate-800 leading-relaxed resize-none"
                placeholder="Write notes or clinical formulas here…"
              />
            </div>

            {/* Chat */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col shadow-sm flex-1 min-h-[240px]">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-800 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-2 mb-3">
                <MessageSquare className="w-4 h-4 text-blue-600" /> Live Chat
              </h3>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-1 pb-2">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {msg.sender === 'user' ? 'Me' : activeCallBooking.educator} · {msg.time}
                    </div>
                    <div className={`mt-1 p-3 rounded-2xl max-w-[85%] text-xs leading-normal ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-sm'
                        : 'bg-slate-100 text-slate-800 rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2 border-t border-slate-100 pt-3 shrink-0">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type clinical question…"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans text-slate-800 focus:border-blue-400 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
