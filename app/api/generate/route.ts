import { NextRequest, NextResponse } from 'next/server'
import { generatePromptStream } from '@/lib/llm'

// 限流配置（无用户系统，基于 IP）
const DAILY_LIMIT_GUEST = 3
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000

  const record = rateLimitMap.get(key)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + dayMs })
    return { allowed: true, remaining: DAILY_LIMIT_GUEST - 1 }
  }

  if (record.count >= DAILY_LIMIT_GUEST) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: DAILY_LIMIT_GUEST - record.count }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mood, topic, ageGroup, depth } = body

    // 参数校验
    if (!mood || !topic || !ageGroup || !depth) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // 限流检查
    const key = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(key)

    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Daily limit reached',
          message: "You've used your 3 free prompts for today. Pro members get unlimited — join the waitlist for early access.",
          upgradeUrl: '/pricing',
        },
        { status: 429 }
      )
    }

    // 调用 LLM
    const stream = await generatePromptStream({ mood, topic, ageGroup, depth })

    // 返回流式响应
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Remaining-Generations': String(remaining),
      },
    })
  } catch (error) {
    console.error('Generate API error:', error)

    // API Key 未配置时的友好提示
    if (error instanceof Error && error.message.includes('No LLM API key')) {
      return NextResponse.json(
        {
          error: 'Service configuration error',
          message: 'The AI generator is being set up. Please try again later.',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate prompt. Please try again.' },
      { status: 500 }
    )
  }
}
