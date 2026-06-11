'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'fun', label: 'Fun', emoji: '🎉' },
  { id: 'everyday', label: 'Everyday', emoji: '☕' },
  { id: 'morning', label: 'Morning', emoji: '🌅' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'mental-health', label: 'Mental Health', emoji: '🧠' },
  { id: 'self-love', label: 'Self Love', emoji: '💛' },
]

const PROMPT_POOL: Record<string, string[]> = {
  fun: [
    "What's a hill you will absolutely die on, an opinion so strong you would defend it forever?",
    "If your life had a theme song right now, what would it be and why?",
    "What's the most chaotic thing that happened to you this week? Write it like a news report.",
    "Describe your morning routine like a nature documentary narrator is watching you.",
    "What's a completely useless skill you have that you're secretly proud of?",
    "If your pet could talk, what's the first thing they would say to you?",
    "What's the worst haircut or fashion choice you ever made? Describe it in vivid detail.",
    "Write about a time you tried to be cool and it completely backfired.",
  ],
  everyday: [
    "Describe everything on your desk right now. Not what it means, just what is there.",
    "What can you hear right now? List every sound, from the loudest to the quietest.",
    "What did you eat today, and what did each thing taste like, specifically?",
    "Describe the view from the nearest window in detail right now.",
    "What is the most worn object in the room you are in?",
    "Pick up the nearest object to your left hand. Describe it as if writing instructions for someone to recreate it exactly.",
    "What does the light look like right now, its quality, direction, color, the shadows it makes?",
    "What is one thing in your home that you look at every day but have never really noticed?",
  ],
  morning: [
    "Who do you want to be today? Not what you want to accomplish, but who you want to be.",
    "What's one small thing you can do today that Future You will thank you for?",
    "What's weighing on you this morning? Name it, even briefly.",
    "What does your gut say about today?",
    "What would a really good today look like for you?",
    "What are you looking forward to today, even something tiny?",
    "What do you need most this morning, energy, patience, courage, or clarity?",
    "Write one honest sentence about how you are really doing right now.",
  ],
  gratitude: [
    "Think of someone who showed up for you recently in a small way. What did it mean to you?",
    "What do you have today that you once hoped for?",
    "What's something about this morning that most people would overlook but that you notice?",
    "Write about something, anything, that is genuinely good in your life right now.",
    "What's a small comfort in your life that you have started taking for granted?",
    "Who in your life consistently shows up, even in small ways? Have you told them you notice?",
    "What's one thing your past self did that you are benefiting from right now?",
    "Write about a moment from the last month you want to remember.",
  ],
  'mental-health': [
    "What emotion has been showing up most consistently for you this week?",
    "If a close friend spoke to themselves the way you speak to yourself, what would you say to them?",
    "What's the emotional weight you have been carrying for the longest time?",
    "What gives you hope on your hardest days?",
    "What would it mean to be emotionally well, not perfectly happy, just genuinely well?",
    "Is there an emotion you have been avoiding or pushing away?",
    "What does your inner critic sound like? Is it your voice, or someone else's?",
    "What would change in your life if you started treating yourself with the same compassion you give others?",
  ],
  'self-love': [
    "What would it mean to be enough, exactly as you are today?",
    "What do you find easy to forgive in others but impossible to forgive in yourself?",
    "What would you tell a younger version of yourself about their worth?",
    "What's something you have been waiting for someone else to give you that you could give yourself?",
    "What does self-respect look like in practice in your daily life?",
    "What are you becoming that you are quietly proud of?",
    "What's one thing you are willing to believe about yourself today, even if you cannot fully believe it yet?",
    "What would it feel like to be on your own side?",
  ],
}

function getRandomPrompt(category: string): string {
  const pool = PROMPT_POOL[category] || PROMPT_POOL.fun
  return pool[Math.floor(Math.random() * pool.length)]
}

const DRAWER_DISMISSED_KEY = 'jf_drawer_dismissed'
const DRAWER_LAST_SHOWN_KEY = 'jf_drawer_last_shown'

export default function DailyPromptDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('fun')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const lastShown = localStorage.getItem(DRAWER_LAST_SHOWN_KEY)
    const today = new Date().toDateString()

    if (lastShown !== today) {
      setTimeout(() => {
        setIsVisible(true)
        setIsOpen(true)
        localStorage.setItem(DRAWER_LAST_SHOWN_KEY, today)
      }, 3000)
    }

    setCurrentPrompt(getRandomPrompt('fun'))
  }, [])

  function handleDraw() {
    setCurrentPrompt(getRandomPrompt(selectedCategory))
    setCopied(false)
  }

  function handleCategoryChange(cat: string) {
    setSelectedCategory(cat)
    setCurrentPrompt(getRandomPrompt(cat))
    setCopied(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(currentPrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDismiss() {
    setIsOpen(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300"
      style={{ transform: isOpen ? 'translateY(0)' : 'translateY(calc(100% - 52px))' }}
    >
      <div
        className="mx-auto max-w-2xl rounded-t-2xl shadow-2xl overflow-hidden"
        style={{ background: 'var(--forest)' }}
      >
        {/* Handle bar - always visible, click to toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-white"
          aria-label={isOpen ? 'Close prompt drawer' : 'Open prompt drawer'}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🎲</span>
            <span className="text-sm font-semibold">Draw a random prompt</span>
            {!isOpen && (
              <span
                className="text-xs px-2 py-0.5 rounded-full ml-1"
                style={{ background: 'var(--amber-warm)' }}
              >
                Try it
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs opacity-60">{isOpen ? 'close' : 'open'}</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
        </button>

        {/* Expanded content */}
        <div className="px-5 pb-6">
          {/* Category selector */}
          <div className="flex gap-2 flex-wrap mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full transition-all"
                style={
                  selectedCategory === cat.id
                    ? { background: 'white', color: 'var(--forest)' }
                    : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }
                }
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Prompt display */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          >
            <p className="font-prose text-white leading-relaxed text-sm">
              &ldquo;{currentPrompt}&rdquo;
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDraw}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white transition-opacity hover:opacity-90"
              style={{ color: 'var(--forest)' }}
            >
              <span>🎲</span>
              Draw Another
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
            <Link
              href={`/prompts/${selectedCategory}`}
              className="text-xs opacity-70 hover:opacity-100 text-white underline underline-offset-2 ml-auto"
            >
              See all {CATEGORIES.find(c => c.id === selectedCategory)?.label} prompts
            </Link>
          </div>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="mt-4 w-full text-xs text-white opacity-40 hover:opacity-70"
          >
            Dismiss for today
          </button>
        </div>
      </div>
    </div>
  )
}
