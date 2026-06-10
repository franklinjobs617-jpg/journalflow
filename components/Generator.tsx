'use client'

import { useState } from 'react'
import Link from 'next/link'

const MOODS = [
  { value: 'anxious', label: '😟 Anxious', desc: 'Worried or overwhelmed' },
  { value: 'grateful', label: '🙏 Grateful', desc: 'Appreciative and warm' },
  { value: 'stuck', label: '😶 Stuck', desc: 'Lost or unclear' },
  { value: 'reflective', label: '🌙 Reflective', desc: 'Thoughtful and calm' },
  { value: 'motivated', label: '🔥 Motivated', desc: 'Ready to grow' },
  { value: 'playful', label: '😄 Playful', desc: 'Light and fun, no pressure' },
]

const TOPICS = [
  { value: 'mental health', label: '🧠 Mental Health' },
  { value: 'self-growth', label: '🌱 Self-Growth' },
  { value: 'relationships', label: '💛 Relationships' },
  { value: 'creativity', label: '✨ Creativity' },
  { value: 'work and purpose', label: '🎯 Work & Purpose' },
  { value: 'gratitude and joy', label: '☀️ Gratitude' },
  { value: 'fun and everyday life', label: '🎉 Just for Fun' },
  { value: 'parenting and family', label: '👨‍👩‍👧 Parenting' },
]

const AGE_GROUPS = [
  { value: 'adult', label: 'Adult' },
  { value: 'teen', label: 'Teen (13–18)' },
  { value: 'kid', label: 'Kid (8–12)' },
]

const DEPTHS = [
  { value: 'quick', label: '⚡ Quick (5 min)', desc: 'A light check-in' },
  { value: 'deep', label: '🌊 Deep Dive (15+ min)', desc: 'Real reflection' },
]

export default function Generator() {
  const [mood, setMood] = useState('reflective')
  const [topic, setTopic] = useState('self-growth')
  const [ageGroup, setAgeGroup] = useState('adult')
  const [depth, setDepth] = useState('deep')

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ message: string; upgradeUrl?: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)

  async function handleGenerate() {
    setLoading(true)
    setResult('')
    setError(null)
    setCopied(false)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, topic, ageGroup, depth }),
      })

      const rem = res.headers.get('X-Remaining-Generations')
      if (rem !== null) setRemaining(Number(rem))

      if (!res.ok) {
        const data = await res.json()
        setError({ message: data.message || 'Something went wrong.', upgradeUrl: data.upgradeUrl })
        setLoading(false)
        return
      }

      // 流式读取
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (!reader) throw new Error('No response stream')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter((l) => l.startsWith('data: '))

        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') break

          try {
            const parsed = JSON.parse(data)
            // OpenAI 格式
            const delta = parsed.choices?.[0]?.delta?.content
            // Anthropic 格式
            const anthropicDelta = parsed.delta?.text
            const text = delta || anthropicDelta || ''
            if (text) {
              fullText += text
              setResult(fullText)
            }
          } catch {
            // 非 JSON 行，忽略
          }
        }
      }
    } catch (err) {
      setError({ message: 'Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 选择区 */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-4">
        {/* 心情选择 */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How are you feeling right now?
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className="px-3 py-2 rounded-full text-sm font-medium border transition-all"
                style={
                  mood === m.value
                    ? { background: 'var(--forest)', color: '#fff', borderColor: 'var(--forest)' }
                    : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }
                }
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 主题选择 */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What do you want to explore?
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTopic(t.value)}
                className="px-3 py-2 rounded-full text-sm font-medium border transition-all"
                style={
                  topic === t.value
                    ? { background: 'var(--forest)', color: '#fff', borderColor: 'var(--forest)' }
                    : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }
                }
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 年龄 + 深度 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Who's journaling?</label>
            <div className="flex flex-col gap-2">
              {AGE_GROUPS.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAgeGroup(a.value)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border text-left transition-all"
                  style={
                    ageGroup === a.value
                      ? { background: 'var(--sage-light)', color: 'var(--forest-dark)', borderColor: 'var(--sage)' }
                      : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }
                  }
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">How deep?</label>
            <div className="flex flex-col gap-2">
              {DEPTHS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDepth(d.value)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border text-left transition-all"
                  style={
                    depth === d.value
                      ? { background: 'var(--sage-light)', color: 'var(--forest-dark)', borderColor: 'var(--sage)' }
                      : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }
                  }
                >
                  <div>{d.label}</div>
                  <div className="text-xs font-normal opacity-70 mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 生成按钮 */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: loading ? 'var(--forest-light)' : 'var(--forest)' }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Writing your prompt...
            </span>
          ) : result ? (
            '✨ Generate Another'
          ) : (
            '✨ Generate My Prompt'
          )}
        </button>

        {/* 剩余次数提示 */}
        {remaining !== null && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {remaining > 0
              ? `${remaining} free generation${remaining === 1 ? '' : 's'} left today`
              : 'Last free generation used'}
          </p>
        )}
      </div>

      {/* 结果区 */}
      {(result || loading) && (
        <div className="paper-card rounded-2xl p-6 mb-4">
          {loading && !result ? (
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-sm italic">Finding the right words for you</span>
              <span className="cursor-blink" />
            </div>
          ) : (
            <>
              <p className={`prompt-text mb-5 ${loading ? 'cursor-blink' : ''}`}>
                {result}
              </p>
              {!loading && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-all"
                    style={{ borderColor: 'var(--sage)', color: 'var(--forest)' }}
                  >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <span className="text-xs text-gray-400">
                    Open your journal and start writing ✍️
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--amber-light)', border: '1px solid var(--amber-warm)' }}>
          <p className="text-sm text-gray-700 mb-2">{error.message}</p>
          {error.upgradeUrl && (
            <Link
              href={error.upgradeUrl}
              className="text-sm font-semibold underline"
              style={{ color: 'var(--forest)' }}
            >
              Upgrade to Pro →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
