import type { Metadata } from 'next'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'

export const metadata: Metadata = {
  title: 'Pricing  -  JournalFlow Pro',
  description:
    'Unlock unlimited AI journal prompt generation. Personalized prompts delivered daily to your inbox. Start free, upgrade when you\'re ready.',
  alternates: { canonical: 'https://journalflow.ai/pricing' },
}

const FREE_FEATURES = [
  { text: '3 AI-generated prompts per day', detail: 'Tailored to your mood and topic' },
  { text: 'Access to all 1,700+ prompt pages', detail: 'Every topic, always free to read' },
  { text: 'Daily prompt page', detail: 'One new prompt every morning' },
  { text: 'Copy & share any prompt', detail: 'Use them anywhere' },
]

const PRO_FEATURES = [
  { text: 'Unlimited AI prompt generation', detail: 'Generate as many as you need, any time of day' },
  { text: 'Personalized daily prompt by email', detail: 'Every morning, one prompt built around your preferences  -  not random' },
  { text: 'Generation history', detail: 'Every prompt you\'ve generated, saved and searchable' },
  { text: 'Early access to new topics', detail: 'New themes added monthly, Pro gets first access' },
  { text: 'Priority support', detail: 'We actually respond, fast' },
]

const GENERATOR_SCENARIOS = [
  {
    icon: '😟',
    mood: 'Anxious',
    topic: 'Mental Health',
    depth: 'Deep',
    output: '"What does your anxiety feel like in your body right now  -  and what is it trying to protect you from?"',
    who: 'For anyone processing anxiety or overwhelm',
  },
  {
    icon: '😄',
    mood: 'Playful',
    topic: 'Just for Fun',
    depth: 'Quick',
    output: '"If your personality were a type of weather, what would today\'s forecast be  -  and why?"',
    who: 'For building a light daily writing habit',
  },
  {
    icon: '🌑',
    mood: 'Reflective',
    topic: 'Self-Growth',
    depth: 'Deep',
    output: '"What pattern keeps showing up in your life that you\'ve been too close to see clearly until now?"',
    who: 'For therapists to use with clients',
  },
  {
    icon: '🌸',
    mood: 'Stuck',
    topic: 'Parenting',
    depth: 'Deep',
    output: '"What part of yourself did you have to set aside when you became a parent  -  and how do you feel about that today?"',
    who: 'For new moms navigating identity shifts',
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
          style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
        >
          AI-Powered Journaling
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          The right prompt,<br />every single day
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Three free AI-generated prompts per day to start. Go Pro when you want a prompt that really knows you.
        </p>
      </div>

      {/* */}
      <div className="mb-14 rounded-2xl overflow-hidden border border-green-100">
        <div className="px-6 py-4 border-b border-green-100" style={{ background: 'var(--sage-light)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>
            What the AI generator actually produces
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 bg-white">
          {GENERATOR_SCENARIOS.map((s, i) => (
            <div
              key={i}
              className="p-5 border-b border-r border-green-50 last:border-b-0"
              style={{ borderRight: i % 2 === 0 ? undefined : 'none' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{s.icon}</span>
                <div className="flex gap-1.5 flex-wrap">
                  {[s.mood, s.topic, s.depth].map((tag) => (
                    <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-prose text-sm text-gray-700 italic leading-relaxed mb-3">
                {s.output}
              </p>
              <p className="text-xs text-gray-400">{s.who}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 border-t border-green-100 text-center" style={{ background: 'var(--sage-light)' }}>
          <Link href="/" className="text-sm font-semibold underline underline-offset-2"
            style={{ color: 'var(--forest)' }}>
            Try the generator free  -  no account needed →
          </Link>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-3xl mx-auto">

        {/* Free */}
        <div className="bg-white rounded-2xl border border-green-100 p-7 flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Free</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>$0</span>
              <span className="text-gray-400 mb-1">/forever</span>
            </div>
            <p className="text-sm text-gray-500">Start here. No card required.</p>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f.text} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                <div>
                  <div className="text-sm text-gray-700">{f.text}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{f.detail}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="block text-center py-3 rounded-full border-2 text-sm font-semibold transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
          >
            Start Generating Free
          </Link>
        </div>

        {/* Pro */}
        <div className="rounded-2xl p-7 flex flex-col relative" style={{ background: 'var(--forest)', color: '#fff' }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
            style={{ background: 'var(--amber-warm)', color: '#fff' }}>
            MOST POPULAR
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">Pro</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="font-display text-4xl font-bold">$9.9</span>
              <span className="opacity-70 mb-1">/month</span>
            </div>
            <p className="text-sm opacity-70">Or $79/year  -  save 33%.</p>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            {PRO_FEATURES.map((f) => (
              <li key={f.text} className="flex items-start gap-2">
                <span className="text-green-300 mt-0.5 shrink-0">✓</span>
                <div>
                  <div className="text-sm">{f.text}</div>
                  <div className="text-xs opacity-60 mt-0.5">{f.detail}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <CheckoutButton
              className="block w-full text-center py-3 rounded-full text-sm font-semibold bg-white transition-opacity hover:opacity-90 disabled:opacity-60 cursor-pointer"
              style={{ color: 'var(--forest)' }}
            >
              Get Pro - $9.9/month
            </CheckoutButton>
            <p className="text-center text-xs text-green-200 mt-1">
              Cancel anytime - 7-day money back guarantee
            </p>
          </div>
        </div>
      </div>

      {/* */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-bold text-center mb-8" style={{ color: 'var(--ink)' }}>
          Who gets the most out of Pro?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '🧠',
              title: 'You journal for mental health',
              free: '3 AI prompts/day  -  enough to try, not enough to build a real habit',
              pro: 'Unlimited personalized prompts + a prompt waiting in your inbox every morning before the day gets loud',
            },
            {
              icon: '🌱',
              title: "You're a therapist or counselor",
              free: 'Browse 1,700+ prompts, manually pick ones for clients',
              pro: 'Generate prompts tailored to a specific client\'s situation in seconds  -  anxious, grieving, burned out  -  without the prep work',
            },
            {
              icon: '📚',
              title: "You're a teacher",
              free: 'Use the kids, middle school, and high school prompt pages',
              pro: 'Generate fresh prompts for any class topic, mood, or age group on demand  -  no more reusing the same 10 questions',
            },
            {
              icon: '😄',
              title: 'You want a low-pressure habit',
              free: '3 AI prompts/day is genuinely enough to start',
              pro: 'When journaling becomes something you look forward to, unlimited generation means you\'re never stuck  -  even at 11pm',
            },
          ].map((uc) => (
            <div key={uc.title} className="bg-white rounded-xl border border-green-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{uc.icon}</span>
                <h3 className="font-semibold text-gray-800 text-sm">{uc.title}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold text-gray-400 mt-0.5 w-8 shrink-0">FREE</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{uc.free}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-bold mt-0.5 w-8 shrink-0" style={{ color: 'var(--forest)' }}>PRO</span>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">{uc.pro}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl font-bold text-center mb-8" style={{ color: 'var(--ink)' }}>
          Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Is the free plan actually useful?',
              a: '3 AI-generated prompts per day is genuinely enough to start a journaling habit. The free plan also gives you full access to all 1,700+ prompts on the site. Pro is for when the AI generator becomes a daily tool you rely on.',
            },
            {
              q: 'What makes the personalized daily email different from the daily prompt page?',
              a: 'The daily prompt page shows the same prompt to everyone. The Pro email is generated specifically for you  -  based on the topics, moods, and depth preferences you\'ve set. It arrives every morning before you open your phone.',
            },
            {
              q: "I'm a therapist  -  how would Pro help me specifically?",
              a: 'Instead of hunting for the right prompt before a session, you describe the client\'s situation (anxious, processing grief, working on self-esteem) and generate a tailored prompt in seconds. Many therapists use it as between-session homework for clients.',
            },
            {
              q: 'Can I cancel my subscription anytime?',
              a: "Yes, always. No questions asked. You keep access until the end of your billing period.",
            },
            {
              q: 'Do you offer refunds?',
              a: "If you're not satisfied within 7 days, reach out and we'll make it right.",
            },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
