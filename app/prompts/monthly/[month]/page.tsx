import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMonthlyPage, getAllMonthSlugs } from '@/lib/monthly'

interface Props { params: { month: string } }

export async function generateStaticParams() {
  const slugs = await getAllMonthSlugs()
  return slugs.map(month => ({ month }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getMonthlyPage(params.month)
  if (!page) return {}
  return {
    title: `${page.title} | JournalFlow`,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `https://journalflow.ai/prompts/monthly/${params.month}` },
  }
}

export default async function MonthlyPage({ params }: Props) {
  const page = await getMonthlyPage(params.month)
  if (!page) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
        <Link href="/prompts" className="hover:text-green-700">All Topics</Link>
        <span>›</span>
        <span>Monthly Prompts</span>
        <span>›</span>
        <span style={{ color: 'var(--forest)' }}>{page.month}</span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
        {page.title}
      </h1>
      <p className="text-lg text-gray-500 mb-8">{page.description}</p>

      {page.sections.map((section, i) => (
        <section key={i} className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-5 pb-2"
            style={{ color: 'var(--ink)', borderBottom: '1px solid #D1FAE5' }}>
            {section.heading}
          </h2>
          <div className="space-y-3">
            {section.prompts.map((prompt, j) => {
              const num = page.sections.slice(0, i).reduce((a, s) => a + s.prompts.length, 0) + j + 1
              return (
                <div key={j} className="paper-card rounded-xl p-4 pl-7">
                  <div className="flex gap-3">
                    <span className="text-xs font-mono font-bold shrink-0 mt-1 opacity-40" style={{ color: 'var(--forest)' }}>
                      {String(num).padStart(2, '0')}
                    </span>
                    <p className="font-prose text-gray-700 leading-relaxed">{prompt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <div className="mt-10 text-center">
        <Link href="/" className="inline-block text-sm font-semibold px-6 py-3 rounded-full text-white"
          style={{ background: 'var(--forest)' }}>
          ✨ Generate a Custom Prompt
        </Link>
      </div>
    </div>
  )
}
