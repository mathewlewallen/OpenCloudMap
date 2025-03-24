import { SessionValidationResult } from '@/types';
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useSessionStore = create(
  combine(
    {
      session: null as SessionValidationResult | null,
      isLoading: true,
      lastFetched: null as Date | null,
    },
    (set) => ({
      setSession: (session: SessionValidationResult) => set({ session, isLoading: false, lastFetched: new Date() }),
      clearSession: () => set({ session: null, isLoading: false, lastFetched: null }),
      refetchSession: () => set({ isLoading: true, lastFetched: null }),
    })
  )
)
