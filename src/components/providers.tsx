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
import { useTopLoader } from 'nextjs-toploader'
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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
  const { start, done } = useTopLoader()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const _push = router.push.bind(router);

    router.push = (href, options) => {
      start();
      _push(href, options);
    };
  }, [])

  useEffect(() => {
    done();
  }, [pathname, searchParams]);

  useEffect(() => {
    setSession(session)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    setConfig(config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
