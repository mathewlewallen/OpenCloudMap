'use client'

import { useBrowserClient } from '@/utils/supabase/client'
import { getCountryById } from '@/queries/country-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

export default function Country({ id }: { id: number }) {
  const supabase = useBrowserClient()
  // This useQuery could just as well happen in some deeper
  // child to <Posts>, data will be available immediately either way
  const { data: country } = useQuery(getCountryById(supabase, id))

  return (
    <div>
      <h1>SSR: {country?.name}</h1>
    </div>
  )
}