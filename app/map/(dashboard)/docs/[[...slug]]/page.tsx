import React from 'react'
import { notFound } from 'next/navigation'
import DocsBreadcrumb from '@/docs/docs/docs-breadcrumb'
import Pagination from '@/docs/docs/pagination'
import { getCompiledDocsForSlug } from '@/docs/docs/lib/markdown'
import { Typography } from '@/docs/docs/typography'

type PageProps = { params: { slug?: string[] } }

export default async function DocsPage({ params }: PageProps) {
  const slug = params.slug ?? []
  const pathName = slug.join('/')
  const res = await getCompiledDocsForSlug(pathName)
  if (!res) notFound()

  return (
    <article className="prose prose-lg max-w-none">
      <DocsBreadcrumb paths={slug} />

      <Typography>
        <h1 className="sm:text-3xl text-2xl mt-0">{res.frontmatter.title}</h1>
        <p className="mt-4 text-muted-foreground sm:text-base text-sm">
          {res.frontmatter.description}
        </p>
        <div className="mt-6">{res.content}</div>
      </Typography>

      <div className="mt-12">
        <Pagination pathname={pathName} />
      </div>
    </article>
  )
}
