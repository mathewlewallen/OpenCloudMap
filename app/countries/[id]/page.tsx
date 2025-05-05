'use client';
import { use } from "react";

import useBrowserClient from '@/utils/supabase/client'
import { getCountryById } from '@/queries/country-by-id'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

export default function CountryPage(props: { params: Promise<{ id: number }> }) {
  const params = use(props.params);
  const supabase = useBrowserClient()
  const {
    data: country,
    isLoading,
    isError,
  } = useQuery(getCountryById(supabase, params.id))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !country) {
    return <div>Error</div>
  }

  return (
    <div>
      <h1>{country.name}</h1>
    </div>
  )
}