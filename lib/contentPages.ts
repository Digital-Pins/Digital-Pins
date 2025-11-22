import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

export type ContentMeta = {
  slug: string
  title: string
  description?: string
  updated?: string
}

export type ContentPage = ContentMeta & { html: string }

const CONTENT_DIR = path.join(process.cwd(), 'content', 'pages')

export function listContentSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export async function getContentPage(slug: string): Promise<ContentPage | null> {
  const full = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(full)) return null
  const raw = fs.readFileSync(full, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)
  const updated = ((): string => {
    const v = (data as any).updated
    if (!v) return ''
    if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
    if (typeof v === 'string') return v
    return ''
  })()
  return {
    slug,
    title: (data as any).title ?? slug,
    description: (data as any).description ?? '',
    updated,
    html: processed.toString(),
  }
}
