// Service Worker registration and management utilities

// Register service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported')
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })

    console.log('Service Worker registered successfully:', registration)

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, notify user
            notifyUserOfUpdate(registration)
          }
        })
      }
    })

    return registration
  } catch (error) {
    console.error('Service Worker registration failed:', error)
    return null
  }
}

// Unregister service worker
export async function unregisterServiceWorker(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      const result = await registration.unregister()
      console.log('Service Worker unregistered:', result)
      return result
    }
    return false
  } catch (error) {
    console.error('Service Worker unregistration failed:', error)
    return false
  }
}

// Update service worker
export function updateServiceWorker(registration: ServiceWorkerRegistration): void {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }
}

// Clear all caches
export async function clearServiceWorkerCaches(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration && registration.active) {
      registration.active.postMessage({ type: 'CLEAR_CACHE' })
    }
  } catch (error) {
    console.error('Failed to clear service worker caches:', error)
  }
}

// Check if app is running in standalone mode (PWA)
export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

// Check online status
export function isOnline(): boolean {
  if (typeof window === 'undefined') return true
  return navigator.onLine
}

// Listen for online/offline events
export function setupNetworkListeners(
  onOnline?: () => void,
  onOffline?: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleOnline = () => {
    console.log('App is online')
    onOnline?.()
  }

  const handleOffline = () => {
    console.log('App is offline')
    onOffline?.()
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

// Notify user of app update
function notifyUserOfUpdate(registration: ServiceWorkerRegistration): void {
  // You can integrate this with your toast/notification system
  if (typeof window !== 'undefined') {
    const shouldUpdate = window.confirm(
      'A new version of the app is available. Would you like to update?'
    )
    
    if (shouldUpdate) {
      updateServiceWorker(registration)
      window.location.reload()
    }
  }
}

// Preload critical resources
export function preloadCriticalResources(urls: string[]): void {
  if (typeof window === 'undefined') return

  urls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    document.head.appendChild(link)
  })
}

// Cache management utilities
export class CacheManager {
  private static instance: CacheManager
  private cachePrefix = 'spt-app-'

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  // Store data in cache
  async set(key: string, data: any, ttl?: number): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl: ttl || 0
      }
      
      localStorage.setItem(this.cachePrefix + key, JSON.stringify(item))
    } catch (error) {
      console.error('Cache set failed:', error)
    }
  }

  // Get data from cache
  async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null

    try {
      const item = localStorage.getItem(this.cachePrefix + key)
      if (!item) return null

      const parsed = JSON.parse(item)
      
      // Check if item has expired
      if (parsed.ttl > 0 && Date.now() - parsed.timestamp > parsed.ttl) {
        this.delete(key)
        return null
      }

      return parsed.data
    } catch (error) {
      console.error('Cache get failed:', error)
      return null
    }
  }

  // Delete item from cache
  async delete(key: string): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(this.cachePrefix + key)
    } catch (error) {
      console.error('Cache delete failed:', error)
    }
  }

  // Clear all cache items
  async clear(): Promise<void> {
    if (typeof window === 'undefined') return

    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.cachePrefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Cache clear failed:', error)
    }
  }

  // Get cache size
  getSize(): number {
    if (typeof window === 'undefined') return 0

    let size = 0
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(this.cachePrefix)) {
        size += localStorage.getItem(key)?.length || 0
      }
    })
    return size
  }
}

// Export singleton instance
export const cacheManager = CacheManager.getInstance()