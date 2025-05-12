 import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import '@/app/globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { CookieButton } from "@/components/cookie-button"
import { fontSans } from "@/lib/font"
import { siteConfig } from '@/config/site'
import { ReactQueryClientProvider } from '@/components/react-query-client-provider'
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/shared/Footer"
import { cn } from "@/lib/utils"
import { BetaBanner } from '@/components/beta-banner'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: 'https://opencloudmap.com/manifest.json',
  metadataBase: new URL('https://opencloudmap.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
      'es-ES': '/es-ES',
      'fr-FR': '/fr-FR',
      'jp-JP': '/jp-JP',
      'ko-KO': '/ko-KP',
      'zh-ZH': '/zh-ZH',
      'pt-PT': '/pt-PT',
    },
  },
  referrer: 'origin-when-cross-origin',
  keywords: [
      "Open Cloud Map",
      "open aviation data",
      "open source aviation tools",
      "Next.js 15",
      "React 19",
      "TypeScript SaaS",
      "Supabase backend",
      "Supabase Auth",
      "Supabase SSR",
      "geospatial data visualization",
      "open aviation mapping",
      "aviation maps API",
      "aviation data API",
      "MapLibre GL JS",
      "Deck.gl",
      "Tailwind CSS 4",
      "shadcn-ui components",
      "TanStack React Query",
      "PWA SaaS template",
      "Next.js SaaS starter",
      "Next.js app router",
      "Next.js secure headers",
      "Next.js CSP",
      "SaaS template with RBAC",
      "SaaS template with auth + CRUD",
      "Next.js templates for open data apps",
      "Next.js SaaS boilerplate",
      "Open Source SaaS template",
      "Supabase + Next.js template"
    ],
  authors: [{ name: 'Mathew Lewallen' }],
  creator: 'Mathew Lewallen',
  publisher: 'Mathew Lewallen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'NextJS',
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: "https://opencloudmap.com",
    images: [
      {
        url: 'https://ipselheadupsuqjktyxv.supabase.co/storage/v1/object/public/assets/opengraph-image.png', // Must be an absolute URL
        width: 1230,
        height: 640,
      },
      {
        url: 'https://ipselheadupsuqjktyxv.supabase.co/storage/v1/object/public/assets/opengraph-image.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'Open Cloud Map',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
       title: siteConfig.name,
       description: siteConfig.description,
       site: '@mathewlewallen',
       creator: '@mathewlewallen',
       images: [
    {
      url: 'https://ipselheadupsuqjktyxv.supabase.co/storage/v1/object/public/assets//twitter-image.png', // Must be an absolute URL
      width: 1800,
      height: 900,
    },
    {
      url: 'https://ipselheadupsuqjktyxv.supabase.co/storage/v1/object/public/assets//twitter-image.png',
      width: 1800,
      height: 900,
    },
   ],
 }
}

export const viewport: Viewport =  {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryClientProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
             <div className="relative flex min-h-screen flex-col bg-background">
              <SiteHeader/>
              <BetaBanner/>
              <div className="flex-1">
                  {children}
                <Toaster/>
                <Analytics/>
                <SpeedInsights/>
              </div>
            </div>           
          <Footer/>
          {/*TODO: 
          enter your api info from termly.io or a provider of your choice
          <Script type="text/javascript"
          src="https://app.termly.io/resource-blocker/123456789abcdefg"/>*/}
          <CookieButton />
        </ThemeProvider>
      </body>
    </html>
  </ReactQueryClientProvider>
  )
}
