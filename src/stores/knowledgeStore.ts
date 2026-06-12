import { create } from 'zustand';
import { Entry, Category, LearningPath, Question, Answer } from '../types';
import { mockEntries } from '../data/mockEntries';
import { mockCategories } from '../data/mockCategories';
import { mockPaths } from '../data/mockPaths';
import { mockQuestions, getQuestionById, getAnswersByQuestion } from '../data/mockQuestions';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface KnowledgeState {
  entries: Entry[];
  categories: Category[];
  paths: LearningPath[];
  questions: Question[];
  answers: Answer[];
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
  fetchAnswers: () => void;
  fetchEntryById: (id: string) => void;
  fetchQuestionById: (id: string) => void;
  searchEntries: (keyword: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedPath: (path: LearningPath | null) => void;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'answerCount'>) => void;
  addAnswer: (questionId: string, content: string, authorName: string, authorId?: string, authorAvatar?: string) => void;
  adoptAnswer: (questionId: string, answerId: string) => void;
  addEntry: (entry: Entry) => void;
  updateEntry: (entry: Entry) => void;
  addPath: (path: LearningPath) => void;
  updatePath: (path: LearningPath) => void;
  getEntryById: (id: string) => Entry | undefined;
  getPathById: (id: string) => LearningPath | undefined;
  getEntriesByPath: (pathId: string) => Entry[];
  getAnswersForQuestion: (questionId: string) => Answer[];
}

export const useKnowledgeStore = create<KnowledgeState>((set, get) => ({
  entries: [],
  categories: [],
  paths: [],
  questions: [],
  answers: [],
  currentEntry: null,
  currentQuestion: null,
  currentAnswers: [],
  searchResults: [],
  selectedCategory: null,
  selectedPath: null,
  isLoading: false,

  fetchEntries: () => {
    set({ isLoading: true });
    const storedEntries = storage.get<Entry[]>(STORAGE_KEYS.ENTRIES, []);
    const entries = storedEntries.length > 0 ? storedEntries : mockEntries;
    if (storedEntries.length === 0) {
      storage.set(STORAGE_KEYS.ENTRIES, mockEntries);
    }
    set({ entries, isLoading: false });
  },

  fetchCategories: () => {
    set({ categories: mockCategories });
  },

  fetchPaths: () => {
    const storedPaths = storage.get<LearningPath[]>(STORAGE_KEYS.PATHS, []);
    const paths = storedPaths.length > 0 ? storedPaths : mockPaths;
    if (storedPaths.length === 0) {
      storage.set(STORAGE_KEYS.PATHS, mockPaths);
    }
    set({ paths });
  },

  fetchQuestions: () => {
    const storedQuestions = storage.get<Question[]>(STORAGE_KEYS.QUESTIONS, []);
    const questions = storedQuestions.length > 0 ? storedQuestions : mockQuestions;
    if (storedQuestions.length === 0) {
      storage.set(STORAGE_KEYS.QUESTIONS, mockQuestions);
    }
    set({ questions });
  },

  fetchAnswers: () => {
    const storedAnswers = storage.get<Answer[]>(STORAGE_KEYS.ANSWERS, []);
    if (storedAnswers.length === 0) {
      storage.set(STORAGE_KEYS.ANSWERS, mockAnswers);
      set({ answers: mockAnswers });
    } else {
      set({ answers: storedAnswers });
    }
  },

  fetchEntryById: (id: string) => {
    set({ isLoading: true });
    const { entries } = get();
    const entry = entries.find(e => e.id === id);
    set({ currentEntry: entry || null, isLoading: false });
  },

  fetchQuestionById: (id: string) => {
    set({ isLoading: true });
    const { questions, answers } = get();
    const question = questions.find(q => q.id === id);
    const questionAnswers = answers.filter(a => a.questionId === id);
    set({ currentQuestion: question || null, currentAnswers: questionAnswers, isLoading: false });
  },

  searchEntries: (keyword: string) => {
    if (!keyword.trim()) {
      set({ searchResults: [] });
      return;
    }
    const { entries } = get();
    const lowerKeyword = keyword.toLowerCase();
    const results = entries.filter(entry =>
      entry.title.toLowerCase().includes(lowerKeyword) ||
      entry.summary.toLowerCase().includes(lowerKeyword) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
    );
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
    
    const { questions } = get();
    const updatedQuestions = [newQuestion, ...questions];
    
    storage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);
    set({ questions: updatedQuestions });
  },

  addAnswer: (questionId: string, content: string, authorName: string, authorId?: string, authorAvatar?: string) => {
    const newAnswer: Answer = {
      id: `a-${Date.now()}`,
      questionId,
      content,
      authorId: authorId || '1',
      authorName,
      authorAvatar,
      isAdopted: false,
      upvotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const { answers, questions } = get();
    const updatedAnswers = [...answers, newAnswer];
    storage.set(STORAGE_KEYS.ANSWERS, updatedAnswers);

    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? { ...q, answerCount: q.answerCount + 1, status: 'answered' as const }
        : q
    );
    storage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);

    set(state => ({
      answers: updatedAnswers,
      currentAnswers: [...state.currentAnswers, newAnswer],
      questions: updatedQuestions,
    }));
  },

  adoptAnswer: (questionId: string, answerId: string) => {
    const { answers, questions } = get();

    const updatedAnswers = answers.map(a => ({
      ...a,
      isAdopted: a.id === answerId,
    }));
    storage.set(STORAGE_KEYS.ANSWERS, updatedAnswers);

    const updatedQuestions = questions.map(q =>
      q.id === questionId
        ? { ...q, status: 'adopted' as const, adoptedAnswerId: answerId }
        : q
    );
    storage.set(STORAGE_KEYS.QUESTIONS, updatedQuestions);

    set({
      answers: updatedAnswers,
      currentAnswers: updatedAnswers.filter(a => a.questionId === questionId),
      questions: updatedQuestions,
      currentQuestion: updatedQuestions.find(q => q.id === questionId) || null,
    });
  },

  addEntry: (entry: Entry) => {
    const { entries } = get();
    const updatedEntries = [entry, ...entries];
    storage.set(STORAGE_KEYS.ENTRIES, updatedEntries);
    set({ entries: updatedEntries });
  },

  updateEntry: (entry: Entry) => {
    const { entries } = get();
    const updatedEntries = entries.map(e => e.id === entry.id ? entry : e);
    storage.set(STORAGE_KEYS.ENTRIES, updatedEntries);
    set({ entries: updatedEntries });
  },

  addPath: (path: LearningPath) => {
    const { paths } = get();
    const updatedPaths = [...paths, path];
    storage.set(STORAGE_KEYS.PATHS, updatedPaths);
    set({ paths: updatedPaths });
  },

  updatePath: (path: LearningPath) => {
    const { paths } = get();
    const updatedPaths = paths.map(p => p.id === path.id ? path : p);
    storage.set(STORAGE_KEYS.PATHS, updatedPaths);
    set({ paths: updatedPaths });
  },

  getEntryById: (id: string) => {
    const { entries } = get();
    return entries.find(e => e.id === id);
  },

  getPathById: (id: string) => {
    const { paths } = get();
    return paths.find(p => p.id === id);
  },

  getEntriesByPath: (pathId: string) => {
    const { paths, entries } = get();
    const path = paths.find(p => p.id === pathId);
    if (!path) return [];
    return entries.filter(e => path.entryIds.includes(e.id));
  },

  getAnswersForQuestion: (questionId: string) => {
    const { answers } = get();
    return answers.filter(a => a.questionId === questionId);
  },
}));

const mockAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: '<p>你好，关于年假申请，我可以详细说明一下...</p>',
    authorId: '2',
    authorName: '李华',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    isAdopted: true,
    upvotes: 15,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
];
