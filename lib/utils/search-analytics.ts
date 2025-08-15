// Search analytics for tracking user search behavior
export interface SearchAnalytics {
  query: string
  timestamp: Date
  resultsCount: number
  selectedResult?: string
  category?: string
  sessionId: string
}

// Local storage key for search analytics
const SEARCH_ANALYTICS_KEY = 'spt_search_analytics'
const MAX_STORED_SEARCHES = 100

// Generate a simple session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem('spt_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('spt_session_id', sessionId)
  }
  return sessionId
}

// Track a search query
export function trackSearch(query: string, resultsCount: number, category?: string): void {
  if (typeof window === 'undefined') return

  const searchData: SearchAnalytics = {
    query: query.toLowerCase().trim(),
    timestamp: new Date(),
    resultsCount,
    category,
    sessionId: getSessionId()
  }

  try {
    const existingData = getStoredAnalytics()
    const updatedData = [searchData, ...existingData].slice(0, MAX_STORED_SEARCHES)
    localStorage.setItem(SEARCH_ANALYTICS_KEY, JSON.stringify(updatedData))
  } catch (error) {
    console.warn('Failed to store search analytics:', error)
  }
}

// Track when a user clicks on a search result
export function trackSearchResultClick(query: string, selectedResult: string): void {
  if (typeof window === 'undefined') return

  try {
    const existingData = getStoredAnalytics()
    const recentSearch = existingData.find(
      item => item.query === query.toLowerCase().trim() && 
      new Date().getTime() - new Date(item.timestamp).getTime() < 60000 // Within last minute
    )
    
    if (recentSearch) {
      recentSearch.selectedResult = selectedResult
      localStorage.setItem(SEARCH_ANALYTICS_KEY, JSON.stringify(existingData))
    }
  } catch (error) {
    console.warn('Failed to update search analytics:', error)
  }
}

// Get stored analytics data
function getStoredAnalytics(): SearchAnalytics[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(SEARCH_ANALYTICS_KEY)
    if (!data) return []
    
    return JSON.parse(data).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }))
  } catch (error) {
    console.warn('Failed to parse search analytics:', error)
    return []
  }
}

// Get popular search terms based on frequency
export function getPopularSearchTerms(limit: number = 10): { query: string; count: number }[] {
  const analytics = getStoredAnalytics()
  const queryCount = new Map<string, number>()

  analytics.forEach(item => {
    if (item.query.length > 2) { // Only count meaningful queries
      const count = queryCount.get(item.query) || 0
      queryCount.set(item.query, count + 1)
    }
  })

  return Array.from(queryCount.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

// Get recent search terms for the current session
export function getRecentSearches(limit: number = 5): string[] {
  const analytics = getStoredAnalytics()
  const sessionId = getSessionId()
  
  const recentSearches = analytics
    .filter(item => item.sessionId === sessionId && item.query.length > 2)
    .map(item => item.query)
    .filter((query, index, array) => array.indexOf(query) === index) // Remove duplicates
    .slice(0, limit)

  return recentSearches
}

// Get search performance metrics
export function getSearchMetrics(): {
  totalSearches: number
  averageResultsPerSearch: number
  mostPopularCategory: string
  searchesWithResults: number
  clickThroughRate: number
} {
  const analytics = getStoredAnalytics()
  
  if (analytics.length === 0) {
    return {
      totalSearches: 0,
      averageResultsPerSearch: 0,
      mostPopularCategory: '',
      searchesWithResults: 0,
      clickThroughRate: 0
    }
  }

  const totalSearches = analytics.length
  const searchesWithResults = analytics.filter(item => item.resultsCount > 0).length
  const searchesWithClicks = analytics.filter(item => item.selectedResult).length
  const totalResults = analytics.reduce((sum, item) => sum + item.resultsCount, 0)
  
  // Find most popular category
  const categoryCount = new Map<string, number>()
  analytics.forEach(item => {
    if (item.category) {
      const count = categoryCount.get(item.category) || 0
      categoryCount.set(item.category, count + 1)
    }
  })
  
  const mostPopularCategory = Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])[0]?.[0] || ''

  return {
    totalSearches,
    averageResultsPerSearch: totalResults / totalSearches,
    mostPopularCategory,
    searchesWithResults,
    clickThroughRate: searchesWithClicks / totalSearches
  }
}

// Clear analytics data (for privacy)
export function clearSearchAnalytics(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(SEARCH_ANALYTICS_KEY)
    sessionStorage.removeItem('spt_session_id')
  } catch (error) {
    console.warn('Failed to clear search analytics:', error)
  }
}

// Get trending search terms (recent popular searches)
export function getTrendingSearches(days: number = 7, limit: number = 5): { query: string; count: number }[] {
  const analytics = getStoredAnalytics()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const recentAnalytics = analytics.filter(item => item.timestamp >= cutoffDate)
  const queryCount = new Map<string, number>()

  recentAnalytics.forEach(item => {
    if (item.query.length > 2) {
      const count = queryCount.get(item.query) || 0
      queryCount.set(item.query, count + 1)
    }
  })

  return Array.from(queryCount.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}
