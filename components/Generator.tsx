'use client'

import { useState, useEffect } from 'react'
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
  { value: 'teen', label: 'Teen (13-18)' },
  { value: 'kid', label: 'Kid (8-12)' },
]

const DEPTHS = [
  { value: 'quick', label: '⚡ Quick (5 min)', desc: 'A light check-in' },
  { value: 'deep', label: '🌊 Deep Dive (15+ min)', desc: 'Real reflection' },
]

const FREE_HISTORY_LIMIT = 20

const LOADING_MESSAGES = [
  'Finding the right words for you...',
  'Reading between the lines of your mood...',
  'Thinking about what you actually need right now...',
  'Almost there - making sure it feels right...',
]

interface HistoryItem {
  id: string
  prompt: string
  mood: string
  topic: string
  createdAt: string
  note?: string
}

function getStreak(): number {
  try {
    const data = localStorage.getItem('jf_streak')
    if (!data) return 0
    const { count, lastDate } = JSON.parse(data)
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    if (lastDate === today) return count
    if (lastDate === yesterday) return count
    return 0
  } catch { return 0 }
}

function updateStreak(): number {
  try {
    const today = new Date().toDateString()
    const data = localStorage.getItem('jf_streak')
    if (!data) {
      localStorage.setItem('jf_streak', JSON.stringify({ count: 1, lastDate: today }))
      return 1
    }
    const { count, lastDate } = JSON.parse(data)
    if (lastDate === today) return count
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const newCount = lastDate === yesterday ? count + 1 : 1
    localStorage.setItem('jf_streak', JSON.stringify({ count: newCount, lastDate: today }))
    return newCount
  } catch { return 1 }
}

function getHistory(): HistoryItem[] {
  try {
    const data = localStorage.getItem('jf_history')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

function saveToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>): HistoryItem[] {
  try {
    const history = getHistory()
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }
    const updated = [newItem, ...history].slice(0, FREE_HISTORY_LIMIT)
    localStorage.setItem('jf_history', JSON.stringify(updated))
    return updated
  } catch { return [] }
}

function saveNote(id: string, note: string): void {
  try {
    const history = getHistory()
    const updated = history.map(item => item.id === id ? { ...item, note } : item)
    localStorage.setItem('jf_history', JSON.stringify(updated))
  } catch {}
}

export default function Generator() {
  const [mood, setMood] = useState('reflective')
  const [topic, setTopic] = useState('self-growth')
  const [ageGroup, setAgeGroup] = useState('adult')
  const [depth, setDepth] = useState('deep')

  const [result, setResult] = useState('')
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<{ message: string; upgradeUrl?: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [remaining, setRemaining] = useState<number | null>(null)

  const [streak, setStreak] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loadingMsg, setLoadingMsg] = useState(0)

  const [writingId, setWritingId] = useState<string | null>(null)
  const [noteText, setNoteText] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)

  useEffect(() => {
    setStreak(getStreak())
    setHistory(getHistory())
  }, [])

  useEffect(() => {
    if (!loading) { setLoadingMsg(0); return }
    const interval = setInterval(() => {
      setLoadingMsg(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [loading])

  async function handleGenerate() {
    setLoading(true)
    setResult('')
    setError(null)
    setCopied(false)
    setCurrentId(null)
    setWritingId(null)
    setNoteText('')

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

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (!reader) throw new Error('No response stream')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '))
        for (const line of lines) {
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            const delta = parsed.choices?.[0]?.delta?.content
            const anthropicDelta = parsed.delta?.text
            const text = delta || anthropicDelta || ''
            if (text) {
              fullText += text
              setResult(fullText)
            }
          } catch {}
        }
      }

      if (fullText) {
        const newStreak = updateStreak()
        setStreak(newStreak)
        const newHistory = saveToHistory({ prompt: fullText, mood, topic })
        setHistory(newHistory)
        if (newHistory[0]) setCurrentId(newHistory[0].id)
      }
    } catch {
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

  function handleOpenWrite() {
    if (!currentId) return
    const existing = history.find(h => h.id === currentId)
    setNoteText(existing?.note || '')
    setWritingId(currentId)
    setNoteSaved(false)
  }

  function handleSaveNote() {
    if (!writingId) return
    saveNote(writingId, noteText)
    setHistory(getHistory())
    setNoteSaved(true)
    setTimeout(() => setNoteSaved(false), 2000)
  }

  function handleHistoryWrite(item: HistoryItem) {
    setNoteText(item.note || '')
    setWritingId(item.id)
    setNoteSaved(false)
    setShowHistory(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Streak banner */}
      {streak > 0 && (
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-4"
          style={{ background: 'var(--sage-light)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>
              {streak} day streak
            </span>
            <span className="text-xs text-gray-500">
              {streak >= 7 ? ' -  on a roll!' : streak >= 3 ? ' -  keep going!' : ' -  great start!'}
            </span>
          </div>
          <button
            onClick={() => { setShowHistory(!showHistory); setWritingId(null) }}
            className="text-xs font-medium underline underline-offset-2"
            style={{ color: 'var(--forest)' }}
          >
            {showHistory ? 'Hide history' : `History (${history.length})`}
          </button>
        </div>
      )}

      {/* History panel */}
      {showHistory && history.length > 0 && (
        <div className="bg-white rounded-2xl border border-green-100 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Your recent prompts</p>
            {history.length >= FREE_HISTORY_LIMIT && (
              <Link href="/pricing" className="text-xs underline" style={{ color: 'var(--forest)' }}>
                Pro saves unlimited
              </Link>
            )}
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((item) => (
              <div key={item.id} className="flex items-start gap-2 p-2.5 rounded-lg"
                style={{ background: 'var(--sage-light)' }}>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{item.prompt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{item.createdAt}</span>
                    {item.note && (
                      <span className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'var(--forest)', color: 'white' }}>
                        wrote
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleHistoryWrite(item)}
                  className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border transition-all"
                  style={{ borderColor: 'var(--forest)', color: 'var(--forest)' }}
                >
                  {item.note ? 'Edit' : 'Write'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main generator card */}
      <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 mb-4">

        {/* Mood */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            How are you feeling right now?
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button key={m.value} onClick={() => setMood(m.value)}
                className="px-3 py-2 rounded-full text-sm font-medium border transition-all"
                style={mood === m.value
                  ? { background: 'var(--forest)', color: '#fff', borderColor: 'var(--forest)' }
                  : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Topic */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What do you want to explore?
          </label>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button key={t.value} onClick={() => setTopic(t.value)}
                className="px-3 py-2 rounded-full text-sm font-medium border transition-all"
                style={topic === t.value
                  ? { background: 'var(--forest)', color: '#fff', borderColor: 'var(--forest)' }
                  : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age + Depth */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Who is journaling?</label>
            <div className="flex flex-col gap-2">
              {AGE_GROUPS.map((a) => (
                <button key={a.value} onClick={() => setAgeGroup(a.value)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border text-left transition-all"
                  style={ageGroup === a.value
                    ? { background: 'var(--sage-light)', color: 'var(--forest-dark)', borderColor: 'var(--sage)' }
                    : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">How deep?</label>
            <div className="flex flex-col gap-2">
              {DEPTHS.map((d) => (
                <button key={d.value} onClick={() => setDepth(d.value)}
                  className="px-3 py-2 rounded-lg text-sm font-medium border text-left transition-all"
                  style={depth === d.value
                    ? { background: 'var(--sage-light)', color: 'var(--forest-dark)', borderColor: 'var(--sage)' }
                    : { background: '#fff', color: '#4B5563', borderColor: '#D1FAE5' }}>
                  <div>{d.label}</div>
                  <div className="text-xs font-normal opacity-70 mt-0.5">{d.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button onClick={handleGenerate} disabled={loading}
          className="w-full py-3.5 rounded-full text-white font-semibold text-base transition-all disabled:opacity-60"
          style={{ background: loading ? 'var(--forest-light)' : 'var(--forest)' }}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Writing your prompt...
            </span>
          ) : result ? '✨ Generate Another' : '✨ Generate My Prompt'}
        </button>

        {/* Remaining */}
        {remaining !== null && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {remaining > 0
              ? (
                <>
                  {remaining} free prompt{remaining === 1 ? '' : 's'} left today
                  {streak > 0 && `  -  ${streak} day streak 🔥`}
                </>
              ) : (
                <span>
                  Free limit reached.{streak > 1 && ` Don't break your ${streak}-day streak  - `}{' '}
                  <Link href="/pricing" style={{ color: 'var(--forest)', textDecoration: 'underline' }}>
                    Go Pro for unlimited
                  </Link>
                </span>
              )}
          </p>
        )}
      </div>

      {/* Result card */}
      {(result || loading) && (
        <div className="paper-card rounded-2xl p-6 mb-4">
          {loading && !result ? (
            <div className="py-2">
              <div className="flex items-center gap-3 text-gray-500 mb-3">
                <svg className="animate-spin h-4 w-4 shrink-0" style={{ color: 'var(--forest)' }} viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                <span className="text-sm italic transition-all">{LOADING_MESSAGES[loadingMsg]}</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-1">
                <div
                  className="h-1 rounded-full"
                  style={{
                    background: 'var(--forest)',
                    width: `${25 + loadingMsg * 25}%`,
                    transition: 'width 1.8s ease-in-out',
                  }}
                />
              </div>
            </div>
          ) : (
            <>
              <p className={`prompt-text mb-5 ${loading ? 'cursor-blink' : ''}`}>
                {result}
              </p>
              {!loading && (
                <div className="flex items-center gap-3 flex-wrap">
                  <button onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-all"
                    style={{ borderColor: 'var(--sage)', color: 'var(--forest)' }}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button
                    onClick={handleOpenWrite}
                    className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all"
                    style={{ background: 'var(--forest)', color: '#fff' }}
                  >
                    ✍️ Write your response
                  </button>
                  <span className="text-xs text-gray-400 ml-auto">
                    Saved to history
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Writing panel */}
      {writingId && (
        <div className="bg-white rounded-2xl border border-green-100 p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Your response</p>
            <button onClick={() => setWritingId(null)}
              className="text-xs text-gray-400 hover:text-gray-600">
              close
            </button>
          </div>
          <p className="text-xs text-gray-400 italic mb-3 leading-relaxed line-clamp-2">
            {history.find(h => h.id === writingId)?.prompt}
          </p>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Start writing here... no pressure, no judgment."
            className="w-full h-40 text-sm text-gray-700 leading-relaxed resize-none outline-none p-3 rounded-lg"
            style={{ border: '1px solid #D1FAE5', fontFamily: 'var(--font-lora), Georgia, serif' }}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-gray-400">
              Saved locally on your device
            </span>
            <button onClick={handleSaveNote}
              className="text-sm font-semibold px-5 py-2 rounded-full transition-all"
              style={{ background: 'var(--forest)', color: '#fff' }}>
              {noteSaved ? '✓ Saved!' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl p-4 mb-4"
          style={{ background: 'var(--amber-light)', border: '1px solid var(--amber-warm)' }}>
          <p className="text-sm text-gray-700 mb-2">{error.message}</p>
          {error.upgradeUrl && (
            <Link href={error.upgradeUrl}
              className="text-sm font-semibold underline"
              style={{ color: 'var(--forest)' }}>
              Upgrade to Pro
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
