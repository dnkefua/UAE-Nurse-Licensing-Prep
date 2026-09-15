import express, { Request, Response } from 'express';
import Parser from 'rss-parser';

export function registerFeeds(app: express.Router): void {
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const rssParser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': BROWSER_UA, Accept: 'application/rss+xml, application/xml, text/xml, */*' },
  customFields: {
    item: [
      ['media:thumbnail', 'mediaThumbnail'],
      ['media:content', 'mediaContent'],
      ['yt:videoId', 'ytVideoId'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

interface FeedDef { url: string; label: string; flag: string; region: string; }

// Direct publisher feeds only — every item is a real article URL that opens and
// reads fully in-app with images. (Google News redirect links were removed: they
// only resolve in a full browser via JS and can't be read inside the app.)
const NEWS_FEEDS: Record<string, FeedDef[]> = {
  africa: [
    { url: 'https://theconversation.com/africa/topics/health-33/articles.atom', label: 'The Conversation', flag: '🌍', region: 'africa' },
    { url: 'https://reliefweb.int/updates/rss.xml?search=health%20Africa%20nurse', label: 'ReliefWeb', flag: '🌍', region: 'africa' },
    { url: 'https://healthpolicy-watch.news/feed/', label: 'Health Policy Watch', flag: '🌍', region: 'africa' },
    { url: 'https://www.afro.who.int/rss.xml', label: 'WHO Africa', flag: '🌍', region: 'africa' },
  ],
  global: [
    { url: 'https://www.who.int/rss-feeds/news-english.xml', label: 'WHO', flag: '🌐', region: 'global' },
    { url: 'https://feeds.bbci.co.uk/news/health/rss.xml', label: 'BBC Health', flag: '🇬🇧', region: 'global' },
    { url: 'https://theconversation.com/global/topics/health-1/articles.atom', label: 'The Conversation', flag: '🌐', region: 'global' },
    { url: 'https://www.statnews.com/feed/', label: 'STAT News', flag: '🔬', region: 'global' },
    { url: 'https://feeds.npr.org/1128/rss.xml', label: 'NPR Health', flag: '🇺🇸', region: 'global' },
    { url: 'https://www.medicalnewstoday.com/rss', label: 'Medical News Today', flag: '🔬', region: 'global' },
  ],
  nursing: [
    { url: 'https://www.myamericannurse.com/feed/', label: 'American Nurse', flag: '🏥', region: 'nursing' },
    { url: 'https://dailynurse.com/feed/', label: 'Daily Nurse', flag: '🩺', region: 'nursing' },
    { url: 'https://nurse.org/feed/', label: 'Nurse.org', flag: '💊', region: 'nursing' },
    { url: 'https://minoritynurse.com/feed/', label: 'Minority Nurse', flag: '🩺', region: 'nursing' },
    { url: 'https://www.nursingtimes.net/feed', label: 'Nursing Times', flag: '🏥', region: 'nursing' },
    { url: 'https://nursejournal.org/feed/', label: 'NurseJournal', flag: '💊', region: 'nursing' },
  ],
};

const YT_CHANNELS: { id: string; name: string; flag: string }[] = [
  { id: 'UCT7a_fVlSrjOs9jyvtH-uhA', name: 'WHO',               flag: '🌐' },
  { id: 'UCPyMN8DzkFl2__xnTEiGZ1w', name: 'RegisteredNurseRN', flag: '🏥' },
  { id: 'UCUxQWmWk1_Hk9iDRKvhH29Q', name: 'SimpleNursing',     flag: '💊' },
  { id: 'UC0-vwPmp-nmu_Huza_nq0AA', name: 'Osmosis',           flag: '📚' },
  { id: 'UCc_l99_kG9edqqKCyNTjrtg', name: 'Nurse Zara',        flag: '🩺' },
  { id: 'UCWRIrWg4as6umiFK_k80pIg', name: 'Africa CDC',        flag: '🌍' },
];

interface NewsOut {
  title: string; snippet: string; url: string; thumbnail: string;
  source: string; flag: string; region: string; publishedAt: string;
  type: 'article' | 'video'; videoId?: string;
}
function stripTags(s: string): string {
  return (s || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

function firstImg(html: string): string {
  const m = (html || '').match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

async function loadFeed(def: FeedDef): Promise<NewsOut[]> {
  try {
    const feed = await rssParser.parseURL(def.url);
    return (feed.items || []).slice(0, 10).map((it: any) => {
      const html = it.contentEncoded || it.content || it['content:encoded'] || '';
      const thumb =
        it.mediaThumbnail?.$?.url ||
        it.mediaContent?.$?.url ||
        (it.enclosure?.type?.startsWith('image/') ? it.enclosure.url : '') ||
        firstImg(html) || '';
      // Google News titles end with " - Source"; surface the source
      let source = def.label;
      let title = it.title || '';
      const dash = title.lastIndexOf(' - ');
      if (def.url.includes('news.google.com') && dash > 0) {
        source = title.slice(dash + 3).trim() || def.label;
        title = title.slice(0, dash).trim();
      }
      return {
        title: stripTags(title),
        snippet: stripTags(html || it.contentSnippet || '').slice(0, 240),
        url: it.link || '',
        thumbnail: thumb,
        source,
        flag: def.flag,
        region: def.region,
        publishedAt: it.isoDate || it.pubDate || '',
        type: 'article' as const,
      };
    }).filter((n: NewsOut) => n.title && n.url);
  } catch {
    return [];
  }
}

async function loadYouTube(ch: { id: string; name: string; flag: string }): Promise<NewsOut[]> {
  try {
    const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${ch.id}`, {
      headers: { 'User-Agent': BROWSER_UA, Accept: 'application/atom+xml, application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return [];
    const xml = await r.text();

    // YouTube Atom feed has a fixed structure — parse <entry> blocks directly.
    const entries = xml.split('<entry>').slice(1);
    const out: NewsOut[] = [];
    for (const e of entries.slice(0, 6)) {
      const vid = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1] || '';
      const title = (e.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
      const published = (e.match(/<published>([^<]+)<\/published>/) || [])[1] || '';
      const desc = (e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
      if (!vid || !title) continue;
      out.push({
        title: stripTags(title),
        snippet: stripTags(desc).slice(0, 180),
        url: `https://www.youtube.com/watch?v=${vid}`,
        thumbnail: `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
        source: ch.name,
        flag: ch.flag,
        region: 'video',
        publishedAt: published,
        type: 'video' as const,
        videoId: vid,
      });
    }
    return out;
  } catch {
    return [];
  }
}

// Simple in-memory cache (per warm instance)
const newsCache = new Map<string, { items: NewsOut[]; ts: number }>();
const NEWS_TTL = 15 * 60 * 1000;

// GET /api/news?tab=all|africa|global|nursing|video
app.get('/api/news', async (req: Request, res: Response) => {
  const tab = typeof req.query.tab === 'string' ? req.query.tab.toLowerCase() : 'all';
  if (!['all', 'africa', 'global', 'nursing', 'video'].includes(tab)) {
    res.status(400).json({ error: 'invalid_tab' }); return;
  }
  const cached = newsCache.get(tab);
  if (cached && Date.now() - cached.ts < NEWS_TTL) {
    res.json({ items: cached.items, cached: true });
    return;
  }

  try {
    let items: NewsOut[] = [];
    if (tab === 'video') {
      const all = await Promise.allSettled(YT_CHANNELS.map(loadYouTube));
      for (const r of all) if (r.status === 'fulfilled') items.push(...r.value);
    } else {
      const defs =
        tab === 'all'
          ? [...NEWS_FEEDS.africa, ...NEWS_FEEDS.global, ...NEWS_FEEDS.nursing]
          : NEWS_FEEDS[tab] || [];
      const all = await Promise.allSettled(defs.map(loadFeed));
      for (const r of all) if (r.status === 'fulfilled') items.push(...r.value);
      if (tab === 'all') {
        items = [
          ...items.filter(i => i.region === 'africa'),
          ...items.filter(i => i.region !== 'africa'),
        ];
      }
    }

    // Sort newest first, dedupe by title
    items.sort((a, b) => (new Date(b.publishedAt).getTime() || 0) - (new Date(a.publishedAt).getTime() || 0));
    const seen = new Set<string>();
    items = items.filter(it => {
      const k = it.title.slice(0, 60).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    newsCache.set(tab, { items, ts: Date.now() });
    res.json({ items, cached: false });
  } catch (error) {
    console.error('[news] error:', error);
    res.status(500).json({ error: 'Failed to load news.', items: [] });
  }
});

interface LiveJob {
  id: string; title: string; employer: string; logoUrl: string; city: string;
  country: string; role: string; employmentType: string; postedDate: string;
  postedTs: number; salaryRange: string; summary: string; responsibilities: string[];
  requirements: string[]; benefits: string[]; applyUrl: string; publisher: string;
  directApply: boolean; institution: boolean; verified: boolean;
}

// Recruitment-agency / resume-farm signals (employer or publisher name)
const AGENCY_RE = /\b(recruit|recruitment|consultanc|consultant|manpower|staffing|staff\s|talent|hr\s?solution|human\s?resource|placement|outsourc|workforce|resourcing|executive\s?search|headhunt|agency|maids?|domestic)\b/i;
// Genuine healthcare-institution signals
const INSTITUTION_RE = /\b(hospital|clinic|polyclinic|medical\s?cent(er|re)|medical\s?city|health\s?(care|services|system)?|healthcare|seha|cleveland|mediclinic|nmc|aster|burjeel|medeor|thumbay|prime\s?(hospital|health)|king'?s\s?college|american\s?hospital|medcare|emirates\s?health|dubai\s?health|tawam|mafraq|sheikh\s?shakhbout|fakeeh|zulekha|canadian\s?specialist|nmc\s?royal|llh)\b/i;

function inferRole(title: string): string {
  const t = title.toLowerCase();
  if (/assistant|aide|\bcna\b|care\s?assistant|patient\s?care/.test(t)) return 'Nursing Assistant';
  if (/midwife|midwifery/.test(t)) return 'Midwife';
  if (/home\s?care|home\s?health/.test(t)) return 'Home Care Nurse';
  if (/icu|ccu|critical|emergency|\ber\b|theatre|operating|oncology|dialysis|nicu|picu|specialist|charge\s?nurse|head\s?nurse/.test(t)) return 'Specialist Nurse';
  return 'Registered Nurse';
}

function fmtSalary(j: any): string {
  const cur = j.job_salary_currency || 'AED';
  const per = (j.job_salary_period || '').toLowerCase();
  const perLabel = per === 'year' ? 'year' : per === 'hour' ? 'hour' : per === 'month' ? 'month' : per || 'month';
  if (j.job_min_salary && j.job_max_salary)
    return `${cur} ${Math.round(j.job_min_salary).toLocaleString()} – ${Math.round(j.job_max_salary).toLocaleString()} / ${perLabel}`;
  if (j.job_min_salary) return `From ${cur} ${Math.round(j.job_min_salary).toLocaleString()} / ${perLabel}`;
  return 'Salary not disclosed — confirm with employer';
}

async function fetchJSearch(query: string, key: string): Promise<any[]> {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1&country=ae&date_posted=month`;
  try {
    const r = await fetch(url, {
      headers: { 'X-RapidAPI-Key': key, 'X-RapidAPI-Host': 'jsearch.p.rapidapi.com' },
      signal: AbortSignal.timeout(12000),
    });
    if (!r.ok) { console.error('[jobs] JSearch', r.status); return []; }
    const d = await r.json();
    return Array.isArray(d.data) ? d.data : [];
  } catch (e) { console.error('[jobs] JSearch error', e); return []; }
}

function normalizeJob(j: any): LiveJob | null {
  const employer = (j.employer_name || '').trim();
  const title = (j.job_title || '').trim();
  if (!title || !j.job_apply_link) return null;

  const hay = `${employer} ${j.job_publisher || ''}`;
  const institution = INSTITUTION_RE.test(hay);
  const isAgency = AGENCY_RE.test(hay) && !institution;
  const directApply = !!j.job_apply_is_direct;

  // Credibility gate: keep institutions, or direct-apply non-agency listings.
  if (!institution && !(directApply && !isAgency)) return null;

  const hl = j.job_highlights || {};
  const ts = j.job_posted_at_timestamp ? j.job_posted_at_timestamp * 1000 : Date.parse(j.job_posted_at_datetime_utc || '') || 0;

  return {
    id: j.job_id || `${employer}-${title}`.slice(0, 80),
    title,
    employer: employer || j.job_publisher || 'Employer',
    logoUrl: j.employer_logo || '',
    city: [j.job_city, j.job_state].filter(Boolean).join(', ') || 'United Arab Emirates',
    country: j.job_country || 'AE',
    role: inferRole(title),
    employmentType: (j.job_employment_type || 'FULLTIME').replace('TIME', '-time').replace('FULL', 'Full').replace('PART', 'Part').replace('CONTRACTOR', 'Contract').replace('CONTRACT', 'Contract'),
    postedDate: j.job_posted_at_datetime_utc || new Date(ts || Date.now()).toISOString(),
    postedTs: ts || Date.now(),
    salaryRange: fmtSalary(j),
    summary: (j.job_description || '').replace(/\s+/g, ' ').trim().slice(0, 1200),
    responsibilities: Array.isArray(hl.Responsibilities) ? hl.Responsibilities.slice(0, 8) : [],
    requirements: Array.isArray(hl.Qualifications) ? hl.Qualifications.slice(0, 8) : [],
    benefits: Array.isArray(hl.Benefits) ? hl.Benefits.slice(0, 8) : [],
    applyUrl: j.job_apply_link,
    publisher: j.job_publisher || '',
    directApply,
    institution,
    verified: false,
  };
}

const jobsCache = new Map<string, { items: LiveJob[]; ts: number }>();
const JOBS_TTL = 24 * 60 * 60 * 1000; // 24h — conserves the free API quota

// GET /api/jobs
app.get('/api/jobs', async (_req: Request, res: Response) => {
  const key = process.env.RAPIDAPI_KEY;
  if (!key) { res.json({ items: [], configured: false }); return; }

  const cached = jobsCache.get('all');
  if (cached && Date.now() - cached.ts < JOBS_TTL) {
    res.json({ items: cached.items, configured: true, cached: true });
    return;
  }

  try {
    const queries = [
      'registered nurse hospital United Arab Emirates',
      'staff nurse hospital Dubai',
      'registered nurse OR specialist nurse Abu Dhabi hospital',
      'nursing assistant OR patient care hospital United Arab Emirates',
    ];
    const settled = await Promise.allSettled(queries.map(q => fetchJSearch(q, key)));
    const raw: any[] = [];
    for (const s of settled) if (s.status === 'fulfilled') raw.push(...s.value);

    const seen = new Set<string>();
    let items = raw
      .map(normalizeJob)
      .filter((j): j is LiveJob => !!j)
      .filter(j => { const k = j.id || j.title; if (seen.has(k)) return false; seen.add(k); return true; });

    // Rank: institutions first, then direct-apply, then by recency
    items.sort((a, b) => {
      const score = (x: LiveJob) => (x.institution ? 2 : 0) + (x.directApply ? 1 : 0);
      const ds = score(b) - score(a);
      return ds !== 0 ? ds : b.postedTs - a.postedTs;
    });

    jobsCache.set('all', { items, ts: Date.now() });
    res.json({ items, configured: true, cached: false });
  } catch (error) {
    console.error('[jobs] error', error);
    res.status(500).json({ items: [], configured: true, error: 'Failed to load jobs.' });
  }
});

}
