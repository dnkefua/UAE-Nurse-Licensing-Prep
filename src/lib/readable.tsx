/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared in-app reader: fetches an external page via the backend (/api/article),
 * extracts the main readable content, sanitises it, and renders it inside the app
 * — with a graceful fallback and an external link to the original source.
 */

import React, { useState, useEffect } from 'react';
import { Loader2, ExternalLink, FileText } from 'lucide-react';

// ── URL + sanitisation helpers ──────────────────────────────────────────────────

function absolutize(url: string, base: string): string {
  try { return new URL(url, base).href; } catch { return url; }
}

const ALLOWED_TAGS = new Set([
  'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE',
  'STRONG', 'EM', 'B', 'I', 'A', 'IMG', 'FIGURE', 'FIGCAPTION', 'BR', 'SPAN',
  'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'HR', 'PRE', 'CODE', 'SUB', 'SUP',
]);

function sanitizeHtml(container: HTMLElement, baseUrl: string): string {
  container
    .querySelectorAll('script,style,iframe,noscript,object,embed,form,button,input,svg,link,meta,nav,header,footer,aside,video,audio')
    .forEach(el => el.remove());

  container.querySelectorAll('*').forEach(el => {
    const tag = el.tagName;
    if (tag === 'IMG') {
      let realSrc =
        el.getAttribute('src') || el.getAttribute('data-src') ||
        el.getAttribute('data-original') || el.getAttribute('data-lazy-src') ||
        el.getAttribute('data-srcset') || el.getAttribute('srcset') || '';
      if (realSrc.includes(',') || /\s\d+w/.test(realSrc)) {
        const first = realSrc.split(',')[0].trim().split(/\s+/)[0];
        if (first) realSrc = first;
      }
      if (/^data:image\/(gif|svg)/i.test(realSrc) || /^\s*$/.test(realSrc)) { el.remove(); return; }
      el.setAttribute('src', absolutize(realSrc, baseUrl));
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const keep = (tag === 'A' && name === 'href') || (tag === 'IMG' && (name === 'src' || name === 'alt'));
      if (!keep) el.removeAttribute(attr.name);
    }
    if (tag === 'A') {
      const href = el.getAttribute('href') || '';
      if (/^\s*javascript:/i.test(href)) el.removeAttribute('href');
      else if (href) {
        el.setAttribute('href', absolutize(href, baseUrl));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
    if (tag === 'IMG') el.setAttribute('loading', 'lazy');
  });

  let changed = true, guard = 0;
  while (changed && guard < 20) {
    changed = false; guard++;
    container.querySelectorAll('*').forEach(el => {
      if (!ALLOWED_TAGS.has(el.tagName)) {
        const parent = el.parentNode;
        if (parent) {
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
          changed = true;
        }
      }
    });
  }
  return container.innerHTML;
}

function extractMainContent(doc: Document): HTMLElement | null {
  const candidates = Array.from(
    doc.querySelectorAll(
      'article, main, [role="main"], [itemprop="articleBody"], ' +
      '.article-content, .article-body, .articleBody, .entry-content, .post-content, ' +
      '.story-body, .content__article-body, .rich-text, .article__body, .page-content, ' +
      '.event-detail, .event-description, .description, section, div'
    )
  );
  let best: HTMLElement | null = null, bestScore = 0;
  for (const c of candidates) {
    const ps = c.querySelectorAll('p');
    if (ps.length < 2) continue;
    let score = 0;
    ps.forEach(p => { score += (p.textContent || '').trim().length; });
    const cls = (c.className || '').toString().toLowerCase() + ' ' + (c.id || '').toLowerCase();
    if (/comment|sidebar|related|promo|footer|nav|share|recirc|newsletter|widget|teaser|card|cookie/.test(cls)) score *= 0.25;
    if (/article|entry|post|story|content|rich-text|description|event/.test(cls)) score *= 1.3;
    if (score > bestScore) { bestScore = score; best = c as HTMLElement; }
  }
  if (best && bestScore > 250) return best;
  const article = doc.querySelector('article');
  if (article && (article.textContent || '').trim().length > 250) return article as HTMLElement;
  return doc.body as HTMLElement;
}

export interface ReadableMeta { image: string; author: string; siteName: string; title: string; published: string; }
export interface ReadableResult { html: string | null; meta: ReadableMeta; finalUrl: string; }

export async function fetchReadableContent(url: string): Promise<ReadableResult> {
  const empty: ReadableResult = { html: null, meta: { image: '', author: '', siteName: '', title: '', published: '' }, finalUrl: url };
  try {
    const res = await fetch(`/api/article?url=${encodeURIComponent(url)}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return empty;
    const data = await res.json();
    const meta: ReadableMeta = { ...empty.meta, ...(data.meta || {}) };
    const finalUrl: string = data.finalUrl || url;
    const html: string = data.html || '';
    if (!html) return { ...empty, meta, finalUrl };
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const main = extractMainContent(doc);
    if (!main) return { html: null, meta, finalUrl };
    const safe = sanitizeHtml(main.cloneNode(true) as HTMLElement, finalUrl);
    const text = safe.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { html: text.length > 250 ? safe : null, meta, finalUrl };
  } catch {
    return empty;
  }
}

// ── In-app content block ─────────────────────────────────────────────────────────

interface InAppArticleProps {
  url: string;
  sourceName: string;
  /** Heading shown above the loaded content */
  label?: string;
}

/**
 * Auto-loads the official page content and renders it in-app. While loading shows
 * a spinner; on success renders the article body; on failure shows a compact
 * "details on the official page" card. Always exposes the external source link.
 */
export function InAppArticle({ url, sourceName, label = 'Full details' }: InAppArticleProps) {
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState<string | null>(null);
  const [origUrl, setOrigUrl] = useState(url);
  const [heroImg, setHeroImg] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true); setHtml(null);
    fetchReadableContent(url).then(r => {
      if (!alive) return;
      setHtml(r.html);
      setOrigUrl(r.finalUrl || url);
      setHeroImg(r.meta.image || '');
      setLoading(false);
    });
    return () => { alive = false; };
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-400 text-xs font-mono py-4">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading {label.toLowerCase()} from {sourceName}…
      </div>
    );
  }

  if (!html) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 shrink-0" /> Full programme &amp; latest details are on the official {sourceName} page.
        </p>
        <a href={origUrl} target="_blank" rel="noopener noreferrer"
           className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all">
          <ExternalLink className="w-3 h-3" /> Open
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
        <FileText className="w-3.5 h-3.5 text-blue-600" /> {label} — from {sourceName}
      </h3>
      {heroImg && (
        <img src={heroImg} alt="" className="w-full max-h-56 object-cover rounded-xl"
             onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      )}
      <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="pt-2">
        <a href={origUrl} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider transition-all">
          <ExternalLink className="w-3.5 h-3.5" /> View on {sourceName}
        </a>
      </div>
    </div>
  );
}
