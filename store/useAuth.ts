// store/useAuth.ts

import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';
import * as authApi from '@/lib/auth';

type AuthState = {
  loading: boolean;
  error: string | null;
  user: any | null;

  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    nickname: string,
  ) => Promise<void>;
  logout: () => Promise<void>;

  initUser: () => Promise<void>;
  setError: (error: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  user: null,

  setError: (error) => set({ error }),

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authApi.signIn(email, password);
      set({ user: data.user });
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // register: async (email, password) => {
  //   set({ loading: true, error: null })
  //   try {
  //     await authApi.signUp(email, password)
  //   } catch (err: any) {
  //     set({ error: err.message })
  //   } finally {
  //     set({ loading: false })
  //   }
  // },

  register: async (email, password, nickname) => {
    set({ loading: true, error: null });
    try {
      await authApi.signUp(email, password, nickname);
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await authApi.signOut();
    set({ user: null });
  },

  initUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) set({ user });
  },
}));
