import test from 'node:test';
import assert from 'node:assert/strict';
import { MOCK_QUESTIONS } from '../src/data/staticData';
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
