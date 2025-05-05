import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { SWRConfig } from 'swr';
import { Footer } from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/shared/theme-provider';

export const metadata: Metadata = {
  title: 'Open Cloud Map',
  description: 'A modern aviation planning tool that lets you map routes, track altitudes, and visualize your mission from takeoff to touchdown.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const manrope = Manrope({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`bg-background text-primary ${manrope.className}`}>
      <body className="min-h-[100dvh]">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
          <SWRConfig
            value={{
              fallback: {}
            }}
          >
            {children}
        </SWRConfig>
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}