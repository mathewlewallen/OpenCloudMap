"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "Mon", baseMap: 200, overlays: 50 },
  { date: "Tue", baseMap: 300, overlays: 100 },
  { date: "Wed", baseMap: 250, overlays: 80 },
  { date: "Thu", baseMap: 400, overlays: 150 },
  { date: "Fri", baseMap: 350, overlays: 120 },
  { date: "Sat", baseMap: 500, overlays: 200 },
  { date: "Sun", baseMap: 450, overlays: 180 },
]

export function MapUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map Layer Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="baseMap"
                stroke="#3b82f6" // Tailwind blue-500
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="overlays"
                stroke="#10b981" // Tailwind emerald-500
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
