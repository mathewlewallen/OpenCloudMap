import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createCookieClient } from '@/utils/supabase/server'  

export default async function PrivatePage() {
  const cookieStore = await cookies()
  const supabase = createCookieClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return <p>Hello {data.user.email}</p>
}