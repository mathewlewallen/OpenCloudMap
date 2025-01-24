import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useConfigStore = create(
  combine(
    {
      isGoogleSSOEnabled: null as boolean | null,
      isTurnstileEnabled: null as boolean | null,
    },
    (set) => ({
      setConfig: (config: { isGoogleSSOEnabled: boolean, isTurnstileEnabled: boolean }) => set(config),
    })
  )
)
