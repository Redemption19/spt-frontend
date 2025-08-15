// hooks/useBlogPost.ts
'use client'

import { useState, useEffect } from 'react'
import { BlogPost } from '@/lib/schemas/blog-schema'
import { blogApi } from '@/lib/api/services'
import { transformBackendBlogPost } from '@/lib/api/transformers'

interface UseBlogPostReturn {
  post: BlogPost | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useBlogPost(slug: string): UseBlogPostReturn {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await blogApi.getPost(slug)
      const transformedPost = transformBackendBlogPost(response.data.data)
      setPost(transformedPost)
    } catch (err) {
      console.error('Error fetching blog post:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch blog post')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  return {
    post,
    loading,
    error,
    refetch: fetchPost,
  }
}
