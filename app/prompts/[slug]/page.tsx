import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPromptPage, getAllPromptMeta, getRelatedPrompts } from '@/lib/mdx'
import { PromptCardsGrid } from '@/components/PromptCard'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const all = await getAllPromptMeta()
  return all.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPromptPage(params.slug)
  if (!page) return {}

  return {
    title: `${page.title} (${page.promptCount}+ Prompts)`,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `https://journalflow.ai/prompts/${page.slug}` },
    openGraph: {
      title: `${page.title} | JournalFlow`,
      description: page.description,
      url: `https://journalflow.ai/prompts/${page.slug}`,
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'mental-health': 'Mental Health',
  'self-growth': 'Self-Growth',
  'education': 'Education',
}

export default async function PromptPage({ params }: Props) {
  const page = await getPromptPage(params.slug)
  if (!page) notFound()

  const related = await getRelatedPrompts(page.relatedSlugs || [])

  // FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How do I use ${page.title.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pick a prompt that resonates with you, open your journal, and write without editing yourself. There are no wrong answers. Even 5 minutes of honest writing makes a difference.`,
        },
      },
      {
        '@type': 'Question',
        name: `How many ${page.title.toLowerCase()} are on this page?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `This page contains ${page.promptCount} ${page.title.toLowerCase()}, organized into ${page.sections.length} sections to help you find exactly what you need.`,
        },
      },
    ],
  }

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="hero-gradient px-4 sm:px-6 pt-12 pb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/prompts" className="text-sm text-gray-400 hover:text-green-700">
              All Topics
            </Link>
            <span className="text-gray-300">›</span>
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
            >
              {CATEGORY_LABELS[page.category] || page.category}
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
            {page.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-6 max-w-2xl">
            {page.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span>📝 {page.promptCount} prompts</span>
            <span>📂 {page.sections.length} sections</span>
            {page.printable && <span>🖨️ Printable PDF available</span>}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Therapist note */}
        {page.therapistNote && (
          <div
            className="rounded-xl p-4 mb-8 text-sm leading-relaxed"
            style={{
              background: 'var(--sage-light)',
              borderLeft: '3px solid var(--forest)',
              color: '#2D4A3E',
            }}
          >
            <span className="font-semibold">💡 How to use these prompts: </span>
            {page.therapistNote}
          </div>
        )}

        {/* Sections navigation */}
        {page.sections.length > 1 && (
          <div className="bg-white rounded-xl border border-green-100 p-5 mb-8">
            <p className="text-sm font-semibold text-gray-600 mb-3">Jump to section:</p>
            <div className="flex flex-wrap gap-2">
              {page.sections.map((section, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="text-sm px-3 py-1.5 rounded-full border transition-colors hover:border-green-400"
                  style={{ borderColor: '#D1FAE5', color: 'var(--forest)' }}
                >
                  {section.heading}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* AI Generator inline CTA */}
        <div
          className="rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--forest)', color: '#fff' }}
        >
          <div>
            <p className="font-semibold mb-1">Want a personalized prompt?</p>
            <p className="text-sm opacity-80">
              Our AI can generate a prompt tailored to exactly how you're feeling right now.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold px-5 py-2.5 rounded-full bg-white whitespace-nowrap"
            style={{ color: 'var(--forest)' }}
          >
            Try AI Generator →
          </Link>
        </div>

        {/* Prompt sections */}
        {page.sections.map((section, sectionIdx) => (
          <section key={sectionIdx} id={`section-${sectionIdx}`} className="mb-12">
            <h2
              className="font-display text-2xl font-bold mb-6 pb-3"
              style={{ color: 'var(--ink)', borderBottom: '1px solid #D1FAE5' }}
            >
              {section.heading}
            </h2>
            <div className="space-y-3">
              {section.prompts.map((prompt, promptIdx) => {
                const globalNum = page.sections
                  .slice(0, sectionIdx)
                  .reduce((acc, s) => acc + s.prompts.length, 0) + promptIdx + 1

                return (
                  <div key={promptIdx} className="paper-card rounded-xl p-4 pl-7 group">
                    <div className="flex gap-3">
                      <span
                        className="text-xs font-mono font-bold shrink-0 mt-1 opacity-40"
                        style={{ color: 'var(--forest)' }}
                      >
                        {String(globalNum).padStart(2, '0')}
                      </span>
                      <p className="font-prose text-gray-700 leading-relaxed">{prompt}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mid-content upgrade CTA — after section 2 */}
            {sectionIdx === 1 && (
              <div
                className="rounded-xl p-5 mt-8 text-center"
                style={{ background: 'var(--amber-light)', border: '1px solid var(--amber-warm)' }}
              >
                <p className="font-semibold text-gray-800 mb-1">
                  Download all {page.promptCount} prompts as a PDF
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Print it out, keep it in your journal, or share it with your clients.
                </p>
                <Link
                  href="/pricing"
                  className="inline-block text-sm font-semibold px-5 py-2 rounded-full text-white"
                  style={{ background: 'var(--forest)' }}
                >
                  Get Pro Access →
                </Link>
              </div>
            )}
          </section>
        ))}

        {/* Prompt 卡片展示区 - Pinterest 分享 */}
        {(() => {
          const allPrompts = page.sections.flatMap(s => s.prompts)
          return (
            <PromptCardsGrid
              prompts={allPrompts}
              slug={page.slug}
              title={page.title}
            />
          )
        })()}

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                How do I use {page.title.toLowerCase()}?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pick a prompt that pulls at you — even if you're not sure why. Open your journal, write the prompt at the top of the page, and write without editing yourself. There are no wrong answers. Even 5 minutes of honest writing is worth more than a perfect hour that never happens.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                How often should I journal?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Consistency matters more than frequency. Even 3 times a week makes a real difference. The goal isn't to write every day perfectly — it's to keep coming back.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                Can I use these prompts more than once?
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Absolutely. Your answers will change as you do. A prompt that felt small six months ago might open something unexpected now. Revisiting is part of the practice.
              </p>
            </div>
          </div>
        </section>

        {/* Related topics */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
              Keep exploring
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/prompts/${r.slug}`}
                  className="card-hover bg-white rounded-xl border border-green-50 p-4 text-sm font-medium text-gray-700"
                >
                  {r.title}
                  <div className="text-xs text-gray-400 mt-1">{r.promptCount} prompts</div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
