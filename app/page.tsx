import type { Metadata } from 'next'
import Link from 'next/link'
import Generator from '@/components/Generator'

export const metadata: Metadata = {
  title: 'JournalFlow — AI Journal Prompt Generator',
  description:
    'Generate personalized journal prompts with AI. Tailored to your mood, goals, and journaling style. 1000+ prompts for mental health, self-growth, anxiety, gratitude, and more.',
  alternates: { canonical: 'https://journalflow.ai' },
}

const TOPICS = [
  { label: 'Anxiety', href: '/prompts/anxiety', emoji: '🌿', desc: '100 prompts' },
  { label: 'Mental Health', href: '/prompts/mental-health', emoji: '🧠', desc: '100 prompts' },
  { label: 'Gratitude', href: '/prompts/gratitude', emoji: '🙏', desc: '100 prompts' },
  { label: 'Self Discovery', href: '/prompts/self-discovery', emoji: '🔍', desc: '100 prompts' },
  { label: 'Morning', href: '/prompts/morning', emoji: '🌅', desc: '100 prompts' },
  { label: 'Shadow Work', href: '/prompts/shadow-work', emoji: '🌑', desc: '100 prompts' },
  { label: 'For Kids', href: '/prompts/kids', emoji: '🌈', desc: '100 prompts' },
  { label: 'Self Love', href: '/prompts/self-love', emoji: '💛', desc: '100 prompts' },
]

const TESTIMONIALS = [
  {
    text: "I've tried so many journaling apps, but JournalFlow actually gets me. The prompts feel personal, not generic.",
    author: 'Sarah M.',
    role: 'Therapist',
  },
  {
    text: "I use it every morning. It takes 10 seconds to generate a prompt that keeps me writing for 30 minutes.",
    author: 'James K.',
    role: 'Daily journaler',
  },
  {
    text: "My students love the kids prompts. They're fun, age-appropriate, and genuinely spark good conversations.",
    author: 'Ms. Chen',
    role: '5th Grade Teacher',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero + Generator */}
      <section className="hero-gradient px-4 sm:px-6 pt-16 pb-20">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
            style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
          >
            AI-Powered Journal Prompts
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
            The right words,{' '}
            <span style={{ color: 'var(--forest)' }}>right when you need them</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Tell us how you're feeling. We'll write a journal prompt that actually meets you there —
            whether you have 5 minutes or a whole evening.
          </p>
        </div>

        {/* AI 生成器 */}
        <Generator />

        {/* 免费说明 */}
        <p className="text-center text-sm text-gray-400 mt-4">
          3 free generations per day · No account needed ·{' '}
          <Link href="/pricing" style={{ color: 'var(--forest)' }} className="underline underline-offset-2">
            Go Pro for unlimited
          </Link>
        </p>
      </section>

      {/* 每日 Prompt 横幅 */}
      <section className="py-8 px-4" style={{ background: 'var(--sage-light)' }}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: 'var(--forest)' }}>
              Today's Prompt
            </p>
            <p className="font-prose text-lg text-gray-700 italic">
              "What's one small thing you've been carrying lately that you haven't talked about?"
            </p>
          </div>
          <Link
            href="/daily"
            className="shrink-0 text-sm font-semibold px-5 py-2.5 rounded-full text-white whitespace-nowrap"
            style={{ background: 'var(--forest)' }}
          >
            See Daily Prompt →
          </Link>
        </div>
      </section>

      {/* 主题库 */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
              Explore by topic
            </h2>
            <p className="text-gray-500">
              Over 800 hand-crafted prompts across the themes that matter most to you.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TOPICS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card-hover bg-white rounded-xl p-5 border border-green-50 flex flex-col items-start gap-2"
              >
                <span className="text-2xl">{t.emoji}</span>
                <span className="font-semibold text-sm text-gray-800">{t.label}</span>
                <span className="text-xs text-gray-400">{t.desc}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/prompts"
              className="text-sm font-semibold underline underline-offset-4"
              style={{ color: 'var(--forest)' }}
            >
              View all topics →
            </Link>
          </div>
        </div>
      </section>

      {/* 为什么选我们 */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'var(--sage-light)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12" style={{ color: 'var(--ink)' }}>
            Journaling that actually goes somewhere
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Tailored to you',
                desc: "Generic prompts don't work. Ours adapt to your mood, goals, and how much time you have.",
              },
              {
                icon: '🧠',
                title: 'Rooted in research',
                desc: 'Our prompts draw from CBT, DBT, and mindfulness practices — the stuff that actually helps.',
              },
              {
                icon: '✍️',
                title: 'For real humans',
                desc: "No corporate wellness speak. Just honest, warm prompts written in a voice that feels like a friend.",
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 社会证明 */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-10" style={{ color: 'var(--ink)' }}>
            From people who journal with us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="bg-white rounded-xl border border-green-50 p-5 shadow-sm">
                <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 底部 CTA */}
      <section className="py-16 px-4 text-center" style={{ background: 'var(--forest)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ready to start writing?
          </h2>
          <p className="text-green-200 mb-8 leading-relaxed">
            Your journal is waiting. It doesn't have to be perfect — it just has to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: 'var(--forest)' }}
            >
              Generate a Free Prompt
            </a>
            <Link
              href="/pricing"
              className="px-8 py-3.5 rounded-full font-semibold text-sm border-2 border-green-400 text-white transition-opacity hover:opacity-90"
            >
              See Pro Plans
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
