import type { MetadataRoute } from 'next'

const BASE = 'https://goldiracalculators.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/rollover`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/gold-vs-stocks`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/fee-calculator`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/allocation`,              lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contribution`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/privacy`,                 lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
