import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // you can override defaults here, but for now just pass them through
  return { ...components };
}
