import type { NavGroup } from "@/types/nav"

export const siteConfig: {
  name: string
  description: string
  navGroups: NavGroup[] 
  links: Record<string, string>
} = {
  name: "Open Cloud Map",
  description:
  "Open Cloud Map is the free open-source aviation mapping platform to visualize, plan, and analyze aviation data.",
  navGroups: [
    {
      title: "Free",
      authRequired: false,
      items: [
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Data", href: "/data" },
        { title: "Map", href: "/map" },
        { title: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Library",
      authRequired: false,
      items: [
        { title: "Blog", href: "/blog" },
        { title: "Docs", href: "/docs" },
        { title: "Guides", href: "/guides" },
        { title: "Papers", href: "/papers" },
      ],
    },
    {
      title: "Auth",
      authRequired: true,
      items: [
        { title: "Account", href: "/account" },
        { title: "Auth", href: "/auth" },
        { title: "Confirmation", href: "/confirmation" },
        { title: "Dashboard", href: "/dashboard" },
        { title: "Playground", href: "/playground" },
        { title: "Schedule", href: "/schedule" },
      ],
    },
  ],
  links: {
    github: "https://github.com/mathewlewallen/opencloudmap",
    login: "https://opencloudmap.com/auth/login",
    signup: "https://opencloudmap.com/auth/signup",
    linkedin:"https://linkedin.com/in/mathewlewallen",
  },
}

export type SiteConfig = typeof siteConfig