/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

let aiClient: GoogleGenAI | null = null;

// Lazy initialization pattern to prevent crashes if GEMINI_API_KEY is not immediately provided
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing. Please configure it in your Secrets sidebar panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Clinical Guidance Tutor
  app.post('/api/ai-tutor', async (req, res) => {
    try {
      const { prompt, context, examType } = req.body;
      if (!prompt) {
         res.status(400).json({ error: 'Prompt is required.' });
         return;
      }

      const client = getGeminiClient();

      // Custom formatting system guidelines to guarantee a professional medical tutor tone
      const systemInstruction = `You are a qualified senior nurse instructor and clinical educator specializing in the UAE Healthcare Licensing exams (DHA, MOHAP, DOH/HAAD).
Your goal is to provide concise, accurate, and extremely clear explanations for other nurses preparing for their licensing exams.
- Tone: Highly professional, supportive, medical-expert.
- Focus: Critical clinical reasoning (delegation, prioritizing care, emergency protocols), dosage math calculations, and professional ethics within UAE regulation boundaries.
- Instructions: Use well-formatted bullet points, cite general UAE healthcare policies when relevant, and provide key takeaways for exam-day success. Keep answers within 250-400 words. Keep it scannable.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Exam Type: ${examType || 'DHA'} Nurse Practice Exam\nContext: ${context || 'None'}\nQuestion/Topic: ${prompt}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "I was unable to formulate an answer. Please verify your prompt detail.";
      res.json({ text: responseText });
    } catch (error) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: error instanceof Error ? error.message : 'An query evaluation error occurred in the clinical AI module.'
      });
    }
  });

  // Global Access Code management system
  let globalAccessCode = 'UAE-NURSE-2026';
  const ADMIN_EMAILS = ['loveline082022@gmail.com', 'uncledez8@gmail.com'];

  // API Route: Validate access code
  app.post('/api/validate-code', (req, res) => {
    const { code } = req.body;
    if (!code) {
      res.status(400).json({ error: 'Code is required.' });
      return;
    }
    const isValid = code.trim().toUpperCase() === globalAccessCode.trim().toUpperCase();
    res.json({ valid: isValid });
  });

  // API Route: Get active access code (Restricted to verified admins)
  app.post('/api/admin/get-code', (req, res) => {
    const { email } = req.body;
    if (!email || !ADMIN_EMAILS.includes(email)) {
      res.status(403).json({ error: 'Unauthorized credentials.' });
      return;
    }
    res.json({ code: globalAccessCode });
  });

  // API Route: Update active access code (Restricted to verified admins)
  app.post('/api/admin/set-code', (req, res) => {
    const { email, code } = req.body;
    if (!email || !ADMIN_EMAILS.includes(email)) {
      res.status(403).json({ error: 'Unauthorized credentials.' });
      return;
    }
    if (!code || code.trim().length === 0) {
      res.status(400).json({ error: 'New access code cannot be empty.' });
      return;
    }
    globalAccessCode = code.trim().toUpperCase();
    res.json({ success: true, code: globalAccessCode });
  });

  // API Route: Health Status Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Vite integration middleware setup
  if (process.env.NODE_ENV !== 'production' && process.env.DISABLE_HMR !== 'true') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-Stack Node Server listening at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
