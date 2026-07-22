// store/slices/auth.slice.ts
// Zustand slice for authentication state.

import { StateCreator } from 'zustand';

type Maybe<T> = T | null;

export interface AuthSlice {
  user: Maybe<User>;
  session: Maybe<Session>;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

import type { User, Session } from '@/types/auth';

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, session: null, isAuthenticated: false }),
});
