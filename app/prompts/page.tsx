import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPromptMeta } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Journal Prompts by Topic - 1850+ Free Prompts | JournalFlow',
  description:
    'Browse 1850+ free journal prompts: observation, creativity, fun, self-reflection, mental health, and more. Find one that makes you want to write, not think.',
  alternates: { canonical: 'https://journalflow.ai/prompts' },
}

const TOPIC_EMOJIS: Record<string, string> = {
  everyday: '☕',
  fun: '🎉',
  beginners: '✏️',
  morning: '🌅',
  gratitude: '🙏',
  moms: '🌸',
  kids: '🌈',
  'middle-school': '📚',
  'high-school': '🎓',
  'self-discovery': '🔍',
  'self-love': '💛',
  manifestation: '✨',
  'shadow-work': '🌑',
  'mental-health': '🧠',
  anxiety: '🌿',
  therapy: '🌱',
  grief: '🕊️',
  burnout: '🔋',
}

//
const SECTIONS = [
  {
    id: 'everyday',
    label: 'Everyday & Observation',
    desc: 'Start here. No feelings required.',
    slugs: ['everyday', 'morning', 'beginners', 'fun', 'gratitude'],
  },
  {
    id: 'creative',
    label: 'Creative & Playful',
    desc: 'The stuff other prompt sites forgot to build.',
    slugs: ['moms', 'kids', 'middle-school', 'high-school'],
  },
  {
    id: 'reflective',
    label: 'Reflective & Growth',
    desc: 'When you are ready to go a little deeper.',
    slugs: ['self-discovery', 'self-love', 'manifestation', 'shadow-work'],
  },
  {
    id: 'deep',
    label: 'Deep & Healing',
    desc: 'Real support for hard seasons.',
    slugs: ['mental-health', 'anxiety', 'therapy', 'grief', 'burnout'],
  },
]

export default async function PromptsPage() {
  const allPrompts = await getAllPromptMeta()
  const promptMap = Object.fromEntries(allPrompts.map(p => [p.slug, p]))
  const totalPrompts = allPrompts.reduce((acc, p) => acc + p.promptCount, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Find a prompt that makes you<br />
          <span style={{ color: 'var(--forest)' }}>want to write, not think.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          {totalPrompts}+ prompts. Browse by mood, pick a topic, or let the AI write one for you.
        </p>
        {/* Three entry buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/prompts/everyday"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
            <span>☕</span> Observe
          </Link>
          <Link href="/prompts/fun"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: 'var(--forest)' }}>
            <span>🎉</span> Create
          </Link>
          <Link href="/prompts/self-discovery"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
            <span>🔍</span> Reflect
          </Link>
          <Link href="/prompts/ai-generated"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: '#2D6A4F' }}>
            <span>✨</span> AI Generator
          </Link>
        </div>
      </div>

      {/* Sections */}
      {SECTIONS.map((section) => {
        const sectionPrompts = section.slugs
          .map(s => promptMap[s])
          .filter(Boolean)
        if (!sectionPrompts.length) return null
        return (
          <section key={section.id} className="mb-14">
            <div className="flex items-end justify-between mb-5">
              <div>
                <h2 className="font-display text-xl font-bold" style={{ color: 'var(--ink)' }}>
                  {section.label}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">{section.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionPrompts.map((p) => (
                <Link key={p.slug} href={`/prompts/${p.slug}`}
                  className="card-hover bg-white rounded-2xl border border-green-50 p-5 flex flex-col gap-3 shadow-sm">
                  <span className="text-3xl">{TOPIC_EMOJIS[p.slug] || '📝'}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 leading-snug">{p.title}</h3>
                    <p className="text-xs text-gray-400">{p.promptCount} prompts</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{p.description}</p>
                  <span className="text-xs font-semibold mt-auto" style={{ color: 'var(--forest)' }}>
                    Explore
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Bottom CTA */}
      <div className="rounded-2xl p-8 text-center mt-4" style={{ background: 'var(--sage-light)' }}>
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
          None of these feeling right?
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Tell the AI your mood and it will write something for exactly where you are right now.
        </p>
        <Link href="/#generator"
          className="inline-block text-sm font-semibold px-6 py-3 rounded-full text-white"
          style={{ background: 'var(--forest)' }}>
          Generate my prompt
        </Link>
      </div>
    </div>
  )
}
