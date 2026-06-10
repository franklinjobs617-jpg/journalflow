'use client'

import { useState } from 'react'

// 每个主题的专属视觉配置
const THEME_CONFIG: Record<string, {
  bg: string
  accent: string
  textColor: string
  subColor: string
  decoration: string
  emoji: string
  label: string
}> = {
  anxiety: {
    bg: 'linear-gradient(160deg, #E8F5F0 0%, #D4EDE6 50%, #C2E3D8 100%)',
    accent: '#2D6A4F',
    textColor: '#1A3A2E',
    subColor: '#4A8B70',
    decoration: '🌿',
    emoji: '🌊',
    label: 'Anxiety',
  },
  'mental-health': {
    bg: 'linear-gradient(160deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)',
    accent: '#4338CA',
    textColor: '#1E1B4B',
    subColor: '#6366F1',
    decoration: '✦',
    emoji: '🧠',
    label: 'Mental Health',
  },
  gratitude: {
    bg: 'linear-gradient(160deg, #FFF8ED 0%, #FDECD5 50%, #FAD9A8 100%)',
    accent: '#B45309',
    textColor: '#431407',
    subColor: '#D97706',
    decoration: '🌸',
    emoji: '🙏',
    label: 'Gratitude',
  },
  'self-discovery': {
    bg: 'linear-gradient(160deg, #F5F0FF 0%, #EDE9FE 50%, #DDD6FE 100%)',
    accent: '#6D28D9',
    textColor: '#2E1065',
    subColor: '#7C3AED',
    decoration: '✦',
    emoji: '🔍',
    label: 'Self Discovery',
  },
  morning: {
    bg: 'linear-gradient(160deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)',
    accent: '#C2410C',
    textColor: '#431407',
    subColor: '#EA580C',
    decoration: '☀️',
    emoji: '🌅',
    label: 'Morning',
  },
  'shadow-work': {
    bg: 'linear-gradient(160deg, #F1F0F5 0%, #E4E2EE 50%, #CCC8E0 100%)',
    accent: '#4C1D95',
    textColor: '#1C1033',
    subColor: '#6D28D9',
    decoration: '🌑',
    emoji: '🌑',
    label: 'Shadow Work',
  },
  kids: {
    bg: 'linear-gradient(160deg, #F0FFF4 0%, #DCFCE7 50%, #BBF7D0 100%)',
    accent: '#15803D',
    textColor: '#14532D',
    subColor: '#16A34A',
    decoration: '🌈',
    emoji: '🌈',
    label: 'For Kids',
  },
  'self-love': {
    bg: 'linear-gradient(160deg, #FFF0F6 0%, #FCE7F3 50%, #FBCFE8 100%)',
    accent: '#BE185D',
    textColor: '#500724',
    subColor: '#DB2777',
    decoration: '💛',
    emoji: '💛',
    label: 'Self Love',
  },
  'middle-school': {
    bg: 'linear-gradient(160deg, #F0FDFA 0%, #CCFBF1 50%, #99F6E4 100%)',
    accent: '#0F766E',
    textColor: '#134E4A',
    subColor: '#0D9488',
    decoration: '✏️',
    emoji: '📚',
    label: 'Middle School',
  },
  'high-school': {
    bg: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
    accent: '#1D4ED8',
    textColor: '#1E3A5F',
    subColor: '#2563EB',
    decoration: '🎓',
    emoji: '🎓',
    label: 'High School',
  },
  therapy: {
    bg: 'linear-gradient(160deg, #F0FDF4 0%, #DCFCE7 50%, #BBF7D0 100%)',
    accent: '#166534',
    textColor: '#14532D',
    subColor: '#15803D',
    decoration: '🌱',
    emoji: '🌱',
    label: 'Therapy',
  },
  manifestation: {
    bg: 'linear-gradient(160deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)',
    accent: '#92400E',
    textColor: '#451A03',
    subColor: '#B45309',
    decoration: '⭐',
    emoji: '✨',
    label: 'Manifestation',
  },
}

const DEFAULT_THEME = {
  bg: 'linear-gradient(160deg, #F0FAF4 0%, #D8F3DC 50%, #B7E4C7 100%)',
  accent: '#2D6A4F',
  textColor: '#1A3A2E',
  subColor: '#40916C',
  decoration: '🌿',
  emoji: '📝',
  label: 'Journal',
}

interface PromptCardProps {
  prompt: string
  slug: string
  index: number
  totalInSection?: number
}

export default function PromptCard({ prompt, slug, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const theme = THEME_CONFIG[slug] || DEFAULT_THEME

  function handleCopy() {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: theme.bg,
        minHeight: '320px',
        width: '220px',
        flexShrink: 0,
      }}
    >
      {/* 顶部装饰条 */}
      <div
        className="h-1.5 w-full"
        style={{ background: theme.accent }}
      />

      {/* 内容区 */}
      <div className="flex flex-col flex-1 p-5 justify-between">

        {/* 顶部：品牌 + 主题标签 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{theme.emoji}</span>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: theme.subColor }}
            >
              {theme.label}
            </span>
          </div>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: `${theme.accent}18`,
              color: theme.accent,
            }}
          >
            #{index}
          </span>
        </div>

        {/* Prompt 文字 - 核心内容 */}
        <div className="flex-1 flex items-center">
          <blockquote
            className="font-prose leading-relaxed"
            style={{
              color: theme.textColor,
              fontSize: prompt.length > 150 ? '0.78rem' : prompt.length > 100 ? '0.85rem' : '0.92rem',
              lineHeight: '1.65',
            }}
          >
            "{prompt}"
          </blockquote>
        </div>

        {/* 装饰元素 */}
        <div
          className="text-right text-2xl opacity-20 my-3 select-none"
          aria-hidden="true"
        >
          {theme.decoration}
        </div>

        {/* 底部：品牌水印 + 操作按钮 */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p
              className="text-xs font-bold tracking-wide"
              style={{ color: theme.accent }}
            >
              JournalFlow.ai
            </p>
            <p
              className="text-xs opacity-50"
              style={{ color: theme.textColor }}
            >
              Free journal prompts
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs font-medium px-3 py-1.5 rounded-full transition-all"
            style={{
              background: `${theme.accent}15`,
              color: theme.accent,
              border: `1px solid ${theme.accent}30`,
            }}
            aria-label="Copy prompt"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* 底部装饰条 */}
      <div
        className="h-1 w-full opacity-40"
        style={{ background: theme.accent }}
      />
    </div>
  )
}

// 批量展示组件 - 在主题页底部使用
interface PromptCardsGridProps {
  prompts: string[]
  slug: string
  title: string
}

export function PromptCardsGrid({ prompts, slug, title }: PromptCardsGridProps) {
  // 精选5张最有代表性的 prompt（第1、25、50、75、100条）
  const featured = [
    prompts[0],
    prompts[Math.floor(prompts.length * 0.25)],
    prompts[Math.floor(prompts.length * 0.5)],
    prompts[Math.floor(prompts.length * 0.75)],
    prompts[prompts.length - 1],
  ].filter(Boolean)

  return (
    <section className="mt-12 mb-8">
      {/* 区块标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className="font-display text-xl font-bold"
            style={{ color: 'var(--ink)' }}
          >
            Save & Share Your Favorites
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tap to copy · Perfect for Pinterest & Instagram
          </p>
        </div>
        {/* Pinterest 分享引导 */}
        <a
          href={`https://pinterest.com/pin/create/button/?url=https://journalflow.ai/prompts/${slug}&description=${encodeURIComponent(title + ' — JournalFlow.ai')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full text-white transition-opacity hover:opacity-90"
          style={{ background: '#E60023' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
          Save to Pinterest
        </a>
      </div>

      {/* 卡片网格 - 横向滚动（移动端） / 网格（桌面端） */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{scrollbarWidth:"none"}}>
        {featured.map((prompt, i) => (
          <div key={i} className="snap-start">
            <PromptCard
              prompt={prompt}
              slug={slug}
              index={i + 1}
            />
          </div>
        ))}
      </div>

      {/* 底部说明 */}
      <p className="text-xs text-center text-gray-400 mt-4">
        Long-press on mobile to save image · Right-click on desktop to save
      </p>
    </section>
  )
}
