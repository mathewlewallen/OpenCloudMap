import React from 'react'
import { notFound } from 'next/navigation'
import { Leftbar } from '@/docs/docs/leftbar'
import TocClient, { TocItem } from '@/docs/docs/toc.client'
import { getDocFrontmatter, getDocsTocs } from '@/docs/docs/lib/markdown'
import { page_routes } from '@/docs/docs/lib/routes-config'
import '@/docs/docs/styles.css'

type LayoutProps = {
  children: React.ReactNode
  params: { slug?: string[] }
}

export default async function DocsLayout({ children, params }: LayoutProps) {
  // derive slug & path
  const slug = params.slug ?? []
  const pathName = slug.join('/')

  // server‐side: read frontmatter
  const frontmatter = await getDocFrontmatter(pathName)
  if (!frontmatter) notFound()

  // server‐side: build TOC items
  const tocItems: TocItem[] = await getDocsTocs(pathName)

  return (
    <div className="bg-background text-foreground antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_250px] gap-10">

          {/* Left sidebar */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <Leftbar key="leftbar" />
          </aside>

          {/* Main content */}
          <main className="min-w-0">{children}</main>

          {/* Client‐only TOC */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <TocClient items={tocItems} />
          </aside>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: LayoutProps) {
  const slug = params.slug ?? []
  const pathName = slug.join('/')
  const fm = await getDocFrontmatter(pathName)
  if (!fm) return {}
  return { title: fm.title, description: fm.description }
}

export function generateStaticParams() {
  return page_routes.map((item) => ({
    slug: item.href.split('/').slice(1),
  }))
}
