/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, X } from 'lucide-react';
import { JOB_EMPLOYERS, JOB_BOARDS, LINKEDIN_SEARCHES, JobRole } from '../data/staticData';
import { apiFetch } from '../lib/api';
import { InAppArticle, safeExternalUrl, useModalAccessibility } from '../lib/readable';

const ROLE_FILTERS: (JobRole | 'All')[] = ['All', 'Registered Nurse', 'Nursing Assistant', 'Specialist Nurse', 'Midwife', 'Home Care Nurse'];
type Listing = {
  id: string; title: string; employer: string; role: string; city: string;
  employmentType: string; postedDate: string; salaryRange: string; summary: string;
  responsibilities: string[]; requirements: string[]; benefits: string[];
  applyUrl: string; publisher: string;
};
const stringValue = (value: unknown, fallback = '') => typeof value === 'string' && value.trim() ? value : fallback;
const stringList = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

function parseListings(items: unknown): Listing[] {
  if (!Array.isArray(items)) throw new Error('Invalid jobs response');
  return items.flatMap((item, index) => {
    if (!item || typeof item !== 'object') return [];
    const title = stringValue(item.title);
    const applyUrl = safeExternalUrl(stringValue(item.applyUrl));
    if (!title || !applyUrl) return [];
    return [{
      id: `${stringValue(item.id, 'listing')}-${index}`, title, applyUrl,
      employer: stringValue(item.employer, 'Employer not supplied'),
      role: stringValue(item.role, 'Role not supplied'),
      city: stringValue(item.city, 'Location not supplied'),
      employmentType: stringValue(item.employmentType, 'Employment type not supplied'),
      postedDate: stringValue(item.postedDate),
      salaryRange: stringValue(item.salaryRange, 'Salary not supplied'),
      summary: stringValue(item.summary, 'Description not supplied. Read the linked source.'),
      publisher: stringValue(item.publisher, 'Publisher not supplied'),
      responsibilities: stringList(item.responsibilities),
      requirements: stringList(item.requirements),
      benefits: stringList(item.benefits),
    }];
  });
}

function postedLabel(value: string) {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return 'Source posting date not supplied';
  return `Source posting date: ${date.toLocaleDateString('en-AE')}${date.getTime() > Date.now() ? ' (future date supplied by source)' : ''}`;
}

function JobModal({ job, onClose }: { job: Listing; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useModalAccessibility(ref, onClose);
  return createPortal(
    <div className="fixed inset-0 z-[100] bg-slate-950/70 p-4 flex items-center justify-center" onClick={onClose}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="job-title" tabIndex={-1}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90dvh] overflow-y-auto space-y-4"
        onClick={event => event.stopPropagation()}>
        <div className="flex justify-between gap-4 items-start">
          <h2 id="job-title" className="text-lg font-bold">{job.title}</h2>
          <button type="button" aria-label="Close job details" onClick={onClose} className="p-2 bg-slate-100 rounded-lg"><X aria-hidden="true" /></button>
        </div>
        <p>{job.employer} · {job.city}</p>
        <p className="text-sm text-slate-700">Source: {job.publisher}. {postedLabel(job.postedDate)}. Availability and employer identity have not been independently verified.</p>
        <p className="text-sm">{job.employmentType} · Source salary: {job.salaryRange}</p>
        <p className="text-sm whitespace-pre-wrap">{job.summary}</p>
        {([
          ['Responsibilities supplied by source', job.responsibilities],
          ['Requirements supplied by source', job.requirements],
          ['Benefits supplied by source', job.benefits],
        ] as [string, string[]][]).map(([title, items]) => items.length > 0 && (
          <section key={title}><h3 className="font-semibold">{title}</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 mt-2">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </section>
        ))}
        <InAppArticle url={job.applyUrl} sourceName={new URL(job.applyUrl).hostname} label="Listing source" />
        <p className="text-sm text-slate-700">Confirm the vacancy and application process independently with the employer before sharing documents or paying anyone. This app does not process applications.</p>
      </div>
    </div>, document.body
  );
}

export default function Jobs() {
  const [role, setRole] = useState<JobRole | 'All'>('All');
  const [jobs, setJobs] = useState<Listing[]>([]);
  const [active, setActive] = useState<Listing | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'unconfigured' | 'error'>('loading');
  const [receivedAt, setReceivedAt] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60000);
    setStatus('loading');
    setJobs([]);
    setReceivedAt(null);
    (async () => {
      try {
        const response = await apiFetch('/api/jobs', { signal: controller.signal });
        if (!response.ok) throw new Error('Jobs request failed');
        const data = await response.json();
        if (!alive) return;
        if (data.configured === false) { setStatus('unconfigured'); return; }
        setJobs(parseListings(data.items));
        setReceivedAt(new Date().toLocaleString('en-AE'));
        setStatus('ready');
      } catch {
        if (alive) setStatus('error');
      } finally {
        window.clearTimeout(timeout);
      }
    })();
    return () => { alive = false; window.clearTimeout(timeout); controller.abort(); };
  }, [refresh]);

  const filtered = role === 'All' ? jobs : jobs.filter(job => job.role === role);
  return (
    <div className="space-y-6 text-slate-900 pb-12">
      {active && <JobModal job={active} onClose={() => setActive(null)} />}
      <header className="space-y-2">
        <h2 className="text-xl font-bold flex gap-2 items-center"><Briefcase aria-hidden="true" /> Nursing jobs and career resources</h2>
        <p className="text-sm text-slate-700">Third-party listings and a curated employer directory. Inclusion does not verify an employer, recruiter, or current vacancy.</p>
      </header>
      <p className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-950">
        Check the employer’s identity and application process independently. Be cautious about requests for payment or sensitive documents. A link or listing here is not a guarantee of authenticity.
      </p>
      <section className="space-y-4" aria-labelledby="jobs-list-title">
        <div className="flex justify-between items-center gap-3">
          <h3 id="jobs-list-title" className="font-bold">Listings returned by the jobs service</h3>
          <button type="button" onClick={() => setRefresh(value => value + 1)} disabled={status === 'loading'} className="px-4 py-2 rounded-lg bg-blue-700 text-white disabled:opacity-50">Refresh listings</button>
        </div>
        <label className="block text-sm font-semibold" htmlFor="job-role">Filter supplied role</label>
        <select id="job-role" value={role} onChange={event => setRole(event.target.value as JobRole | 'All')} className="border border-slate-300 rounded-lg p-3 max-w-full">
          {ROLE_FILTERS.map(value => <option key={value} value={value}>{value === 'All' ? 'All roles' : value}</option>)}
        </select>
        <div role="status" className="text-sm text-slate-700">
          {status === 'loading' && 'Loading listings…'}
          {status === 'unconfigured' && 'The jobs feed is not configured. Browse the employer and search directories below.'}
          {status === 'ready' && filtered.length === 0 && 'No listings were returned for this filter. This does not mean employers have no vacancies.'}
          {status === 'ready' && receivedAt && <p>Response received in this browser: {receivedAt}. This is not a verification or posting time; the service may return cached data.</p>}
        </div>
        {status === 'error' && <p role="alert" className="text-sm text-rose-800">Could not load listings. Try refreshing. Employer and search links remain available below.</p>}
        <div className="grid gap-3">
          {filtered.map(job => (
            <button type="button" key={job.id} onClick={() => setActive(job)} aria-haspopup="dialog" className="text-left bg-white border border-slate-200 rounded-xl p-5 space-y-2 hover:border-blue-500">
              <span className="block font-bold">{job.title}</span>
              <span className="block text-sm">{job.employer} · {job.city}</span>
              <span className="block text-xs text-slate-700">Source: {job.publisher} · {postedLabel(job.postedDate)}</span>
              <span className="block text-sm text-blue-800">Read listing details</span>
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="font-bold">Curated employer directory</h3>
        <p className="text-sm text-slate-700">Static links selected for this directory. Current vacancies and link status have not been verified; no verification date is recorded.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {JOB_EMPLOYERS.map(employer => <InAppArticle key={employer.id} url={employer.careersUrl} sourceName={employer.employer} label="Employer career resource" />)}
        </div>
      </section>
      <section className="space-y-3">
        <h3 className="font-bold">External job searches</h3>
        <p className="text-sm text-slate-700">Search results are controlled by each site and may include agencies or expired listings. They have not been reviewed here.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {JOB_BOARDS.map(board => <InAppArticle key={board.id} url={board.searchUrl} sourceName={board.name} label="Job search" />)}
          {LINKEDIN_SEARCHES.map(search => <InAppArticle key={search.id} url={search.url} sourceName={search.label} label="LinkedIn search" />)}
        </div>
      </section>
    </div>
  );
}
