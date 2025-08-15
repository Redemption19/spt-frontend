// hooks/useBlogPosts.ts
'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/schemas/blog-schema'
import { blogApi } from '@/lib/api/services'
import { transformBackendBlogPosts } from '@/lib/api/transformers'

interface UseBlogPostsReturn {
  posts: BlogPost[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useBlogPosts(): UseBlogPostsReturn {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await blogApi.getPosts()
      const transformedPosts = transformBackendBlogPosts(response.data.data)
      setPosts(transformedPosts)
    } catch (err) {
      console.error('Error fetching blog posts:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch blog posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  }
}
