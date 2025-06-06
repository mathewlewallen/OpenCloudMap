
import { Separator } from "@/components/ui/separator"
import { AccountForm } from "@/app/(auth)/account/account-form"
// TODO: try out the import AccountForm from "@/app/(auth)/account/account-form"
import { cookies } from 'next/headers'
import { createCookieClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SettingsAccountPage() {
  const cookieStore = await cookies()
  const supabase = createCookieClient(cookieStore)  


  const { 
data: { user },} = await supabase.auth.getUser()
  if (!user) {
    redirect('/auth')
  }

  return (
    <div className="mt-10 px-2 lg:p-8">
    <div className="mx-auto px-2 flex w-full flex-col justify-center space-y-6">
<div className="flex flex-col space-y-2 text-justified-center items-justified-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Account Profile</h1>
        <p className="text-base text-justify ">
          Update your account...</p>

        <Link
          href="/playground"
          target="_blank"
          rel="noreferrer"
          className="text-1xl font-bold tracking-tighter sm:text-3xl"
        >
         Check out the OpenAI Playground!
        </Link>
       </div>
      <Separator />
      <AccountForm />
    </div>
   </div>
  )
}