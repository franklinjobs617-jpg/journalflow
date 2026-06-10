import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPromptMeta } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Journal Prompts by Topic  -  800+ Free Prompts',
  description:
    'Browse 800+ free journal prompts organized by topic: mental health, anxiety, gratitude, self discovery, shadow work, kids, and more.',
  alternates: { canonical: 'https://journalflow.ai/prompts' },
}

const TOPIC_EMOJIS: Record<string, string> = {
  anxiety: '🌿',
  'mental-health': '🧠',
  gratitude: '🙏',
  'self-discovery': '🔍',
  morning: '🌅',
  'shadow-work': '🌑',
  kids: '🌈',
  'self-love': '💛',
  everyday: '☕',
  fun: '🎉',
  beginners: '✏️',
  moms: '🌸',
  grief: '🕊️',
  burnout: '🔋',
  'middle-school': '📚',
  'high-school': '🎓',
  therapy: '🌱',
  manifestation: '✨',
}

const CATEGORY_LABELS: Record<string, string> = {
  'mental-health': 'Mental Health',
  'self-growth': 'Self-Growth',
  education: 'Education',
}

export default async function PromptsPage() {
  const allPrompts = await getAllPromptMeta()

  const grouped = allPrompts.reduce<Record<string, typeof allPrompts>>((acc, p) => {
    const cat = p.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const totalPrompts = allPrompts.reduce((acc, p) => acc + p.promptCount, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Journal Prompts by Topic
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          {totalPrompts}+ thoughtfully written prompts across every topic that matters to your journaling journey.
        </p>
      </div>

      {/* Category groups */}
      {Object.entries(grouped).map(([category, prompts]) => (
        <section key={category} className="mb-12">
          <h2
            className="text-sm font-semibold uppercase tracking-widest mb-5"
            style={{ color: 'var(--forest)' }}
          >
            {CATEGORY_LABELS[category] || category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((p) => (
              <Link
                key={p.slug}
                href={`/prompts/${p.slug}`}
                className="card-hover bg-white rounded-2xl border border-green-50 p-5 flex flex-col gap-3 shadow-sm"
              >
                <span className="text-3xl">{TOPIC_EMOJIS[p.slug] || '📝'}</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1 leading-snug">{p.title}</h3>
                  <p className="text-xs text-gray-400">{p.promptCount} prompts</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <span className="text-xs font-semibold mt-auto" style={{ color: 'var(--forest)' }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <div
        className="rounded-2xl p-8 text-center mt-8"
        style={{ background: 'var(--sage-light)' }}
      >
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
          Not finding what you need?
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Use our AI generator to get a prompt tailored to exactly how you're feeling right now.
        </p>
        <Link
          href="/"
          className="inline-block text-sm font-semibold px-6 py-3 rounded-full text-white"
          style={{ background: 'var(--forest)' }}
        >
          Try the AI Generator →
        </Link>
      </div>
    </div>
  )
}
