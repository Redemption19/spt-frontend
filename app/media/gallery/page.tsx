"use client";

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useGalleryImages, useGalleryCategories } from '@/hooks/useApi';
import { getOptimizedImageProps, handleImageError, generatePlaceholder } from '@/lib/utils/image-optimization';

// export const metadata: Metadata = {
//   title: 'Gallery | Standard Pensions Trust',
//   description: 'View our image gallery showcasing events, facilities, and moments at Standard Pensions Trust.',
// };

export default function GalleryPage() {
  // Real API integration
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: imagesData, isLoading: imagesLoading, error: imagesError } = useGalleryImages({
    category: selectedCategory || undefined,
    page: currentPage,
  });
  
  const { data: categoriesData, isLoading: categoriesLoading } = useGalleryCategories();

  const [open, setOpen] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState('');
  const [selectedImageAlt, setSelectedImageAlt] = useState('');

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImageSrc(src);
    setSelectedImageAlt(alt);
    setOpen(true);
  };

  const handleCategoryFilter = (categorySlug: string) => {
    setSelectedCategory(categorySlug === selectedCategory ? '' : categorySlug);
    setCurrentPage(1); // Reset to first page when changing category
  };

  if (imagesLoading && !imagesData) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Our Gallery</h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Explore moments from our events, a glimpse into our offices, and the people who make Standard Pensions Trust a leading financial institution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden rounded-lg">
                  <Skeleton className="h-60 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (imagesError) {
    return (
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Gallery Unavailable</h1>
            <p className="text-muted-foreground">Unable to load gallery images. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const images = imagesData?.data || [];
  const categories = categoriesData?.data || [];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-16 text-center bg-card rounded-lg p-8 sm:p-10 md:p-12 border border-border/40">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">Our Gallery</h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Explore moments from our events, a glimpse into our offices, and the people who make Standard Pensions Trust a leading financial institution.
            </p>
          </section>

          {/* Category Filter */}
          {categories.length > 0 && (
            <section className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === '' ? 'default' : 'outline'}
                  onClick={() => handleCategoryFilter('')}
                  className="mb-2"
                >
                  All Categories
                </Button>
                {categories.map((category: any) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.slug ? 'default' : 'outline'}
                    onClick={() => handleCategoryFilter(category.slug)}
                    className="mb-2"
                  >
                    {category.name} ({category.images_count || 0})
                  </Button>
                ))}
              </div>
            </section>
          )}

          {/* Image Gallery Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
              {selectedCategory 
                ? categories.find((cat: any) => cat.slug === selectedCategory)?.name || 'Category' 
                : 'Visual Showcase'
              }
            </h2>
            
            {images.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No images found in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image: any) => (
                  <Card key={image.id} className="overflow-hidden rounded-lg group border border-border/50 shadow-sm">
                    <div className="relative h-60 w-full cursor-pointer" onClick={() => handleImageClick(
                      `http://127.0.0.1:8000/storage/${image.image_path}`,
                      image.alt_text || image.title
                    )}>
                      <Image
                        {...getOptimizedImageProps(
                          `http://127.0.0.1:8000/storage/${image.image_path}`,
                          image.alt_text || image.title,
                          'gallery',
                          {
                            loading: 'lazy',
                            priority: false,
                            placeholder: 'blur'
                          }
                        )}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={handleImageError}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-lg font-semibold">{image.category?.name || 'Gallery'}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-foreground font-medium text-lg mb-1">{image.title}</h3>
                      {image.description && (
                        <p className="text-muted-foreground text-sm">{image.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                </div>
                
                {/* Pagination Controls */}
                {imagesData && imagesData.last_page > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1 || imagesLoading}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {currentPage} of {imagesData.last_page}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.min(imagesData.last_page, prev + 1))}
                      disabled={currentPage === imagesData.last_page || imagesLoading}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background/90">
              <div className="relative w-full h-[80vh]">
                <Image 
                  src={selectedImageSrc} 
                  alt={selectedImageAlt} 
                  fill 
                  className="object-contain" 
                  quality={85}
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  onError={handleImageError}
                  placeholder="blur"
                  blurDataURL={generatePlaceholder(800, 600)}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}