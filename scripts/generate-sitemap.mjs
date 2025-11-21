import fs from 'fs'
import path from 'path'

const SITE_URL = process.env.SITE_URL
let STRAPI_URL = process.env.strapi_url
let SITE_SLUG = process.env.strapi_site_slug
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

function ensureSiteUrl() {
  if (!SITE_URL) {
    console.error('SITE_URL is required')
    process.exit(1)
  }
}

async function tryFetchJson(url) {
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function resolveConfig() {
  const remoteConfigUrl = `${SITE_URL.replace(/\/$/, '')}/config.json`
  const remoteCfg = await tryFetchJson(remoteConfigUrl)
  if (remoteCfg?.basic) {
    STRAPI_URL = STRAPI_URL || remoteCfg.basic.strapi_url || null
    SITE_SLUG = SITE_SLUG || remoteCfg.basic.strapi_site_slug || null
  }
  if (!STRAPI_URL || !SITE_SLUG) {
    try {
      const raw = fs.readFileSync(path.resolve('public/config.json'), 'utf-8')
      const localCfg = JSON.parse(raw)
      STRAPI_URL = STRAPI_URL || localCfg?.basic?.strapi_url || null
      SITE_SLUG = SITE_SLUG || localCfg?.basic?.strapi_site_slug || null
    } catch {
      // ignore
    }
  }
  if (!STRAPI_URL || !SITE_SLUG) {
    console.error('Missing strapi_url or strapi_site_slug')
    process.exit(1)
  }
}

async function fetchAllPosts() {
  const base = `${String(STRAPI_URL).replace(/\/$/, '')}/api/blog-posts`
  const pageSize = 100
  let page = 1
  const items = []
  while (true) {
    const params = new URLSearchParams()
    params.set('populate', '*')
    params.set('filters[site][slug][$eq]', SITE_SLUG)
    params.set('pagination[page]', String(page))
    params.set('pagination[pageSize]', String(pageSize))
    const url = `${base}?${params.toString()}`
    const headers = STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}
    const res = await fetch(url, { headers })
    if (!res.ok) throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`)
    const json = await res.json()
    const data = json?.data ?? []
    for (const item of data) {
      const slug = item?.slug ?? item?.attributes?.slug
      const lastmod = item?.publishedAt ?? item?.attributes?.publishedAt ?? item?.attributes?.createdAt ?? null
      if (slug) items.push({ slug, lastmod })
    }
    const pagination = json?.meta?.pagination
    if (!pagination || page >= pagination.pageCount) break
    page++
  }
  return items
}

function toAbsolute(pathname) {
  const base = SITE_URL.replace(/\/$/, '')
  if (!pathname) return base
  return `${base}${pathname.startsWith('/') ? '' : '/'}${pathname}`
}

function generateSitemapXml(entries) {
  const urlsXml = entries
    .map((e) => {
      const lastmod = e.lastmod ? `<lastmod>${String(e.lastmod).slice(0, 10)}</lastmod>` : ''
      return `<url><loc>${e.loc}</loc>${lastmod}</url>`
    })
    .join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}</urlset>`
}

function generateRobotsTxt() {
  const base = SITE_URL.replace(/\/$/, '')
  return `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`
}

async function main() {
  ensureSiteUrl()
  await resolveConfig()
  const entries = [
    { loc: toAbsolute('/'), lastmod: new Date().toISOString() },
    { loc: toAbsolute('/blog'), lastmod: new Date().toISOString() },
  ]
  const posts = await fetchAllPosts()
  for (const p of posts) {
    entries.push({ loc: toAbsolute(`/blog/${encodeURIComponent(p.slug)}`), lastmod: p.lastmod || null })
  }
  const distDir = path.resolve('dist')
  fs.mkdirSync(distDir, { recursive: true })
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), generateSitemapXml(entries))
  fs.writeFileSync(path.join(distDir, 'robots.txt'), generateRobotsTxt())
  console.log(`Generated ${entries.length} URLs into dist/sitemap.xml and dist/robots.txt for ${SITE_URL}`)
}

main().catch((err) => {
  console.error('Failed to generate sitemap:', err)
  process.exit(1)
})