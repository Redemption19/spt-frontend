// lib/api/transformers.ts
import { BlogPost as FrontendBlogPost } from '@/lib/schemas/blog-schema'
import { BlogPost as BackendBlogPost } from '@/lib/types/api'
import { processHtmlContent } from '@/lib/utils/content'

export function transformBackendBlogPost(backendPost: BackendBlogPost): FrontendBlogPost {
  // Helper function to get the proper image URL
  const getImageUrl = (imagePath?: string, imageUrl?: string): string => {
    // If we have a pre-computed URL, use it
    if (imageUrl && imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If we have a relative path, convert to full URL
    if (imagePath) {
      // Remove leading slash if present
      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      return `http://127.0.0.1:8000/storage/${cleanPath}`;
    }
    
    // Fallback to placeholder
    return 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  };

  return {
    id: backendPost.id.toString(), // Convert number to string for frontend
    slug: backendPost.slug,
    title: backendPost.title,
    content: processHtmlContent(backendPost.content || backendPost.excerpt || ''), // Process HTML content
    excerpt: backendPost.excerpt || '',
    featuredImage: {
      url: getImageUrl(backendPost.featured_image, backendPost.featured_image_url),
      alt: `Featured image for ${backendPost.title}`,
      width: 1260,
      height: 750,
    },
    category: backendPost.category?.name || 'General',
    tags: backendPost.tags?.map(tag => tag.name) || [],
    author: {
      name: backendPost.author?.name || 'Standard Pensions Team',
      avatar: backendPost.author?.avatar || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      role: backendPost.author?.role || 'Content Team',
      bio: backendPost.author?.bio || 'Providing insights and updates on pension schemes and financial planning.',
      twitter: backendPost.author?.twitter,
      linkedin: backendPost.author?.linkedin,
    },
    publishedAt: new Date(backendPost.published_at),
    updatedAt: backendPost.updated_at ? new Date(backendPost.updated_at) : undefined,
    status: backendPost.status === 'published' ? 'published' : 'draft',
    seo: {
      metaTitle: backendPost.meta_title,
      metaDescription: backendPost.meta_description,
      keywords: backendPost.keywords ? backendPost.keywords.split(',').map(k => k.trim()) : [],
    },
    readingTimeMinutes: backendPost.reading_time_minutes || 5,
    allowComments: true,
    views: backendPost.views || 0,
  }
}

export function transformBackendBlogPosts(backendPosts: BackendBlogPost[]): FrontendBlogPost[] {
  return backendPosts.map(transformBackendBlogPost)
}
