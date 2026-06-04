/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Newspaper, RefreshCw, ExternalLink, Play, Globe,
  AlertCircle, Clock, ChevronRight, Tv2, Stethoscope, Heart,
  X, BookOpen, Loader2
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Region = 'africa' | 'global' | 'nursing' | 'video';
type Tab    = 'all' | Region;

interface NewsItem {
  id:          string;
  title:       string;
  snippet:     string;
  url:         string;
  thumbnail:   string;
  source:      string;
  flag:        string;
  region:      Region;
  publishedAt: string;
  type:        'article' | 'video';
  videoId?:    string;
}

interface FeedSource {
  url:    string;
  label:  string;
  flag:   string;
  region: Region;
  badge:  'emerald' | 'blue' | 'violet' | 'rose';
}

// ─── Backend news client (server-side aggregation — reliable, no CORS) ──────────

/** Fetch a news tab from the Cloud Function (/api/news). */
async function fetchNews(tab: Tab): Promise<NewsItem[]> {
  const res = await fetch(`/api/news?tab=${encodeURIComponent(tab)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`news ${res.status}`);
  const data = await res.json();
  const items: any[] = Array.isArray(data.items) ? data.items : [];
  return items.map((it, i) => ({
    id:          `${it.source || 'src'}-${i}-${it.url}`,
    title:       it.title || '',
    snippet:     it.snippet || '',
    url:         it.url || '',
    thumbnail:   it.thumbnail || '',
    source:      it.source || 'News',
    flag:        it.flag || '📰',
    region:      (it.region || 'global') as Region,
    publishedAt: it.publishedAt || '',
    type:        it.type === 'video' ? 'video' : 'article',
    videoId:     it.videoId || undefined,
  })) as NewsItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function timeAgo(raw: string): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  const diff = Date.now() - d.getTime();
  const m    = Math.floor(diff / 60000);
  const h    = Math.floor(m / 60);
  const days = Math.floor(h / 24);
  if (days > 30) return d.toLocaleDateString('en-AE', { day: 'numeric', month: 'short' });
  if (days > 0)  return `${days}d ago`;
  if (h > 0)     return `${h}h ago`;
  if (m > 0)     return `${m}m ago`;
  return 'just now';
}

// ─── In-app article reader: fetch + extract + sanitize ─────────────────────────

function absolutize(url: string, base: string): string {
  try { return new URL(url, base).href; } catch { return url; }
}

// Tags we allow to survive sanitization (everything else is unwrapped/removed)
const ALLOWED_TAGS = new Set([
  'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'BLOCKQUOTE',
  'STRONG', 'EM', 'B', 'I', 'A', 'IMG', 'FIGURE', 'FIGCAPTION', 'BR', 'SPAN',
  'TABLE', 'THEAD', 'TBODY', 'TR', 'TD', 'TH', 'HR', 'PRE', 'CODE', 'SUB', 'SUP'
]);

/**
 * Sanitize untrusted HTML before rendering with dangerouslySetInnerHTML.
 * - Removes script/style/iframe/form and all event-handler attributes
 * - Strips every attribute except a tiny whitelist (a[href], img[src|alt])
 * - Neutralizes javascript: URLs, forces external links to open safely
 * - Resolves relative image/link URLs against the article origin
 */
function sanitizeHtml(container: HTMLElement, baseUrl: string): string {
  // 1. Remove dangerous / chrome elements entirely
  container
    .querySelectorAll('script,style,iframe,noscript,object,embed,form,button,input,svg,link,meta,nav,header,footer,aside,video,audio')
    .forEach(el => el.remove());

  // 2. Clean attributes on every remaining element
  container.querySelectorAll('*').forEach(el => {
    const tag = el.tagName;
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const keep =
        (tag === 'A' && name === 'href') ||
        (tag === 'IMG' && (name === 'src' || name === 'alt'));
      if (!keep) el.removeAttribute(attr.name);
    }
    if (tag === 'A') {
      const href = el.getAttribute('href') || '';
      if (/^\s*javascript:/i.test(href)) {
        el.removeAttribute('href');
      } else if (href) {
        el.setAttribute('href', absolutize(href, baseUrl));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      }
    }
    if (tag === 'IMG') {
      const src = el.getAttribute('src') || '';
      if (!src || /^\s*javascript:/i.test(src)) {
        el.remove();
      } else {
        el.setAttribute('src', absolutize(src, baseUrl));
        el.setAttribute('loading', 'lazy');
      }
    }
  });

  // 3. Unwrap any tag not in the whitelist (keep its inner content)
  let changed = true;
  let guard = 0;
  while (changed && guard < 20) {
    changed = false;
    guard++;
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

/** Find the main readable content block in a parsed document */
function extractMainContent(doc: Document): HTMLElement | null {
  // Prefer a semantic <article> with substantial text
  const article = doc.querySelector('article');
  if (article && (article.textContent || '').trim().length > 350) {
    return article as HTMLElement;
  }

  // Otherwise score candidate containers by total paragraph text length
  const candidates = Array.from(
    doc.querySelectorAll(
      'main, [role="main"], .article-content, .article-body, .entry-content, .post-content, .story-body, .content__article-body, article, section, div'
    )
  );

  let best: HTMLElement | null = null;
  let bestScore = 0;
  for (const c of candidates) {
    const ps = c.querySelectorAll('p');
    if (ps.length < 2) continue;
    let score = 0;
    ps.forEach(p => { score += (p.textContent || '').trim().length; });
    // Penalize obviously navigational/comment containers
    const cls = (c.className || '').toString().toLowerCase();
    if (/comment|sidebar|related|promo|footer|nav|share/.test(cls)) score *= 0.3;
    if (score > bestScore) { bestScore = score; best = c as HTMLElement; }
  }

  if (bestScore > 350) return best;
  return doc.body as HTMLElement;
}

/** Fetch an article's full HTML via the backend, then extract + sanitize it. */
async function fetchArticleContent(url: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/article?url=${encodeURIComponent(url)}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const html: string = data.html || '';
    if (!html) return null;

    const doc = new DOMParser().parseFromString(html, 'text/html');
    const main = extractMainContent(doc);
    if (!main) return null;
    const clone = main.cloneNode(true) as HTMLElement;
    const safe = sanitizeHtml(clone, url);
    const text = safe.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > 300 ? safe : null;
  } catch {
    return null;
  }
}

// ─── Badge colours ─────────────────────────────────────────────────────────────

const BADGE_CLS: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  blue:    'bg-blue-100    text-blue-800    border-blue-200',
  violet:  'bg-violet-100  text-violet-800  border-violet-200',
  rose:    'bg-rose-100    text-rose-800    border-rose-200',
};

function badgeForRegion(r: Region) {
  return r === 'africa' ? 'emerald' : r === 'global' ? 'blue' : r === 'nursing' ? 'violet' : 'rose';
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 bg-slate-200" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="h-3 bg-slate-200 rounded w-full" />
      </div>
    </div>
  );
}

// ─── News card ─────────────────────────────────────────────────────────────────

interface NewsCardProps {
  item: NewsItem;
  onOpen: (item: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onOpen }) => {
  const badge = badgeForRegion(item.region);
  const [imgOk, setImgOk] = useState(!!item.thumbnail);

  return (
    <article
      onClick={() => onOpen(item)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col h-full cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {item.thumbnail && imgOk ? (
          <img
            src={item.thumbnail}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            badge === 'emerald' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' :
            badge === 'blue'    ? 'bg-gradient-to-br from-blue-50    to-blue-100'    :
            badge === 'violet'  ? 'bg-gradient-to-br from-violet-50  to-violet-100'  :
                                  'bg-gradient-to-br from-rose-50    to-rose-100'
          }`}>
            <span className="text-5xl opacity-30">{item.flag}</span>
          </div>
        )}

        {/* Source badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${BADGE_CLS[badge]}`}>
            {item.flag} {item.source}
          </span>
        </div>

        {/* Video play overlay */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-red-600 transition-colors backdrop-blur-sm">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {item.publishedAt && (
          <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeAgo(item.publishedAt)}
          </p>
        )}
        <h3 className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-3 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>
        {item.snippet && (
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 flex-1">
            {item.snippet}
          </p>
        )}
        <span
          className={`mt-auto self-start inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-wider transition-all group-hover:gap-2 ${
            item.type === 'video' ? 'text-rose-600' : 'text-blue-600'
          }`}
        >
          {item.type === 'video'
            ? <><Play className="w-3 h-3 fill-current" /> Watch in App</>
            : <><BookOpen className="w-3 h-3" /> Read in App</>}
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </article>
  );
};

// ─── In-app Reader / Player modal ──────────────────────────────────────────────

function ReaderModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  const [html, setHtml]       = useState<string | null>(null);
  const [loading, setLoading] = useState(item.type === 'article');
  const [failed, setFailed]   = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while open + close on Escape
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Fetch full article content in-app
  useEffect(() => {
    if (item.type !== 'article') return;
    let alive = true;
    setLoading(true);
    setFailed(false);
    fetchArticleContent(item.url).then(content => {
      if (!alive) return;
      if (content) setHtml(content);
      else setFailed(true);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [item]);

  const badge = badgeForRegion(item.region);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center bg-slate-950/70 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden animate-modal-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${BADGE_CLS[badge]}`}>
              {item.flag} {item.source}
            </span>
            {item.type === 'video'
              ? <span className="text-[10px] font-mono text-rose-600 flex items-center gap-1"><Play className="w-3 h-3 fill-current" /> Video</span>
              : <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Article</span>}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {item.type === 'video' && item.videoId ? (
            /* ── In-app YouTube player ── */
            <div>
              <div className="relative w-full bg-black" style={{ aspectRatio: '16 / 9' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={item.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-lg font-extrabold text-slate-900 leading-snug">{item.title}</h2>
                {item.publishedAt && (
                  <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {timeAgo(item.publishedAt)} · {item.source}
                  </p>
                )}
                {item.snippet && <p className="text-sm text-slate-600 leading-relaxed">{item.snippet}</p>}
              </div>
            </div>
          ) : (
            /* ── In-app article reader ── */
            <article className="p-5 sm:p-7">
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-full max-h-72 object-cover rounded-2xl mb-5"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              )}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2">{item.title}</h1>
              <p className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mb-5 pb-5 border-b border-slate-100">
                <Clock className="w-3 h-3" /> {item.publishedAt ? timeAgo(item.publishedAt) : 'Recent'} · {item.flag} {item.source}
              </p>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                  <Loader2 className="w-7 h-7 animate-spin" />
                  <p className="text-xs font-mono">Loading full article…</p>
                </div>
              ) : failed ? (
                <div className="space-y-4">
                  {item.snippet && <p className="article-body">{item.snippet}…</p>}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
                    <p className="text-xs text-slate-500">
                      This publisher doesn't allow the full article to be embedded. You can read the complete story on the original site.
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open Original Article
                    </a>
                  </div>
                </div>
              ) : (
                <div className="article-body" dangerouslySetInnerHTML={{ __html: html || '' }} />
              )}
            </article>
          )}
        </div>

        {/* Footer — always provide the external source link */}
        <div className="shrink-0 border-t border-slate-100 px-5 py-3 flex items-center justify-between gap-3 bg-slate-50/60">
          <span className="text-[10px] font-mono text-slate-400 truncate">
            Source: {item.source}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wider transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            {item.type === 'video' ? 'Open on YouTube' : 'View Original Source'}
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Tab config ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'all',     label: 'Top Stories', icon: '📰' },
  { id: 'africa',  label: 'Africa',      icon: '🌍' },
  { id: 'global',  label: 'Global',      icon: '🌐' },
  { id: 'nursing', label: 'Nursing',     icon: '🏥' },
  { id: 'video',   label: 'Videos',      icon: '🎬' },
];

const TAB_ACTIVE: Record<Tab, string> = {
  all:     'bg-slate-800  border-slate-900  text-white',
  africa:  'bg-emerald-600 border-emerald-700 text-white',
  global:  'bg-blue-600   border-blue-700   text-white',
  nursing: 'bg-violet-600 border-violet-700 text-white',
  video:   'bg-rose-600   border-rose-700   text-white',
};

// ─── Main component ────────────────────────────────────────────────────────────

export default function NewsFeed() {
  const [activeTab,   setActiveTab]   = useState<Tab>('all');
  const [items,       setItems]       = useState<NewsItem[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [refreshing,  setRefreshing]  = useState(false);
  const [showCount,   setShowCount]   = useState(12);
  const [reader,      setReader]      = useState<NewsItem | null>(null);
  const cache = useRef<Map<Tab, { items: NewsItem[]; ts: number }>>(new Map());

  const loadFeed = useCallback(async (tab: Tab, force = false) => {
    const CACHE_MS = 20 * 60 * 1000;
    const cached   = cache.current.get(tab);
    if (!force && cached && Date.now() - cached.ts < CACHE_MS) {
      setItems(cached.items);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setShowCount(12);

    try {
      // Server-side aggregation handles fetching, sorting, and de-duplication.
      const results: NewsItem[] = await fetchNews(tab);

      if (results.length === 0) {
        setError('No articles could be loaded right now. The external news services may be temporarily unavailable — please try refreshing in a moment.');
      }

      cache.current.set(tab, { items: results, ts: Date.now() });
      setItems(results);
      setLastFetched(new Date());
    } catch {
      setError('Failed to load news. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadFeed(activeTab); }, [activeTab, loadFeed]);

  // Auto-refresh every 25 minutes
  useEffect(() => {
    const id = setInterval(() => loadFeed(activeTab, true), 25 * 60 * 1000);
    return () => clearInterval(id);
  }, [activeTab, loadFeed]);

  const handleRefresh = () => { setRefreshing(true); loadFeed(activeTab, true); };

  const displayed = items.slice(0, showCount);

  return (
    <div className="space-y-5 animate-fade-in pb-12">

      {/* In-app reader / player modal */}
      {reader && <ReaderModal item={reader} onClose={() => setReader(null)} />}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            Global Health News &amp; Resources
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live feeds from WHO, BBC Health, AllAfrica, Nursing Times &amp; more — Africa stories prioritised.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          {lastFetched && (
            <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Updated {timeAgo(lastFetched.toISOString())}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Live badge */}
      <div className="flex items-center gap-2 -mt-1">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Live Feed
        </span>
        {lastFetched && (
          <span className="text-[10px] text-slate-400 font-mono sm:hidden">
            {timeAgo(lastFetched.toISOString())}
          </span>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border shadow-sm ${
              activeTab === tab.id
                ? TAB_ACTIVE[tab.id]
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span> <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Context banners */}
      {activeTab === 'africa' && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 text-[11px] text-emerald-800">
          <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Aggregating from <strong>AllAfrica</strong>, <strong>Health-e News</strong>, <strong>The Conversation Africa</strong>, and <strong>Pulse Nigeria</strong>.</span>
        </div>
      )}
      {activeTab === 'nursing' && (
        <div className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3 text-[11px] text-violet-800">
          <Stethoscope className="w-4 h-4 text-violet-600 shrink-0" />
          <span>Pulling from <strong>Nursing Times</strong>, <strong>Nurse.com</strong>, and <strong>Minority Nurse</strong>.</span>
        </div>
      )}
      {activeTab === 'video' && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-[11px] text-rose-800">
          <Tv2 className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Latest videos from <strong>WHO</strong>, <strong>RegisteredNurseRN</strong>, <strong>Osmosis</strong>, and <strong>Africa CDC</strong> YouTube channels.</span>
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">{error}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              News is fetched from third-party RSS feeds. If this persists, the feed provider may be temporarily down.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
        </div>

      ) : items.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          No articles found for this category. Try refreshing.
        </div>

      ) : (
        <>
          {/* Featured hero card (Africa tab only) */}
          {activeTab === 'africa' && displayed[0] && (
            <div
              onClick={() => setReader(displayed[0])}
              className="group block bg-white rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-52 md:h-auto bg-gradient-to-br from-emerald-50 to-emerald-100 overflow-hidden shrink-0">
                  {displayed[0].thumbnail ? (
                    <img
                      src={displayed[0].thumbnail}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl opacity-25">🌍</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                        🌍 {displayed[0].source} · Featured
                      </span>
                      {displayed[0].publishedAt && (
                        <span className="text-[10px] text-slate-400 font-mono">{timeAgo(displayed[0].publishedAt)}</span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-3">
                      {displayed[0].title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{displayed[0].snippet}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase text-emerald-600 group-hover:gap-2 transition-all">
                    <BookOpen className="w-3.5 h-3.5" /> Read Full Story in App
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === 'africa' ? displayed.slice(1) : displayed).map(item => (
              <NewsCard key={item.id} item={item} onOpen={(it) => setReader(it)} />
            ))}
          </div>

          {/* Load more */}
          {showCount < items.length && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setShowCount(c => c + 12)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Load More <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          )}

          {/* YouTube search CTA (Videos tab) */}
          {activeTab === 'video' && (
            <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Search more on YouTube</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Browse the latest nursing exam prep, clinical skills, and Africa health news videos.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <a href="https://www.youtube.com/results?search_query=africa+health+news+2025" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all">
                  <Heart className="w-3 h-3" /> Africa Health
                </a>
                <a href="https://www.youtube.com/results?search_query=UAE+DHA+HAAD+nursing+exam+2025" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all">
                  <Stethoscope className="w-3 h-3" /> UAE Exam Prep
                </a>
                <a href="https://www.youtube.com/results?search_query=NCLEX+nursing+tips+2025" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all">
                  <Tv2 className="w-3 h-3" /> NCLEX Tips
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
