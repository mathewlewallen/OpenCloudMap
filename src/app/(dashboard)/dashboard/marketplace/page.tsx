'use client'

import * as React from "react"
import { Boxes } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PurchaseButton from "@/components/purchase-button"
import { TeamSwitcher } from "@/components/team-switcher"
import ThemeSwitch from "@/components/theme-switch"
import SeparatorWithText from "@/components/separator-with-text"
import { NavUser } from "@/components/nav-user"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Alert } from "@heroui/react"

interface Team {
  name: string
  iconName: string
  plan: string
}

const demoTeams: Team[] = [
  {
    name: "Acme Inc",
    iconName: "boxes",
    plan: "Pro Plan",
  },
  {
    name: "Monsters Inc",
    iconName: "boxes",
    plan: "Free Plan",
  },
]

interface MarketplaceComponent {
  id: string
  name: string
  description: string
  credits: number
  containerClass?: string
  preview: () => React.ReactNode
}

const COMPONENTS: MarketplaceComponent[] = [
  {
    id: "team-switcher",
    name: "Team Switcher",
    description: "A sleek dropdown menu for switching between teams with custom logos and plans",
    credits: 50,
    containerClass: "w-[300px]",
    preview: () => {
      const teams = demoTeams.map(team => ({
        ...team,
        logo: Boxes,
      }))
      return <TeamSwitcher teams={teams} />
    },
  },
  {
    id: "theme-switch",
    name: "Theme Switch",
    description: "An animated theme switcher with system, light, and dark mode options",
    credits: 30,
    preview: () => <ThemeSwitch />,
  },
  {
    id: "separator-with-text",
    name: "Separator With Text",
    description: "A clean separator component with customizable text and styling",
    credits: 20,
    containerClass: "w-full",
    preview: () => (
      <SeparatorWithText>
        <span className="text-muted-foreground">OR</span>
      </SeparatorWithText>
    ),
  },
  {
    id: "nav-user",
    name: "User Navigation Dropdown",
    description: "A professional user navigation dropdown with avatar, user info, and action items",
    credits: 60,
    containerClass: "w-[300px]",
    preview: () => <NavUser />,
  },
  {
    id: "page-header",
    name: "Page Header with Breadcrumbs",
    description: "A responsive page header with collapsible sidebar trigger and breadcrumb navigation",
    credits: 40,
    containerClass: "w-full",
    preview: () => (
      <PageHeader
        items={[
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/settings", label: "Settings" },
        ]}
      />
    ),
  },
  {
    id: 'button',
    name: "Button",
    description: "A button component with customizable text and styling",
    credits: 10,
    containerClass: "w-full flex justify-center",
    preview: () => <Button>Click me</Button>,
  }
]

export default function MarketplacePage() {
  return (
    <>
      <PageHeader
        items={[
          {
            href: "/dashboard/marketplace",
            label: "Marketplace"
          }
        ]}
      />
      <div className="container mx-auto px-5 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mt-4">Component Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Purchase and use our premium components using your credits
          </p>
        </div>

        <Alert
          color="warning"
          title="Demo Template Feature"
          description="This marketplace page demonstrates how to implement a credit-based billing system in your SaaS application. Feel free to use this as a starting point and customize it for your specific needs."
          className="mb-6"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPONENTS.map((component) => (
            <Card key={component.id}>
              <CardHeader>
                <CardTitle>{component.name}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center bg-muted/50 p-6">
                <div className={component.containerClass}>
                  {component.preview()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <div className="text-md lg:text-2xl font-bold">{component.credits} credits</div>
                <PurchaseButton
                  componentId={component.id}
                  credits={component.credits}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
