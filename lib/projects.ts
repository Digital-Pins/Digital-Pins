import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'

export type ProjectMeta = {
  slug: string
  title: string
  summary?: string
  status?: string
  tags?: string[]
  lastUpdated?: string
  links?: { label: string; url: string }[]
}

export type Project = ProjectMeta & { html: string }

const PROJECTS_DIR = path.join(process.cwd(), 'projects-defination')

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return []
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getAllProjectsMeta(): ProjectMeta[] {
  const slugs = getAllProjectSlugs()
  const metas: ProjectMeta[] = slugs.map((slug) => {
    const full = path.join(PROJECTS_DIR, `${slug}.md`)
    const raw = fs.readFileSync(full, 'utf8')
    const { data } = matter(raw)
    const lastUpdated = ((): string => {
      const v = (data as any).lastUpdated
      if (!v) return ''
      if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
      if (typeof v === 'string') return v
      return ''
    })()
    return {
      slug,
      title: data.title ?? slug,
      summary: data.summary ?? '',
      status: data.status ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      lastUpdated,
      links: Array.isArray(data.links) ? data.links : [],
    }
  })
  // sort by updated desc then title
  return metas.sort((a, b) => (b.lastUpdated || '').localeCompare(a.lastUpdated || '') || a.title.localeCompare(b.title))
}

export async function getProject(slug: string): Promise<Project | null> {
  const full = path.join(PROJECTS_DIR, `${slug}.md`)
  if (!fs.existsSync(full)) return null
  const raw = fs.readFileSync(full, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkGfm).use(html, { sanitize: false }).process(content)
  const lastUpdated = ((): string => {
    const v = (data as any).lastUpdated
    if (!v) return ''
    if (v instanceof Date && !isNaN(v.getTime())) return v.toISOString().slice(0, 10)
    if (typeof v === 'string') return v
    return ''
  })()
  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? '',
    status: data.status ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    lastUpdated,
    links: Array.isArray(data.links) ? data.links : [],
    html: processed.toString(),
  }
}
