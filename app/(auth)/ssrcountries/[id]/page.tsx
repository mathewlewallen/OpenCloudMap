import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createCookieClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Country from '@/app/(auth)/ssrcountries/[id]/country'
import { getCountryById } from '@/queries/country-by-id'

export default async function CountryPage(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const queryClient = new QueryClient()
  const cookieStore = await cookies()
  const supabase = await createCookieClient(cookieStore)

  await prefetchQuery(queryClient, getCountryById(supabase, params.id))

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Country id={params.id} />
    </HydrationBoundary>
  );
}