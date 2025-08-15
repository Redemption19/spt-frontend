import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

// Request deduplication cache
const pendingRequests = new Map<string, Promise<AxiosResponse>>()

// Create request key for deduplication
function createRequestKey(config: AxiosRequestConfig): string {
  const { method, url, params, data } = config
  return `${method?.toUpperCase()}-${url}-${JSON.stringify(params)}-${JSON.stringify(data)}`
}

// Enhanced API client with performance optimizations
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1',
  withCredentials: true,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
  },
  // Enable compression
  decompress: true,
})

// Request interceptor with deduplication and optimization
apiClient.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    if (typeof window !== 'undefined') {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      if (token) {
        config.headers['X-CSRF-TOKEN'] = token
      }
    }

    // Add request timestamp for cache busting if needed
    if (config.method?.toLowerCase() === 'get') {
      config.params = {
        ...config.params,
        _t: Math.floor(Date.now() / 60000), // Cache bust every minute
      }
    }

    // Request deduplication for GET requests
    if (config.method?.toLowerCase() === 'get') {
      const requestKey = createRequestKey(config)
      const pendingRequest = pendingRequests.get(requestKey)
      
      if (pendingRequest) {
        // Return the existing pending request directly
        throw { isDeduped: true, pendingRequest }
      }
    }

    return config
  },
  (error) => {
    // Handle deduped requests
    if (error.isDeduped) {
      return error.pendingRequest
    }
    return Promise.reject(error)
  }
)

// Response interceptor with enhanced error handling and caching
apiClient.interceptors.response.use(
  (response) => {
    // Remove from pending requests cache
    if (response.config.method?.toLowerCase() === 'get') {
      const requestKey = createRequestKey(response.config)
      pendingRequests.delete(requestKey)
    }

    // Add response metadata
    response.headers['x-response-time'] = Date.now().toString()
    
    return response
  },
  (error) => {
    // Remove from pending requests cache on error
    if (error.config?.method?.toLowerCase() === 'get') {
      const requestKey = createRequestKey(error.config)
      pendingRequests.delete(requestKey)
    }

    // Enhanced error handling
    if (error.response?.status === 401) {
      // Handle authentication errors
      if (typeof window !== 'undefined') {
        // Clear any cached data
        localStorage.removeItem('auth-token')
        sessionStorage.clear()
        window.location.href = '/login'
      }
    } else if (error.response?.status === 429) {
      // Rate limiting - add delay before retry
      const retryAfter = error.response.headers['retry-after']
      if (retryAfter) {
        error.retryAfter = parseInt(retryAfter) * 1000
      }
    } else if (error.response?.status >= 500) {
      // Server errors - log for monitoring
      console.error('Server error:', {
        status: error.response.status,
        url: error.config?.url,
        method: error.config?.method,
        timestamp: new Date().toISOString()
      })
    }

    // Network errors
    if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
      error.isNetworkError = true
    }

    return Promise.reject(error)
  }
)

// Add request to pending cache for GET requests
apiClient.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'get') {
    const requestKey = createRequestKey(config)
    
    // Only add to cache if not already pending
    if (!pendingRequests.has(requestKey)) {
      const requestPromise = axios(config)
      pendingRequests.set(requestKey, requestPromise)
      
      // Clean up after request completes
      requestPromise.finally(() => {
        pendingRequests.delete(requestKey)
      })
    }
  }
  
  return config
})

// Utility function to clear request cache
export function clearRequestCache() {
  pendingRequests.clear()
}

// Utility function to get cache status
export function getCacheStatus() {
  return {
    pendingRequests: pendingRequests.size,
    keys: Array.from(pendingRequests.keys())
  }
}

export default apiClient
