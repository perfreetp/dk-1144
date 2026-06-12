import { create } from 'zustand';
import { Entry, Category, LearningPath, Question, Answer } from '../types';
import { mockEntries, getEntryById, searchEntries as searchEntriesData } from '../data/mockEntries';
import { mockCategories } from '../data/mockCategories';
import { mockPaths } from '../data/mockPaths';
import { mockQuestions, getQuestionById, getAnswersByQuestion } from '../data/mockQuestions';

interface KnowledgeState {
  entries: Entry[];
  categories: Category[];
  paths: LearningPath[];
  questions: Question[];
  currentEntry: Entry | null;
  currentQuestion: Question | null;
  currentAnswers: Answer[];
  searchResults: Entry[];
  selectedCategory: Category | null;
  selectedPath: LearningPath | null;
  isLoading: boolean;
  fetchEntries: () => void;
  fetchCategories: () => void;
  fetchPaths: () => void;
  fetchQuestions: () => void;
  fetchEntryById: (id: string) => void;
  fetchQuestionById: (id: string) => void;
  searchEntries: (keyword: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedPath: (path: LearningPath | null) => void;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'answerCount'>) => void;
  addAnswer: (questionId: string, content: string, authorName: string) => void;
  adoptAnswer: (questionId: string, answerId: string) => void;
}

export const useKnowledgeStore = create<KnowledgeState>((set, get) => ({
  entries: [],
  categories: [],
  paths: [],
  questions: [],
  currentEntry: null,
  currentQuestion: null,
  currentAnswers: [],
  searchResults: [],
  selectedCategory: null,
  selectedPath: null,
  isLoading: false,

  fetchEntries: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ entries: mockEntries, isLoading: false });
    }, 300);
  },

  fetchCategories: () => {
    set({ categories: mockCategories });
  },

  fetchPaths: () => {
    set({ paths: mockPaths });
  },

  fetchQuestions: () => {
    set({ questions: mockQuestions });
  },

  fetchEntryById: (id: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      const entry = getEntryById(id);
      set({ currentEntry: entry || null, isLoading: false });
    }, 200);
  },

  fetchQuestionById: (id: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      const question = getQuestionById(id);
      const answers = question ? getAnswersByQuestion(id) : [];
      set({ currentQuestion: question || null, currentAnswers: answers, isLoading: false });
    }, 200);
  },

  searchEntries: (keyword: string) => {
    if (!keyword.trim()) {
      set({ searchResults: [] });
      return;
    }
    const results = searchEntriesData(keyword);
    set({ searchResults: results });
  },

  setSelectedCategory: (category: Category | null) => {
    set({ selectedCategory: category });
  },

  setSelectedPath: (path: LearningPath | null) => {
    set({ selectedPath: path });
  },

  addQuestion: (questionData) => {
    const newQuestion: Question = {
      ...questionData,
      id: `q-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewCount: 0,
      answerCount: 0,
    };
    set(state => ({ questions: [newQuestion, ...state.questions] }));
  },

  addAnswer: (questionId: string, content: string, authorName: string) => {
    const newAnswer: Answer = {
      id: `a-${Date.now()}`,
      questionId,
      content,
      authorId: '1',
      authorName,
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
      isAdopted: false,
      upvotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    set(state => ({
      currentAnswers: [...state.currentAnswers, newAnswer],
      questions: state.questions.map(q =>
        q.id === questionId
          ? { ...q, answerCount: q.answerCount + 1, status: 'answered' as const }
          : q
      ),
    }));
  },

  adoptAnswer: (questionId: string, answerId: string) => {
    set(state => ({
      currentAnswers: state.currentAnswers.map(a => ({
        ...a,
        isAdopted: a.id === answerId,
      })),
      questions: state.questions.map(q =>
        q.id === questionId
          ? { ...q, status: 'adopted' as const, adoptedAnswerId: answerId }
          : q
      ),
      currentQuestion: state.currentQuestion?.id === questionId
        ? { ...state.currentQuestion, status: 'adopted', adoptedAnswerId: answerId }
        : state.currentQuestion,
    }));
  },
}));
