import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import path from 'path';

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.supabase.co googleapis.com;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.supabase.co;
  connect-src *;
  font-src 'self' googleapis.com;
  frame-src *.supabase.co;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  turbopack: {
    resolveAlias: {
      "@": path.resolve(__dirname, "."),
      underscore: 'lodash',
    },
    resolveExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx', '.md'],
  },
    images : {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.supabase.co/storage/v1/object/public/assets/*',
          port: '',
        },
      ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspHeader.replace(/\n/g, ''),
            },
          ],
        },
      ];
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig);

