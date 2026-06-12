import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Observe Journal Prompts - Murakami Journaling Style | JournalFlow',
  description: 'Observe journal prompts inspired by Murakami journaling: describe what is around you, notice sensory details, and write about the external world without emotional processing.',
  keywords: [
    'observe journal prompts',
    'murakami journaling',
    'murakami journal prompts',
    'observation journal prompts',
    'sensory journal prompts',
    'no feelings journal prompts',
  ],
  alternates: { canonical: 'https://journalflow.ai/observe-journal-prompts' },
}

const SAMPLE_PROMPTS = [
  { label: 'Light', prompt: 'Describe the light in the room you are in right now. Where is it coming from? What does it land on? What does it avoid?' },
  { label: 'Sound', prompt: 'What can you hear right now? List every sound from loudest to quietest, including the ones you normally filter out completely.' },
  { label: 'Object', prompt: 'Pick up the nearest object to your left hand. Describe it as if writing instructions for someone to recreate it exactly.' },
  { label: 'Drink', prompt: 'Your coffee or tea from this morning: temperature when you first picked it up, color, the exact moment you first tasted it.' },
  { label: 'Color', prompt: 'Choose one color and spend today noticing it. Write down every single thing you saw that was that color, and what shade it actually was when you looked closely.' },
  { label: 'Space', prompt: 'Describe the room you are in right now as if you are a set designer who needs to recreate it exactly. Nothing subjective. Just what is there.' },
]

export default function ObservePromptsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span>›</span>
        <span style={{ color: 'var(--forest)' }}>Observe Journal Prompts</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
          style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}>
          Murakami Journaling
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--ink)' }}>
          Observe Journal Prompts
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-4">
          Inspired by the Murakami journaling approach: just describe what is around you.
          No feelings required. No insights expected. Just precise, honest observation.
        </p>
      </div>

      {/* What is it */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          What is Murakami journaling?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Murakami journaling is an observational writing approach named after novelist Haruki Murakami's famously precise, sensory prose style. Instead of asking how you feel or what you should reflect on, it asks you to simply describe what is in front of you: the light in the room, the texture of what you are touching, the exact sounds you can hear right now.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The method bypasses emotional strain by focusing entirely on the external world. You are not processing. You are noticing. The result is often more honest than introspective writing because the details you choose to record reveal more about you than any prompted reflection would.
        </p>
        <p className="text-gray-600 leading-relaxed">
          A top-voted Reddit comment describing this approach: "Just describe what's around you." That comment got 22 upvotes in a thread about journal prompts. People clearly want this and nobody is building for it.
        </p>
      </section>

      {/* Sample prompts */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          Example observe prompts
        </h2>
        <div className="space-y-4">
          {SAMPLE_PROMPTS.map((item) => (
            <div key={item.label} className="paper-card rounded-xl p-5">
              <span className="text-xs font-semibold uppercase tracking-wide mb-2 block"
                style={{ color: 'var(--forest)' }}>
                {item.label}
              </span>
              <p className="font-prose text-gray-700 leading-relaxed">{item.prompt}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/prompts/everyday"
            className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--forest)' }}>
            See all 150 everyday observation prompts
          </Link>
        </div>
      </section>

      {/* Observe Mode CTA */}
      <div className="rounded-2xl p-7 mb-12" style={{ background: 'var(--forest)', color: 'white' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🍵</span>
          <span className="text-sm font-bold uppercase tracking-wide opacity-70">Observe Mode</span>
        </div>
        <h2 className="font-display text-xl font-bold mb-2">
          Generate an observe prompt with AI
        </h2>
        <p className="text-green-200 text-sm leading-relaxed mb-5">
          Select Observe Mode in the AI generator. It writes prompts about your immediate physical environment only - no emotional processing, no reflection prompts. Free to use, no signup needed.
        </p>
        <Link href="/#generator"
          className="inline-block text-sm font-semibold px-5 py-2.5 rounded-full bg-white transition-opacity hover:opacity-90"
          style={{ color: 'var(--forest)' }}>
          Try Observe Mode Free
        </Link>
      </div>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What makes an observe journal prompt different from a regular prompt?',
              a: 'Regular journal prompts typically ask how you feel, what you want, or what you should reflect on. Observe prompts ask only what you notice in the physical world around you right now: what you see, hear, smell, touch, or taste. The focus is entirely external and sensory.',
            },
            {
              q: 'Do I need to know anything about Murakami to use these prompts?',
              a: "No. The connection is stylistic, not literary. Murakami's novels are known for their precise observation of ordinary objects and moments. These prompts follow that same principle: describe what is there, as specifically as you can.",
            },
            {
              q: 'Can I use Observe Mode prompts every day?',
              a: 'Yes, and many people find them ideal for building a daily habit because the low pressure makes it easy to start. You can use the three free daily AI generations on observe prompts, or browse the 150 hand-written ones on the everyday prompts page.',
            },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/no-feelings-journal-prompts" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          No-Feelings Journal Prompts
        </Link>
        <Link href="/prompts/everyday" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          Everyday Prompts (150)
        </Link>
        <Link href="/prompts/ai-generated" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          AI Journal Prompts
        </Link>
        <Link href="/prompts" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
          All Topics
        </Link>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What makes an observe journal prompt different from a regular prompt?',
            acceptedAnswer: { '@type': 'Answer', text: 'Observe prompts ask only what you notice in the physical world: what you see, hear, smell, touch, or taste. No emotional reflection required.' }},
          { '@type': 'Question', name: 'What is Murakami journaling?',
            acceptedAnswer: { '@type': 'Answer', text: 'An observational writing approach inspired by the novelist Haruki Murakami\'s style: describe what is around you precisely and sensorially, without emotional commentary.' }},
        ],
      })}} />
    </div>
  )
}
