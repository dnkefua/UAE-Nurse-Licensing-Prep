import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import type { Question } from '../src/types';
import { attemptQuestions, createAttempt, examResults, expireAttempt, fisherYates, parseAttempt, updateAttempt } from '../src/lib/exam';
import { nextStreak } from '../src/lib/progress';

if (!globalThis.crypto) Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
const bank: Question[] = [
  { id: 1, examType: 'DHA', category: 'Safety', question: 'Which action is safest?', options: ['First', 'Second', 'Third', 'Fourth'], correctIndex: 2, rationale: 'Third is safest.' },
  { id: 2, examType: 'DHA', category: 'Safety', question: 'Which value is expected?', options: ['One', 'Two', 'Three', 'Four'], correctIndex: 0, rationale: 'One is expected.' },
];

test('Fisher-Yates returns a permutation without changing its input', () => {
  const source = [1, 2, 3, 4]; const shuffled = fisherYates(source, () => 0);
  assert.deepEqual(source, [1, 2, 3, 4]); assert.deepEqual([...shuffled].sort(), source); assert.notDeepEqual(shuffled, source);
});

test('display option shuffling preserves the correct-answer mapping', () => {
  const attempt = createAttempt(bank, 'guest', 'DHA', false, 1_000, () => 0);
  const displayed = attemptQuestions(attempt, bank);
  for (const question of displayed) {
    const original = bank.find(item => item.id === question.id)!;
    assert.equal(question.options[question.correctIndex], original.options[original.correctIndex]);
  }
});

test('timed attempts expire at the persisted deadline and cannot accept answers', () => {
  const started = 10_000; const attempt = createAttempt(bank, 'guest', 'DHA', true, started, () => 0);
  const expired = expireAttempt(attempt, attempt.deadline! + 1);
  assert.equal(expired.completedAt, attempt.deadline); assert.equal(expired.autoSubmitted, true);
  assert.deepEqual(updateAttempt(expired, { type: 'answer', questionId: 1, optionIndex: 0 }), expired);
});

test('damaged persisted attempts are rejected', () => {
  const attempt = createAttempt(bank, 'guest', 'DHA', false, 1_000, () => 0);
  const damaged = { ...attempt, order: [{ ...attempt.order[0], optionOrder: [0, 0, 2, 3] }, attempt.order[1]] };
  assert.equal(parseAttempt(JSON.stringify(damaged), 'guest', bank, 2_000), null);
});

test('results include unanswered questions and domain performance', () => {
  const result = examResults(bank, { 1: 2 });
  assert.deepEqual({ correct: result.correct, total: result.total, unanswered: result.unanswered, score: result.score }, { correct: 1, total: 2, unanswered: 1, score: 50 });
  assert.equal(result.domains[0].category, 'Safety');
});

test('daily streak increments once per Dubai study date and resets after a gap', () => {
  assert.equal(nextStreak('2026-09-14', 4, '2026-09-15'), 5);
  assert.equal(nextStreak('2026-09-15', 5, '2026-09-15'), 5);
  assert.equal(nextStreak('2026-09-10', 5, '2026-09-15'), 1);
});
