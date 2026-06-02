/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Newspaper, RefreshCw, ExternalLink, Play, Globe, Heart,
  AlertCircle, Clock, ChevronRight, Tv2, Stethoscope
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

type Region = 'africa' | 'global' | 'nursing' | 'video';
type Tab = 'all' | Region;

interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  url: string;
  thumbnail: string;
  source: string;
  flag: string;
  region: Region;
  publishedAt: string;
  type: 'article' | 'video';
  videoId?: string;
}

// ─── Feed sources ─────────────────────────────────────────────────────────────

interface FeedSource {
  url: string;
  label: string;
  flag: string;
  region: Region;
  badge: string; // tailwind color name
}

const NEWS_SOURCES: FeedSource[] = [
  // ── Africa ──────────────────────────────────────────────────────────────────
  {
    url: 'https://allafrica.com/health/rss2.0.xml',
    label: 'AllAfrica', flag: '🌍', region: 'africa', badge: 'emerald'
  },
  {
    url: 'https://health-e.org.za/feed/',
    label: 'Health-e News (SA)', flag: '🇿🇦', region: 'africa', badge: 'emerald'
  },
  {
    url: 'https://theconversation.com/africa/topics/health-33/articles.atom',
    label: 'The Conversation', flag: '🌍', region: 'africa', badge: 'emerald'
  },
  {
    url: 'https://www.afro.who.int/news/rss',
    label: 'WHO Africa', flag: '🌍', region: 'africa', badge: 'emerald'
  },
  // ── Global ──────────────────────────────────────────────────────────────────
  {
    url: 'https://www.who.int/rss-feeds/news-english.xml',
    label: 'WHO Global', flag: '🌐', region: 'global', badge: 'blue'
  },
  {
    url: 'https://feeds.bbci.co.uk/news/health/rss.xml',
    label: 'BBC Health', flag: '🇬🇧', region: 'global', badge: 'blue'
  },
  {
    url: 'https://rss.medicalnewstoday.com/featurednews.xml',
    label: 'Medical News Today', flag: '🔬', region: 'global', badge: 'blue'
  },
  // ── Nursing ──────────────────────────────────────────────────────────────────
  {
    url: 'https://www.nursingtimes.net/feed/',
    label: 'Nursing Times', flag: '🏥', region: 'nursing', badge: 'violet'
  },
  {
    url: 'https://www.nurse.com/blog/feed/',
    label: 'Nurse.com', flag: '💊', region: 'nursing', badge: 'violet'
  },
  {
    url: 'https://www.americannurse.com/feed/',
    label: 'American Nurse', flag: '🩺', region: 'nursing', badge: 'violet'
  },
];

// YouTube channels – nursing & health education
// Format: https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
const YT_CHANNELS = [
  { id: 'UCn_Zn4nUYrziYx-gnGyhmvA', name: 'WHO', flag: '🌐' },
  { id: 'UCsRlU-MBkKQ7Pof3A5iKNdA', name: 'RegisteredNurseRN', flag: '🏥' },
  { id: 'UCNI0qZnA7NKrmv3-O4LaJCA', name: 'Osmosis', flag: '📚' },
  { id: 'UCM_YeISXN0_rmPdRAjKFiRA', name: 'NurseCoach', flag: '💊' },
  { id: 'UCafHopQQkpFyAzXV7hkf3pQ', name: 'Africa CDC', flag: '🌍' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const R2J = 'https://api.rss2json.com/v1/api.json';

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

function timeAgo(raw: string): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return '';
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const days = Math.floor(h / 24);
  if (days > 0) return `${days}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return 'just now';
}

function extractYtVideoId(entryId: string): string {
  const match = entryId?.match(/video:(.+)/);
  return match ? match[1] : entryId?.split(':').pop() || '';
}

// Badge color map
const BADGE: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
  violet: 'bg-violet-100 text-violet-800 border-violet-200',
  rose: 'bg-rose-100 text-rose-800 border-rose-200',
};

// ─── Fetch functions ──────────────────────────────────────────────────────────

async function fetchFeed(source: FeedSource): Promise<NewsItem[]> {
  try {
    const url = `${R2J}?rss_url=${encodeURIComponent(source.url)}&count=8&order_by=pubDate&order_dir=desc`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    return data.items.map((it: any, idx: number) => ({
      id: `${source.label}-${idx}-${it.guid || it.link || idx}`,
      title: stripHtml(it.title || ''),
      snippet: stripHtml(it.description || it.content || '').slice(0, 220),
      url: it.link || it.url || '#',
      thumbnail: it.thumbnail || it.enclosure?.link || '',
      source: source.label,
      flag: source.flag,
      region: source.region,
      publishedAt: it.pubDate || '',
      type: 'article' as const,
    })).filter((it: NewsItem) => it.title && it.url !== '#');
  } catch {
    return [];
  }
}

async function fetchYouTubeChannel(ch: { id: string; name: string; flag: string }): Promise<NewsItem[]> {
  try {
    const ytUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`;
    const proxyUrl = `${R2J}?rss_url=${encodeURIComponent(ytUrl)}&count=6`;
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    const data = await res.json();
    if (data.status !== 'ok' || !Array.isArray(data.items)) return [];

    return data.items.map((it: any) => {
      const videoId = extractYtVideoId(it.guid || '');
      return {
        id: `yt-${ch.id}-${videoId}`,
        title: stripHtml(it.title || ''),
        snippet: stripHtml(it.description || it.content || '').slice(0, 180),
        url: it.link || `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : it.thumbnail || '',
        source: ch.name,
        flag: ch.flag,
        region: 'video' as const,
        publishedAt: it.pubDate || '',
        type: 'video' as const,
        videoId,
      };
    }).filter((it: NewsItem) => it.title);
  } catch {
    return [];
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
        <div className="h-3 bg-slate-200 rounded w-4/5" />
      </div>
    </div>
  );
}

interface NewsCardProps { item: NewsItem }

function NewsCard({ item }: NewsCardProps) {
  const badgeColor = item.region === 'africa' ? 'emerald'
    : item.region === 'global' ? 'blue'
    : item.region === 'nursing' ? 'violet'
    : 'rose';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all group flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden shrink-0">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            item.region === 'africa' ? 'bg-gradient-to-br from-emerald-50 to-emerald-100'
            : item.region === 'global' ? 'bg-gradient-to-br from-blue-50 to-blue-100'
            : item.region === 'nursing' ? 'bg-gradient-to-br from-violet-50 to-violet-100'
            : 'bg-gradient-to-br from-rose-50 to-rose-100'
          }`}>
            <span className="text-5xl opacity-40">{item.flag}</span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${BADGE[badgeColor]}`}>
            {item.flag} {item.source}
          </span>
        </div>

        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 transition-colors">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {item.publishedAt && (
          <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeAgo(item.publishedAt)}
          </p>
        )}

        <h3 className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-3 font-sans group-hover:text-blue-700 transition-colors">
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
            item.type === 'video'
              ? 'text-rose-600 hover:text-rose-700'
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          {item.type === 'video' ? (
            <><Play className="w-3 h-3 fill-current" /> Watch</>
          ) : (
            <><ChevronRight className="w-3 h-3" /> Read More</>
          )}
          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'all',     label: 'Top Stories', icon: '📰' },
  { id: 'africa',  label: 'Africa',      icon: '🌍' },
  { id: 'global',  label: 'Global',      icon: '🌐' },
  { id: 'nursing', label: 'Nursing',     icon: '🏥' },
  { id: 'video',   label: 'Videos',      icon: '🎬' },
];

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showCount, setShowCount] = useState(12);
  const cacheRef = useRef<Map<Tab, { items: NewsItem[]; ts: number }>>(new Map());

  const loadFeed = useCallback(async (tab: Tab, force = false) => {
    const cached = cacheRef.current.get(tab);
    const CACHE_MS = 20 * 60 * 1000; // 20 min
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
        // Fetch all YouTube channels in parallel
        const settled = await Promise.allSettled(YT_CHANNELS.map(ch => fetchYouTubeChannel(ch)));
        for (const r of settled) {
          if (r.status === 'fulfilled') results.push(...r.value);
        }
      } else {
        // Determine which sources to include
        const sources = tab === 'all'
          ? NEWS_SOURCES
          : NEWS_SOURCES.filter(s => s.region === tab);

        const settled = await Promise.allSettled(sources.map(s => fetchFeed(s)));
        for (const r of settled) {
          if (r.status === 'fulfilled') results.push(...r.value);
        }

        // For "all" tab: promote Africa items to the top
        if (tab === 'all') {
          const africa = results.filter(i => i.region === 'africa');
          const rest = results.filter(i => i.region !== 'africa');
          results = [...africa, ...rest];
        }
      }

      // Sort by date (most recent first), deduplicate by title
      results.sort((a, b) => {
        const da = new Date(a.publishedAt).getTime() || 0;
        const db = new Date(b.publishedAt).getTime() || 0;
        return db - da;
      });
      const seen = new Set<string>();
      results = results.filter(it => {
        const key = it.title.slice(0, 60).toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if (results.length === 0) {
        setError('No articles found right now. Check your connection and try again.');
      }

      cacheRef.current.set(tab, { items: results, ts: Date.now() });
      setItems(results);
      setLastFetched(new Date());
    } catch {
      setError('Failed to load news. Please check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load on mount + tab change
  useEffect(() => {
    loadFeed(activeTab);
  }, [activeTab, loadFeed]);

  // Auto-refresh every 25 minutes
  useEffect(() => {
    const id = setInterval(() => {
      if (!refreshing) loadFeed(activeTab, true);
    }, 25 * 60 * 1000);
    return () => clearInterval(id);
  }, [activeTab, loadFeed, refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadFeed(activeTab, true);
  };

  const displayed = items.slice(0, showCount);

  return (
    <div className="space-y-6 animate-fade-in pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-blue-600" />
            Global Health News &amp; Resources
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Live feeds from WHO, BBC Health, AllAfrica, Nursing Times &amp; more — prioritising African health coverage.
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
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Live badge + last updated on mobile */}
      <div className="flex items-center gap-2 -mt-3">
        <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          Live Feed
        </span>
        <span className="text-[10px] text-slate-400 font-mono sm:hidden">
          {lastFetched ? `Updated ${timeAgo(lastFetched.toISOString())}` : ''}
        </span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide -mt-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === tab.id
                ? tab.id === 'africa'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                  : tab.id === 'nursing'
                  ? 'bg-violet-600 text-white border-violet-700 shadow-md'
                  : tab.id === 'video'
                  ? 'bg-rose-600 text-white border-rose-700 shadow-md'
                  : 'bg-blue-600 text-white border-blue-700 shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab context banner */}
      {activeTab === 'africa' && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 text-[11px] text-emerald-800 font-sans -mt-2">
          <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Aggregating health news from <strong>AllAfrica</strong>, <strong>Health-e News</strong>, <strong>WHO Africa (AFRO)</strong>, and <strong>The Conversation Africa</strong>.</span>
        </div>
      )}
      {activeTab === 'nursing' && (
        <div className="flex items-center gap-3 bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3 text-[11px] text-violet-800 font-sans -mt-2">
          <Stethoscope className="w-4 h-4 text-violet-600 shrink-0" />
          <span>Pulling nursing-specific updates from <strong>Nursing Times</strong>, <strong>Nurse.com</strong>, and <strong>American Nurse Journal</strong>.</span>
        </div>
      )}
      {activeTab === 'video' && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-[11px] text-rose-800 font-sans -mt-2">
          <Tv2 className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Latest videos from <strong>WHO</strong>, <strong>RegisteredNurseRN</strong>, <strong>Osmosis</strong>, and <strong>Africa CDC</strong> YouTube channels.</span>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300" />
          <div>
            <p className="text-sm font-semibold text-slate-600">{error}</p>
            <p className="text-xs text-slate-400 mt-1">External news services may be temporarily unavailable.</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        </div>
      ) : (
        <>
          {/* Featured first item (Africa tab) */}
          {activeTab === 'africa' && displayed[0] && (
            <a
              href={displayed[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-0">
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
                      <span className="text-7xl opacity-30">🌍</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
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
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {displayed[0].snippet}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase text-emerald-600 group-hover:gap-2 transition-all">
                    <ChevronRight className="w-3.5 h-3.5" /> Read Full Story
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Grid */}
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

          {/* YouTube search CTA in video tab */}
          {activeTab === 'video' && (
            <div className="bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shrink-0">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Search more nursing videos</h4>
                  <p className="text-[11px] text-slate-500">Browse YouTube for the latest nursing exam prep, clinical skills, and Africa health news videos.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <a
                  href="https://www.youtube.com/results?search_query=nursing+health+africa+2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all"
                >
                  <Heart className="w-3 h-3" /> Africa Health
                </a>
                <a
                  href="https://www.youtube.com/results?search_query=UAE+DHA+HAAD+nursing+exam+prep+2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all"
                >
                  <Stethoscope className="w-3 h-3" /> UAE Exam Prep
                </a>
                <a
                  href="https://www.youtube.com/results?search_query=NCLEX+nursing+tips+2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-[10px] font-bold font-mono uppercase transition-all"
                >
                  <Tv2 className="w-3 h-3" /> NCLEX Tips
                </a>
              </div>
            </div>
          )}

          {/* No items fallback */}
          {items.length === 0 && !loading && !error && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No articles found for this category right now. Try refreshing.
            </div>
          )}
        </>
      )}
    </div>
  );
}
