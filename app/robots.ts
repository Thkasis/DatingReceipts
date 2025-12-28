/**
 * Robots.txt Configuration
 * SEO optimization for search engine crawlers
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://datingreceipts.com/sitemap.xml',
  }
}

