import fs from 'fs'
import path from 'path'

const DIST_DIR = path.resolve(process.env.DIST_DIR || 'dist')
const CONFIG_PATH = path.resolve(process.env.CONFIG_PATH || 'public/config.json')
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found at ${CONFIG_PATH}`)
    process.exit(1)
  }
  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
  } catch (err) {
    console.error(`Failed to parse config at ${CONFIG_PATH}:`, err)
    process.exit(1)
  }
  const strapiUrl = parsed?.basic?.strapi_url || parsed?.apiEndpoints?.strapi_url || null
  const siteSlug = parsed?.basic?.strapi_site_slug || parsed?.apiEndpoints?.strapi_site_slug || null
  if (!strapiUrl || !siteSlug) {
    console.error('Missing strapi_url or strapi_site_slug in config')
    process.exit(1)
  }
  return { strapiUrl: String(strapiUrl), siteSlug: String(siteSlug) }
}

async function fetchBlogSlugs(strapiUrl, siteSlug) {
  const headers = STRAPI_API_TOKEN
    ? { Accept: 'application/json', Authorization: `Bearer ${STRAPI_API_TOKEN}` }
    : { Accept: 'application/json' }
  const base = `${strapiUrl.replace(/\/$/, '')}/api/blog-posts`
  const slugs = new Set()
  let page = 1
  const pageSize = 100

  while (true) {
    const params = new URLSearchParams()
    params.set('populate', '*')
    params.set('fields[0]', 'slug')
    params.set('filters[site][slug][$eq]', siteSlug)
    params.set('pagination[page]', String(page))
    params.set('pagination[pageSize]', String(pageSize))
    const url = `${base}?${params.toString()}`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`Strapi request failed (${res.status} ${res.statusText}) while fetching ${url}`)
    }
    const json = await res.json()
    const data = json?.data || []
    data.forEach((item) => {
      const slug = item?.slug || item?.attributes?.slug
      if (slug) slugs.add(String(slug))
    })
    const pagination = json?.meta?.pagination
    if (!pagination || page >= pagination.pageCount) break
    page++
  }

  return Array.from(slugs)
}

function readIndexHtml() {
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error(`dist index not found at ${indexPath}`)
    process.exit(1)
  }
  return fs.readFileSync(indexPath, 'utf-8')
}

function writeFallbacks(slugs, html) {
  const blogDir = path.join(DIST_DIR, 'blog')
  fs.mkdirSync(blogDir, { recursive: true })
  fs.writeFileSync(path.join(blogDir, 'index.html'), html)

  slugs.forEach((slug) => {
    const dir = path.join(blogDir, slug)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
  })
}

async function main() {
  const { strapiUrl, siteSlug } = readConfig()
  const html = readIndexHtml()
  const slugs = await fetchBlogSlugs(strapiUrl, siteSlug)
  writeFallbacks(slugs, html)
  console.log(
    `Created blog fallbacks for ${slugs.length} posts (plus /blog) using ${CONFIG_PATH} into ${DIST_DIR}`
  )
}

main().catch((err) => {
  console.error('Failed to generate blog fallbacks:', err)
  process.exit(1)
})
