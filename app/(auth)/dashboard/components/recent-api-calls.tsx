"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type ApiCall = {
  id: string
  endpoint: string
  method: string
  status: number
  timestamp: string
}

const recentCalls: ApiCall[] = [
  { id: "1", endpoint: "/api/maps/tiles", method: "GET", status: 200, timestamp: "2025-05-11 10:30" },
  { id: "2", endpoint: "/api/auth/login", method: "POST", status: 200, timestamp: "2025-05-11 10:25" },
  { id: "3", endpoint: "/api/maps/search", method: "GET", status: 404, timestamp: "2025-05-11 10:15" },
  { id: "4", endpoint: "/api/flightplans", method: "POST", status: 201, timestamp: "2025-05-11 09:50" },
  { id: "5", endpoint: "/api/maps/tiles", method: "GET", status: 500, timestamp: "2025-05-11 09:30" },
]

export function RecentApiCalls() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent API Calls</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Time</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentCalls.map((call) => (
              <TableRow key={call.id}>
                <TableCell className="text-xs text-muted-foreground">{call.timestamp}</TableCell>
                <TableCell className="text-sm">{call.endpoint}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs uppercase">
                    {call.method}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      call.status >= 200 && call.status < 300
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : call.status >= 400 && call.status < 500
                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }
                  >
                    {call.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
