// app/media/blog/page.tsx
'use client'

import { BlogCard } from '../../../components/blog-card';
import { useBlogPosts } from '../../../hooks/useApi';
import { Loader2 } from 'lucide-react';

export default function BlogPage() {
  const { data: blogPostsData, isLoading: loading, error } = useBlogPosts();

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Blog</h2>
            <p className="section-subtitle mx-auto">
              Discover insights, news, and updates from our team.
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading blog posts...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="section-title">Our Blog</h2>
            <p className="section-subtitle mx-auto">
              Discover insights, news, and updates from our team.
            </p>
          </div>
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load blog posts</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const posts = blogPostsData?.data || [];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title">Our Blog</h2>
          <p className="section-subtitle mx-auto">
            Discover insights, news, and updates from our team.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="card-hover">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
