import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/app/(auth)/dashboard/components/date-range-picker"
import { MainNav } from "@/app/(auth)/dashboard/components/main-nav"
import { MapUsageChart } from "@/app/(auth)/dashboard/components/map-usage-chart"
import { RecentApiCalls } from "@/app/(auth)/dashboard/components/recent-api-calls"
import { Search } from "@/app/(auth)/dashboard/components/search"
import TeamSwitcher from "@/app/(auth)/dashboard/components/team-switcher"
import { UserNav } from "@/app/(auth)/dashboard/components/user-nav"
import { RecentActivity } from "@/app/(auth)/dashboard/components/recent-activity"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Monitor Open Cloud Map usage and platform activity."
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col xs:flex max-w-dvw w-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Open Cloud Map Admin</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Export Data</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Map Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45,231</div>
                    <p className="text-xs text-muted-foreground">+12% this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active API Keys</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">120</div>
                    <p className="text-xs text-muted-foreground">+5 since last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>API Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">123,000</div>
                    <p className="text-xs text-muted-foreground">+18% this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-xs text-muted-foreground">+4 since last hour</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Map Layer Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <MapUsageChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent API Calls</CardTitle>
                    <CardDescription>
                      The latest user requests to the platform.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentApiCalls />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}