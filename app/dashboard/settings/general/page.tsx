import GeneralSettingsForm from './GeneralSettingsForm'
import { cookies } from 'next/headers'
import { createCookieClient } from '@/utils/supabase/server'

export default async function SettingsGeneralPage() {
  const cookieStore = await cookies()
  const supabase = createCookieClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user) {
    // could also redirect()
    return <p className="p-8">Please log in to edit your settings.</p>
  }

  const userId = session.user.id
  const { data: profile } = await supabase
    .from('users')
    .select('name,email')
    .eq('id', userId)
    .single()

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>
      <GeneralSettingsForm
        nameValue={profile?.name ?? ''}
        emailValue={profile?.email ?? ''}
      />
    </section>
  )
}
