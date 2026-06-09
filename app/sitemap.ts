import { MetadataRoute } from 'next'
import { getAllPromptMeta } from '@/lib/mdx'
import { getAllMonthSlugs } from '@/lib/monthly'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPrompts, monthSlugs] = await Promise.all([getAllPromptMeta(), getAllMonthSlugs()])
  const base = 'https://journalflow.ai'

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${base}/prompts`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/daily`, priority: 0.8, changeFrequency: 'daily' as const },
    { url: `${base}/pricing`, priority: 0.7, changeFrequency: 'monthly' as const },
  ]

  const promptPages = allPrompts.map(p => ({
    url: `${base}/prompts/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }))

  const monthlyPages = monthSlugs.map(slug => ({
    url: `${base}/prompts/monthly/${slug}`,
    priority: 0.7,
    changeFrequency: 'yearly' as const,
  }))

  return [...staticPages, ...promptPages, ...monthlyPages]
}
