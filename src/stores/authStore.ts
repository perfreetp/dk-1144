import { create } from 'zustand';
import { User } from '../types';
import { currentUser } from '../data/mockUsers';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: currentUser,
  isAuthenticated: true,
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ user: currentUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));
