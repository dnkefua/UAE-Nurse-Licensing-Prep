/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Plus, CornerDownRight, Bookmark, ArrowLeft, Send, Sparkles, UserCheck } from 'lucide-react';
import { ForumPost, ForumComment } from '../types';

interface ForumProps {
  user: any;
  posts: ForumPost[];
  comments: { [postId: string]: ForumComment[] };
  onAddPost: (title: string, content: string, category: 'Licensing' | 'Study Notes' | 'Exam Tips' | 'Mentorship') => Promise<void>;
  onAddComment: (postId: string, content: string) => Promise<void>;
  onLikePost: (postId: string) => Promise<void>;
  onLoadComments: (postId: string) => void;
  onLogin: () => void;
}

export default function Forum({
  user,
  posts,
  comments,
  onAddPost,
  onAddComment,
  onLikePost,
  onLoadComments,
  onLogin
}: ForumProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<ForumPost | null>(null);

  // Post form states
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Licensing' | 'Study Notes' | 'Exam Tips' | 'Mentorship'>('Licensing');

  // Comment input state
  const [commentContent, setCommentContent] = useState('');

  const categories = ['All', 'Licensing', 'Study Notes', 'Exam Tips', 'Mentorship'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handlePostCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      await onAddPost(newTitle, newContent, newCategory);
      setNewTitle('');
      setNewContent('');
      setIsPosting(false);
    } catch (err) {
      console.error("Create post error:", err);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || !activePost) return;
    try {
      await onAddComment(activePost.id, commentContent);
      setCommentContent('');
    } catch (err) {
      console.error("Add comment error:", err);
    }
  };

  const expandPost = (post: ForumPost) => {
    setActivePost(post);
    onLoadComments(post.id);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-slate-900 flex items-center gap-1.5">
            <MessageSquare className="w-5.5 h-5.5 text-blue-600 animate-pulse" />
            Nurses Exchange & Mentorship Circle
          </h2>
          <p className="text-xs text-slate-505">Share study guides, discuss licensing processes, and find study buddies</p>
        </div>
        {activePost ? (
          <button
            onClick={() => setActivePost(null)}
            className="py-1 px-3 bg-white hover:bg-slate-50 text-slate-705 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Forums
          </button>
        ) : (
          <button
            onClick={() => {
              if (!user) {
                onLogin();
                return;
              }
              setIsPosting(!isPosting);
            }}
            className="py-2 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/10"
          >
            <Plus className="w-4 h-4" /> Publish New Topic
          </button>
        )}
      </div>

      {!activePost ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Categories index left */}
          <div className="lg:col-span-1 space-y-3 bg-white p-4 border border-slate-205 rounded-2xl shadow-sm text-slate-800">
            <h3 className="font-bold text-[10.5px] font-mono tracking-widest text-slate-500 uppercase mb-3 px-1">DISCUSSION CHANNELS</h3>
            <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    py-2 px-3.5 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal
                    ${selectedCategory === cat 
                      ? 'bg-blue-650 text-white shadow shadow-blue-500/10' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  {cat === 'All' ? '🌐 All Channels' : cat === 'Licensing' ? '📜 Licensing & DataFlow' : cat === 'Study Notes' ? '📚 Study Notes' : cat === 'Exam Tips' ? '💡 Exam Tips' : '🤝 Mentorship'}
                </button>
              ))}
            </div>

            {/* Mentorship Tips */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-bold flex items-center gap-1">
                <Bookmark className="w-3 h-3" /> UAE MENTOR RESOURCES:
              </h4>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 space-y-2">
                <p className="text-[10.5px] font-bold text-slate-700">Official Syllabi Links:</p>
                <div className="space-y-1 font-mono text-[9px] text-slate-500">
                  <a href="https://www.dha.gov.ae" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600 underline">DHA Exam Guidelines</a>
                  <a href="https://www.mohap.gov.ae" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600 underline">MOHAP Licensing Syllabus</a>
                  <a href="https://www.doh.gov.ae" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600 underline">DOH Abu Dhabi Portal</a>
                </div>
              </div>
            </div>
          </div>

          {/* Core Post Lists middle */}
          <div className="lg:col-span-3 space-y-4">
            {isPosting && (
              <form onSubmit={handlePostCreate} className="p-5 bg-white border border-slate-205 rounded-2xl space-y-4 shadow-sm text-slate-805">
                <h3 className="font-bold text-xs font-mono tracking-wider text-blue-600 uppercase">PUBLISH CASE CORRESPONDENCE</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase font-mono tracking-wider">Discussion Channel</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Licensing">Licensing & DataFlow</option>
                      <option value="Study Notes">Study Notes</option>
                      <option value="Exam Tips">Exam Tips</option>
                      <option value="Mentorship">Mentorship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase font-mono tracking-wider">Subject Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Need Study Buddy for HAAD / Dataflow Certificate guidelines..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase font-mono tracking-wider">Message Detail</label>
                    <textarea
                      placeholder="Share your experience, files requested, general question notes..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      required
                      className="w-full h-32 bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder:text-slate-400 resize-none font-sans"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPosting(false)}
                    className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-705 text-xs rounded-lg cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                  <button
                     type="submit"
                     className="py-1.5 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shadow-sm"
                  >
                    Publish Topic
                  </button>
                </div>
              </form>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-2xl">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No discussion threads found in this category.</p>
                <p className="text-[10px] text-slate-400 mt-1">Be the first to ask questions and coordinate with UAE peers!</p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const userHasLiked = user && post.likes.includes(user.uid);
                return (
                  <div
                    key={post.id}
                    className="p-5 bg-white border border-slate-205 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all space-y-4 shadow-xs text-slate-800"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        {/* Tags */}
                        <div className="flex items-center gap-2">
                          <span className="text-[9.5px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {post.category === 'Licensing' ? '📜 Licensing' : post.category === 'Study Notes' ? '📚 Study Notes' : post.category === 'Exam Tips' ? '💡 Exam Tips' : '🤝 Mentorship'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(post.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <h4
                          onClick={() => expandPost(post)}
                          className="font-bold text-sm text-slate-800 mt-2 font-sans hover:text-blue-600 cursor-pointer transition-all line-clamp-1"
                        >
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">{post.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 border-t border-slate-100 pt-3.5 text-xs text-slate-500 font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-mono font-bold text-slate-600 border border-slate-200">
                          {post.authorName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[10.5px] text-slate-600 truncate max-w-[124px]">{post.authorName}</span>
                      </div>

                      <button
                        onClick={() => {
                          if (!user) {
                            onLogin();
                            return;
                          }
                          onLikePost(post.id);
                        }}
                        className={`flex items-center gap-1.5 transition-all text-xs cursor-pointer ${userHasLiked ? 'text-blue-600 font-bold' : 'hover:text-blue-650'}`}
                        aria-label={`Like post. Current counts: ${post.likes.length}`}
                      >
                        <ThumbsUp className={`w-4.5 h-4.5 ${userHasLiked ? 'stroke-blue-600 fill-blue-50' : 'text-slate-400'}`} />
                        <span>{post.likes.length} High-Fives</span>
                      </button>

                      <button
                        onClick={() => expandPost(post)}
                        className="flex items-center gap-1.5 text-xs hover:text-blue-650 transition-all cursor-pointer"
                        aria-label={`Read ${post.commentsCount} comments`}
                      >
                        <MessageSquare className="w-4.5 h-4.5 text-slate-400" />
                        <span>{post.commentsCount} Comments</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Exploded Thread Details */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main expanded post detail workspace */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-white border border-slate-205 rounded-2xl space-y-4 shadow-sm text-slate-800">
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">📜 {activePost.category}</span>
                <span>●</span>
                <span>By {activePost.authorName}</span>
                <span>●</span>
                <span>{new Date(activePost.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-800 font-sans">{activePost.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">{activePost.content}</p>

              <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-xs">
                <button
                  onClick={() => {
                    if (!user) {
                      onLogin();
                      return;
                    }
                    onLikePost(activePost.id).then(() => {
                      // Update active post reference upvote counts
                      const currentLikes = [...activePost.likes];
                      const existsIdx = currentLikes.indexOf(user.uid);
                      if (existsIdx > -1) {
                         currentLikes.splice(existsIdx, 1);
                      } else {
                         currentLikes.push(user.uid);
                      }
                      setActivePost({ ...activePost, likes: currentLikes });
                    });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${user && activePost.likes.includes(user.uid) ? 'bg-blue-50 text-blue-600' : 'bg-slate-105 text-slate-605'}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{activePost.likes.length} High-Fives</span>
                </button>
              </div>
            </div>

            {/* Comments block */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs font-mono tracking-wider text-slate-500 uppercase">RESPONSES ({comments[activePost.id]?.length || 0})</h4>
              <div className="space-y-3">
                {comments[activePost.id]?.map((comment) => (
                  <div key={comment.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex gap-3 text-xs leading-relaxed">
                    <div className="shrink-0 mt-0.5">
                      <CornerDownRight className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-baseline gap-2 text-[10.5px]">
                        <span className="font-bold text-slate-700">{comment.authorName}</span>
                        <span className="text-[9.5px] text-slate-400 font-mono">
                          {new Date(comment.createdAt).toLocaleDateString('en-AE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {(!comments[activePost.id] || comments[activePost.id].length === 0) && (
                  <p className="text-[11px] text-slate-400 italic pl-1 text-center py-4">No comments posted yet. Start the coordination!</p>
                )}
              </div>

              {/* Add comment form */}
              {user ? (
                <form onSubmit={handleCommentSubmit} className="flex gap-2.5">
                  <input
                    type="text"
                    placeholder="Provide a peer reply or supportive mentorship advice..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                    className="flex-1 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-blue-650 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-200 text-center rounded-xl">
                  <p className="text-xs text-slate-500 mb-2">Connect your account profile to post clinical responses</p>
                  <button
                    onClick={onLogin}
                    className="py-1.5 px-4 bg-blue-650 hover:bg-blue-600 text-white rounded-lg text-xs font-bold font-mono cursor-pointer"
                  >
                    Google Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mentors Advice Sidebar */}
          <div className="p-5 bg-white border border-slate-205 rounded-2xl space-y-4 text-xs text-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h4 className="font-bold font-mono text-[10.5px] uppercase tracking-wider">Mentorship resources</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal">
              Remember, to register successfully on UAE DHA primary services, you must obtain a Good Standing record, with verified MoFA degree stamps beforehand.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-blue-650" />
                <span className="font-bold text-slate-700">Registered Mentors:</span>
              </div>
              <ul className="space-y-1.5 list-inside list-disc pl-1 text-[11px] text-slate-500 font-mono">
                <li>Nurse Specialist Jameela K. (DHA)</li>
                <li>Senior Lecturer Dr. Fatima (HAAD)</li>
                <li>Clinician Rahul Sharma (MOHAP)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
