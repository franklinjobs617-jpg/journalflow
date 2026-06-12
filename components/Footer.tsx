import Link from 'next/link'

const topicLinks = [
  { label: 'Everyday Life', href: '/prompts/everyday' },
  { label: 'Just for Fun', href: '/prompts/fun' },
  { label: 'Morning', href: '/prompts/morning' },
  { label: 'Anxiety', href: '/prompts/anxiety' },
  { label: 'Mental Health', href: '/prompts/mental-health' },
  { label: 'Self Discovery', href: '/prompts/self-discovery' },
  { label: 'For Moms', href: '/prompts/moms' },
  { label: 'Shadow Work', href: '/prompts/shadow-work' },
]

const resourceLinks = [
  { label: 'Observe Prompts', href: '/observe-journal-prompts' },
  { label: 'No-Feelings Prompts', href: '/no-feelings-journal-prompts' },
  { label: 'AI Journal Prompts', href: '/prompts/ai-generated' },
  { label: 'Beginners', href: '/prompts/beginners' },
]

export default function Footer() {
  return (
    <footer className="border-t border-green-100 mt-20" style={{ background: '#F0FAF4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📖</span>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--forest)' }}>
                JournalFlow
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-4">
              Never stare at a blank page again. AI-powered prompts for observation, creativity, and reflection.
            </p>
            <Link
              href="/#generator"
              className="inline-block text-xs font-semibold px-4 py-2 rounded-full text-white"
              style={{ background: 'var(--forest)' }}
            >
              Try free - no signup
            </Link>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Popular Topics
            </h3>
            <ul className="flex flex-col gap-2">
              {topicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Product
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'AI Generator', href: '/#generator' },
                { label: 'Daily Prompt', href: '/daily' },
                { label: 'All Prompts', href: '/prompts' },
                { label: 'Pricing', href: '/pricing' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-green-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} JournalFlow. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            No blank page. No pressure. 🍵
          </p>
        </div>
      </div>
    </footer>
  )
}
