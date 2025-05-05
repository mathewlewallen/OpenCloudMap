export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Open Cloud Map",
  description:
    "Open Cloud Map is a platform for dedicated to advancing the use of open source aviation resources and technologies.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Map",
      href: "/map",
    },
    { 
      title: "Account",
      href: "/account",
    },
    { 
      title: "Dashboard",
      href: "/dashboard",
    },
    { 
      title: "OpenAI",
      href: "/playground",
    },
    { 
      title: "Podcasts",
      href: "/music",
    },
    { 
      title: "Blog",
      href: "/blog",
    },
    { 
      title: "RBAC",
      href: "/dashboard/members",
    },
    { 
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {
    github: "https://github.com/mathewlewallen/opencloudmap",
    login: "https://opencloudmap.com/auth/login",
    signup: "https://opencloudmap.com/auth/signup",
    contact: "/contact",
    linkedin:"https://linkedin.com/in/mathewlewallen",
  },
}
