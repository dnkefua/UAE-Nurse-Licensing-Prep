import test from 'node:test';
import assert from 'node:assert/strict';
import { JOB_EMPLOYERS, JOB_POSTINGS, MOCK_QUESTIONS, SCHOLARSHIPS, WORKSHOPS } from '../src/data/staticData';
import { auditQuestionBank } from '../src/lib/exam';
import type { ExamType } from '../src/types';

test('each assessment exposes exactly 150 structurally valid unique questions', () => {
  for (const examType of ['DHA', 'MOH', 'HAAD_DOH'] as ExamType[]) {
    const audit = auditQuestionBank(MOCK_QUESTIONS, examType);
    assert.equal(audit.excluded, 0, `${examType} has excluded questions`);
    assert.equal(audit.questions.length, 150, `${examType} does not have 150 questions`);
    assert.equal(new Set(audit.questions.map(question => question.id)).size, 150);
  }
});

test('the assessment bank contains no empty rationales or duplicate options', () => {
  for (const question of MOCK_QUESTIONS) {
    assert.ok(question.rationale.trim(), `question ${question.id} has no rationale`);
    assert.equal(new Set(question.options.map(option => option.trim().toLowerCase())).size, question.options.length, `question ${question.id} has duplicate options`);
  }
});

test('opportunity cards use unique official HTTPS sources with verification metadata', () => {
  const opportunities = [...WORKSHOPS, ...SCHOLARSHIPS];
  assert.equal(new Set(opportunities.map(item => item.id)).size, opportunities.length);
  for (const item of opportunities) {
    const url = new URL(item.url);
    assert.equal(url.protocol, 'https:', `${item.id} does not use HTTPS`);
    assert.match(item.verifiedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(item.status, `${item.id} has no status`);
  }
});

test('jobs contain no static vacancy claims and all employer links are verified official sources', () => {
  assert.equal(JOB_POSTINGS.length, 0);
  assert.ok(JOB_EMPLOYERS.length >= 5);
  for (const employer of JOB_EMPLOYERS) {
    assert.equal(employer.verified, true, `${employer.id} is not verified`);
    assert.match(employer.verifiedOn, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new URL(employer.careersUrl).protocol, 'https:');
  }
});
