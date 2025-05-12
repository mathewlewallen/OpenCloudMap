import { blog } from '@/docs/blog'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateMetadata({ params }: Props): Metadata {
  const entry = blog.find((b) => b.slug === params.slug)
  return {
    title: entry?.title ?? 'Blog post',
  }
}

export function generateStaticParams() {
  return blog.map((post) => ({ slug: post.slug }))
}

// 2) Disallow any other (dynamic) slugs
export const dynamicParams = false

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const { slug } = params

  if (!blog.find((b) => b.slug === slug)) notFound()

  const { default: Post } = await import(
    /* webpackInclude: /\.mdx$/ */
    `@/docs/blog/${slug}.mdx`
  )

  return (
    <article className="prose mx-auto py-8">
      <Post />
    </article>
  )
}