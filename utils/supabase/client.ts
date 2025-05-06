import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/supabase'

export type TypedSupabaseClient = ReturnType<typeof createClient>

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}


import { useMemo } from 'react'

let client: TypedSupabaseClient | undefined

export function getBrowserClient() {
  if (client) { return client }
  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return client
}

export function useBrowserClient() {
  return useMemo(getBrowserClient, [])
}
