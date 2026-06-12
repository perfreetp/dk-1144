import { LearningRecord, QuizResult, ProgressStats } from '../types';

export const mockLearningRecords: LearningRecord[] = [
  {
    id: '1',
    userId: '1',
    entryId: '1',
    status: 'completed',
    progress: 100,
    startedAt: '2024-02-15',
    completedAt: '2024-02-16',
    timeSpent: 45,
  },
  {
    id: '2',
    userId: '1',
    entryId: '2',
    status: 'completed',
    progress: 100,
    startedAt: '2024-02-17',
    completedAt: '2024-02-18',
    timeSpent: 30,
  },
  {
    id: '3',
    userId: '1',
    entryId: '3',
    status: 'in_progress',
    progress: 60,
    startedAt: '2024-02-19',
    timeSpent: 20,
  },
  {
    id: '4',
    userId: '1',
    entryId: '4',
    status: 'not_started',
    progress: 0,
    timeSpent: 0,
  },
  {
    id: '5',
    userId: '1',
    entryId: '5',
    status: 'not_started',
    progress: 0,
    timeSpent: 0,
  },
  {
    id: '6',
    userId: '1',
    entryId: '6',
    status: 'not_started',
    progress: 0,
    timeSpent: 0,
  },
  {
    id: '7',
    userId: '1',
    entryId: '7',
    status: 'completed',
    progress: 100,
    startedAt: '2024-02-10',
    completedAt: '2024-02-11',
    timeSpent: 50,
  },
];

export const mockQuizResults: QuizResult[] = [
  {
    id: '1',
    userId: '1',
    quizId: 'quiz-1',
    score: 85,
    totalQuestions: 5,
    correctCount: 4,
    answers: [0, 1, 2, 2, 1],
    completedAt: '2024-02-16',
  },
  {
    id: '2',
    userId: '1',
    quizId: 'quiz-2',
    score: 90,
    totalQuestions: 5,
    correctCount: 4,
    answers: [1, 2, 0, 2, 2],
    completedAt: '2024-02-18',
  },
  {
    id: '3',
    userId: '1',
    quizId: 'quiz-7',
    score: 75,
    totalQuestions: 4,
    correctCount: 3,
    answers: [0, 1, 2, 1],
    completedAt: '2024-02-11',
  },
];

export const mockProgressStats: ProgressStats = {
  totalTasks: 7,
  completedTasks: 3,
  totalTimeSpent: 145,
  completionRate: 43,
  quizAverage: 83,
  strongTopics: ['财务报销', '职业发展'],
  weakTopics: ['IT系统使用'],
};

export const getRecordByEntryId = (entryId: string): LearningRecord | undefined => {
  return mockLearningRecords.find(r => r.entryId === entryId);
};

export const getRecordsByUserId = (userId: string): LearningRecord[] => {
  return mockLearningRecords.filter(r => r.userId === userId);
};

export const getResultsByUserId = (userId: string): QuizResult[] => {
  return mockQuizResults.filter(r => r.userId === userId);
};
