// LLM API 封装 - 支持 OpenAI / Anthropic / 第三方平台
// 在 Vercel 环境变量中配置对应的 Key 即可切换供应商

export interface GeneratePromptParams {
  mood: string
  topic: string
  ageGroup: string
  depth: string
}

const SYSTEM_PROMPT = `You are a warm, thoughtful journaling guide with a background in psychology and mindfulness. Your role is to create journal prompts that feel like they come from a caring friend who also happens to know a lot about emotional wellbeing.

When writing prompts:
- Use warm, conversational language — never clinical or robotic
- Be specific enough to be useful, but open enough to allow personal interpretation
- Acknowledge that journaling can feel vulnerable, and make the reader feel safe
- Draw on real emotional experiences that people actually go through
- Avoid clichés like "take a deep breath" or "be your best self"
- Write as if you genuinely care about this specific person's growth`

function buildUserMessage(params: GeneratePromptParams): string {
  const depthGuide =
    params.depth === 'quick'
      ? 'Keep it brief and accessible — something they can answer in 5 minutes.'
      : 'Make it deeper — something worth sitting with for 15-20 minutes.'

  const ageGuide =
    params.ageGroup === 'kid'
      ? 'Write for children (ages 8-12). Use simple, fun language.'
      : params.ageGroup === 'teen'
      ? 'Write for teenagers (ages 13-18). Be relatable and non-preachy.'
      : 'Write for adults. You can go deeper emotionally.'

  return `Generate a single journal prompt for someone who is feeling ${params.mood} and wants to explore the theme of ${params.topic}.

${ageGuide}
${depthGuide}

Return ONLY the journal prompt itself — no introduction, no label, no explanation. Just the prompt, written directly to the reader (use "you" or "your").`
}

// OpenAI 实现
async function generateWithOpenAI(params: GeneratePromptParams): Promise<ReadableStream> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      stream: true,
      max_tokens: 200,
      temperature: 0.85,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserMessage(params) },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  return response.body!
}

// Anthropic 实现
async function generateWithAnthropic(params: GeneratePromptParams): Promise<ReadableStream> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      stream: true,
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserMessage(params) }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  return response.body!
}

// 主入口 - 自动根据环境变量选择供应商
export async function generatePromptStream(
  params: GeneratePromptParams
): Promise<ReadableStream> {
  if (process.env.OPENAI_API_KEY) {
    return generateWithOpenAI(params)
  }

  if (process.env.ANTHROPIC_API_KEY) {
    return generateWithAnthropic(params)
  }

  // 第三方平台（兼容 OpenAI 格式）
  if (process.env.LLM_API_KEY && process.env.LLM_API_BASE_URL) {
    const response = await fetch(`${process.env.LLM_API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || 'gpt-4o-mini',
        stream: true,
        max_tokens: 200,
        temperature: 0.85,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserMessage(params) },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
    }

    return response.body!
  }

  throw new Error('No LLM API key configured. Please set OPENAI_API_KEY or ANTHROPIC_API_KEY in environment variables.')
}
