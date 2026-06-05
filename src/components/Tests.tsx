/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Award, CheckCircle2, AlertCircle, RefreshCw, Layers, Clock, HelpCircle, Save, ArrowRight } from 'lucide-react';
import { MOCK_QUESTIONS } from '../data/staticData';
import { ExamType, TestAttempt, Question } from '../types';

interface TestsProps {
  onSaveAttempt: (examType: ExamType, score: number, correct: number, total: number) => Promise<void>;
  userId: string | undefined;
  testAttempts: TestAttempt[];
}

export default function Tests({ onSaveAttempt, userId, testAttempts }: TestsProps) {
  const [examType, setExamType] = useState<ExamType>('DHA');
  const [isExamActive, setIsExamActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [reviewedQuestions, setReviewedQuestions] = useState<{ [qId: number]: boolean }>({});
  const [timerCount, setTimerCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);

  // Filter by currently chosen regulator to serve 3 completely different premium exams
  const questions: Question[] = MOCK_QUESTIONS.filter(q => q.examType === examType);

  useEffect(() => {
    let timer: any;
    if (isTimerRunning && isExamActive) {
      timer = setInterval(() => {
        setTimerCount(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, isExamActive]);

  const startExam = (type: ExamType) => {
    setExamType(type);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setReviewedQuestions({});
    setTimerCount(0);
    setIsExamActive(true);
    setIsTimerRunning(true);
    setExamCompleted(false);
  };

  const handleOptionSelect = (qId: number, index: number) => {
    if (reviewedQuestions[qId]) return; // locked once reviewed or submitted
    setSelectedAnswers(prev => ({ ...prev, [qId]: index }));
  };

  const submitQuestionRevision = (qId: number) => {
    setReviewedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const endExam = () => {
    setIsTimerRunning(false);
    setExamCompleted(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getResults = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    const total = questions.length;
    const scoreVal = Math.round((correct / total) * 100);
    return { correct, total, scoreVal };
  };

  const handleStoreScore = async () => {
    const { correct, total, scoreVal } = getResults();
    setSubmittingScore(true);
    try {
      await onSaveAttempt(examType, scoreVal, correct, total);
      setIsExamActive(false);
      setExamCompleted(false);
    } catch (e) {
      console.error("Score upload error:", e);
    } finally {
      setSubmittingScore(false);
    }
  };

  const { correct, total, scoreVal } = getResults();

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div>
        <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5.5 h-5.5 text-blue-600" />
          UAE Prometric Licensing Test Simulations
        </h2>
        <p className="text-xs text-slate-505">Complete high-yield questions on cardiac management, ethics codes, dosing math, and child metrics</p>
      </div>

      {!isExamActive ? (
        <div className="space-y-6">
          {/* Exam Choice Deck — three distinct regulator exams */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['DHA', 'MOH', 'HAAD_DOH'] as ExamType[]).map((type) => {
              const meta = {
                DHA:      { label: 'DHA — Dubai Health Authority', emirate: 'Dubai', provider: 'Prometric (Sheryan licensing)', flag: '🏙️' },
                MOH:      { label: 'MOHAP — Ministry of Health', emirate: 'Northern Emirates', provider: 'Prometric', flag: '🇦🇪' },
                HAAD_DOH: { label: 'DOH Abu Dhabi (HAAD)', emirate: 'Abu Dhabi', provider: 'Pearson VUE', flag: '🏛️' },
              }[type];
              const count = MOCK_QUESTIONS.filter(q => q.examType === type).length;
              return (
                <div
                  key={type}
                  className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4 hover:border-blue-300 hover:shadow-md transition-all shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{meta.flag}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded uppercase">
                        {meta.emirate}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-800 mt-2 font-sans">{meta.label}</h3>
                    <div className="text-[11px] text-slate-500 mt-2 space-y-1 font-mono">
                      <p>● Questions: {count} board-style items</p>
                      <p>● Exam provider: {meta.provider}</p>
                      <p>● Pass mark: ~60% · scored timer</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                      A distinct mock for the {meta.emirate} regulator, modelled on the real exam blueprint (safe practice, pharmacology, med-surg, maternal-child, critical care, mental health &amp; ethics).
                    </p>
                  </div>
                  <button
                    onClick={() => startExam(type)}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center shadow-sm shadow-blue-500/10"
                  >
                    Launch {type === 'HAAD_DOH' ? 'DOH/HAAD' : type} Mock Exam
                  </button>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-400 flex items-start gap-1.5 px-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            These are realistic practice questions that mirror each authority's exam style and domains — not actual copyrighted exam items. Each regulator (Dubai/DHA, Abu Dhabi/DOH, Northern Emirates/MOHAP) runs its own separate licensing exam.
          </p>

          {/* Test scores history */}
          {testAttempts.length > 0 && (
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-xs">
              <h3 className="font-bold text-sm tracking-wide text-blue-600 font-mono">YOUR HISTORIC SITTING RESULTS</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans text-slate-700">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-mono text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 rounded-l-lg">Exam Target</th>
                      <th className="py-3 px-4">Accuracy Score</th>
                      <th className="py-3 px-4">Correct / Total</th>
                      <th className="py-3 px-4 rounded-r-lg">Date Logged</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 leading-normal">
                    {testAttempts.map((attempt) => (
                      <tr key={attempt.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-650">{attempt.examType}</td>
                        <td className="py-3.5 px-4 font-mono">
                          <span className={`font-extrabold ${attempt.score >= 70 ? 'text-emerald-600' : attempt.score >= 60 ? 'text-amber-505' : 'text-slate-500'}`}>
                            {attempt.score}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-550">{attempt.correctAnswers} / {attempt.totalQuestions} Questions</td>
                        <td className="py-3.5 px-4 text-slate-450 text-[11px] font-mono">
                          {new Date(attempt.completedAt).toLocaleDateString('en-AE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Active licensing test simulation UI */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main workspace */}
          <div className="lg:col-span-2 p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-sm text-slate-900">
            {/* Header controls inside simulation */}
            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800">
              <span className="font-mono text-blue-600 font-bold uppercase tracking-widest">{examType} ACTIVE MODULE</span>
              <div className="flex items-center gap-2 text-slate-700 font-mono font-bold">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{formatTime(timerCount)}</span>
              </div>
            </div>

            {/* Test end screen checks */}
            {examCompleted ? (
              <div className="text-center py-8 space-y-6">
                <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-2">
                  <Award className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold font-sans text-slate-930">SIMULATION CONCLUDED</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  You have answered the Prometric MCQ catalog block. Check your evaluated accuracy percentage below and click save to logs.
                </p>

                <div className="bg-slate-50 max-w-xs mx-auto p-5 border border-slate-200 rounded-2xl shadow-inner text-center">
                  <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">EVALUATED ACCURACY</p>
                  <p className={`text-4xl font-mono font-extrabold mt-1 ${scoreVal >= 70 ? 'text-emerald-605 font-bold' : scoreVal >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                    {scoreVal}%
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-mono tracking-wide">{correct} of {total} Correct</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      setIsExamActive(false);
                      setExamCompleted(false);
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans"
                  >
                    Discard and Exit
                  </button>
                  {userId ? (
                    <button
                      onClick={handleStoreScore}
                      disabled={submittingScore}
                      className="w-full sm:w-auto py-2.5 px-6 bg-blue-650 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/10"
                    >
                      {submittingScore ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                      Sync Score to Profile
                    </button>
                  ) : (
                    <p className="text-xs text-amber-600 leading-normal bg-amber-50 p-3 border border-amber-200 rounded-xl max-w-md">
                      ⚠️ Connect your user profile (via Google popup on navigation drawer) to save studies and track progress trends on user dashboard.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Question block */
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline text-xs text-slate-500 font-mono mb-2 font-bold">
                    <span>CASE ANALYSIS: QUESTION {currentQuestionIndex + 1} OF {questions.length}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-600">{questions[currentQuestionIndex].category}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed font-sans">{questions[currentQuestionIndex].question}</p>
                </div>

                {/* Multiple choice options */}
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[questions[currentQuestionIndex].id] === oIdx;
                    const isReviewed = reviewedQuestions[questions[currentQuestionIndex].id] || false;
                    const isCorrectOption = questions[currentQuestionIndex].correctIndex === oIdx;

                    let buttonStyle = 'bg-white border-slate-205 hover:bg-slate-50 text-slate-700';
                    if (isSelected && !isReviewed) {
                      buttonStyle = 'bg-blue-50 border-blue-400 text-blue-700 font-bold';
                    } else if (isReviewed) {
                      if (isCorrectOption) {
                        buttonStyle = 'bg-emerald-50 border-emerald-450 text-emerald-800 font-bold';
                      } else if (isSelected) {
                        buttonStyle = 'bg-rose-50 border-rose-350 text-rose-800 font-semibold';
                      } else {
                        buttonStyle = 'bg-slate-50 border-transparent text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isReviewed}
                        onClick={() => handleOptionSelect(questions[currentQuestionIndex].id, oIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${buttonStyle}`}
                      >
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Question rationale drawer */}
                {reviewedQuestions[questions[currentQuestionIndex].id] ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-xl space-y-2 text-xs">
                    <p className="font-mono text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider">CLINICAL REVIEW RATIONALE & FEEDBACK:</p>
                    <p className="text-[11px] text-slate-720 leading-relaxed leading-snug">{questions[currentQuestionIndex].rationale}</p>
                  </div>
                ) : (
                  selectedAnswers[questions[currentQuestionIndex].id] !== undefined && (
                    <button
                      onClick={() => submitQuestionRevision(questions[currentQuestionIndex].id)}
                      className="py-1.5 px-4 bg-amber-100 hover:bg-amber-200 border border-amber-305 text-amber-900 text-xs font-bold rounded-lg cursor-pointer transition-all"
                    >
                      Verify Answer & Reveal Rationale
                    </button>
                  )
                )}

                {/* Action Pagination buttons */}
                <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-205 text-slate-700 disabled:opacity-40 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                  >
                    Back Case
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="py-2 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 transition-all shadow-sm"
                    >
                      Next Case <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={endExam}
                      className="py-2 px-5 bg-blue-650 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer shadow-md transition-all"
                    >
                      Submit Exam Attempt
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sibling navigation/numbers checker */}
          <div className="p-5 bg-white border border-slate-205 rounded-2xl space-y-4 shadow-sm text-slate-800">
            <h4 className="font-bold text-xs font-mono tracking-wider text-slate-705 uppercase">QUESTIONS INDEX</h4>
            <div className="grid grid-cols-6 gap-2">
              {questions.map((q, idx) => {
                const answerSelected = selectedAnswers[q.id] !== undefined;
                const isReviewed = reviewedQuestions[q.id];
                const isCurrent = currentQuestionIndex === idx;

                let numStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600';
                if (isCurrent) {
                  numStyle = 'bg-blue-105 border-blue-500 text-blue-800 font-extrabold shadow-sm';
                } else if (isReviewed) {
                  numStyle = 'bg-emerald-50 border-emerald-250 text-emerald-800 font-semibold';
                } else if (answerSelected) {
                  numStyle = 'bg-blue-50 border-blue-200 text-blue-600';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 w-full rounded-lg border text-xs flex items-center justify-center cursor-pointer transition-all ${numStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-500 leading-normal">
              <p className="font-bold text-[10px] font-mono tracking-widest text-slate-600 uppercase">MAP INDEX COLOURS</p>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-105 border border-blue-500" />
                <span>Currently Viewing Node</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-55 border border-blue-200" />
                <span>Option Picked (Draft state)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-50 border border-emerald-250" />
                <span>Reviewed & Rationale Disclosed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
