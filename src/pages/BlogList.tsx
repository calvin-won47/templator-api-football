import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBlogPosts, type BlogListItem } from '../lib/strapi'
import { useConfig } from '../contexts/ConfigContext'

const formatDate = (value: string | null) => {
  if (!value) return ''
  const iso = String(value)
  const datePart = iso.includes('T') ? iso.split('T')[0] : iso.slice(0, 10)
  return datePart
}

const BlogList = () => {
  const config = useConfig()
  const [posts, setPosts] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchBlogPosts()
      .then((data) => {
        if (mounted) setPosts(data)
      })
      .catch((e: any) => {
        if (mounted) setError(e?.message || (config?.extra?.texts?.errorLoadingPosts || 'Error loading posts'))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  const title = config?.extra?.blogList?.title || 'Blog'
  return (
    <main className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold mb-6 text-white">{title}</h1>

      {loading && <p className="text-gray-300">{config?.extra?.texts?.loading || 'Loading...'}</p>}
      {!!error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="border border-gray-700 rounded-lg p-4 bg-api-dark-secondary shadow-sm">
              {post.coverImageUrl && (
                <img
                  src={post.coverImageUrl}
                  alt={post.title ?? 'Cover'}
                  className="w-full h-auto rounded mb-3"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              )}
              <h2 className="text-xl font-semibold mb-1 text-white">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <small className="text-gray-400">{formatDate(post.createdAt)}</small>
              {post.excerpt && <p className="mt-2 text-sm text-gray-400">{post.excerpt}</p>}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default BlogList
