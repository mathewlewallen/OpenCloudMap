'use server'

import { cookies } from 'next/headers'
import { createCookieClient } from '@/utils/supabase/server'

export type PasswordState = {
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
  error?: string
  success?: string
}

export type DeleteState = {
  password?: string
  error?: string
  success?: string
}

/**
 * This will be called by `useActionState<PasswordState,FormData>(...)`
 */
export async function updatePassword(
  _prev: PasswordState,
  formData: FormData
): Promise<PasswordState> {
  const currentPassword = formData.get('currentPassword')?.toString() || ''
  const newPassword = formData.get('newPassword')?.toString() || ''
  const confirmPassword = formData.get('confirmPassword')?.toString() || ''

  // basic validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: 'All fields are required.' }
  }
  if (newPassword !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  const supabase = createCookieClient(await cookies())
  // re-authenticate or verify currentPassword if your flow requires it…
  // here we just call updateUser
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: 'Your password has been updated.' }
}

/**
 * This will be called by `useActionState<DeleteState,FormData>(...)`
 */
export async function deleteAccount(
  _prev: DeleteState,
  formData: FormData
): Promise<DeleteState> {
  const password = formData.get('password')?.toString() || ''
  if (!password) {
    return { error: 'Please confirm your password.' }
  }

  const supabase = createCookieClient(await cookies())
  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession()

  if (sessionErr || !session?.user) {
    return { error: 'You must be signed in to delete your account.' }
  }

  // Re-authenticate user via a server-side RPC or verify their password here.
  // Supabase JS doesn't expose a reauth API, so you might:
  // 1) call signInWithPassword on a server client
  // 2) then call admin.deleteUser via an Edge Function or a Postgres FDW
  // For demo we'll just sign them out and delete their profile row.

  // remove their user row in your `users` table
  const { error: dbErr } = await supabase
    .from('users')
    .delete()
    .eq('id', session.user.id)

  if (dbErr) {
    return { error: 'Failed to delete profile: ' + dbErr.message }
  }

  // finally sign them out
  await supabase.auth.signOut()

  return { success: 'Your account has been deleted.' }
}
