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
      model: 'gemini-2.0-flash',
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
    secrets:        ['GEMINI_API_KEY'],  // binds the secret to process.env.GEMINI_API_KEY
    cors:           true,
  },
  app
);
