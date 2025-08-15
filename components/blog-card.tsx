"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const fallbackImage = 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  // Use the actual API response structure
  const imageUrl = post.featured_image_url || fallbackImage;
  const imageAlt = post.title || 'Blog post image';

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group">
      <Link href={`/media/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <span className="text-gray-400 text-xs sm:text-sm">Loading...</span>
            </div>
          )}
          <Image
            src={imageError ? fallbackImage : imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            priority={false}
          />
        </div>
      </Link>
      <CardHeader className="flex-grow p-4 sm:p-6">
        <div className="mb-2 sm:mb-3">
          <Link href={`/media/blog/category/${post.category?.slug || 'uncategorized'}`}>
            <Badge variant="outline" className="text-primary hover:bg-primary/10 transition-colors text-xs">
              {post.category?.name || 'Uncategorized'}
            </Badge>
          </Link>
        </div>        
        <Link href={`/media/blog/${post.slug}`} className="block">
          <CardTitle className="text-lg sm:text-xl font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardHeader>
      <CardContent className="text-xs text-muted-foreground px-4 sm:px-6 pb-2">
        <div className="flex items-center space-x-2 mb-1">
          <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs">
            {post.published_at ? formatDate(post.published_at) : 'Date not available'}
          </span>
        </div>
        {post.reading_time_minutes && (
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs">{post.reading_time_minutes} min read</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
        <Button asChild variant="ghost" size="sm" className="group/button w-full justify-start p-0 text-white hover:text-white/90 text-xs sm:text-sm">
          <Link href={`/media/blog/${post.slug}`} className="flex items-center">
            Read More
            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/button:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
