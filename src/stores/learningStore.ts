import { create } from 'zustand';
import { LearningRecord, QuizResult, ProgressStats } from '../types';
import { mockLearningRecords, mockQuizResults, mockProgressStats } from '../data/mockProgress';
import { storage, STORAGE_KEYS } from '../utils/storage';

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
  addQuizResult: (result: QuizResult) => void;
  calculateStats: () => void;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  records: [],
  quizResults: [],
  progressStats: null,
  isLoading: false,

  fetchRecords: (userId: string) => {
    set({ isLoading: true });
    const storedRecords = storage.get<LearningRecord[]>(STORAGE_KEYS.LEARNING_RECORDS, []);
    let userRecords = storedRecords.filter(r => r.userId === userId);
    
    if (userRecords.length === 0 && storedRecords.length === 0) {
      userRecords = mockLearningRecords.filter(r => r.userId === userId);
      if (userRecords.length > 0) {
        storage.set(STORAGE_KEYS.LEARNING_RECORDS, mockLearningRecords);
      }
    }
    
    set({ records: userRecords, isLoading: false });
    get().calculateStats();
  },

  fetchQuizResults: (userId: string) => {
    const storedResults = storage.get<QuizResult[]>(STORAGE_KEYS.QUIZ_RESULTS, []);
    let userResults = storedResults.filter(r => r.userId === userId);
    
    if (userResults.length === 0 && storedResults.length === 0) {
      userResults = mockQuizResults.filter(r => r.userId === userId);
      if (userResults.length > 0) {
        storage.set(STORAGE_KEYS.QUIZ_RESULTS, mockQuizResults);
      }
    }
    
    set({ quizResults: userResults });
    get().calculateStats();
  },

  fetchProgressStats: (userId: string) => {
    const { records, quizResults } = get();
    
    const completedCount = records.filter(r => r.status === 'completed').length;
    const totalTimeSpent = records.reduce((sum, r) => sum + r.timeSpent, 0);
    const averageScore = quizResults.length > 0
      ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
      : 0;

    const stats: ProgressStats = {
      totalTasks: records.length,
      completedTasks: completedCount,
      totalTimeSpent,
      completionRate: records.length > 0 ? Math.round((completedCount / records.length) * 100) : 0,
      quizAverage: averageScore,
      strongTopics: averageScore >= 80 ? ['财务报销', '职业发展'] : [],
      weakTopics: averageScore < 60 ? ['IT系统使用'] : [],
    };

    set({ progressStats: stats });
  },

  updateProgress: (entryId: string, progress: number) => {
    const { records } = get();
    const userId = '1';
    
    const updatedRecords = records.map(r =>
      r.entryId === entryId
        ? {
            ...r,
            progress,
            status: progress === 100 ? 'completed' as const : 'in_progress' as const,
            completedAt: progress === 100 ? new Date().toISOString() : r.completedAt,
            startedAt: r.startedAt || new Date().toISOString(),
          }
        : r
    );
    
    storage.set(STORAGE_KEYS.LEARNING_RECORDS, updatedRecords);
    set({ records: updatedRecords });
    get().calculateStats();
  },

  markAsCompleted: (entryId: string) => {
    const { records } = get();
    
    const updatedRecords = records.map(r =>
      r.entryId === entryId
        ? {
            ...r,
            status: 'completed' as const,
            progress: 100,
            completedAt: new Date().toISOString(),
            startedAt: r.startedAt || new Date().toISOString(),
            timeSpent: r.timeSpent + 10,
          }
        : r
    );
    
    storage.set(STORAGE_KEYS.LEARNING_RECORDS, updatedRecords);
    set({ records: updatedRecords });
    get().calculateStats();
  },

  markAsInProgress: (entryId: string) => {
    const { records } = get();
    
    let updatedRecords = records.map(r =>
      r.entryId === entryId
        ? {
            ...r,
            status: 'in_progress' as const,
            startedAt: new Date().toISOString(),
            progress: Math.max(r.progress, 10),
          }
        : r
    );
    
    const hasRecord = records.some(r => r.entryId === entryId);
    if (!hasRecord) {
      const newRecord: LearningRecord = {
        id: `lr-${Date.now()}`,
        userId: '1',
        entryId,
        status: 'in_progress',
        progress: 10,
        startedAt: new Date().toISOString(),
        timeSpent: 0,
      };
      updatedRecords = [newRecord, ...updatedRecords];
    }
    
    storage.set(STORAGE_KEYS.LEARNING_RECORDS, updatedRecords);
    set({ records: updatedRecords });
    get().calculateStats();
  },

  addQuizResult: (result: QuizResult) => {
    const { quizResults } = get();
    const updatedResults = [...quizResults, result];
    storage.set(STORAGE_KEYS.QUIZ_RESULTS, updatedResults);
    set({ quizResults: updatedResults });
    get().calculateStats();
  },

  calculateStats: () => {
    const { records, quizResults } = get();
    
    const completedCount = records.filter(r => r.status === 'completed').length;
    const totalTimeSpent = records.reduce((sum, r) => sum + r.timeSpent, 0);
    const averageScore = quizResults.length > 0
      ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
      : 0;

    const stats: ProgressStats = {
      totalTasks: records.length,
      completedTasks: completedCount,
      totalTimeSpent,
      completionRate: records.length > 0 ? Math.round((completedCount / records.length) * 100) : 0,
      quizAverage: averageScore,
      strongTopics: averageScore >= 80 ? ['财务报销', '职业发展'] : [],
      weakTopics: averageScore < 60 ? ['IT系统使用'] : [],
    };

    set({ progressStats: stats });
  },
}));
