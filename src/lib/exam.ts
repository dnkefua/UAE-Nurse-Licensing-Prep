import type { ExamType, Question } from '../types';

export const ASSESSMENT_VERSION = 'practice-v2' as const;
export const PRACTICE_MINUTES = 165;
const EXAM_TYPES: ExamType[] = ['DHA', 'MOH', 'HAAD_DOH'];
const MAX_DRAFT_LENGTH = 500_000;

export interface ExamAttempt {
  version: 2;
  assessmentVersion: typeof ASSESSMENT_VERSION;
  attemptId: string;
  scope: string;
  examType: ExamType;
  bankFingerprint: string;
  order: { questionId: number; optionOrder: number[] }[];
  answers: Record<number, number>; // Indices in the persisted DISPLAY order.
  reviewed: number[];
  currentIndex: number;
  startedAt: number;
  deadline: number | null;
  completedAt: number | null;
  autoSubmitted: boolean;
  scoreSaved: boolean;
}

export function examScope(userId?: string): string {
  return userId ? `user:${userId}` : 'guest';
}

export function attemptStorageKey(scope: string): string {
  return `nurse-prep:exam:${ASSESSMENT_VERSION}:${encodeURIComponent(scope)}`;
}

const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const record = (value: unknown): value is Record<string, any> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const integer = (value: unknown): value is number => Number.isSafeInteger(value);

/** Structural checks cannot establish clinical accuracy. Position-dependent items
 * are excluded because changing their option order would change their meaning. */
export function auditQuestionBank(bank: readonly Question[], examType: ExamType) {
  const pool = bank.filter(q => q?.examType === examType);
  const counts = new Map<number, number>();
  pool.forEach(q => counts.set(q.id, (counts.get(q.id) ?? 0) + 1));
  const questions = pool.filter(q => {
    if (!integer(q.id) || q.id < 0 || counts.get(q.id) !== 1 ||
      !nonempty(q.question) || !nonempty(q.rationale) || !nonempty(q.category) ||
      !Array.isArray(q.options) || q.options.length < 2 || q.options.length > 10 ||
      !q.options.every(nonempty) || !integer(q.correctIndex) ||
      q.correctIndex < 0 || q.correctIndex >= q.options.length) return false;
    if (new Set(q.options.map(o => o.trim().toLowerCase())).size !== q.options.length) return false;
    const positional = /\b(?:all|none|both|any)\s+(?:(?:of\s+)?(?:the\s+)?)?(?:above|below)\b|\b(?:option|answer|choice)s?\s+[A-J]\b|\b[A-J]\s+(?:and|or|&)\s+[A-J]\b/i;
    return ![q.question, q.rationale, ...q.options].some(text => positional.test(text));
  });
  return { questions, excluded: pool.length - questions.length };
}

/** Change detector, not a signature or an anti-tampering security boundary. */
function fingerprint(questions: readonly Question[]): string {
  const content = JSON.stringify(questions.map(q => [q.id, q.question, q.options, q.correctIndex, q.rationale, q.category]));
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) hash = Math.imul(hash ^ content.charCodeAt(i), 16777619);
  return `${content.length}:${hash >>> 0}`;
}

/** Rejection sampling avoids modulo bias when choosing Fisher–Yates swaps. */
export function cryptoRandomInt(upperExclusive: number): number {
  if (!integer(upperExclusive) || upperExclusive < 1 || upperExclusive > 0x100000000) {
    throw new Error('Invalid shuffle range.');
  }
  const limit = Math.floor(0x100000000 / upperExclusive) * upperExclusive;
  const bytes = new Uint32Array(1);
  do { globalThis.crypto.getRandomValues(bytes); } while (bytes[0] >= limit);
  return bytes[0] % upperExclusive;
}

export function fisherYates<T>(items: readonly T[], randomInt = cryptoRandomInt): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    if (!integer(j) || j < 0 || j > i) throw new Error('Invalid shuffle source.');
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createAttempt(
  bank: readonly Question[], scope: string, examType: ExamType, timed: boolean,
  now = Date.now(), randomInt = cryptoRandomInt,
): ExamAttempt {
  const { questions } = auditQuestionBank(bank, examType);
  if (!questions.length) throw new Error('No valid practice questions are available for this exam.');
  return {
    version: 2, assessmentVersion: ASSESSMENT_VERSION,
    attemptId: globalThis.crypto.randomUUID(), scope, examType,
    bankFingerprint: fingerprint(questions),
    order: fisherYates(questions, randomInt).map(q => ({
      questionId: q.id, optionOrder: fisherYates(q.options.map((_, index) => index), randomInt),
    })),
    answers: {}, reviewed: [], currentIndex: 0, startedAt: now,
    deadline: timed ? now + PRACTICE_MINUTES * 60_000 : null,
    completedAt: null, autoSubmitted: false, scoreSaved: false,
  };
}

export function attemptQuestions(attempt: ExamAttempt, bank: readonly Question[]): Question[] {
  const byId = new Map(bank.filter(q => q.examType === attempt.examType).map(q => [q.id, q]));
  return attempt.order.map(({ questionId, optionOrder }) => {
    const q = byId.get(questionId);
    if (!q) throw new Error('The question bank has changed.');
    return { ...q, options: optionOrder.map(i => q.options[i]), correctIndex: optionOrder.indexOf(q.correctIndex) };
  });
}

export function expireAttempt(attempt: ExamAttempt, now = Date.now()): ExamAttempt {
  return attempt.completedAt === null && attempt.deadline !== null && now >= attempt.deadline
    ? { ...attempt, completedAt: attempt.deadline, autoSubmitted: true }
    : attempt;
}

export function finishAttempt(attempt: ExamAttempt, now = Date.now()): ExamAttempt {
  const current = expireAttempt(attempt, now);
  return current.completedAt !== null ? current : { ...current, completedAt: Math.max(current.startedAt, now) };
}

export function attemptSeconds(attempt: ExamAttempt, now = Date.now()): number {
  const end = attempt.completedAt ?? now;
  return attempt.deadline !== null
    ? Math.max(0, Math.ceil((attempt.deadline - end) / 1000))
    : Math.max(0, Math.floor((end - attempt.startedAt) / 1000));
}

export type AttemptAction =
  | { type: 'answer'; questionId: number; optionIndex: number }
  | { type: 'reveal'; questionId: number }
  | { type: 'navigate'; index: number };

export function updateAttempt(attempt: ExamAttempt, action: AttemptAction, now = Date.now()): ExamAttempt {
  const current = expireAttempt(attempt, now);
  if (action.type === 'navigate') {
    return integer(action.index) && action.index >= 0 && action.index < current.order.length
      ? { ...current, currentIndex: action.index } : current;
  }
  if (current.completedAt !== null) return current;
  const item = current.order.find(q => q.questionId === action.questionId);
  if (!item || current.reviewed.includes(action.questionId)) return current;
  if (action.type === 'reveal') {
    return current.deadline === null && current.answers[action.questionId] !== undefined
      ? { ...current, reviewed: [...current.reviewed, action.questionId] } : current;
  }
  if (!integer(action.optionIndex) || action.optionIndex < 0 || action.optionIndex >= item.optionOrder.length) return current;
  return { ...current, answers: { ...current.answers, [action.questionId]: action.optionIndex } };
}

export function examResults(questions: readonly Question[], answers: Record<number, number>) {
  const domains = new Map<string, { category: string; correct: number; total: number; unanswered: number; score: number }>();
  let correct = 0;
  let unanswered = 0;
  questions.forEach(q => {
    const domain = domains.get(q.category) ?? { category: q.category, correct: 0, total: 0, unanswered: 0, score: 0 };
    domain.total++;
    if (answers[q.id] === undefined) { unanswered++; domain.unanswered++; }
    if (answers[q.id] === q.correctIndex) { correct++; domain.correct++; }
    domain.score = Math.round(domain.correct / domain.total * 100);
    domains.set(q.category, domain);
  });
  const performance = [...domains.values()].sort((a, b) =>
    a.correct / a.total - b.correct / b.total || b.total - a.total || a.category.localeCompare(b.category));
  return {
    correct, total: questions.length, unanswered,
    score: questions.length ? Math.round(correct / questions.length * 100) : 0,
    domains: performance,
    weakTopic: performance.find(d => d.correct < d.total)?.category ?? null,
  };
}

/** Never trust JSON from localStorage: validate identity, bank, permutations,
 * indices, state transitions and timestamps before rendering or scoring it. */
export function parseAttempt(raw: string, scope: string, bank: readonly Question[], now = Date.now()): ExamAttempt | null {
  try {
    if (raw.length > MAX_DRAFT_LENGTH) return null;
    const a: unknown = JSON.parse(raw);
    if (!record(a) || a.version !== 2 || a.assessmentVersion !== ASSESSMENT_VERSION || a.scope !== scope ||
      typeof a.attemptId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(a.attemptId) ||
      !EXAM_TYPES.includes(a.examType) || !integer(a.startedAt) || a.startedAt < 0 || a.startedAt > now + 60_000 ||
      (a.deadline !== null && a.deadline !== a.startedAt + PRACTICE_MINUTES * 60_000) ||
      !Number.isSafeInteger(a.deadline ?? a.startedAt) ||
      (a.completedAt !== null && (!integer(a.completedAt) || a.completedAt < a.startedAt || a.completedAt > now + 60_000 ||
        (a.deadline !== null && a.completedAt > a.deadline))) ||
      typeof a.autoSubmitted !== 'boolean' || typeof a.scoreSaved !== 'boolean' ||
      (a.autoSubmitted && (a.deadline === null || a.completedAt !== a.deadline)) ||
      (a.completedAt === null && a.scoreSaved)) return null;
    const { questions } = auditQuestionBank(bank, a.examType);
    if (!questions.length || a.bankFingerprint !== fingerprint(questions) || !Array.isArray(a.order) ||
      a.order.length !== questions.length || !integer(a.currentIndex) || a.currentIndex < 0 || a.currentIndex >= a.order.length) return null;
    const byId = new Map(questions.map(q => [q.id, q]));
    const seen = new Set<number>();
    for (const item of a.order) {
      if (!record(item) || !integer(item.questionId) || seen.has(item.questionId)) return null;
      const q = byId.get(item.questionId);
      if (!q || !Array.isArray(item.optionOrder) || item.optionOrder.length !== q.options.length ||
        new Set(item.optionOrder).size !== q.options.length ||
        !item.optionOrder.every(i => integer(i) && i >= 0 && i < q.options.length)) return null;
      seen.add(item.questionId);
    }
    if (!record(a.answers) || !Object.entries(a.answers).every(([id, answer]) =>
      seen.has(Number(id)) && String(Number(id)) === id && integer(answer) && answer >= 0 && answer < byId.get(Number(id))!.options.length)) return null;
    if (!Array.isArray(a.reviewed) || new Set(a.reviewed).size !== a.reviewed.length ||
      (a.deadline !== null && a.reviewed.length > 0) ||
      !a.reviewed.every(id => integer(id) && seen.has(id) && Object.hasOwn(a.answers, id))) return null;
    // Copy only known fields, dropping any extra stored properties.
    return expireAttempt({
      version: 2, assessmentVersion: ASSESSMENT_VERSION, attemptId: a.attemptId, scope, examType: a.examType,
      bankFingerprint: a.bankFingerprint,
      order: a.order.map(item => ({ questionId: item.questionId, optionOrder: [...item.optionOrder] })),
      answers: { ...a.answers }, reviewed: [...a.reviewed], currentIndex: a.currentIndex,
      startedAt: a.startedAt, deadline: a.deadline, completedAt: a.completedAt,
      autoSubmitted: a.autoSubmitted, scoreSaved: a.scoreSaved,
    }, now);
  } catch { return null; }
}

type DraftStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
export type DraftLoad = { status: 'empty' | 'invalid' | 'unavailable'; attempt: null } | { status: 'ready'; attempt: ExamAttempt };

// Accessing window.localStorage itself can throw in restricted browsers.
export function loadAttempt(scope: string, bank: readonly Question[], storage: () => DraftStorage, now = Date.now()): DraftLoad {
  try {
    const raw = storage().getItem(attemptStorageKey(scope));
    if (raw === null) return { status: 'empty', attempt: null };
    const attempt = parseAttempt(raw, scope, bank, now);
    return attempt ? { status: 'ready', attempt } : { status: 'invalid', attempt: null };
  } catch { return { status: 'unavailable', attempt: null }; }
}

export function persistAttempt(attempt: ExamAttempt, storage: () => DraftStorage): boolean {
  try { storage().setItem(attemptStorageKey(attempt.scope), JSON.stringify(attempt)); return true; }
  catch { return false; }
}

export function discardAttempt(scope: string, storage: () => DraftStorage): boolean {
  try { storage().removeItem(attemptStorageKey(scope)); return true; }
  catch { return false; }
}
