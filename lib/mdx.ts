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

//
function parsePromptSections(content: string): PromptSection[] {
  const lines = content.split('\n')
  const sections: PromptSection[] = []
  let currentSection: PromptSection | null = null

  for (const line of lines) {
    const trimmed = line.trim()

    //
    if (trimmed.startsWith('## ')) {
      if (currentSection) sections.push(currentSection)
      currentSection = { heading: trimmed.slice(3), prompts: [] }
      continue
    }

    //
    const match = trimmed.match(/^\d+\.\s+(.+)/)
    if (match && currentSection) {
      currentSection.prompts.push(match[1])
    }
  }

  if (currentSection) sections.push(currentSection)
  return sections
}

//
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

//
export async function getAllPromptMeta(): Promise<PromptMeta[]> {
  if (!fs.existsSync(PROMPTS_DIR)) return []

  const files = fs.readdirSync(PROMPTS_DIR).filter((f) => f.endsWith('.md'))

  return files.map((file) => {
    const content = fs.readFileSync(path.join(PROMPTS_DIR, file), 'utf-8')
    const { data } = matter(content)
    return data as PromptMeta
  })
}

//
export async function getRelatedPrompts(slugs: string[]): Promise<PromptMeta[]> {
  const all = await getAllPromptMeta()
  return all.filter((p) => slugs.includes(p.slug))
}
