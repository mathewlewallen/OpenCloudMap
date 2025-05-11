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
      items: [
        { title: "About", href: "/about" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
        { title: "Data", href: "/data" },
        { title: "Docs", href: "/docs" },
        { title: "Map", href: "/map" },
        { title: "MDX", href: "/mdx" },
        { title: "Privacy", href: "/privacy" },
        { title: "Terms", href: "/terms" },
      ],
    },
    {
      title: "Auth",
      authRequired: true,
      items: [
        { title: "Account", href: "/account" },
        { title: "Auth", href: "/auth" },
        { title: "Confirmation", href: "/confirmation" },
        { title: "Countries", href: "/countries" },
        { title: "Dashboard", href: "/dashboard" },
        { title: "Playground", href: "/playground" },
        { title: "Private", href: "/private" },
        { title: "Schedule", href: "/schedule" },
        { title: "SSRCountries", href: "/ssr-countries" },
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