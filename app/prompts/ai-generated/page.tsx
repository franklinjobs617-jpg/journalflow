import type { Metadata } from 'next'
import Link from 'next/link'
import Generator from '@/components/Generator'

export const metadata: Metadata = {
  title: 'AI Journal Prompts - Personalized by Mood & Topic | JournalFlow',
  description: 'Get AI-generated journal prompts tailored to your exact mood, topic, and depth. Free AI journal prompt generator for mental health, self-growth, anxiety, gratitude, and more.',
  keywords: [
    'ai journal prompts',
    'ai generated journal prompts',
    'ai journal prompt generator',
    'personalized journal prompts',
    'free ai journal prompts',
  ],
  alternates: {
    canonical: 'https://journalflow.ai/prompts/ai-generated',
  },
  openGraph: {
    title: 'AI Journal Prompts - Personalized for You | JournalFlow',
    description: 'AI-generated journal prompts tailored to your mood. Free, no signup needed.',
    url: 'https://journalflow.ai/prompts/ai-generated',
  },
}

const EXAMPLES = [
  {
    inputs: { mood: 'Anxious', topic: 'Mental Health', depth: 'Deep' },
    output: 'What does your anxiety feel like in your body right now, and what is it trying to protect you from?',
  },
  {
    inputs: { mood: 'Playful', topic: 'Everyday Life', depth: 'Quick' },
    output: 'If your personality were a type of weather, what would today\'s forecast look like, and why?',
  },
  {
    inputs: { mood: 'Reflective', topic: 'Self-Growth', depth: 'Deep' },
    output: 'What pattern keeps showing up in your life that you have been too close to see clearly until now?',
  },
  {
    inputs: { mood: 'Stuck', topic: 'Work & Purpose', depth: 'Deep' },
    output: 'What would you be working on right now if you were not afraid of wasting time on the wrong thing?',
  },
  {
    inputs: { mood: 'Grateful', topic: 'Relationships', depth: 'Quick' },
    output: 'Think of someone who showed up for you recently in a small, unremarkable way. What did that moment mean?',
  },
  {
    inputs: { mood: 'Motivated', topic: 'Creativity', depth: 'Quick' },
    output: 'What is one creative thing you have been putting off because you are not sure it is good enough to start?',
  },
]

const TOPIC_LINKS = [
  { label: 'AI prompts for anxiety', href: '/prompts/anxiety', desc: '100 prompts' },
  { label: 'AI prompts for mental health', href: '/prompts/mental-health', desc: '100 prompts' },
  { label: 'AI prompts for self-discovery', href: '/prompts/self-discovery', desc: '100 prompts' },
  { label: 'AI prompts for gratitude', href: '/prompts/gratitude', desc: '100 prompts' },
  { label: 'AI prompts for morning', href: '/prompts/morning', desc: '100 prompts' },
  { label: 'Fun AI journal prompts', href: '/prompts/fun', desc: '100 prompts' },
  { label: 'AI prompts for moms', href: '/prompts/moms', desc: '100 prompts' },
  { label: 'AI prompts for burnout', href: '/prompts/burnout', desc: '100 prompts' },
  { label: 'Everyday AI journal prompts', href: '/prompts/everyday', desc: '100 prompts' },
]

export default function AIGeneratedPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb - Link Juice */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-green-700 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/prompts" className="hover:text-green-700 transition-colors">All Prompts</Link>
        <span>›</span>
        <span style={{ color: 'var(--forest)' }}>AI Generated</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <div
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
          style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
        >
          AI Journal Prompt Generator
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight" style={{ color: 'var(--ink)' }}>
          AI Journal Prompts<br />
          <span style={{ color: 'var(--forest)' }}>Built for You, Not Everyone</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed mb-6">
          Every AI journal prompt on JournalFlow is generated specifically for your current mood, topic, and how deep you want to go. Not pulled from a list. Not the same for everyone. Written for you, right now.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span style={{ color: 'var(--forest)' }}>✓</span> Free, no account needed
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: 'var(--forest)' }}>✓</span> 3 AI prompts per day free
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ color: 'var(--forest)' }}>✓</span> Tailored to your exact mood
          </span>
        </div>
      </div>

      {/* Generator - main CTA */}
      <div className="mb-14">
        <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
          Generate your prompt now
        </p>
        <Generator />
      </div>

      {/* What makes it different */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          What makes AI journal prompts different from regular prompts?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Most journal prompt sites give you a static list. You scroll through 100 prompts, pick one that feels roughly right, and hope it matches where you actually are today. The problem is that a prompt written for "anyone feeling anxious" is not the same as a prompt written for you, right now, at this exact level of anxiety.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          JournalFlow's AI generates a prompt based on three things you tell it: your current mood, the topic you want to explore, and how deep you want to go. A "Playful" mood with "Everyday Life" produces something completely different from "Anxious" with "Mental Health." The prompt is written for your specific combination, not averaged across everyone.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The AI also adjusts tone based on depth. A "Quick" prompt gives you something you can answer in five minutes. A "Deep Dive" prompt is worth sitting with for twenty. Same topic, very different entry points.
        </p>
      </section>

      {/* Example outputs */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          Examples of AI-generated journal prompts
        </h2>
        <div className="space-y-4">
          {EXAMPLES.map((ex, i) => (
            <div key={i} className="paper-card rounded-xl p-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(ex.inputs).map(([k, v]) => (
                  <span key={k}
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <p className="font-prose text-gray-700 leading-relaxed">
                &ldquo;{ex.output}&rdquo;
              </p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center">
          Every prompt above was AI-generated using JournalFlow. Your combinations will produce different results.
        </p>
      </section>

      {/* Topic-specific AI prompts - Link Juice to subpages */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
          AI journal prompts by topic
        </h2>
        <p className="text-gray-500 mb-6">
          Each topic page includes 100 hand-crafted prompts plus the AI generator pre-set for that theme.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TOPIC_LINKS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="card-hover bg-white rounded-xl border border-green-50 p-4 flex flex-col gap-1"
            >
              <span className="text-sm font-medium text-gray-800">{t.label}</span>
              <span className="text-xs text-gray-400">{t.desc} + AI generator</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ - SEO + People Also Ask */}
      <section className="mb-14">
        <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--ink)' }}>
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Are the AI journal prompts really free?',
              a: 'Yes. You get 3 AI-generated prompts per day for free, with no account required. Pro members get unlimited generations plus a personalized daily prompt by email.',
            },
            {
              q: 'How is an AI journal prompt different from just asking ChatGPT?',
              a: 'JournalFlow is built specifically for journaling. The AI understands mood, therapeutic approaches like CBT and DBT, and writes in a warm, human tone rather than a generic assistant voice. You also get your generation history saved, a writing streak, and a curated prompt library - none of which ChatGPT offers.',
            },
            {
              q: 'What topics can the AI generate prompts for?',
              a: 'Mental health, anxiety, self-growth, relationships, creativity, work and purpose, gratitude, fun and everyday life, and parenting. You choose the topic and mood combination, and the AI writes specifically for that.',
            },
            {
              q: 'Can I use AI journal prompts for therapy homework?',
              a: 'Yes. Many therapists use JournalFlow to generate between-session writing prompts for clients. The mental health and therapy sections draw from CBT and DBT frameworks, making them well-suited for therapeutic contexts.',
            },
            {
              q: 'How many AI prompts can I generate per day?',
              a: 'Free users get 3 AI-generated prompts per day. Pro members get unlimited generations.',
            },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal links - Link Juice */}
      <section>
        <p className="text-sm text-gray-400 mb-4">Related pages</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
            AI Prompt Generator
          </Link>
          <Link href="/prompts" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
            All Prompt Topics
          </Link>
          <Link href="/daily" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
            Daily Prompt
          </Link>
          <Link href="/pricing" className="text-sm underline underline-offset-2" style={{ color: 'var(--forest)' }}>
            Pro - Unlimited AI Prompts
          </Link>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Are the AI journal prompts really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. You get 3 AI-generated prompts per day for free, with no account required.',
                },
              },
              {
                '@type': 'Question',
                name: 'How is an AI journal prompt different from just asking ChatGPT?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'JournalFlow is built specifically for journaling with mood-based personalization, generation history, writing streak, and a curated prompt library.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
