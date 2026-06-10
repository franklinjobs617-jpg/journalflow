import type { Metadata } from 'next'
import Link from 'next/link'
import Generator from '@/components/Generator'
import JournalIllustration from '@/components/JournalIllustration'

export const metadata: Metadata = {
  title: 'JournalFlow — AI Journal Prompt Generator',
  description:
    'Generate personalized journal prompts with AI. Tailored to your mood, goals, and journaling style. 1000+ prompts for mental health, self-growth, anxiety, gratitude, and more.',
  alternates: { canonical: 'https://journalflow.ai' },
}

const TOPICS = [
  { label: 'Just for Fun', href: '/prompts/fun', emoji: '🎉', desc: '100 prompts', isNew: true },
  { label: 'For Beginners', href: '/prompts/beginners', emoji: '✏️', desc: '100 prompts', isNew: true },
  { label: 'For Moms', href: '/prompts/moms', emoji: '🌸', desc: '100 prompts', isNew: true },
  { label: 'Anxiety', href: '/prompts/anxiety', emoji: '🌿', desc: '100 prompts', isNew: false },
  { label: 'Mental Health', href: '/prompts/mental-health', emoji: '🧠', desc: '100 prompts', isNew: false },
  { label: 'Gratitude', href: '/prompts/gratitude', emoji: '🙏', desc: '100 prompts', isNew: false },
  { label: 'Self Discovery', href: '/prompts/self-discovery', emoji: '🔍', desc: '100 prompts', isNew: false },
  { label: 'Morning', href: '/prompts/morning', emoji: '🌅', desc: '100 prompts', isNew: false },
  { label: 'Shadow Work', href: '/prompts/shadow-work', emoji: '🌑', desc: '100 prompts', isNew: false },
  { label: 'Grief', href: '/prompts/grief', emoji: '🕊️', desc: '100 prompts', isNew: true },
  { label: 'Burnout', href: '/prompts/burnout', emoji: '🔋', desc: '100 prompts', isNew: true },
  { label: 'Self Love', href: '/prompts/self-love', emoji: '💛', desc: '100 prompts', isNew: false },
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

//
const EXAMPLE_PROMPTS = [
  {
    mood: 'Reflective',
    topic: 'Self-Growth',
    text: "What's one thing you've been carrying lately that you haven't talked about — not because it's unspeakable, but because you haven't found the right moment? Write about it now.",
  },
  {
    mood: 'Anxious',
    topic: 'Mental Health',
    text: "If your anxiety had a shape, a color, and a texture right now, what would they be? What is it trying to protect you from?",
  },
  {
    mood: 'Grateful',
    topic: 'Gratitude',
    text: "Think of someone who showed up for you recently in a small way — something they did that they probably didn't think twice about. What did it mean to you?",
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="hero-gradient px-4 sm:px-6 pt-12 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Two columns on large, single on mobile */}
          <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">

            {/* Left column */}
            <div className="flex-1 max-w-xl">
              <div
                className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase"
                style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
              >
                AI-Powered Journal Prompts
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: 'var(--ink)' }}>
                The right words,{' '}
                <span style={{ color: 'var(--forest)' }}>right when you need them</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                Tell us how you're feeling. We'll write a journal prompt that actually meets you there —
                whether you have 5 minutes or a whole evening.
              </p>

              {/* Example prompt card */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--forest)' }}>
                  Example prompt
                </p>
                <div className="paper-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
                    >
                      {EXAMPLE_PROMPTS[0].mood}
                    </span>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--amber-light)', color: '#7C4A00' }}
                    >
                      {EXAMPLE_PROMPTS[0].topic}
                    </span>
                  </div>
                  <p className="font-prose text-gray-700 leading-relaxed text-sm sm:text-base">
                    "{EXAMPLE_PROMPTS[0].text}"
                  </p>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  ↓ Generate one tailored to you below
                </p>
              </div>
            </div>

            {/* Right column illustration */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <JournalIllustration />
            </div>
          </div>

          {/* AI Generator */}
          <div id="generator">
            <Generator />
          </div>

          {/* Free tier note */}
          <p className="text-center text-sm text-gray-400 mt-4">
            3 free AI prompts per day · No account needed ·{' '}
            <Link href="/pricing" style={{ color: 'var(--forest)' }} className="underline underline-offset-2">
              Go Pro for unlimited
            </Link>
          </p>
        </div>
      </section>

      {/* Daily prompt banner */}
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

      {/* Topic grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
              Explore by topic
            </h2>
            <p className="text-gray-500">
              1,700+ hand-crafted prompts across 17 topics — from deep self-reflection to something a little lighter.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {TOPICS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card-hover bg-white rounded-xl p-5 border border-green-50 flex flex-col items-start gap-2 relative"
              >
                {t.isNew && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--amber-light)', color: 'var(--amber-warm)' }}>
                    New
                  </span>
                )}
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


      {/* How it works */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
              How it works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From blank page to writing in under 30 seconds.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                step: '01',
                title: 'Tell us how you're feeling',
                desc: 'Choose your mood, topic, and how deep you want to go. Anxious? Playful? Burned out? We start where you are.',
                example: 'Feeling: Anxious · Topic: Mental Health · Depth: Deep',
              },
              {
                step: '02',
                title: 'Get your personalized prompt',
                desc: 'Our AI writes a prompt tailored to exactly what you selected — not generic, not pulled from a list.',
                example: '"What does your anxiety try to protect you from — and is it working?"',
              },
              {
                step: '03',
                title: 'Open your journal and write',
                desc: 'Copy the prompt, set a timer for 10 minutes, and just write. No editing, no judgment — just honest words.',
                example: 'Pro tip: write the prompt at the top of the page first.',
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-bold mb-4 opacity-10" style={{ color: 'var(--forest)', fontFamily: 'Georgia, serif' }}>{s.step}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                <div className="text-xs px-3 py-2 rounded-lg font-mono italic"
                  style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}>
                  {s.example}
                </div>
              </div>
            ))}
          </div>

          {/* Before After comparison */}
          <div className="rounded-2xl overflow-hidden border border-green-100">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-6" style={{ background: '#F9F9F9' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: '#E5E7EB', color: '#6B7280' }}>WITHOUT JOURNALFLOW</span>
                </div>
                <p className="text-sm text-gray-500 italic mb-2">"I want to journal but I open the notebook and just... stare. I don't know what to write about. I close it and go back to my phone."</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-lg">😶</span>
                  <span className="text-xs text-gray-400">Blank page. Again.</span>
                </div>
              </div>
              <div className="p-6" style={{ background: 'var(--sage-light)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: 'var(--forest)', color: 'white' }}>WITH JOURNALFLOW</span>
                </div>
                <p className="text-sm text-gray-700 italic mb-2">"What does your anxiety feel like in your body right now — and what is it asking you to pay attention to?"</p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-lg">✍️</span>
                  <span className="text-xs" style={{ color: 'var(--forest)' }}>Writing for 20 minutes without stopping.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-16 px-4 sm:px-6" style={{ background: 'var(--sage-light)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-12" style={{ color: 'var(--ink)' }}>
            Journaling that actually goes somewhere
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'AI that actually gets it',
                desc: "Tell us your mood, your topic, how deep you want to go. The generator writes something specific to that combination — not pulled from a list.",
              },
              {
                icon: '🧠',
                title: 'Grounded in real practice',
                desc: 'The prompts draw from CBT, DBT, and mindfulness approaches — written in plain language, not clinical jargon.',
              },
              {
                icon: '✍️',
                title: 'Human, not robotic',
                desc: "No corporate wellness speak. The output sounds like a thoughtful friend who happens to know a lot about emotional wellbeing.",
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

      {/* Testimonials */}
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

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center" style={{ background: 'var(--forest)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            3 free prompts a day.<br />Unlimited when you're ready.
          </h2>
          <p className="text-green-200 mb-3 leading-relaxed">
            Start now — no account, no card. When journaling becomes a habit you rely on, Pro is there.
          </p>
          <p className="text-green-300 text-sm mb-8 opacity-80">
            Pro members get unlimited AI generation + a personalized prompt in their inbox every morning.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#generator"
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white transition-opacity hover:opacity-90"
              style={{ color: 'var(--forest)' }}
            >
              Generate My First Prompt — Free
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
