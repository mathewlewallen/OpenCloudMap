import { SessionValidationResult } from '@/types';
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

interface SessionState {
  session: SessionValidationResult | null;
  isLoading: boolean;
  lastFetched: Date | null;
  fetchSession?: () => Promise<void>;
}

interface SessionActions {
  setSession: (session: SessionValidationResult) => void;
  clearSession: () => void;
  refetchSession: () => void;
}

export const useSessionStore = create(
  combine(
    {
      session: null as SessionValidationResult | null,
      isLoading: true,
      lastFetched: null as Date | null,
      fetchSession: undefined,
    } as SessionState,
    (set) => ({
      setSession: (session: SessionValidationResult) => set({ session, isLoading: false, lastFetched: new Date() }),
      clearSession: () => set({ session: null, isLoading: false, lastFetched: null }),
      refetchSession: () => set({ isLoading: true })
    } as SessionActions)
  )
)
