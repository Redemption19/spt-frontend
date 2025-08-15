import React from 'react'

// Ensure this file is treated as a module
export {}

// Generate a lightweight static placeholder for images
export function generatePlaceholder(width: number = 400, height: number = 300): string {
  // Always use SVG placeholder to avoid canvas operations that can block the main thread
  return `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="placeholder-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#placeholder-grad)"/>
    </svg>`
  )}`
}

// Generate lightweight static blur data URL for Next.js Image placeholder
export function getImagePlaceholder(width: number = 400, height: number = 300): {
  base64: string
  img: { width: number; height: number }
} {
  // Use a simple, lightweight static placeholder instead of fetching/processing images
  const staticPlaceholder = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>`
  )}`
  
  return {
    base64: staticPlaceholder,
    img: { width, height }
  }
}

// Responsive image sizes for different breakpoints
export const imageSizes = {
  gallery: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  },
  hero: {
    mobile: '100vw',
    tablet: '100vw',
    desktop: '100vw',
    sizes: '100vw'
  },
  leadership: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '50vw',
    sizes: '(max-width: 768px) 100vw, 50vw'
  },
  thumbnail: {
    mobile: '25vw',
    tablet: '20vw',
    desktop: '15vw',
    sizes: '(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw'
  }
}

// Image optimization presets
export const imagePresets = {
  gallery: {
    quality: 85,
    priority: false,
    loading: 'lazy' as const,
    sizes: imageSizes.gallery.sizes
  },
  hero: {
    quality: 90,
    priority: true,
    loading: 'eager' as const,
    sizes: imageSizes.hero.sizes
  },
  leadership: {
    quality: 85,
    priority: false,
    loading: 'lazy' as const,
    sizes: imageSizes.leadership.sizes
  },
  thumbnail: {
    quality: 75,
    priority: false,
    loading: 'lazy' as const,
    sizes: imageSizes.thumbnail.sizes
  }
}

// Utility to get optimized image props
export function getOptimizedImageProps(
  src: string,
  alt: string,
  preset: keyof typeof imagePresets,
  customProps?: Partial<{
    quality: number
    priority: boolean
    loading: 'lazy' | 'eager'
    sizes: string
    placeholder: 'blur' | 'empty'
    blurDataURL: string
  }>
) {
  const presetConfig = imagePresets[preset]
  const priority = customProps?.priority ?? presetConfig.priority
  
  // When priority is true, loading must be 'eager' to avoid conflicts
  const loading = priority ? 'eager' : (customProps?.loading ?? presetConfig.loading)
  
  return {
    src,
    alt,
    quality: customProps?.quality ?? presetConfig.quality,
    priority,
    loading,
    sizes: customProps?.sizes ?? presetConfig.sizes,
    placeholder: customProps?.placeholder ?? 'blur' as const,
    blurDataURL: customProps?.blurDataURL ?? generatePlaceholder(),
    style: {
      objectFit: 'cover' as const,
      objectPosition: 'center' as const
    }
  }
}

// Image error fallback
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget
  if (img.src.includes('pexels.com')) {
    // Already using fallback, don't retry
    return
  }
  
  // Fallback to a placeholder image
  img.src = 'https://images.pexels.com/photos/10173004/pexels-photo-10173004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}

// Preload critical images
export function preloadImage(src: string, priority: boolean = false): void {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = priority ? 'preload' : 'prefetch'
  link.as = 'image'
  link.href = src
  
  // Note: fetchPriority is not supported on HTMLLinkElement
  // Priority is handled through the rel attribute (preload vs prefetch)
  
  document.head.appendChild(link)
}

// Image intersection observer for lazy loading
export function createImageObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  })
}

// Export types to ensure module recognition
export type ImagePreset = keyof typeof imagePresets
export type ImageSizeConfig = typeof imageSizes[keyof typeof imageSizes]
export type OptimizedImageProps = ReturnType<typeof getOptimizedImageProps>

// Default export to ensure module recognition in all TS tooling contexts
export default {
  generatePlaceholder,
  getImagePlaceholder,
  imageSizes,
  imagePresets,
  getOptimizedImageProps,
  handleImageError,
  preloadImage,
  createImageObserver,
}