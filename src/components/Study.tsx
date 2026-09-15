/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Layers, ArrowLeft, ArrowRight, Sparkles, Send, RefreshCw,
  ClipboardCheck, CheckCircle2, XCircle, Clock, Target, BarChart3, RotateCcw, Award
} from 'lucide-react';
import { STUDY_TOPICS, ACADEMY_MENTORS, UAE_AUTHORITIES } from '../data/staticData';
import { StudyTopic } from '../types';

interface StudyProps {
  onAskAI: (prompt: string, context?: string) => Promise<string>;
}

export default function Study({ onAskAI }: StudyProps) {
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [studyMode, setStudyMode] = useState<'reading' | 'flashcards' | 'exam'>('reading');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const topicHeadingRef = useRef<HTMLHeadingElement>(null);
  const topicTriggerRef = useRef<HTMLElement | null>(null);
  const requestIdRef = useRef(0);
  useEffect(() => () => { requestIdRef.current += 1; }, []);
  useEffect(() => {
    if (selectedTopic) topicHeadingRef.current?.focus();
    else topicTriggerRef.current?.focus();
  }, [selectedTopic]);
  const reportHref = (detail = '') => `mailto:${ACADEMY_MENTORS[0].email}?subject=${encodeURIComponent('Study content correction report')}&body=${encodeURIComponent(`Topic: ${selectedTopic?.title || 'Study library'}\nTopic ID: ${selectedTopic?.id || 'Not selected'}\n${detail}\n\nPlease describe the issue and any source you used:\n\nDo not include patient or other sensitive information.`)}`;

  // Practice-exam state (per topic): question index -> chosen option index
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});

  const openTopic = (topic: StudyTopic, mode: 'reading' | 'flashcards' | 'exam') => {
    topicTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    requestIdRef.current += 1;
    setAiResponse('');
    setAiError('');
    setAiPrompt('');
    setIsAiLoading(false);
    setSelectedTopic(topic);
    setStudyMode(mode);
    setFlashcardIndex(0);
    setIsFlipped(false);
    setExamAnswers({});
  };

  const answerExam = (qi: number, oi: number) => {
    setExamAnswers(prev => (prev[qi] !== undefined ? prev : { ...prev, [qi]: oi }));
  };

  const quiz = selectedTopic?.quiz ?? [];
  const examScore = quiz.reduce((acc, q, i) => acc + (examAnswers[i] === q.correctIndex ? 1 : 0), 0);
  const examAnswered = Object.keys(examAnswers).length;

  // AI Tutor Local chat states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiError, setAiError] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAskTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isAiLoading) return;
    const requestId = ++requestIdRef.current;
    setAiError('');
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const topicContext = selectedTopic ? `${selectedTopic.title} -> ${selectedTopic.subtitle}` : 'General preparation guidance';
      const ans = await onAskAI(aiPrompt, topicContext);
      if (requestId !== requestIdRef.current) return;
      if (!ans?.trim()) throw new Error('Empty response');
      setAiResponse(ans);
    } catch (err) {
      if (requestId === requestIdRef.current) setAiError('The AI reply is unavailable. Please try again later. No explanation was generated.');
    } finally {
      if (requestId === requestIdRef.current) setIsAiLoading(false);
    }
  };


  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-blue-600" />
            Nursing Study Library
          </h2>
          <p className="text-xs text-slate-505">Independent study material; alignment with current exam specifications has not been verified.</p>
        </div>
        {selectedTopic && (
          <button
            onClick={() => {
              requestIdRef.current += 1;
              setAiResponse('');
              setAiError('');
              setIsAiLoading(false);
              setSelectedTopic(null);
              setIsFlipped(false);
            }}
            className="py-1 px-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Subject Deck
          </button>
        )}
      </div>

      <aside className="rounded-2xl border border-amber-300 bg-amber-50 p-4 space-y-2 text-sm text-amber-950">
        <h3 className="font-bold">Unreviewed educational content</h3>
        <p>Lessons, flashcards, questions, and answer keys have not been independently clinically reviewed. They may contain errors or outdated information. They are not official exam material, clinical advice, or evidence of readiness to practise.</p>
        <p>Check claims against current authoritative resources and qualified educators. The links below are general resources, not citations validating individual questions.</p>
        <div className="flex flex-wrap gap-3">
          {UAE_AUTHORITIES.map(authority => <a key={authority.id} href={authority.officialSite.url} target="_blank" rel="noopener noreferrer" className="underline">{authority.code} resources (new tab)</a>)}
        </div>
        <a href={reportHref()} className="inline-block underline font-semibold">Report incorrect content by email</a>
        <p className="text-xs">This opens an email draft for you to review and send; it does not submit a report automatically.</p>
      </aside>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDY_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold">
                    {topic.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-slate-800 mt-2 font-sans group-hover:text-blue-600 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.subtitle}</p>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2.5 text-[10px] font-mono text-slate-400">
                  {topic.readingTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {topic.readingTime}</span>}
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {topic.flashcards.length} cards</span>
                  {topic.quiz && <span className="flex items-center gap-1"><ClipboardCheck className="w-3 h-3" /> {topic.quiz.length}-Q exam</span>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold pt-1">
                <button
                  aria-label={`Read ${topic.title}`}
                  onClick={() => openTopic(topic, 'reading')}
                  className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-sm shadow-blue-500/10"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Read
                </button>
                <button
                  aria-label={`Study flashcards for ${topic.title}`}
                  disabled={topic.flashcards.length === 0}
                  onClick={() => openTopic(topic, 'flashcards')}
                  className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" /> Cards ({topic.flashcards.length})
                </button>
                {topic.quiz && topic.quiz.length > 0 && (
                  <button
                    aria-label={`Practise questions for ${topic.title}`}
                    onClick={() => openTopic(topic, 'exam')}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-sm"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" /> Exam ({topic.quiz.length})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Workspace Body */}
          <div className="lg:col-span-2 space-y-6">
            <h3 ref={topicHeadingRef} tabIndex={-1} className="text-lg font-bold">{selectedTopic.title}</h3>
            {/* Nav Sub-Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl inline-flex border border-slate-200 flex-wrap gap-1">
              <button
                aria-pressed={studyMode === 'reading'}
                onClick={() => setStudyMode('reading')}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${studyMode === 'reading' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Lesson
              </button>
              <button
                aria-pressed={studyMode === 'flashcards'}
                disabled={selectedTopic.flashcards.length === 0}
                onClick={() => { setStudyMode('flashcards'); setFlashcardIndex(0); setIsFlipped(false); }}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${studyMode === 'flashcards' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Layers className="w-3.5 h-3.5" /> Cards ({selectedTopic.flashcards.length})
              </button>
              {quiz.length > 0 && (
                <button
                  aria-pressed={studyMode === 'exam'}
                  onClick={() => { setStudyMode('exam'); setExamAnswers({}); }}
                  className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${studyMode === 'exam' ? 'bg-white text-emerald-700 shadow-sm border border-slate-200/50' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <ClipboardCheck className="w-3.5 h-3.5" /> Practice Exam ({quiz.length})
                </button>
              )}
            </div>

            {studyMode === 'reading' ? (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-sm leading-relaxed text-slate-800">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">{selectedTopic.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">{selectedTopic.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedTopic.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[10px] font-mono text-slate-400">
                    {selectedTopic.readingTime && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedTopic.readingTime}</span>}
                  </div>
                </div>

                {/* Learning objectives */}
                {selectedTopic.objectives && selectedTopic.objectives.length > 0 && (
                  <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                    <h4 className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <Target className="w-3.5 h-3.5" /> Learning Objectives
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedTopic.objectives.map((o, i) => (
                        <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" /> <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedTopic.sections.map((sec, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-bold text-sm tracking-tight text-blue-800 font-sans">{sec.title}</h4>
                    <p className="text-xs text-slate-650 leading-relaxed">{sec.content}</p>
                    {sec.bullets && (
                      <ul className="list-disc list-inside space-y-1.5 pl-2">
                        {sec.bullets.map((b, bi) => (
                          <li key={bi} className="text-xs text-slate-500 leading-normal pl-1">{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Jump to practice exam */}
                {quiz.length > 0 && (
                  <button
                    onClick={() => { setStudyMode('exam'); setExamAnswers({}); }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" /> Take the {quiz.length}-Question Practice Exam
                  </button>
                )}
              </div>
            ) : studyMode === 'flashcards' ? (
              /* High-end Flashcard Widget */
              <div className="space-y-4">
                <button type="button" aria-pressed={isFlipped} aria-label={`Card ${flashcardIndex + 1}: ${isFlipped ? selectedTopic.flashcards[flashcardIndex]?.answer : selectedTopic.flashcards[flashcardIndex]?.question}. Activate to ${isFlipped ? 'show question' : 'show answer'}.`} className="block text-left perspective-1000 w-full cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                  <div className="w-full">
                     {/* Front Face */}
                    <div hidden={isFlipped} className={`${isFlipped ? 'hidden' : 'flex'} w-full min-h-64 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm text-slate-800`}>
                      <div className="flex justify-between text-xs text-blue-600 font-bold uppercase tracking-wider font-mono">
                        <span>Card Question</span>
                        <span>{flashcardIndex + 1} / {selectedTopic.flashcards.length}</span>
                      </div>
                      <div className="text-center py-6">
                        <p className="text-base font-medium text-slate-900 leading-snug">{selectedTopic.flashcards[flashcardIndex].question}</p>
                      </div>
                      <div className="text-center text-[10px] text-slate-450 uppercase font-mono tracking-widest font-bold">
                        Activate card to show answer
                      </div>
                    </div>

                    {/* Back Face */}
                    <div hidden={!isFlipped} className={`${!isFlipped ? 'hidden' : 'flex'} w-full min-h-64 bg-blue-55 border border-blue-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm text-slate-805`}>
                      <div className="flex justify-between text-xs text-emerald-800 font-bold uppercase tracking-wider font-mono">
                        <span>Card Answer Explanation</span>
                        <span>Unreviewed study answer</span>
                      </div>
                      <div className="py-2">
                        <p className="text-sm text-slate-800 leading-normal">{selectedTopic.flashcards[flashcardIndex].answer}</p>
                      </div>
                      <div className="text-center text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold">
                        Activate card to show question
                      </div>
                    </div>
                  </div>
                </button>

                {/* Progress selectors */}
                <div className="flex items-center justify-between">
                  <button
                    disabled={flashcardIndex === 0}
                    onClick={() => {
                      setFlashcardIndex(prev => prev - 1);
                      setIsFlipped(false);
                    }}
                    className="py-2 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous Card
                  </button>
                  <button
                    disabled={flashcardIndex === selectedTopic.flashcards.length - 1}
                    onClick={() => {
                      setFlashcardIndex(prev => prev + 1);
                      setIsFlipped(false);
                    }}
                    className="py-2 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    Next Card <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* ── Practice Exam ── */
              <div className="space-y-4">
                {/* Score header */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Practice Exam</h3>
                      <p className="text-[11px] text-slate-500">{selectedTopic.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[9px] font-mono text-slate-400 uppercase">Score</p>
                      <p className={`text-lg font-extrabold font-mono ${
                        examAnswered === 0 ? 'text-slate-400'
                        : examScore / quiz.length >= 0.6 ? 'text-emerald-600' : 'text-amber-500'
                      }`}>{examScore}/{quiz.length}</p>
                    </div>
                    {examAnswered > 0 && (
                      <button onClick={() => setExamAnswers({})}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer" title="Reset exam" aria-label="Reset practice exam">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div role="progressbar" aria-label="Questions answered" aria-valuenow={examAnswered} aria-valuemin={0} aria-valuemax={quiz.length} className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="h-1.5 bg-emerald-500 transition-all duration-300" style={{ width: `${(examAnswered / quiz.length) * 100}%` }} />
                </div>

                {/* Questions */}
                {quiz.map((q, qi) => {
                  const chosen = examAnswers[qi];
                  const answered = chosen !== undefined;
                  return (
                    <div key={qi} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex gap-2">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold font-mono flex items-center justify-center">{qi + 1}</span>
                        <p className="text-[13px] font-semibold text-slate-800 leading-snug pt-0.5">{q.question}</p>
                      </div>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const isCorrect = oi === q.correctIndex;
                          const isChosen = chosen === oi;
                          let cls = 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700';
                          if (answered) {
                            if (isCorrect) cls = 'bg-emerald-50 border-emerald-300 text-emerald-800';
                            else if (isChosen) cls = 'bg-rose-50 border-rose-300 text-rose-800';
                            else cls = 'bg-white border-slate-200 text-slate-400';
                          }
                          return (
                            <button
                              key={oi}
                              disabled={answered}
                              onClick={() => answerExam(qi, oi)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2 ${cls} ${answered ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                              <span className="shrink-0 w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[10px] font-bold font-mono mt-px">
                                {answered && isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : answered && isChosen ? <XCircle className="w-3.5 h-3.5" /> : String.fromCharCode(65 + oi)}
                              </span>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                      <a href={reportHref(`Question ${qi + 1}: ${q.question}`)} className="inline-block text-xs text-blue-800 underline">Report this question by email</a>
                      {answered && (
                        <div role="status" className={`text-[11.5px] leading-relaxed p-3 rounded-xl border ${chosen === q.correctIndex ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                          <span className="font-bold font-mono uppercase text-[10px] tracking-wider">{chosen === q.correctIndex ? '✓ Correct — ' : '✗ Rationale — '}</span>
                          {q.rationale}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Completion summary */}
                {examAnswered === quiz.length && quiz.length > 0 && (
                  <div className={`rounded-2xl p-5 text-center border ${examScore / quiz.length >= 0.6 ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                    <BarChart3 className={`w-8 h-8 mx-auto mb-2 ${examScore / quiz.length >= 0.6 ? 'text-emerald-600' : 'text-amber-500'}`} />
                    <p className="text-sm font-extrabold text-slate-900">You scored {examScore} / {quiz.length} ({Math.round((examScore / quiz.length) * 100)}%)</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      This score reflects the app’s unreviewed answer key. It is not a regulator pass mark or a prediction of exam results.
                    </p>
                    <button onClick={() => setExamAnswers({})}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer">
                      <RotateCcw className="w-3.5 h-3.5" /> Retake Exam
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Integrated AI Clinical Assist pane - Fosters 1-on-1 learning */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm text-slate-800">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Study Assistant</span>
            </div>
            <p className="text-[11px] text-slate-505 leading-normal">
              AI-generated explanations can be inaccurate or incomplete. Check them against current authoritative resources. Do not use them for patient care or licensing decisions, and do not enter patient details.
            </p>

            <form onSubmit={handleAskTutorSubmit} className="space-y-4">
              <div className="relative">
                <label htmlFor="study-ai-prompt" className="block text-xs font-semibold mb-2">Your study question</label>
                <textarea id="study-ai-prompt" maxLength={2000}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. explain hypokalemic ECG indicators or Methergine counter-indicators..."
                  className="w-full h-24 bg-white border border-slate-220 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder:text-slate-400 resize-none font-sans"
                />
              </div>
              <button
                type="submit"
                disabled={isAiLoading || !aiPrompt.trim()}
                className="w-full py-2.5 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-500/10"
              >
                {isAiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Requesting AI response...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Ask AI study assistant
                  </>
                )}
              </button>
            </form>

            <div role="status" className="text-sm text-slate-700">{isAiLoading ? 'Waiting for an AI response…' : ''}</div>
            {aiError && <p role="alert" className="text-sm text-rose-800">{aiError}</p>}
            {aiResponse && (
              <div role="status" className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 max-h-80 overflow-y-auto custom-scroll text-xs">
                <p className="font-bold text-[10px] text-blue-600 font-mono tracking-widest">AI-GENERATED RESPONSE — UNREVIEWED:</p>
                <div className="text-[11.5px] text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
