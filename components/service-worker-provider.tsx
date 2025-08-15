'use client'

import { useEffect, useState, createContext, useContext, ReactNode } from 'react'
import { 
  registerServiceWorker, 
  setupNetworkListeners, 
  isOnline,
  cacheManager,
  preloadCriticalResources
} from '@/lib/utils/service-worker'
import { useToast } from '@/hooks/use-toast'

interface ServiceWorkerContextType {
  isOnline: boolean
  isInstalled: boolean
  updateAvailable: boolean
  updateApp: () => void
  clearCache: () => Promise<void>
}

const ServiceWorkerContext = createContext<ServiceWorkerContextType | null>(null)

export function useServiceWorker() {
  const context = useContext(ServiceWorkerContext)
  if (!context) {
    throw new Error('useServiceWorker must be used within ServiceWorkerProvider')
  }
  return context
}

interface ServiceWorkerProviderProps {
  children: ReactNode
}

export function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const [isOnlineState, setIsOnlineState] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize online status
    setIsOnlineState(isOnline())

    // Register service worker
    const initServiceWorker = async () => {
      try {
        const reg = await registerServiceWorker()
        if (reg) {
          setRegistration(reg)
          setIsInstalled(true)
          
          // Listen for updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true)
                  toast({
                    title: 'Update Available',
                    description: 'A new version of the app is available. Click to update.',
                    action: (
                      <button 
                        onClick={updateApp}
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
                      >
                        Update
                      </button>
                    ),
                  })
                }
              })
            }
          })
        }
      } catch (error) {
        console.error('Service worker registration failed:', error)
      }
    }

    initServiceWorker()

    // Setup network listeners
    const cleanup = setupNetworkListeners(
      () => {
        setIsOnlineState(true)
        toast({
          title: 'Back Online',
          description: 'Your internet connection has been restored.',
        })
      },
      () => {
        setIsOnlineState(false)
        toast({
          title: 'Offline',
          description: 'You are currently offline. Some features may be limited.',
          variant: 'destructive',
        })
      }
    )

    // Preload critical resources
    preloadCriticalResources([
      '/api/v1/hero-sections',
      '/api/v1/testimonials?featured=true',
      '/api/v1/blog?page=1&per_page=6',
    ])

    return cleanup
  }, [])

  const updateApp = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  const clearCache = async () => {
    try {
      await cacheManager.clear()
      if (registration?.active) {
        registration.active.postMessage({ type: 'CLEAR_CACHE' })
      }
      toast({
        title: 'Cache Cleared',
        description: 'Application cache has been cleared successfully.',
      })
    } catch (error) {
      console.error('Failed to clear cache:', error)
      toast({
        title: 'Error',
        description: 'Failed to clear cache. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const contextValue: ServiceWorkerContextType = {
    isOnline: isOnlineState,
    isInstalled,
    updateAvailable,
    updateApp,
    clearCache,
  }

  return (
    <ServiceWorkerContext.Provider value={contextValue}>
      {children}
      {/* Offline indicator */}
      {!isOnlineState && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium z-50">
          You are currently offline. Some features may be limited.
        </div>
      )}
    </ServiceWorkerContext.Provider>
  )
}

// Hook for checking if app is installable (PWA)
export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setInstallPrompt(null)
      setIsInstallable(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installApp = async () => {
    if (installPrompt) {
      const result = await installPrompt.prompt()
      console.log('Install prompt result:', result)
      setInstallPrompt(null)
      setIsInstallable(false)
    }
  }

  return {
    isInstallable,
    installApp,
  }
}