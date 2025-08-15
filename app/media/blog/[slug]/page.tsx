'use client'

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, Clock, Loader2 } from 'lucide-react';
import { ShareButtons } from '../../../../components/share-buttons';
import { useBlogPost, useBlogPosts } from '../../../../hooks/useApi';
import NewsletterSignup from '../../../../components/ui/NewsletterSignup';
import { BlogCard } from '../../../../components/blog-card';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Avatar } from '../../../../components/ui/avatar';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const { data: postData, isLoading: postLoading, error: postError } = useBlogPost(params.slug);
  const { data: allPostsData, isLoading: allPostsLoading } = useBlogPosts();

  if (postLoading) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading blog post...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (postError || !postData?.data) {
    notFound();
  }

  const blogPost = postData.data;
  const relatedPosts = allPostsData?.data
    ?.filter(
      (p) =>
        p.id !== blogPost.id &&
        (p.category?.name === blogPost.category?.name || 
         (p.tags && blogPost.tags && p.tags.some((tag) => blogPost.tags?.some(blogTag => blogTag.name === tag.name))))
    )
    .slice(0, 3) || [];

  const fallbackImage = 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <article>
            {/* Article Header */}
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <div className="mb-4">
                <Link href={`/media/blog/category/${blogPost.category?.slug || 'uncategorized'}`}>
                  <Badge variant="outline" className="text-primary hover:bg-primary/10 transition-colors">
                    {blogPost.category?.name || 'Uncategorized'}
                  </Badge>
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {blogPost.title}
              </h1>
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={blogPost.published_at}>
                    {format(new Date(blogPost.published_at), 'MMMM d, yyyy')}
                  </time>
                </div>
                {blogPost.reading_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{blogPost.reading_time_minutes} min read</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {blogPost.featured_image_url && (
              <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
                <Image
                  src={blogPost.featured_image_url || fallbackImage}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Author Info */}
            {blogPost.author && (
              <Card className="mb-8 p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    {blogPost.author.avatar && (
                      <Image
                        src={blogPost.author.avatar}
                        alt={blogPost.author.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{blogPost.author.name}</p>
                    {blogPost.author.role && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">{blogPost.author.role}</p>
                    )}
                    {blogPost.author.bio && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{blogPost.author.bio}</p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Article Content */}
            <div className="blog-content prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>

            {/* Tags */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className="my-8 flex flex-wrap gap-2">
                {blogPost.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Social Sharing */}
            <ShareButtons title={blogPost.title} url={`${process.env.NEXT_PUBLIC_BASE_URL}/media/blog/${blogPost.slug}`} />

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related Posts</h2>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter Signup Section */}
            <NewsletterSignup className="mt-16" />
          </article>
        </div>
      </div>
    </section>
  );
}
