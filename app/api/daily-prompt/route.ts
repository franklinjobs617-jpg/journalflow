import { NextResponse } from 'next/server'

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
]

export async function GET() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  const prompt = DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length]

  return NextResponse.json({ prompt, day: dayOfYear }, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
  })
}
