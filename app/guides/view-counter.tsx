export default function ViewCounter({
  slug,
  allViews,
}: {
  slug: string
  allViews: { slug: string; count: number }[]
}) {
  const viewsForSlug = allViews.find((view) => view.slug === slug)
  const number = new Number(viewsForSlug?.count ?? 0)

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {`${number.toLocaleString()} views`}
    </p>
  )
}
