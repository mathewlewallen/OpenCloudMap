import { SessionValidationResult } from '@/types';
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useSessionStore = create(
  combine(
    {
      session: null as SessionValidationResult | null,
      isLoading: true,
      lastFetched: null as Date | null,
      isInitialized: false,
    },
    (set) => ({
      setSession: (session: SessionValidationResult) =>
        set({ session, isLoading: false, lastFetched: new Date(), isInitialized: true }),
      clearSession: () =>
        set({ session: null, isLoading: false, lastFetched: null, isInitialized: true }),
      refetchSession: () =>
        set((state) => ({
          ...state,
          isLoading: !state.isInitialized,
          lastFetched: null
        })),
    })
  )
)
