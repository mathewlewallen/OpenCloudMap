import Link from 'next/link';

// In a real app you’d fetch this from your data layer,
// here we hardcode for demo purposes.
const posts = [
  {
    slug: 'first-post',
    title: 'First Post',
    date: 'May 1, 2025',
    excerpt:
      'Kick off your blogging journey with this first post. Learn how to set up Next.js and MDX for a seamless content workflow.',
  },
  {
    slug: 'second-post',
    title: 'Second Post',
    date: 'May 3, 2025',
    excerpt:
      'Dive deeper into NextMDX: customizing layouts, using components in your markdown, and optimizing for performance.',
  },
  {
    slug: 'third-post',
    title: 'Third Post',
    date: 'May 5, 2025',
    excerpt:
      'Wrapping things up: best practices for SEO, accessibility, and ongoing content management in your Next.js blog.',
  },
];

export default function BlogIndexPage() {
  return (
    <>
      <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
        Welcome to our blog! Here you’ll find articles on Next.js, MDX, Headless
        CMS, and more. Click any post below to read in depth.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ slug, title, date, excerpt }) => (
          <article
            key={slug}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                <Link
                  href={`/blog/${slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {title}
                </Link>
              </h3>
              <time
                dateTime={new Date(date).toISOString()}
                className="text-sm text-gray-500 dark:text-gray-400 mb-4"
              >
                {date}
              </time>
              <p className="text-gray-700 dark:text-gray-300 flex-grow">
                {excerpt}
              </p>
              <div className="mt-6">
                <Link
                  href={`/blog/${slug}`}
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
