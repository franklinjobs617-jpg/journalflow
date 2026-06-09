import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — JournalFlow Pro',
  description:
    'Unlock unlimited AI journal prompt generation, PDF downloads, and more. Simple, affordable pricing for your journaling practice.',
  alternates: { canonical: 'https://journalflow.ai/pricing' },
}

const FREE_FEATURES = [
  '3 AI-generated prompts per day',
  'Access to all 800+ prompt pages',
  'Daily prompt page',
  'Copy & share prompts',
]

const PRO_FEATURES = [
  'Unlimited AI prompt generation',
  'Download any topic as PDF',
  'All 800+ prompts, all topics',
  'Daily prompt + email subscription',
  'New topics added monthly',
  'Priority support',
]

const PDF_FEATURES = [
  'All current topic PDFs (8 packs)',
  'Printable, high-quality format',
  'Perfect for therapists & teachers',
  'Lifetime access, no subscription',
]

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--ink)' }}>
          Simple, honest pricing
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          Start free. Upgrade when it feels right. No pressure, no tricks.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {/* Free */}
        <div className="bg-white rounded-2xl border border-green-100 p-7 flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">Free</p>
            <div className="flex items-end gap-1">
              <span className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>$0</span>
              <span className="text-gray-400 mb-1">/forever</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">A good way to start.</p>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="block text-center py-3 rounded-full border-2 text-sm font-semibold transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
          >
            Start for Free
          </Link>
        </div>

        {/* Pro Monthly */}
        <div
          className="rounded-2xl p-7 flex flex-col relative"
          style={{ background: 'var(--forest)', color: '#fff' }}
        >
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
            style={{ background: 'var(--amber-warm)', color: '#fff' }}
          >
            MOST POPULAR
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70 mb-2">Pro</p>
            <div className="flex items-end gap-1">
              <span className="font-display text-4xl font-bold">$9.9</span>
              <span className="opacity-70 mb-1">/month</span>
            </div>
            <p className="text-sm opacity-70 mt-2">Or $79/year — save 33%.</p>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="text-green-300 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="block text-center py-3 rounded-full text-sm font-semibold bg-white transition-opacity hover:opacity-90"
              style={{ color: 'var(--forest)' }}
            >
              Get Pro Monthly
            </Link>
            <Link
              href="#"
              className="block text-center py-3 rounded-full text-sm font-semibold border border-white/40 text-white transition-opacity hover:opacity-90"
            >
              Get Pro Yearly — $79
            </Link>
          </div>
        </div>

        {/* PDF Bundle */}
        <div className="bg-white rounded-2xl border border-green-100 p-7 flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">PDF Bundle</p>
            <div className="flex items-end gap-1">
              <span className="font-display text-4xl font-bold" style={{ color: 'var(--ink)' }}>$4.9</span>
              <span className="text-gray-400 mb-1"> once</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Own it forever. No subscription.</p>
          </div>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {PDF_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-green-500 mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="#"
            className="block text-center py-3 rounded-full border-2 text-sm font-semibold transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
          >
            Buy PDF Bundle
          </Link>
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
              q: 'Can I cancel my Pro subscription anytime?',
              a: "Yes, always. No questions asked. You'll keep access until the end of your billing period.",
            },
            {
              q: 'What payment methods do you accept?',
              a: 'All major credit cards via Stripe. Secure and encrypted.',
            },
            {
              q: 'Is the PDF Bundle a one-time purchase?',
              a: "Yes. Pay once, download all 8 topic packs, keep them forever. No subscription involved.",
            },
            {
              q: "I'm a therapist — can I share PDFs with clients?",
              a: 'The PDF Bundle includes a personal use license, which covers sharing with clients in a professional context.',
            },
            {
              q: 'Do you offer refunds?',
              a: "If you're not happy, reach out within 7 days and we'll sort it out.",
            },
          ].map((item) => (
            <div key={item.q} className="bg-white rounded-xl border border-green-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
