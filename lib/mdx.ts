import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROMPTS_DIR = path.join(process.cwd(), 'content/prompts')

export interface PromptMeta {
  title: string
  slug: string
  description: string
  keywords: string[]
  category: string
  promptCount: number
  relatedSlugs: string[]
  therapistNote?: string
  printable?: boolean
}

export interface PromptSection {
  heading: string
  prompts: string[]
}

export interface PromptPage extends PromptMeta {
  sections: PromptSection[]
}

// 解析 Markdown 内容为结构化 sections
function parsePromptSections(content: string): PromptSection[] {
  const lines = content.split('\n')
  const sections: PromptSection[] = []
  let currentSection: PromptSection | null = null

  for (const line of lines) {
    const trimmed = line.trim()

    // H2 标题 = 新 section
    if (trimmed.startsWith('## ')) {
      if (currentSection) sections.push(currentSection)
      currentSection = { heading: trimmed.slice(3), prompts: [] }
      continue
    }

    // 数字列表项 = prompt
    const match = trimmed.match(/^\d+\.\s+(.+)/)
    if (match && currentSection) {
      currentSection.prompts.push(match[1])
    }
  }

  if (currentSection) sections.push(currentSection)
  return sections
}

// 获取单个主题页
export async function getPromptPage(slug: string): Promise<PromptPage | null> {
  const filePath = path.join(PROMPTS_DIR, `${slug}.md`)

  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    ...(data as PromptMeta),
    sections: parsePromptSections(content),
  }
}

// 获取所有主题的 meta（用于列表页和 sitemap）
export async function getAllPromptMeta(): Promise<PromptMeta[]> {
  if (!fs.existsSync(PROMPTS_DIR)) return []

  const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith('.md'))

  return files.map((file) => {
    const content = fs.readFileSync(path.join(PROMPTS_DIR, file), 'utf-8')
    const { data } = matter(content)
    return data as PromptMeta
  })
}

// 获取相关主题
export async function getRelatedPrompts(slugs: string[]): Promise<PromptMeta[]> {
  const all = await getAllPromptMeta()
  return all.filter((p) => slugs.includes(p.slug))
}
