/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Newspaper, RefreshCw, ExternalLink, Play, Globe,
  AlertCircle, Clock, ChevronRight, Tv2, Stethoscope, Heart
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

// ─── Feed sources ─────────────────────────────────────────────────────────────

const NEWS_SOURCES: FeedSource[] = [
  // Africa
  { url: 'https://allafrica.com/health/rss2.0.xml',                            label: 'AllAfrica',          flag: '🌍', region: 'africa',  badge: 'emerald' },
  { url: 'https://health-e.org.za/feed/',                                       label: 'Health-e (SA)',      flag: '🇿🇦', region: 'africa',  badge: 'emerald' },
  { url: 'https://theconversation.com/africa/topics/health-33/articles.atom',  label: 'The Conversation',   flag: '🌍', region: 'africa',  badge: 'emerald' },
  { url: 'https://www.pulse.ng/lifestyle/health/rss',                           label: 'Pulse Nigeria',      flag: '🇳🇬', region: 'africa',  badge: 'emerald' },
  // Global
  { url: 'https://www.who.int/rss-feeds/news-english.xml',                     label: 'WHO',                flag: '🌐', region: 'global',  badge: 'blue'    },
  { url: 'https://feeds.bbci.co.uk/news/health/rss.xml',                       label: 'BBC Health',         flag: '🇬🇧', region: 'global',  badge: 'blue'    },
  { url: 'https://rss.medicalnewstoday.com/featurednews.xml',                  label: 'Medical News Today', flag: '🔬', region: 'global',  badge: 'blue'    },
  // Nursing
  { url: 'https://www.nursingtimes.net/feed/',                                  label: 'Nursing Times',      flag: '🏥', region: 'nursing', badge: 'violet'  },
  { url: 'https://www.nurse.com/blog/feed/',                                    label: 'Nurse.com',          flag: '💊', region: 'nursing', badge: 'violet'  },
  { url: 'https://minoritynurse.com/feed/',                                     label: 'Minority Nurse',     flag: '🩺', region: 'nursing', badge: 'violet'  },
];

// YouTube channels – RSS via allorigins proxy
const YT_CHANNELS = [
  { id: 'UCn_Zn4nUYrziYx-gnGyhmvA', name: 'WHO',               flag: '🌐' },
  { id: 'UCsRlU-MBkKQ7Pof3A5iKNdA', name: 'RegisteredNurseRN', flag: '🏥' },
  { id: 'UCNI0qZnA7NKrmv3-O4LaJCA', name: 'Osmosis',           flag: '📚' },
  { id: 'UCafHopQQkpFyAzXV7hkf3pQ', name: 'Africa CDC',        flag: '🌍' },
];

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

/** Timeout-safe fetch compatible with older WebViews */
function fetchWithTimeout(url: string, ms = 12000): Promise<Response> {
  const ctrl = new AbortController();
  const tid  = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(tid));
}

/** Fetch raw text/XML through a CORS proxy, trying two services */
async function fetchProxy(targetUrl: string): Promise<string | null> {
  // Primary: allorigins.win returns JSON { contents, status }
  try {
    const r = await fetchWithTimeout(
      `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`, 12000
    );
    if (r.ok) {
      const d = await r.json();
      if (d?.contents) return d.contents as string;
    }
  } catch { /* fall through */ }

  // Backup: corsproxy.io returns raw body
  try {
    const r = await fetchWithTimeout(
      `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`, 12000
    );
    if (r.ok) return await r.text();
  } catch { /* fall through */ }

  return null;
}

/** Parse RSS 2.0 or Atom XML with the browser's DOMParser */
function parseXML(xml: string, source: FeedSource): NewsItem[] {
  try {
    const doc   = new DOMParser().parseFromString(xml, 'text/xml');
    const nodes = Array.from(doc.querySelectorAll('item, entry'));
    if (nodes.length === 0) return [];

    return nodes.slice(0, 8).map((el, i) => {
      // Title
      const title = el.querySelector('title')?.textContent?.trim() ?? '';

      // URL – RSS uses <link> text content; Atom uses <link href="..."/>
      const linkEl = el.querySelector('link');
      const url    = linkEl?.getAttribute('href') || linkEl?.textContent?.trim() || '';

      // Description / summary
      const desc =
        el.querySelector('description')?.textContent?.trim() ||
        el.querySelector('content\\:encoded')?.textContent?.trim() ||
        el.querySelector('summary')?.textContent?.trim() || '';

      // Date
      const pubDate =
        el.querySelector('pubDate')?.textContent?.trim() ||
        el.querySelector('published')?.textContent?.trim() ||
        el.querySelector('updated')?.textContent?.trim() || '';

      // Thumbnail – several formats
      let thumbnail = '';
      const byTag = (t: string) => el.getElementsByTagName(t)[0];
      thumbnail = byTag('media:thumbnail')?.getAttribute('url')
                || byTag('media:content')?.getAttribute('url')
                || (() => {
                     const enc = el.querySelector('enclosure');
                     return enc?.getAttribute('type')?.startsWith('image/') ? enc.getAttribute('url') ?? '' : '';
                   })()
                || '';
      // Fallback: first <img> inside description HTML
      if (!thumbnail && desc) {
        const m = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (m) thumbnail = m[1];
      }

      // YouTube video ID (Atom feeds)
      let videoId = '';
      const ytIdEl = byTag('yt:videoId');
      if (ytIdEl?.textContent) {
        videoId = ytIdEl.textContent.trim();
      } else {
        const entryId = el.querySelector('id')?.textContent ?? '';
        const m       = entryId.match(/video:([A-Za-z0-9_-]+)/);
        if (m) videoId = m[1];
      }
      if (videoId && !thumbnail) thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      return {
        id:          `${source.label}-${i}-${url}`,
        title:       stripHtml(title),
        snippet:     stripHtml(desc).slice(0, 240),
        url,
        thumbnail,
        source:      source.label,
        flag:        source.flag,
        region:      source.region,
        publishedAt: pubDate,
        type:        videoId ? 'video' : 'article',
        videoId:     videoId || undefined,
      } as NewsItem;
    }).filter(it => it.title.length > 0 && it.url.length > 0);
  } catch {
    return [];
  }
}

async function fetchFeed(source: FeedSource): Promise<NewsItem[]> {
  const xml = await fetchProxy(source.url);
  if (!xml) return [];
  return parseXML(xml, source);
}

async function fetchYouTubeChannel(ch: { id: string; name: string; flag: string }): Promise<NewsItem[]> {
  const ytUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`;
  const xml   = await fetchProxy(ytUrl);
  if (!xml) return [];
  return parseXML(xml, { url: ytUrl, label: ch.name, flag: ch.flag, region: 'video', badge: 'rose' });
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

function NewsCard({ item }: { item: NewsItem }) {
  const badge = badgeForRegion(item.region);
  const [imgOk, setImgOk] = useState(!!item.thumbnail);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col h-full">
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
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto self-start inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-wider transition-all hover:gap-2 ${
            item.type === 'video' ? 'text-rose-600 hover:text-rose-700' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {item.type === 'video'
            ? <><Play className="w-3 h-3 fill-current" /> Watch</>
            : <><ChevronRight className="w-3 h-3" /> Read More</>}
          <ExternalLink className="w-2.5 h-2.5 opacity-50" />
        </a>
      </div>
    </article>
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
      let results: NewsItem[] = [];

      if (tab === 'video') {
        const settled = await Promise.allSettled(YT_CHANNELS.map(fetchYouTubeChannel));
        for (const r of settled) {
          if (r.status === 'fulfilled') results.push(...r.value);
        }
      } else {
        const sources = tab === 'all'
          ? NEWS_SOURCES
          : NEWS_SOURCES.filter(s => s.region === tab);

        const settled = await Promise.allSettled(sources.map(fetchFeed));
        for (const r of settled) {
          if (r.status === 'fulfilled') results.push(...r.value);
        }

        // Prioritise Africa articles in the "all" tab
        if (tab === 'all') {
          results = [
            ...results.filter(i => i.region === 'africa'),
            ...results.filter(i => i.region !== 'africa'),
          ];
        }
      }

      // Sort by date, deduplicate by title
      results.sort((a, b) =>
        (new Date(b.publishedAt).getTime() || 0) - (new Date(a.publishedAt).getTime() || 0)
      );
      const seen = new Set<string>();
      results = results.filter(it => {
        const key = it.title.slice(0, 60).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

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
            <a
              href={displayed[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all overflow-hidden"
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
                    <ChevronRight className="w-3.5 h-3.5" /> Read Full Story
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === 'africa' ? displayed.slice(1) : displayed).map(item => (
              <NewsCard key={item.id} item={item} />
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
