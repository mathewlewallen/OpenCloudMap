import type { TypedSupabaseClient } from '@/utils/supabase/client' 

export function getCountryById(client: TypedSupabaseClient, countryId: number) {
  return client
    .from('countries')
    .select(
      `
      id,
      name
    `
    )
    .eq('id', countryId.toString())
    .throwOnError()
    .single()
}