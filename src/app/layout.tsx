import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import "server-only";

import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from 'nextjs-toploader'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/constants";
import { StartupStudioStickyBanner } from "@/components/startup-studio-sticky-banner";
import { getConfig } from "@/flags";
import { Spinner } from '@/components/ui/spinner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  keywords: ["SaaS", "Next.js", "React", "TypeScript", "Cloudflare Workers", "Edge Computing"],
  authors: [{ name: "Lubomir Georgiev" }],
  creator: "Lubomir Georgiev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    creator: "@LubomirGeorg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// This component will be wrapped in Suspense in the BaseLayout
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ProvidersFallback />}>
      <ProvidersContent>
        {children}
      </ProvidersContent>
    </Suspense>
  );
}

// This is the async component that fetches config
async function ProvidersContent({ children }: { children: React.ReactNode }) {
  const config = await getConfig();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      config={config}
    >
      <TooltipProvider
        delayDuration={100}
        skipDelayDuration={50}
      >
        {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader
          initialPosition={0.15}
          shadow="0 0 10px #000, 0 0 5px #000"
          height={4}
        />
        <Providers>
          {children}
        </Providers>
        <Toaster richColors closeButton position="top-right" expand duration={7000} />
        <StartupStudioStickyBanner />
      </body>
    </html>
  );
}

function ProvidersFallback() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      config={{ isGoogleSSOEnabled: false, isTurnstileEnabled: false }}
    >
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="large" />
      </div>
    </ThemeProvider>
  );
}
