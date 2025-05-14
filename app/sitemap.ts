import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://opencloudmap.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://opencloudmap.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },

   {
      url: 'https://opencloudmap.com/onboarding',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}