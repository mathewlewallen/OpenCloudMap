"use client"

import * as React from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const defaultData = [
  { name: "Jan", total: 1230 },
  { name: "Feb", total: 2540 },
  { name: "Mar", total: 3200 },
  { name: "Apr", total: 2100 },
  { name: "May", total: 3800 },
  { name: "Jun", total: 2750 },
  { name: "Jul", total: 4100 },
  { name: "Aug", total: 3650 },
  { name: "Sep", total: 2200 },
  { name: "Oct", total: 4000 },
  { name: "Nov", total: 3100 },
  { name: "Dec", total: 4500 },
]

type OverviewProps = {
  data?: { name: string; total: number }[]
}

export function Overview({ data = defaultData }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
