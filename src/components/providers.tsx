"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HeroUIProvider } from "@heroui/react"
import type { SessionValidationResult } from "@/types"
import { useSessionStore } from "@/state/session"
import { useEffect } from "react"
import { useConfigStore } from "@/state/config"
import type { getConfig } from "@/flags"
import { EmailVerificationDialog } from "./email-verification-dialog"

type Props = {
  session: SessionValidationResult
  config: Awaited<ReturnType<typeof getConfig>>
}

export function ThemeProvider({
  children,
  session,
  config,
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & Props) {
  const setSession = useSessionStore((store) => store.setSession)
  const setConfig = useConfigStore((store) => store.setConfig)

  useEffect(() => {
    setSession(session)
  }, [session]);

  useEffect(() => {
    setConfig(config)
  }, [config])

  return (
    <HeroUIProvider>
      <NextThemesProvider {...props} attribute="class">
        {children}
        <EmailVerificationDialog />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
