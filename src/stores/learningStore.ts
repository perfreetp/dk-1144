import { create } from 'zustand';
import { LearningRecord, QuizResult, ProgressStats } from '../types';
import { mockLearningRecords, mockQuizResults, mockProgressStats } from '../data/mockProgress';

interface LearningState {
  records: LearningRecord[];
  quizResults: QuizResult[];
  progressStats: ProgressStats | null;
  isLoading: boolean;
  fetchRecords: (userId: string) => void;
  fetchQuizResults: (userId: string) => void;
  fetchProgressStats: (userId: string) => void;
  updateProgress: (entryId: string, progress: number) => void;
  markAsCompleted: (entryId: string) => void;
  markAsInProgress: (entryId: string) => void;
}

export const useLearningStore = create<LearningState>((set) => ({
  records: [],
  quizResults: [],
  progressStats: null,
  isLoading: false,

  fetchRecords: (userId: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      const userRecords = mockLearningRecords.filter(r => r.userId === userId);
      set({ records: userRecords, isLoading: false });
    }, 300);
  },

  fetchQuizResults: (userId: string) => {
    setTimeout(() => {
      const userResults = mockQuizResults.filter(r => r.userId === userId);
      set({ quizResults: userResults });
    }, 200);
  },

  fetchProgressStats: (userId: string) => {
    setTimeout(() => {
      set({ progressStats: mockProgressStats });
    }, 200);
  },

  updateProgress: (entryId: string, progress: number) => {
    set(state => ({
      records: state.records.map(r =>
        r.entryId === entryId
          ? {
              ...r,
              progress,
              status: progress === 100 ? 'completed' as const : 'in_progress' as const,
              completedAt: progress === 100 ? new Date().toISOString() : r.completedAt,
              startedAt: r.startedAt || new Date().toISOString(),
            }
          : r
      ),
    }));
  },

  markAsCompleted: (entryId: string) => {
    set(state => ({
      records: state.records.map(r =>
        r.entryId === entryId
          ? {
              ...r,
              status: 'completed' as const,
              progress: 100,
              completedAt: new Date().toISOString(),
              startedAt: r.startedAt || new Date().toISOString(),
            }
          : r
      ),
    }));
  },

  markAsInProgress: (entryId: string) => {
    set(state => ({
      records: state.records.map(r =>
        r.entryId === entryId
          ? {
              ...r,
              status: 'in_progress' as const,
              startedAt: new Date().toISOString(),
            }
          : r
      ),
    }));
  },
}));
