'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode, useState, useEffect } from 'react'
import { getPerformanceMonitor } from '@/lib/utils/performance-monitor'

// Enhanced cache configuration with different strategies for different data types
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      // Default stale time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Default cache time: 30 minutes
      gcTime: 30 * 60 * 1000,
      // Retry failed requests with exponential backoff
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if (error?.response?.status === 408 || error?.response?.status === 429) {
            return failureCount < 2
          }
          return false
        }
        // Retry up to 3 times for other errors
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus only in production
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      // Refetch on reconnect
      refetchOnReconnect: true,
      // Background refetch interval for critical data
      refetchInterval: false,
      // Network mode for better offline handling
      networkMode: 'online',
    },
    mutations: {
      // Retry failed mutations with backoff
      retry: (failureCount, error: any) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false // Don't retry client errors
        }
        return failureCount < 2
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
      networkMode: 'online',
    },
  },
})

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient)

  // Initialize performance monitoring
  useEffect(() => {
    const monitor = getPerformanceMonitor()
    
    // Track React Query performance
    queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === 'updated' && event.query.state.status === 'success') {
        const queryKey = JSON.stringify(event.query.queryKey)
        monitor.markFeatureUsage(`query-${queryKey}`)
      }
    })
    
    return () => {
      monitor.destroy()
    }
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      {children}

    </QueryClientProvider>
  )
}
