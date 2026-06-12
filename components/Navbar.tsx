'use client'

import { useState } from 'react'
import Link from 'next/link'

const EXPLORE_LINKS = [
  {
    group: 'Everyday & Fun',
    items: [
      { label: '☕ Everyday Life', href: '/prompts/everyday', desc: 'Observe. Describe. No pressure.' },
      { label: '🎉 Just for Fun', href: '/prompts/fun', desc: 'Absurd, playful, lighthearted.' },
      { label: '🌅 Morning', href: '/prompts/morning', desc: 'Start your day with intention.' },
      { label: '✏️ Beginners', href: '/prompts/beginners', desc: 'New to journaling? Start here.' },
    ],
  },
  {
    group: 'Healing & Growth',
    items: [
      { label: '🧠 Mental Health', href: '/prompts/mental-health', desc: 'Grounded, therapeutic prompts.' },
      { label: '🌿 Anxiety', href: '/prompts/anxiety', desc: 'Understand and sit with it.' },
      { label: '🔋 Burnout', href: '/prompts/burnout', desc: 'For when you are running empty.' },
      { label: '🕊️ Grief', href: '/prompts/grief', desc: 'Space for loss, in any form.' },
    ],
  },
  {
    group: 'Self & Growth',
    items: [
      { label: '🔍 Self Discovery', href: '/prompts/self-discovery', desc: 'Who are you, really?' },
      { label: '💛 Self Love', href: '/prompts/self-love', desc: 'Be on your own side.' },
      { label: '🌑 Shadow Work', href: '/prompts/shadow-work', desc: 'Meet the parts you hide.' },
      { label: '🌱 Therapy', href: '/prompts/therapy', desc: 'Between-session writing.' },
    ],
  },
  {
    group: 'Special',
    items: [
      { label: '🌸 For Moms', href: '/prompts/moms', desc: 'New moms, tired moms, all moms.' },
      { label: '🌈 For Kids', href: '/prompts/kids', desc: 'Fun prompts for young writers.' },
      { label: '📚 Middle School', href: '/prompts/middle-school', desc: 'Age-appropriate and real.' },
      { label: '🎓 High School', href: '/prompts/high-school', desc: 'Identity, pressure, big feelings.' },
    ],
  },
]

const RESOURCE_LINKS = [
  { label: '🍵 Observe Prompts', href: '/observe-journal-prompts' },
  { label: '😶 No-Feelings Prompts', href: '/no-feelings-journal-prompts' },
  { label: '✨ AI Journal Prompts', href: '/prompts/ai-generated' },
  { label: '📋 All Topics', href: '/prompts' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl">📖</span>
          <span className="font-display font-bold text-xl" style={{ color: 'var(--forest)' }}>
            JournalFlow
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">

          {/* Explore dropdown */}
          <div className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">
              Explore Prompts
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {exploreOpen && (
              <div className="absolute left-0 top-full pt-2 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-5 w-[680px]">
                  <div className="grid grid-cols-4 gap-5">
                    {EXPLORE_LINKS.map((group) => (
                      <div key={group.group}>
                        <p className="text-xs font-bold uppercase tracking-wide mb-3"
                          style={{ color: 'var(--forest)' }}>
                          {group.group}
                        </p>
                        <div className="flex flex-col gap-2">
                          {group.items.map((item) => (
                            <Link key={item.href} href={item.href}
                              className="group block"
                              onClick={() => setExploreOpen(false)}>
                              <div className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                                {item.label}
                              </div>
                              <div className="text-xs text-gray-400 leading-tight mt-0.5">
                                {item.desc}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Bottom bar */}
                  <div className="border-t border-green-50 mt-5 pt-4 flex items-center justify-between">
                    <div className="flex gap-4">
                      {RESOURCE_LINKS.map((l) => (
                        <Link key={l.href} href={l.href}
                          className="text-xs text-gray-500 hover:text-green-700 transition-colors"
                          onClick={() => setExploreOpen(false)}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                    <Link href="/prompts"
                      className="text-xs font-semibold underline underline-offset-2"
                      style={{ color: 'var(--forest)' }}
                      onClick={() => setExploreOpen(false)}>
                      View all topics
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/prompts/ai-generated"
            className="flex items-center gap-1 text-sm font-semibold transition-colors"
            style={{ color: 'var(--forest)' }}>
            <span>✨</span> AI Generator
          </Link>

          <Link href="/daily"
            className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">
            Daily Prompt
          </Link>

          <Link href="/pricing"
            className="text-sm font-medium text-gray-600 hover:text-green-700 transition-colors">
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/pricing"
            className="text-sm font-semibold px-4 py-2 rounded-full border-2 transition-all"
            style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}>
            Get Pro
          </Link>
        </div>

        {/* Mobile toggle */}
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
        <div className="md:hidden bg-white border-t border-green-100 px-4 py-5 flex flex-col gap-1 max-h-screen overflow-y-auto">

          <p className="text-xs font-bold uppercase tracking-wide mb-2 mt-1"
            style={{ color: 'var(--forest)' }}>
            Everyday & Fun
          </p>
          {[
            { label: '☕ Everyday Life', href: '/prompts/everyday' },
            { label: '🎉 Just for Fun', href: '/prompts/fun' },
            { label: '🌅 Morning', href: '/prompts/morning' },
            { label: '✏️ Beginners', href: '/prompts/beginners' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-700 py-1.5 pl-2"
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}

          <p className="text-xs font-bold uppercase tracking-wide mb-2 mt-4"
            style={{ color: 'var(--forest)' }}>
            Healing & Growth
          </p>
          {[
            { label: '🧠 Mental Health', href: '/prompts/mental-health' },
            { label: '🌿 Anxiety', href: '/prompts/anxiety' },
            { label: '🔋 Burnout', href: '/prompts/burnout' },
            { label: '🕊️ Grief', href: '/prompts/grief' },
            { label: '🌱 Therapy', href: '/prompts/therapy' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-700 py-1.5 pl-2"
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}

          <p className="text-xs font-bold uppercase tracking-wide mb-2 mt-4"
            style={{ color: 'var(--forest)' }}>
            Self & Growth
          </p>
          {[
            { label: '🔍 Self Discovery', href: '/prompts/self-discovery' },
            { label: '💛 Self Love', href: '/prompts/self-love' },
            { label: '🌑 Shadow Work', href: '/prompts/shadow-work' },
            { label: '🌸 For Moms', href: '/prompts/moms' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-700 py-1.5 pl-2"
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}

          <div className="border-t border-green-100 mt-4 pt-4 flex flex-col gap-3">
            <Link href="/prompts/ai-generated"
              className="text-sm font-semibold"
              style={{ color: 'var(--forest)' }}
              onClick={() => setMenuOpen(false)}>
              ✨ AI Generator
            </Link>
            <Link href="/observe-journal-prompts"
              className="text-sm text-gray-700"
              onClick={() => setMenuOpen(false)}>
              🍵 Observe Prompts
            </Link>
            <Link href="/no-feelings-journal-prompts"
              className="text-sm text-gray-700"
              onClick={() => setMenuOpen(false)}>
              😶 No-Feelings Prompts
            </Link>
            <Link href="/daily"
              className="text-sm text-gray-700"
              onClick={() => setMenuOpen(false)}>
              Daily Prompt
            </Link>
            <Link href="/pricing"
              className="text-sm text-gray-700"
              onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/pricing"
              className="text-sm font-semibold text-white text-center py-2.5 rounded-full mt-1"
              style={{ background: 'var(--forest)' }}
              onClick={() => setMenuOpen(false)}>
              Get Pro
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
