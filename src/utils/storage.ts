const STORAGE_KEYS = {
  QUESTIONS: 'kb_questions',
  ANSWERS: 'kb_answers',
  LEARNING_RECORDS: 'kb_learning_records',
  QUIZ_RESULTS: 'kb_quiz_results',
  ENTRIES: 'kb_entries',
  PATHS: 'kb_paths',
} as const;

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },
};

export { STORAGE_KEYS };
