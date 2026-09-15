import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, Award, BookOpen, CheckCircle2, Clock, RefreshCw, Save, Timer } from 'lucide-react';
import { MOCK_QUESTIONS } from '../data/staticData';
import type { ExamType, TestAttempt } from '../types';
import {
  ASSESSMENT_VERSION, attemptQuestions, attemptSeconds, auditQuestionBank, createAttempt,
  discardAttempt, examResults, examScope, expireAttempt, finishAttempt, loadAttempt,
  persistAttempt, updateAttempt, type ExamAttempt,
} from '../lib/exam';

interface TestsProps {
  onSaveAttempt: (examType: ExamType, score: number, correct: number, total: number, attemptId?: string, assessmentVersion?: string, completedAt?: string) => Promise<void>;
  userId?: string;
  testAttempts: TestAttempt[];
}

const EXAMS: Record<ExamType, { label: string; place: string }> = {
  DHA: { label: 'DHA practice', place: 'Dubai' }, MOH: { label: 'MOHAP practice', place: 'Northern Emirates' }, HAAD_DOH: { label: 'DOH practice', place: 'Abu Dhabi' },
};
const storage = () => window.localStorage;
const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export default function Tests({ onSaveAttempt, userId, testAttempts }: TestsProps) {
  const scope = examScope(userId);
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [draft, setDraft] = useState<ExamAttempt | null>(null);
  const [draftNotice, setDraftNotice] = useState('');
  const [now, setNow] = useState(Date.now());
  const [saving, setSaving] = useState(false); const [message, setMessage] = useState('');

  useEffect(() => {
    const loaded = loadAttempt(scope, MOCK_QUESTIONS, storage);
    setDraft(loaded.attempt);
    if (loaded.status === 'invalid') { discardAttempt(scope, storage); setDraftNotice('An outdated or damaged draft was removed safely.'); }
    if (loaded.status === 'unavailable') setDraftNotice('Draft recovery is unavailable in this browser.');
  }, [scope]);
  useEffect(() => { if (attempt) persistAttempt(attempt, storage); }, [attempt]);
  useEffect(() => {
    if (!attempt) return;
    if (attempt.completedAt !== null) return;
    const timer = window.setInterval(() => { const time = Date.now(); setNow(time); setAttempt(current => current ? expireAttempt(current, time) : null); }, 1000);
    return () => clearInterval(timer);
  }, [attempt?.attemptId, attempt?.completedAt]);

  const questions = useMemo(() => attempt ? attemptQuestions(attempt, MOCK_QUESTIONS) : [], [attempt]);
  const result = useMemo(() => examResults(questions, attempt?.answers || {}), [questions, attempt?.answers]);
  const current = attempt ? questions[attempt.currentIndex] : null;

  const start = (examType: ExamType, timed: boolean) => {
    const next = createAttempt(MOCK_QUESTIONS, scope, examType, timed); setAttempt(next); setDraft(null); setNow(Date.now()); setMessage(''); persistAttempt(next, storage);
  };
  const abandon = () => { discardAttempt(scope, storage); setAttempt(null); setDraft(null); setMessage(''); };
  const save = async () => {
    if (!attempt || attempt.completedAt === null || attempt.scoreSaved) return;
    setSaving(true); setMessage('');
    try {
      await onSaveAttempt(attempt.examType, result.score, result.correct, result.total, attempt.attemptId, ASSESSMENT_VERSION, new Date(attempt.completedAt).toISOString());
      const saved = { ...attempt, scoreSaved: true }; setAttempt(saved); persistAttempt(saved, storage); setMessage('Result saved to your profile.');
    } catch { setMessage('The result could not be saved. It remains on this device so you can retry.'); }
    finally { setSaving(false); }
  };

  if (!attempt) return <div className="space-y-6">
    <header><h2 className="text-xl font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-700" />Practice assessments</h2><p className="text-xs text-slate-600 mt-1">Independent study questions, not official exam items. Exam rules and pass requirements must be confirmed with the relevant authority.</p></header>
    {draftNotice && <p role="status" className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm">{draftNotice}</p>}
    {draft && <section className="p-5 bg-blue-50 border border-blue-200 rounded-2xl"><h3 className="font-bold">Resume saved {EXAMS[draft.examType].label}</h3><p className="text-sm mt-1">Question {draft.currentIndex + 1} of {draft.order.length}{draft.completedAt ? ' · completed result' : ''}</p><div className="flex gap-2 mt-3"><button onClick={() => { setAttempt(draft); setDraft(null); }} className="p-3 bg-blue-700 text-white rounded-xl">Resume</button><button onClick={abandon} className="p-3 border rounded-xl">Discard</button></div></section>}
    <div className="grid md:grid-cols-3 gap-4">{(Object.keys(EXAMS) as ExamType[]).map(type => { const audit = auditQuestionBank(MOCK_QUESTIONS, type); return <section key={type} className="bg-white border rounded-2xl p-5 space-y-4"><div><h3 className="font-bold">{EXAMS[type].label}</h3><p className="text-xs text-slate-500">{EXAMS[type].place} · {audit.questions.length} validated questions{audit.excluded ? ` · ${audit.excluded} excluded by structural checks` : ''}</p></div><button onClick={() => start(type, false)} className="w-full p-3 bg-blue-700 text-white rounded-xl">Self-paced practice</button><button onClick={() => start(type, true)} className="w-full p-3 bg-slate-900 text-white rounded-xl flex justify-center gap-2"><Timer className="w-4 h-4" />165-minute simulation</button></section>; })}</div>
    {testAttempts.length > 0 && <section className="bg-white border rounded-2xl p-5 overflow-x-auto"><h3 className="font-bold mb-3">Saved results</h3><table className="w-full text-sm"><thead><tr className="text-left border-b"><th className="p-2">Assessment</th><th>Score</th><th>Correct</th><th>Date</th></tr></thead><tbody>{testAttempts.map(item => <tr key={item.id} className="border-b"><td className="p-2">{item.examType}</td><td>{item.score}%</td><td>{item.correctAnswers}/{item.totalQuestions}</td><td>{new Date(item.completedAt).toLocaleDateString('en-AE')}</td></tr>)}</tbody></table></section>}
  </div>;

  if (attempt.completedAt !== null) return <div className="space-y-6">
    <header className="text-center bg-white border rounded-2xl p-7"><Award className="w-12 h-12 text-blue-700 mx-auto" /><h2 className="text-2xl font-bold mt-2">{attempt.autoSubmitted ? 'Time expired' : 'Assessment complete'}</h2><p className="text-4xl font-black mt-3">{result.score}%</p><p className="text-sm text-slate-600">{result.correct} correct · {result.unanswered} unanswered · {result.total} total</p>{result.weakTopic && <p className="text-sm mt-3">Suggested review area: <strong>{result.weakTopic}</strong></p>}</header>
    <section className="bg-white border rounded-2xl p-5"><h3 className="font-bold mb-3">Performance by topic</h3><div className="grid sm:grid-cols-2 gap-2">{result.domains.map(domain => <div key={domain.category} className="p-3 bg-slate-50 rounded-xl flex justify-between text-sm"><span>{domain.category}</span><strong>{domain.correct}/{domain.total} ({domain.score}%)</strong></div>)}</div></section>
    <section className="bg-white border rounded-2xl p-5 space-y-3"><h3 className="font-bold">Review answers and rationales</h3>{questions.map((question, index) => { const answer = attempt.answers[question.id]; const correct = answer === question.correctIndex; return <details key={question.id} className="border rounded-xl p-3"><summary className="cursor-pointer font-semibold flex gap-2"><span>{index + 1}.</span><span className={correct ? 'text-emerald-700' : 'text-rose-700'}>{correct ? 'Correct' : answer === undefined ? 'Unanswered' : 'Incorrect'} — {question.category}</span></summary><div className="mt-3 text-sm space-y-2"><p>{question.question}</p><p><strong>Your answer:</strong> {answer === undefined ? 'No answer' : question.options[answer]}</p><p><strong>Correct answer:</strong> {question.options[question.correctIndex]}</p><p className="p-3 bg-emerald-50 rounded-lg"><strong>Rationale:</strong> {question.rationale}</p></div></details>; })}</section>
    <div className="flex flex-wrap gap-3"><button disabled={saving || attempt.scoreSaved} onClick={() => void save()} className="p-3 bg-blue-700 disabled:bg-slate-400 text-white rounded-xl flex gap-2"><Save className="w-4 h-4" />{attempt.scoreSaved ? 'Result saved' : saving ? 'Saving…' : 'Save result'}</button><button onClick={abandon} className="p-3 border rounded-xl">Finish and close</button></div>{message && <p role="status" className="p-3 bg-slate-100 rounded-xl">{message}</p>}
  </div>;

  if (!current) return <p role="alert">This assessment cannot be displayed. Discard it and start again.</p>;
  const selected = attempt.answers[current.id]; const reviewed = attempt.reviewed.includes(current.id); const remaining = attemptSeconds(attempt, now);
  return <div className="space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold">{EXAMS[attempt.examType].label}</h2><p className="text-xs text-slate-500">Question {attempt.currentIndex + 1} of {questions.length} · {Object.keys(attempt.answers).length} answered</p></div><div className="font-mono flex gap-2 items-center"><Clock className="w-4 h-4" />{formatTime(remaining)} {attempt.deadline ? 'remaining' : 'elapsed'}</div></header>
    <div className="h-2 bg-slate-200 rounded"><div className="h-2 bg-blue-700 rounded" style={{ width: `${(attempt.currentIndex + 1) / questions.length * 100}%` }} /></div>
    <section className="bg-white border rounded-2xl p-6 space-y-5"><div><span className="text-xs text-blue-700 font-semibold">{current.category}</span><h3 className="font-semibold mt-2">{current.question}</h3></div><div className="space-y-2">{current.options.map((option, index) => { let style = 'border-slate-200 hover:bg-slate-50'; if (selected === index) style = 'border-blue-500 bg-blue-50'; if (reviewed && index === current.correctIndex) style = 'border-emerald-500 bg-emerald-50'; else if (reviewed && selected === index) style = 'border-rose-500 bg-rose-50'; return <button key={index} disabled={reviewed} onClick={() => setAttempt(value => value && updateAttempt(value, { type: 'answer', questionId: current.id, optionIndex: index }))} className={`w-full p-3 text-left border rounded-xl ${style}`}>{String.fromCharCode(65 + index)}. {option}</button>; })}</div>
      {reviewed && <div className="p-4 bg-emerald-50 rounded-xl text-sm"><strong>Rationale:</strong> {current.rationale}</div>}
      {!attempt.deadline && selected !== undefined && !reviewed && <button onClick={() => setAttempt(value => value && updateAttempt(value, { type: 'reveal', questionId: current.id }))} className="p-3 bg-amber-100 rounded-xl">Check answer</button>}
    </section>
    <div className="flex flex-wrap justify-between gap-2"><button disabled={attempt.currentIndex === 0} onClick={() => setAttempt(value => value && updateAttempt(value, { type: 'navigate', index: value.currentIndex - 1 }))} className="p-3 border rounded-xl disabled:opacity-40">Previous</button><button onClick={() => { if (confirm('End and score this assessment now?')) setAttempt(value => value && finishAttempt(value)); }} className="p-3 border border-rose-300 text-rose-700 rounded-xl">End assessment</button>{attempt.currentIndex < questions.length - 1 ? <button onClick={() => setAttempt(value => value && updateAttempt(value, { type: 'navigate', index: value.currentIndex + 1 }))} className="p-3 bg-slate-900 text-white rounded-xl">Next</button> : <button onClick={() => setAttempt(value => value && finishAttempt(value))} className="p-3 bg-blue-700 text-white rounded-xl flex gap-2"><CheckCircle2 className="w-4 h-4" />Submit</button>}</div>
    <p className="text-xs text-slate-500 flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" />Your draft is saved on this device. Timed assessments continue against the original deadline after reload.</p>
  </div>;
}
