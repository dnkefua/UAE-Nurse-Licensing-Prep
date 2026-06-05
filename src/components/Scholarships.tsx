/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Trophy, ExternalLink, X, Wallet, CalendarClock, ChevronRight,
  GraduationCap, CheckCircle2, AlertTriangle, BookMarked
} from 'lucide-react';
import { SCHOLARSHIPS, Scholarship, ScholarshipRegion } from '../data/staticData';

const REGION_FILTERS: (ScholarshipRegion | 'All')[] = ['All', 'International', 'USA', 'UK', 'Canada', 'Australia', 'UAE'];

const TYPE_COLOR: Record<string, string> = {
  Scholarship: 'bg-blue-50 text-blue-700 border-blue-200',
  Grant:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  Bursary:     'bg-violet-50 text-violet-700 border-violet-200',
  Fellowship:  'bg-amber-50 text-amber-700 border-amber-200',
  Award:       'bg-rose-50 text-rose-700 border-rose-200',
};

function ScholarshipModal({ sc, onClose }: { sc: Scholarship; onClose: () => void }) {
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
            <span className="text-2xl shrink-0">{sc.flag}</span>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold text-slate-900 leading-snug">{sc.name}</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">{sc.provider}</p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1"><BookMarked className="w-3 h-3" /> {sc.region}</span>
                <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {sc.level}</span>
                <span className="flex items-center gap-1"><CalendarClock className="w-3 h-3" /> {sc.deadlineLabel}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[10px] font-mono font-bold border px-2.5 py-1 rounded-lg ${TYPE_COLOR[sc.type]}`}>{sc.type}</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
            <Wallet className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[9px] font-mono text-emerald-700 uppercase tracking-wider">Award Value</p>
              <p className="text-[13px] font-bold text-emerald-800">{sc.amount}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">About</h3>
            <p className="text-[13px] text-slate-600 leading-relaxed">{sc.summary}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Eligibility</h3>
            <ul className="space-y-1.5">
              {sc.eligibility.map((e, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] text-slate-600 leading-relaxed">
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400" /> <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[10px] text-amber-700 flex items-start gap-1">
            <AlertTriangle className="w-3 h-3 mt-0.5 shrink-0" />
            Deadlines and amounts change each cycle. Confirm current details and never pay a fee to "apply" — legitimate scholarships are free to enter.
          </p>
        </div>

        <div className="shrink-0 border-t border-slate-100 px-5 py-3 bg-slate-50/60">
          <a href={sc.url} target="_blank" rel="noopener noreferrer"
             className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all">
            <ExternalLink className="w-4 h-4" /> View &amp; Apply (Official Page)
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Scholarships() {
  const [region, setRegion] = useState<ScholarshipRegion | 'All'>('All');
  const [active, setActive] = useState<Scholarship | null>(null);

  const list = useMemo(
    () => (region === 'All' ? SCHOLARSHIPS : SCHOLARSHIPS.filter(s => s.region === region)),
    [region]
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 pb-12">
      {active && <ScholarshipModal sc={active} onClose={() => setActive(null)} />}

      <div>
        <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Nursing Scholarships &amp; Grants
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Scholarships, grants &amp; bursaries for nurses and nursing students — from authentic foundations and associations worldwide. Tap one for eligibility and how to apply.
        </p>
      </div>

      {/* Safety note */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-[11px] text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span><strong>Free to apply:</strong> Genuine scholarships never charge an application fee. Apply only through the official provider links here, and confirm the current deadline.</span>
      </div>

      {/* Region filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {REGION_FILTERS.map(r => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              region === r
                ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {r === 'All' ? '🌍 All Regions' : r}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(s => (
          <div
            key={s.id}
            onClick={() => setActive(s)}
            className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl">{s.flag}</span>
              <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded uppercase ${TYPE_COLOR[s.type]}`}>{s.type}</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mt-3 leading-snug group-hover:text-amber-700 transition-colors">{s.name}</h4>
            <p className="text-[10px] font-mono text-slate-400 mt-1">{s.provider}</p>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-emerald-700">
              <Wallet className="w-3.5 h-3.5" /> {s.amount}
            </div>
            <p className="text-[11.5px] text-slate-500 leading-relaxed mt-2 line-clamp-2 flex-1">{s.summary}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1"><CalendarClock className="w-3 h-3" /> {s.deadlineLabel}</span>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                Details <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
