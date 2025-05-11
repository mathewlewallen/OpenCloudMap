'use server'

import { cookies } from 'next/headers'
import { createCookieClient } from '@/utils/supabase/server'

type ActionState = {
  name?: string
  email?: string
  error?: string
  success?: string
}

export async function updateAccount(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name  = String(formData.get('name')?.toString().trim() || '')
  const email = String(formData.get('email')?.toString().trim() || '')

  if (!name || !email) {
    return { error: 'Both name and email are required.' }
  }

  const cookieStore = await cookies()
  const supabase = createCookieClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user?.id) {
    return { error: 'Not authenticated.' }
  }

  const { error } = await supabase
    .from('users')
    .update({ name, email })
    .eq('id', session.user.id)

  if (error) {
    return { error: error.message }
  }
  return { success: 'Account updated successfully!' }
}
