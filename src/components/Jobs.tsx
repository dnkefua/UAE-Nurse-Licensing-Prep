/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Briefcase, MapPin, ExternalLink, X, ShieldCheck, Search, ChevronRight,
  AlertTriangle, Building2, CheckCircle2, Stethoscope
} from 'lucide-react';
import { JOB_EMPLOYERS, JOB_BOARDS, JobEmployer, JobRole } from '../data/staticData';

const ROLE_FILTERS: (JobRole | 'All')[] = ['All', 'Registered Nurse', 'Nursing Assistant', 'Specialist Nurse', 'Midwife', 'Home Care Nurse'];

// In-app employer detail panel (apply via official careers portal)
function EmployerModal({ employer, onClose }: { employer: JobEmployer; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm sm:p-4" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[92vh] overflow-hidden animate-modal-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl">{employer.logo}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-slate-900 truncate">{employer.employer}</h2>
                {employer.verified && (
                  <span className="shrink-0 inline-flex items-center gap-0.5 text-[8px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" /> Verified
                  </span>
                )}
              </div>
              <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {employer.emirate} · {employer.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-5">
          <p className="text-[13px] text-slate-600 leading-relaxed">{employer.about}</p>

          {/* Facts */}
          <div className="grid grid-cols-3 gap-2.5">
            {employer.facts.map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">{f.label}</p>
                <p className="text-[11px] font-bold text-slate-800 mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>

          {/* Roles */}
          <div className="space-y-2">
            <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider">Roles They Hire</h3>
            <div className="flex flex-wrap gap-2">
              {employer.roles.map(r => (
                <span key={r} className="inline-flex items-center gap-1 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-lg">
                  <Stethoscope className="w-3 h-3" /> {r}
                </span>
              ))}
            </div>
          </div>

          {/* Legitimacy */}
          <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-[11px] text-emerald-800">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{employer.whyLegit}</span>
          </div>
        </div>

        {/* Footer — official apply link */}
        <div className="shrink-0 border-t border-slate-100 px-5 py-3 bg-slate-50/60">
          <a href={employer.careersUrl} target="_blank" rel="noopener noreferrer"
             className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all">
            <ExternalLink className="w-4 h-4" /> View Open Roles &amp; Apply (Official Site)
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Jobs() {
  const [roleFilter, setRoleFilter] = useState<JobRole | 'All'>('All');
  const [active, setActive] = useState<JobEmployer | null>(null);

  const filtered = roleFilter === 'All'
    ? JOB_EMPLOYERS
    : JOB_EMPLOYERS.filter(e => e.roles.includes(roleFilter));

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 pb-12">
      {active && <EmployerModal employer={active} onClose={() => setActive(null)} />}

      {/* Header */}
      <div>
        <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          UAE Nursing Jobs &amp; Careers
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified openings for Nurses &amp; Nursing Assistants from official UAE healthcare employers. Apply directly on each employer's official career portal.
        </p>
      </div>

      {/* Safety notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-[11px] text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Avoid recruitment scams:</strong> Legitimate UAE employers and licensed agencies <strong>never charge candidates</strong> a placement or visa fee. Only apply through the official links below. Never send money or passport copies to unverified recruiters.
        </span>
      </div>

      {/* Role filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {ROLE_FILTERS.map(r => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              roleFilter === r
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {r === 'All' ? '🏥 All Employers' : r}
          </button>
        ))}
      </div>

      {/* Verified employers */}
      <div>
        <h3 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Official Employers ({filtered.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(e => (
            <div
              key={e.id}
              onClick={() => setActive(e)}
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-3xl">{e.logo}</span>
                {e.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[8px] font-mono font-extrabold uppercase bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-2.5 h-2.5" /> Verified
                  </span>
                )}
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-3 leading-snug group-hover:text-blue-700 transition-colors">{e.employer}</h4>
              <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {e.emirate}</p>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2 line-clamp-2 flex-1">{e.about}</p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {e.roles.slice(0, 3).map(r => (
                  <span key={r} className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{r}</span>
                ))}
                {e.roles.length > 3 && <span className="text-[9px] font-mono text-slate-400 px-1">+{e.roles.length - 3}</span>}
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  View &amp; Apply <ChevronRight className="w-3 h-3" />
                </span>
                <Building2 className="w-3.5 h-3.5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live job boards */}
      <div>
        <h3 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-violet-600" /> Live Job Search (Reputable Boards)
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            Browse thousands of current nursing listings across the UAE — each link opens a search pre-filtered for nurse roles. Verify the employer before applying.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {JOB_BOARDS.map(b => (
              <a
                key={b.id}
                href={b.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/40 transition-all"
              >
                <span className="text-xl shrink-0">{b.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 group-hover:text-violet-700 transition-colors">{b.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{b.note}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-500 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-start gap-4 text-xs leading-relaxed text-slate-700">
        <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800">Before you apply</h4>
          <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
            <li>Complete your <strong>DataFlow</strong> primary source verification and obtain your <strong>DHA / DOH / MOHAP</strong> eligibility or licence first — most roles require it.</li>
            <li>Prepare a Good Standing Certificate and attested degree.</li>
            <li>Keep a UAE-format CV (with passport-style photo) and references ready.</li>
            <li>Never pay a fee to secure a job — it's illegal in the UAE.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
