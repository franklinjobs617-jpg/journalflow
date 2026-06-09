import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Today's Journal Prompt — Daily Journaling Prompts",
  description:
    "A new journal prompt every single day. Subscribe to receive your daily prompt by email and build a consistent journaling practice.",
  alternates: { canonical: 'https://journalflow.ai/daily' },
}

// 每日 prompt 池 - 根据日期循环
const DAILY_PROMPTS = [
  "What's one small thing you've been carrying lately that you haven't talked about?",
  "If today had a theme — a single word — what would it be, and why?",
  "What does your body need right now that you've been ignoring?",
  "Write about something you did this week that you're quietly proud of.",
  "What's a version of your life you've given up on? Is it really gone, or just waiting?",
  "What would you do today if you weren't afraid of doing it wrong?",
  "Write about the last time you felt completely present. What was happening?",
  "What belief about yourself is it time to let go of?",
  "Who in your life shows up without being asked? Have you told them you notice?",
  "What's the most honest thing you could say about where you are right now?",
  "What are you waiting for permission to do — and who are you waiting from?",
  "Write about something that made you genuinely laugh this week.",
  "What's one thing you wish someone understood about you right now?",
  "What does rest actually look like for you? When did you last really do it?",
  "Write about a door that opened for you that you almost missed.",
  "What's a small thing you've been doing right that you haven't acknowledged?",
  "What would change if you stopped arguing with yourself for one day?",
  "Write about a feeling you've been avoiding. Just name it — you don't have to solve it.",
  "What's the one conversation you've been putting off? What makes it hard?",
  "If your wisest self could give you one instruction for today, what would it be?",
  "What's something you keep coming back to — a thought, a question, a feeling?",
  "Write about who you're becoming. What evidence do you see of that in your daily life?",
  "What does gratitude feel like in your body, when it's real?",
  "What's one thing you know is true about yourself that your inner critic refuses to acknowledge?",
  "Write about a moment this week when you were kind — to someone else, or to yourself.",
  "What part of your life feels most aligned with who you are right now?",
  "What would it mean to be enough, exactly as you are today?",
  "Write about something you're learning that excites you.",
  "What's the smallest possible act of courage you could take today?",
  "Write about a person who has influenced you in ways you've never fully told them.",
  "What does 'home' feel like to you right now?",
]

function getDailyPrompt(): { prompt: string; number: number } {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const index = dayOfYear % DAILY_PROMPTS.length

  return {
    prompt: DAILY_PROMPTS[index],
    number: dayOfYear,
  }
}

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function DailyPage() {
  const { prompt, number } = getDailyPrompt()
  const dateStr = formatDate()

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase"
          style={{ background: 'var(--sage-light)', color: 'var(--forest)' }}
        >
          Daily Prompt #{number}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
          Your Prompt for Today
        </h1>
        <p className="text-gray-400 text-sm">{dateStr}</p>
      </div>

      {/* Today's prompt */}
      <div className="paper-card rounded-2xl p-8 mb-8 text-center">
        <p className="font-prose text-xl sm:text-2xl leading-relaxed text-gray-800">
          "{prompt}"
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
        <Link
          href="/"
          className="text-center py-3 px-6 rounded-full text-white text-sm font-semibold"
          style={{ background: 'var(--forest)' }}
        >
          ✨ Generate a Custom Prompt
        </Link>
        <Link
          href="/prompts"
          className="text-center py-3 px-6 rounded-full border-2 text-sm font-semibold"
          style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
        >
          Browse All Topics
        </Link>
      </div>

      {/* Email subscribe */}
      <div
        className="rounded-2xl p-7 text-center"
        style={{ background: 'var(--sage-light)' }}
      >
        <h2 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--ink)' }}>
          Get your daily prompt by email
        </h2>
        <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
          A new prompt every morning, delivered quietly to your inbox. No noise, just one question worth sitting with.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-full border border-green-200 text-sm outline-none focus:border-green-400"
            style={{ background: '#fff' }}
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-full text-white text-sm font-semibold whitespace-nowrap"
            style={{ background: 'var(--forest)' }}
          >
            Subscribe Free
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  )
}
