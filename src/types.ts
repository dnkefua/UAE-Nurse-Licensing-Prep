/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ExamType = 'DHA' | 'MOH' | 'HAAD_DOH';

export interface UserProfile {
  uid: string;
  displayName: string;
  targetExam: ExamType;
  examDate: string; // ISO String
  registeredForExam: boolean;
  studyHoursGoal: number; // Weekly hour goals
  completedMilestones: string[]; // ['degree_attestation', 'dataflow_verification', 'exam_booking', etc]
  currentStreak: number;
  createdAt: string; // Timestamp ISO
  updatedAt: string; // Timestamp ISO
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'Licensing' | 'Study Notes' | 'Exam Tips' | 'Mentorship';
  commentsCount: number;
  likes: string[]; // List of user IDs who liked
  createdAt: string; // Timestamp ISO
  updatedAt: string; // Timestamp ISO
}

export interface ForumComment {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string; // Timestamp ISO
}

export interface StudySession {
  id: string;
  title: string;
  dateTime: string; // ISO
  duration: number; // minutes
  topic: string;
  hostId: string;
  hostName: string;
  attendees: string[]; // User IDs
  isExpertQA: boolean;
  expertName?: string;
  createdAt: string; // ISO
}

export interface TestAttempt {
  id: string;
  userId: string;
  examType: ExamType;
  score: number; // 0 - 100 percentage
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string; // ISO
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  category: string;
  examType?: ExamType;
}

export interface StudyTopic {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readingTime?: string;       // e.g. "20 min read"
  examWeight?: string;        // approx weighting on the licensing exam
  objectives?: string[];      // learning objectives
  sections: {
    title: string;
    content: string;
    bullets?: string[];
  }[];
  flashcards: {
    question: string;
    answer: string;
  }[];
  quiz?: {                    // sample exercises / practice exam for this topic
    question: string;
    options: string[];
    correctIndex: number;
    rationale: string;
  }[];
}
