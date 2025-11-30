export const API_URL =
  (typeof window !== 'undefined' && (window as any).APP_CONFIG?.basic?.strapi_url) || 'https://2amcreations.com'
export const SITE_SLUG =
  (typeof window !== 'undefined' && (window as any).APP_CONFIG?.basic?.strapi_site_slug) || 'xmyxyswkj'
const API_BASE = String(API_URL).replace(/\/$/, '')

export function buildUrl(path: string) {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE}${p}`
}

function normalizeImage(media: any): string | null {
  if (!media) return null
  if (media.url) return buildUrl(media.url)
  const url = media?.data?.attributes?.url
  return url ? buildUrl(url) : null
}

function normalizeField(item: any, key: string): any {
  return item?.[key] ?? item?.attributes?.[key] ?? null
}

export type BlogListItem = {
  id: number
  slug: string | null
  title: string | null
  createdAt: string | null
  coverImageUrl: string | null
  excerpt: string | null
}

export type BlogDetail = {
  id: number
  slug: string | null
  title: string | null
  createdAt: string | null
  contentMarkdown: string
  coverImageUrl: string | null
}

export async function fetchBlogPosts(): Promise<BlogListItem[]> {
  const params = new URLSearchParams()
  params.set('populate', 'coverImage')
  params.set('filters[site][slug][$eq]', String(SITE_SLUG))
  params.set('sort', 'createdAt:desc')
  const url = buildUrl(`/api/blog-posts?${params.toString()}`)
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (res.status === 404) return []
  if (!res.ok) throw new Error('Failed to fetch blog posts')
  const json = await res.json()
  const data = json?.data ?? []
  return data.map((item: any) => ({
    id: item.id,
    slug: normalizeField(item, 'slug'),
    title: normalizeField(item, 'title'),
    createdAt: normalizeField(item, 'createdAt'),
    coverImageUrl: normalizeImage(normalizeField(item, 'coverImage')),
    excerpt: normalizeField(item, 'excerpt'),
  }))
}

export async function fetchBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const params = new URLSearchParams()
  params.set('populate', '*')
  params.set('filters[slug][$eq]', String(slug))
  params.set('filters[site][slug][$eq]', String(SITE_SLUG))
  const url = buildUrl(`/api/blog-posts?${params.toString()}`)
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch blog detail')
  const json = await res.json()
  const item = json?.data?.[0]
  if (!item) return null
  return {
    id: item.id,
    slug: normalizeField(item, 'slug'),
    title: normalizeField(item, 'title'),
    createdAt: normalizeField(item, 'publishedAt') || normalizeField(item, 'createdAt'),
    contentMarkdown: normalizeField(item, 'contentMarkdown') || '',
    coverImageUrl: normalizeImage(normalizeField(item, 'coverImage')),
  }
}
