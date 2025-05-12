"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

type Activity = {
  user: string
  action: string
  email?: string
  timestamp: Date
  avatar?: string
}

const recentActivity: Activity[] = [
  {
    user: "Mathew Lewallen",
    action: "Fetched OpenAIP FIR boundaries",
    email: "mathewlewallen@email.com",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    avatar: "/avatars/01.png",
  },
  {
    user: "System",
    action: "Background job updated airport data",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    user: "Alex Johnson",
    action: "Created new flight plan for KJFK → EGLL",
    email: "alex.j@email.com",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    avatar: "/avatars/02.png",
  },
  {
    user: "Drone Ops API",
    action: "Queried restricted airspace data",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    user: "Open Cloud Map Bot",
    action: "Auto-synced NOTAM dataset",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-6">
      {recentActivity.map((item, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            {item.avatar ? (
              <AvatarImage src={item.avatar} alt={item.user} />
            ) : (
              <AvatarFallback>
                {item.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.user}</p>
            <p className="text-sm text-muted-foreground">{item.action}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">
            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}
