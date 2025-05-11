import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  type LucideIcon,
} from 'lucide-react'
import { createCookieClient } from '@/utils/supabase/server'
import type { Database } from '@/lib/supabase'
import { cookies } from 'next/headers'

type ActivityType = Database['public']['Enums']['activity_type']
type ActivityRow  = Database['public']['Tables']['activity_log']['Row']

async function getActivityLogs(): Promise<ActivityRow[]> {
  const cookieStore = await cookies()
  const supabase    = await createCookieClient(cookieStore)

  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .order('timestamp', { ascending: false })

  if (error || !data) {
    console.error(error)
    return []
  }
  return data
}

const iconMap: Record<ActivityType, LucideIcon> = {
  SIGN_UP:              UserPlus,
  SIGN_IN:              UserCog,
  SIGN_OUT:             LogOut,
  UPDATE_PASSWORD:      Lock,
  DELETE_ACCOUNT:       UserMinus,
  UPDATE_ACCOUNT:       Settings,
  CREATE_TEAM:          UserPlus,
  REMOVE_TEAM_MEMBER:   UserMinus,
  INVITE_TEAM_MEMBER:   Mail,
  ACCEPT_INVITATION:    CheckCircle,
}

function getRelativeTime(ts: string) {
  const then = new Date(ts).getTime()
  const now  = Date.now()
  const d    = Math.floor((now - then) / 1000)
  if (d < 60)   return 'just now'
  if (d < 3600) return `${Math.floor(d/60)} minutes ago`
  if (d < 86400)return `${Math.floor(d/3600)} hours ago`
  if (d < 604800)return `${Math.floor(d/86400)} days ago`
  return new Date(ts).toLocaleDateString()
}

function formatAction(a: ActivityType): string {
  switch (a) {
    case 'SIGN_UP':            return 'You signed up'
    case 'SIGN_IN':            return 'You signed in'
    case 'SIGN_OUT':           return 'You signed out'
    case 'UPDATE_PASSWORD':    return 'You changed your password'
    case 'DELETE_ACCOUNT':     return 'You deleted your account'
    case 'UPDATE_ACCOUNT':     return 'You updated your account'
    case 'CREATE_TEAM':        return 'You created a new team'
    case 'REMOVE_TEAM_MEMBER': return 'You removed a team member'
    case 'INVITE_TEAM_MEMBER': return 'You invited a team member'
    case 'ACCEPT_INVITATION':  return 'You accepted an invitation'
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs()

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-chart-2" />
              <p className="text-sm text-primary">No activity yet.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {logs.map((log) => {
                // log.action is already guessed as ActivityType
                const Icon = iconMap[log.action] || Settings
                return (
                  <li key={log.id} className="flex items-center space-x-4">
                    <div className="bg-chart-2 rounded-full p-2">
                      <Icon className="h-5 w-5 text-chart-2" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        {formatAction(log.action)}
                        {log.ip_address && ` from IP ${log.ip_address}`}
                      </p>
                      <time className="text-xs text-primary">
                        {getRelativeTime(log.timestamp)}
                      </time>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
