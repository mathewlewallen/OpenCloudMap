'use client'

import { useActionState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { updateAccount } from '@/app/(auth)/dashboard/settings/actions'

type ActionState = {
  name?: string
  email?: string
  error?: string
  success?: string
}

interface Props {
  nameValue: string
  emailValue: string
}

export default function GeneralSettingsForm({ nameValue, emailValue }: Props) {
  // seed the hook's "prev state" with your fetched values:
  const [state, action, isPending] =
    useActionState<ActionState, FormData>(
      updateAccount,
      { name: nameValue, email: emailValue }
    )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={state.name ?? nameValue}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={state.email ?? emailValue}
              required
            />
          </div>

          {state.error && (
            <p className="text-red-600 text-sm">{state.error}</p>
          )}
          {state.success && (
            <p className="text-green-600 text-sm">{state.success}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Saving…
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
