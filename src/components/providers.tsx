"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { HeroUIProvider } from "@heroui/react"
import type { SessionValidationResult } from "@/types"
import { useSessionStore } from "@/state/session"
import { Suspense, useEffect, useRef, RefObject } from "react"
import { useConfigStore } from "@/state/config"
import type { getConfig } from "@/flags"
import { EmailVerificationDialog } from "./email-verification-dialog"
import { useTopLoader } from 'nextjs-toploader'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEventListener } from 'usehooks-ts';
import { useDebounceCallback } from 'usehooks-ts'

type Props = {
  config: Awaited<ReturnType<typeof getConfig>>
}

function RouterChecker() {
  const { start, done } = useTopLoader()
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const refetchSession = useSessionStore((store) => store.refetchSession)

  useEffect(() => {
    const _push = router.push.bind(router);
    const _refresh = router.refresh.bind(router);

    // Monkey patch: https://github.com/vercel/next.js/discussions/42016#discussioncomment-9027313
    router.push = (href, options) => {
      start();
      _push(href, options);
    };

    // Monkey patch: https://github.com/vercel/next.js/discussions/42016#discussioncomment-9027313
    router.refresh = () => {
      start();
      refetchSession();
      _refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return null;
}

export function ThemeProvider({
  children,
  config,
  ...props
}: React.ComponentProps<typeof NextThemesProvider> & Props) {
  const session = useSessionStore((store) => store.session)
  const setSession = useSessionStore((store) => store.setSession)
  const setConfig = useConfigStore((store) => store.setConfig)
  const sessionLastFetched = useSessionStore((store) => store.lastFetched)
  const documentRef = useRef(typeof window === 'undefined' ? null : document)

  const fetchSession = useDebounceCallback(async () => {
    try {
      const response = await fetch('/api/get-session')
      const session = await response.json() as SessionValidationResult

      if (session) {
        setSession(session)
      }
    } catch (error) {
      console.error('Failed to fetch session:', error)
    }
  }, 30)

  useEffect(() => {
    if (session && sessionLastFetched) {
      return
    }

    fetchSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, sessionLastFetched])

  useEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      fetchSession()
    }
  }, documentRef as RefObject<Document>)

  useEffect(() => {
    setConfig(config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config])

  return (
    <HeroUIProvider>
      <Suspense>
        <RouterChecker />
      </Suspense>
      <NextThemesProvider {...props} attribute="class">
        {children}
        <EmailVerificationDialog />
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
