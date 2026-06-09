import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-6">📖</div>
      <h1 className="font-display text-3xl font-bold mb-3" style={{ color: 'var(--ink)' }}>
        Page not found
      </h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        This page seems to have wandered off. Let's get you back to somewhere useful.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="px-6 py-3 rounded-full text-white text-sm font-semibold"
          style={{ background: 'var(--forest)' }}>
          Try the AI Generator
        </Link>
        <Link href="/prompts" className="px-6 py-3 rounded-full border-2 text-sm font-semibold"
          style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
          Browse All Prompts
        </Link>
      </div>
    </div>
  )
}
