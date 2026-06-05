/**
 * UAE Nurse Prep — Firebase Cloud Functions
 * All /api/* Express routes served as a single Cloud Function.
 * Access code persistence uses Firestore (Admin SDK bypasses security rules).
 */

import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import { GoogleGenAI } from '@google/genai';
import express, { Request, Response } from 'express';
import cors from 'cors';
import Parser from 'rss-parser';

// ── Firebase Admin ────────────────────────────────────────────────────────────
admin.initializeApp();
const db = admin.firestore();

// ── Constants ─────────────────────────────────────────────────────────────────
const ADMIN_EMAILS = ['loveline082022@gmail.com', 'uncledez8@gmail.com'];
const DEFAULT_CODE = 'UAE-NURSE-2026';
const CONFIG_DOC   = 'appConfig/system';

// ── Gemini client (lazy) ──────────────────────────────────────────────────────
let geminiClient: GoogleGenAI | null = null;

function getGemini(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY secret is not configured. Run: firebase functions:secrets:set GEMINI_API_KEY');
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return geminiClient;
}

// ── Firestore helpers ─────────────────────────────────────────────────────────
async function getAccessCode(): Promise<string> {
  try {
    const snap = await db.doc(CONFIG_DOC).get();
    return snap.exists ? (snap.data()?.accessCode ?? DEFAULT_CODE) : DEFAULT_CODE;
  } catch {
    return DEFAULT_CODE;
  }
}

async function setAccessCode(code: string): Promise<void> {
  await db.doc(CONFIG_DOC).set(
    { accessCode: code, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
    { merge: true }
  );
}

// ── Express app ───────────────────────────────────────────────────────────────
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date().toISOString(), runtime: 'cloud-function' });
});

// ── News aggregation (server-side: no CORS, reliable) ──────────────────────────

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
  const tab = String(req.query.tab || 'all').toLowerCase();
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

// Pull a meta value from <head> by property/name
function metaContent(html: string, keys: string[]): string {
  for (const k of keys) {
    const re = new RegExp(
      `<meta[^>]+(?:property|name)=["']${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*content=["']([^"']+)["']`,
      'i'
    );
    const m = html.match(re) ||
      html.match(new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
        'i'
      ));
    if (m && m[1]) return m[1].replace(/&amp;/g, '&').trim();
  }
  return '';
}

// GET /api/article?url=...  → { html, finalUrl, meta } for the in-app reader
app.get('/api/article', async (req: Request, res: Response) => {
  const url = String(req.query.url || '');
  if (!/^https?:\/\//i.test(url)) {
    res.status(400).json({ error: 'Valid url required.' });
    return;
  }
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': BROWSER_UA, Accept: 'text/html,*/*' },
      redirect: 'follow',
      signal: AbortSignal.timeout(9000),
    });
    if (!r.ok) {
      res.status(502).json({ error: `Upstream ${r.status}` });
      return;
    }
    const html = await r.text();
    const head = html.slice(0, 60000); // meta tags live in <head>

    const meta = {
      image:    metaContent(head, ['og:image', 'twitter:image', 'twitter:image:src']),
      author:   metaContent(head, ['author', 'article:author', 'twitter:creator', 'dc.creator']),
      siteName: metaContent(head, ['og:site_name', 'application-name']),
      title:    metaContent(head, ['og:title', 'twitter:title']),
      published: metaContent(head, ['article:published_time', 'datePublished', 'og:updated_time']),
    };

    res.set('Cache-Control', 'public, max-age=900');
    res.json({ html, finalUrl: r.url || url, meta });
  } catch (error) {
    console.error('[article] error:', error);
    res.status(500).json({ error: 'Failed to fetch article.' });
  }
});

// ── Live UAE nursing jobs (JSearch / Google-for-Jobs) ──────────────────────────
// Credibility-filtered: favours direct hospital / health-system / HR postings
// and drops recruiter "resume-farming" listings.

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
    verified: institution,
  };
}

const jobsCache = new Map<string, { items: LiveJob[]; ts: number }>();
const JOBS_TTL = 12 * 60 * 60 * 1000; // 12h — conserves the free API quota

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
      'staff nurse OR nursing assistant United Arab Emirates',
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

// POST /api/ai-tutor
app.post('/api/ai-tutor', async (req: Request, res: Response) => {
  const { prompt, context, examType } = req.body as {
    prompt?: string;
    context?: string;
    examType?: string;
  };

  if (!prompt) {
    res.status(400).json({ error: 'prompt is required.' });
    return;
  }

  try {
    const client = getGemini();

    const systemInstruction = `You are a qualified senior nurse instructor and clinical educator specialising in UAE Healthcare Licensing exams (DHA, MOHAP, DOH/HAAD).
Your goal is to provide concise, accurate, and extremely clear explanations for nurses preparing for their licensing exams.
- Tone: Highly professional, supportive, medical-expert.
- Focus: Critical clinical reasoning (delegation, prioritising care, emergency protocols), dosage math calculations, and professional ethics within UAE regulation boundaries.
- Instructions: Use well-formatted bullet points, cite general UAE healthcare policies when relevant, and provide key takeaways for exam-day success. Keep answers within 250-400 words. Keep it scannable.`;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Exam Type: ${examType ?? 'DHA'} Nurse Practice Exam\nContext: ${context ?? 'None'}\nQuestion/Topic: ${prompt}`,
      config: { systemInstruction, temperature: 0.7 }
    });

    res.json({ text: response.text ?? 'Unable to generate a response. Please try again.' });
  } catch (error) {
    console.error('[ai-tutor] Gemini error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'AI query error occurred.'
    });
  }
});

// POST /api/validate-code
app.post('/api/validate-code', async (req: Request, res: Response) => {
  const { code } = req.body as { code?: string };
  if (!code) {
    res.status(400).json({ error: 'code is required.' });
    return;
  }

  const active  = await getAccessCode();
  const isValid = code.trim().toUpperCase() === active.trim().toUpperCase();
  res.json({ valid: isValid });
});

// POST /api/admin/get-code  (admin only)
app.post('/api/admin/get-code', async (req: Request, res: Response) => {
  const { email } = req.body as { email?: string };
  if (!email || !ADMIN_EMAILS.includes(email)) {
    res.status(403).json({ error: 'Unauthorized.' });
    return;
  }
  const code = await getAccessCode();
  res.json({ code });
});

// POST /api/admin/set-code  (admin only)
app.post('/api/admin/set-code', async (req: Request, res: Response) => {
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !ADMIN_EMAILS.includes(email)) {
    res.status(403).json({ error: 'Unauthorized.' });
    return;
  }
  if (!code?.trim()) {
    res.status(400).json({ error: 'New code cannot be empty.' });
    return;
  }

  const newCode = code.trim().toUpperCase();
  try {
    await setAccessCode(newCode);
    res.json({ success: true, code: newCode });
  } catch (error) {
    console.error('[set-code] Firestore error:', error);
    res.status(500).json({ error: 'Failed to update access code.' });
  }
});

// ── Export Cloud Function ─────────────────────────────────────────────────────
export const api = onRequest(
  {
    region:         'us-central1',
    memory:         '256MiB',
    timeoutSeconds: 60,
    secrets:        ['GEMINI_API_KEY', 'RAPIDAPI_KEY'],  // bound to process.env.*
    cors:           true,
  },
  app
);
