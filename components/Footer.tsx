import Link from 'next/link'

const topicLinks = [
  { label: 'Anxiety', href: '/prompts/anxiety' },
  { label: 'Mental Health', href: '/prompts/mental-health' },
  { label: 'Gratitude', href: '/prompts/gratitude' },
  { label: 'Self Discovery', href: '/prompts/self-discovery' },
  { label: 'Morning', href: '/prompts/morning' },
  { label: 'Shadow Work', href: '/prompts/shadow-work' },
  { label: 'Kids', href: '/prompts/kids' },
  { label: 'Self Love', href: '/prompts/self-love' },
]

export default function Footer() {
  return (
    <footer className="border-t border-green-100 mt-20" style={{ background: '#F0FAF4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📖</span>
              <span className="font-display font-bold text-lg" style={{ color: 'var(--forest)' }}>
                JournalFlow
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered journal prompts to help you reflect, grow, and find your words  -  one day at a time.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Popular Topics
            </h3>
            <ul className="grid grid-cols-2 gap-2">
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

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              Product
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
                  AI Generator
                </Link>
              </li>
              <li>
                <Link href="/daily" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
                  Daily Prompt
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
                  All Prompts
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-green-700 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-100 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} JournalFlow. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Made with care for your journaling journey 🌱
          </p>
        </div>
      </div>
    </footer>
  )
}
