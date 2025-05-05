import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Open Cloud Map',
    short_name: 'OCM',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/public/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FFFFFF',
    icons: [
      {
        src: 'apple-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: 'web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: 'web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]/* TODO: Add Google Play link,
    related_applications: [
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=yourApp'
      }
    ]*/
  }
}