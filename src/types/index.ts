export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  department: string;
  position: string;
  role: UserRole;
  joinDate: string;
}

export interface Entry {
  id: string;
  title: string;
  content: string;
  summary: string;
  categoryId: string;
  responsibleId: string;
  responsibleName: string;
  departments: string[];
  tags: string[];
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  updatedAt: string;
  version: number;
  relatedEntries: string[];
  relatedQuestions: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  parentId?: string;
  sortOrder: number;
  entryCount: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  entryIds: string[];
  requiredForPositions: string[];
  estimatedMinutes: number;
  progress?: number;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  categoryId: string;
  tags: string[];
  status: 'pending' | 'answered' | 'adopted';
  adoptedAnswerId?: string;
  viewCount: number;
  answerCount: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  isAdopted: boolean;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface LearningRecord {
  id: string;
  userId: string;
  entryId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  startedAt?: string;
  completedAt?: string;
  timeSpent: number;
}

export interface Quiz {
  id: string;
  entryId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  answers: number[];
  completedAt: string;
}

export interface ProgressStats {
  totalTasks: number;
  completedTasks: number;
  totalTimeSpent: number;
  completionRate: number;
  quizAverage: number;
  strongTopics: string[];
  weakTopics: string[];
}

export interface TeamMember {
  user: User;
  completionRate: number;
  totalTimeSpent: number;
  weakPoints: string[];
  pendingQuestions: number;
}

export interface WeakPoint {
  topic: string;
  count: number;
  percentage: number;
}
