/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  GraduationCap, MapPin, ExternalLink, X, CalendarClock, Award, Wallet,
  ChevronRight, Sparkles, Globe2, CheckCircle2
} from 'lucide-react';
import { WORKSHOPS, Workshop, WorkshopCountry } from '../data/staticData';
import { InAppArticle } from '../lib/readable';

const COUNTRY_FILTERS: (WorkshopCountry | 'All')[] = ['All', 'UAE', 'USA', 'UK', 'Canada', 'Australia'];

function WorkshopModal({ ws, onClose }: { ws: Workshop; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm sm:p-4" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[92vh] overflow-hidden animate-modal-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-2xl shrink-0">{ws.flag}</span>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-slate-900 leading-snug">{ws.title}</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">{ws.organizer}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ws.city}, {ws.country}</span>
                <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" /> {ws.dateLabel}</span>
                <span className="flex items-center gap-1"><Globe2 className="w-3 h-3" /> {ws.format}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg">{ws.topic}</span>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1"><Award className="w-3 h-3" /> {ws.cpd}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
            <Wallet className="w-4 h-4 text-slate-500 shrink-0" />
            <div>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Cost</p>
              <p className="text-[13px] font-bold text-slate-800">{ws.cost}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">About This Event</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">{ws.summary}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> Highlights</h3>
            <ul className="space-y-1.5">
              {ws.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] text-slate-600 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] text-slate-400">Dates vary each year — confirm the exact schedule, fees, and CPD accreditation on the official event page.</p>

          {/* Full official details loaded in-app */}
          <div className="pt-2 border-t border-slate-100">
            <InAppArticle url={ws.url} sourceName={ws.organizer} label="Programme & details" />
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 px-5 py-3 bg-slate-50/60">
          <a href={ws.url} target="_blank" rel="noopener noreferrer"
             className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all">
            <ExternalLink className="w-4 h-4" /> Visit Official Event Page
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Workshops() {
  const [country, setCountry] = useState<WorkshopCountry | 'All'>('All');
  const [active, setActive] = useState<Workshop | null>(null);

  const list = useMemo(
    () => (country === 'All' ? WORKSHOPS : WORKSHOPS.filter(w => w.country === country)),
    [country]
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 pb-12">
      {active && <WorkshopModal ws={active} onClose={() => setActive(null)} />}

      <div>
        <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Nursing Workshops &amp; Seminars
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          CPD workshops, seminars &amp; conferences for nurses across the UAE, USA, UK, Canada &amp; Australia — from authentic organisers. Tap an event for details and registration.
        </p>
      </div>

      {/* Country filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {COUNTRY_FILTERS.map(c => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              country === c
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {c === 'All' ? '🌐 All Countries' : c}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(w => (
          <div
            key={w.id}
            onClick={() => setActive(w)}
            className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl">{w.flag}</span>
              <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">{w.format}</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mt-3 leading-snug group-hover:text-blue-700 transition-colors">{w.title}</h4>
            <p className="text-[10px] font-mono text-slate-400 mt-1">{w.organizer}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {w.city}</span>
              <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3 text-slate-400" /> {w.dateLabel}</span>
            </div>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-2 line-clamp-2 flex-1">{w.summary}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded">{w.cpd}</span>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
