import type { ReactNode } from 'react';
import Link from 'next/link';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Site header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            My Blog
          </h1>
          <nav>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:underline"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <div className="container mx-auto px-6 py-12">
        {children}
      </div>
    </main>
  );
}
