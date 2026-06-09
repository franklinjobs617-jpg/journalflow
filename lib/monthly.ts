import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const MONTHLY_DIR = path.join(process.cwd(), 'content/monthly')

export interface MonthlyMeta {
  title: string
  slug: string
  description: string
  keywords: string[]
  month: string
  promptCount: number
}

export interface MonthlySection {
  heading: string
  prompts: string[]
}

export interface MonthlyPage extends MonthlyMeta {
  sections: MonthlySection[]
}

function parseSections(content: string): MonthlySection[] {
  const lines = content.split('\n')
  const sections: MonthlySection[] = []
  let current: MonthlySection | null = null

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('## ')) {
      if (current) sections.push(current)
      current = { heading: trimmed.slice(3), prompts: [] }
    } else {
      const match = trimmed.match(/^\d+\.\s+(.+)/)
      if (match && current) current.prompts.push(match[1])
    }
  }
  if (current) sections.push(current)
  return sections
}

export async function getMonthlyPage(month: string): Promise<MonthlyPage | null> {
  const filePath = path.join(MONTHLY_DIR, `${month}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return { ...(data as MonthlyMeta), sections: parseSections(content) }
}

export async function getAllMonthSlugs(): Promise<string[]> {
  if (!fs.existsSync(MONTHLY_DIR)) return []
  return fs.readdirSync(MONTHLY_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}
