'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-green-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📖</span>
          <span
            className="font-display font-bold text-xl"
            style={{ color: 'var(--forest)' }}
          >
            JournalFlow
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/prompts"
            className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
          >
            Explore Prompts
          </Link>
          <Link
            href="/daily"
            className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
          >
            Daily Prompt
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/pricing"
            className="text-sm font-medium px-4 py-2 rounded-full border-2 transition-all"
            style={{
              borderColor: 'var(--forest)',
              color: 'var(--forest)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--forest)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--forest)'
            }}
          >
            Get Pro
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-4 flex flex-col gap-4">
          <Link href="/prompts" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
            Explore Prompts
          </Link>
          <Link href="/daily" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
            Daily Prompt
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-white text-center py-2 rounded-full"
            style={{ background: 'var(--forest)' }}
            onClick={() => setMenuOpen(false)}
          >
            Get Pro
          </Link>
        </div>
      )}
    </header>
  )
}
