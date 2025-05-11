'use client';

import { ReduxProvider } from '@/redux/reduxProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
  <ReduxProvider>
    <section className="flex flex-col min-h-screen">
      {children}
    </section>
  </ReduxProvider>
  );
}
