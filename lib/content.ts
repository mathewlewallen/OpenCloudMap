import { unstable_noStore as noStore } from "next/cache"
import { notFound } from "next/navigation"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { blog, docs, guides, papers } from "#velite"

// ————————————————————————————————————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————————————————————————————————————
export type BlogPost = typeof blog[number]
export type DocPage = typeof docs[number]
export type GuidePage = typeof guides[number]
export type PaperPage = typeof papers[number]

// ————————————————————————————————————————————————————————————————————————————————
// Formatting Helpers
// ————————————————————————————————————————————————————————————————————————————————
export function formatDate(date: string) {
  noStore()
  let d = date.includes("T") ? new Date(date) : new Date(`${date}T00:00:00`)
  const now = new Date()

  const yearsAgo = now.getFullYear() - d.getFullYear()
  const monthsAgo = now.getMonth() - d.getMonth()
  const daysAgo = now.getDate() - d.getDate()

  let relative = "Today"
  if (yearsAgo > 0) {
    relative = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    relative = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    relative = `${daysAgo}d ago`
  }

  const full = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `${full} (${relative})`
}

export function getTimeOfDayGreeting() {
  const h = new Date().getHours()
  return h < 12 ? "Good morning!" : h < 17 ? "Good afternoon!" : "Good evening!"
}

// ————————————————————————————————————————————————————————————————————————————————
// ClassName Helpers
// ————————————————————————————————————————————————————————————————————————————————
export function cx(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs))
}

// ————————————————————————————————————————————————————————————————————————————————
// Blog
// ————————————————————————————————————————————————————————————————————————————————
export function fetchAndSortBlogPosts(): BlogPost[] {
  try {
    return blog
      .filter((p) => !p.draft)
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  } catch {
    notFound()
  }
}

export function getRelatedBlogPosts(
  current: BlogPost,
  maxResults = 3
): BlogPost[] {
  const all = fetchAndSortBlogPosts().filter((p) => p.slug !== current.slug)

  // pick same categories first
  const same = all.filter((p) =>
    p.categories.some((c) => current.categories.includes(c))
  )

  // sort by number of matching categories
  same.sort((a, b) => {
    const aCount = a.categories.filter((c) => current.categories.includes(c))
      .length
    const bCount = b.categories.filter((c) => current.categories.includes(c))
      .length
    return bCount - aCount
  })

  if (same.length >= maxResults) {
    return same.slice(0, maxResults)
  }

  const rest = all.filter((p) => !same.some((s) => s.slug === p.slug))
  return [...same, ...rest].slice(0, maxResults)
}

// ————————————————————————————————————————————————————————————————————————————————
// Docs
// ————————————————————————————————————————————————————————————————————————————————
export function fetchAndSortDocs(): DocPage[] {
  try {
    return docs
      .sort((a, b) => a.order - b.order)
  } catch {
    notFound()
  }
}

// ————————————————————————————————————————————————————————————————————————————————
// Guides
// ————————————————————————————————————————————————————————————————————————————————
export function fetchAndSortGuides(): GuidePage[] {
  try {
    return guides
      .sort((a, b) => a.title.localeCompare(b.title))
  } catch {
    notFound()
  }
}

// ————————————————————————————————————————————————————————————————————————————————
// Papers
// ————————————————————————————————————————————————————————————————————————————————
export function fetchAndSortPapers(): PaperPage[] {
  try {
    return papers
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  } catch {
    notFound()
  }
}

// ————————————————————————————————————————————————————————————————————————————————
// Category Extraction (for Blog & Papers)
// ————————————————————————————————————————————————————————————————————————————————
export function extractUniqueCategories<
  T extends { categories?: string[] }
>(items: T[]): string[] {
  const set = new Set<string>()
  items.forEach((item) => {
    item.categories?.forEach((c) => set.add(c))
  })
  return Array.from(set)
}
