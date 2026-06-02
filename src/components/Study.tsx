/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, HelpCircle, Layers, ArrowLeft, ArrowRight, Sparkles, MessageSquare, Send, RefreshCw } from 'lucide-react';
import { STUDY_TOPICS } from '../data/staticData';
import { StudyTopic } from '../types';

interface StudyProps {
  onAskAI: (prompt: string, context?: string) => Promise<string>;
}

export default function Study({ onAskAI }: StudyProps) {
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [studyMode, setStudyMode] = useState<'reading' | 'flashcards'>('reading');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // AI Tutor Local chat states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAskTutorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const topicContext = selectedTopic ? `${selectedTopic.title} -> ${selectedTopic.subtitle}` : 'General preparation guidance';
      const ans = await onAskAI(aiPrompt, topicContext);
      setAiResponse(ans);
    } catch (err) {
      setAiResponse("Could not retrieve AI reply. Verify your GEMINI_API_KEY is configured in Settings.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const categories = Array.from(new Set(STUDY_TOPICS.map(topic => topic.category)));

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5.5 h-5.5 text-blue-600" />
            Comprehensive Licensing Study Guides
          </h2>
          <p className="text-xs text-slate-505">High-yield revision curricula mapped to HAAD, MOHAP, and DHA specifications</p>
        </div>
        {selectedTopic && (
          <button
            onClick={() => {
              setSelectedTopic(null);
              setIsFlipped(false);
            }}
            className="py-1 px-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Subject Deck
          </button>
        )}
      </div>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STUDY_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-bold">
                  {topic.category}
                </span>
                <h3 className="font-bold text-sm text-slate-800 mt-2 font-sans hover:text-blue-600 cursor-pointer" onClick={() => setSelectedTopic(topic)}>
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topic.subtitle}</p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                <button
                  onClick={() => {
                    setSelectedTopic(topic);
                    setStudyMode('reading');
                  }}
                  className="py-1.5 px-3 bg-blue-650 hover:bg-blue-600 text-white rounded-lg flex items-center gap-1 cursor-pointer transition-all shadow-sm shadow-blue-500/10"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Start Lessons
                </button>
                <button
                  onClick={() => {
                    setSelectedTopic(topic);
                    setStudyMode('flashcards');
                    setFlashcardIndex(0);
                    setIsFlipped(false);
                  }}
                  className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-750 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" /> Interactive Cards ({topic.flashcards.length})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Workspace Body */}
          <div className="lg:col-span-2 space-y-6">
            {/* Nav Sub-Tabs */}
            <div className="bg-slate-100 p-1 rounded-xl inline-flex border border-slate-200">
              <button
                onClick={() => setStudyMode('reading')}
                className={`py-1.5 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all ${studyMode === 'reading' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-650 hover:text-slate-900'}`}
              >
                Subject Guide Text
              </button>
              <button
                onClick={() => {
                  setStudyMode('flashcards');
                  setFlashcardIndex(0);
                  setIsFlipped(false);
                }}
                className={`py-1.5 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all ${studyMode === 'flashcards' ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50' : 'text-slate-650 hover:text-slate-900'}`}
              >
                Subject Cards ({selectedTopic.flashcards.length})
              </button>
            </div>

            {studyMode === 'reading' ? (
              <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-6 shadow-sm leading-relaxed text-slate-800">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">{selectedTopic.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 font-sans mt-1">{selectedTopic.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{selectedTopic.subtitle}</p>
                </div>

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
              </div>
            ) : (
              /* High-end Flashcard Widget */
              <div className="space-y-4">
                <div className="perspective-1000 w-full min-h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                  <div className={`relative w-full min-h-64 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                     {/* Front Face */}
                    <div className="absolute inset-0 w-full h-full bg-white border border-slate-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm backface-hidden text-slate-800">
                      <div className="flex justify-between text-xs text-blue-600 font-bold uppercase tracking-wider font-mono">
                        <span>Card Question</span>
                        <span>{flashcardIndex + 1} / {selectedTopic.flashcards.length}</span>
                      </div>
                      <div className="text-center py-6">
                        <p className="text-base font-medium text-slate-900 leading-snug">{selectedTopic.flashcards[flashcardIndex].question}</p>
                      </div>
                      <div className="text-center text-[10px] text-slate-450 uppercase font-mono tracking-widest font-bold">
                        Click card to flip and review rationale
                      </div>
                    </div>

                    {/* Back Face */}
                    <div className="absolute inset-0 w-full h-full bg-blue-55 border border-blue-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm backface-hidden rotate-y-180 text-slate-805">
                      <div className="flex justify-between text-xs text-emerald-800 font-bold uppercase tracking-wider font-mono">
                        <span>Card Answer Explanation</span>
                        <span>Verified Legal Schema</span>
                      </div>
                      <div className="py-2">
                        <p className="text-sm text-slate-800 leading-normal">{selectedTopic.flashcards[flashcardIndex].answer}</p>
                      </div>
                      <div className="text-center text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold">
                        Click card to flip back
                      </div>
                    </div>
                  </div>
                </div>

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
            )}
          </div>

          {/* Integrated AI Clinical Assist pane - Fosters 1-on-1 learning */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm text-slate-800">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>AI Clinical Guidance Coach</span>
            </div>
            <p className="text-[11px] text-slate-505 leading-normal">
              Need detailed explanations on drug rules, maternity calculations, or DHA liability laws? Type your question to query the AI Virtual Instructor.
            </p>

            <form onSubmit={handleAskTutorSubmit} className="space-y-4">
              <div className="relative">
                <textarea
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
                    Analyzing clinical corpus...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Query Clinical AI
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 max-h-80 overflow-y-auto custom-scroll text-xs">
                <p className="font-bold text-[10px] text-blue-600 font-mono tracking-widest">AI INSTRUCTOR REPORT:</p>
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
