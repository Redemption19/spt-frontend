'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Search, X, FileText, Building, Users, Calculator, MessageCircle, HelpCircle, ChevronRight, BookOpen, Download, Calendar, Briefcase, Phone, Star, TrendingUp, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { searchComprehensive, getSearchSuggestions, popularSearchTerms, type EnhancedSearchResult } from '@/lib/utils/comprehensive-search'
import { trackSearch, trackSearchResultClick, getRecentSearches, getTrendingSearches } from '@/lib/utils/search-analytics'

// Enhanced search result interface for display
interface SearchResult extends EnhancedSearchResult {
  icon: React.ReactNode
}

// Icon mapping for categories
const getCategoryIcon = (category: string, subcategory?: string): React.ReactNode => {
  switch (category) {
    case 'scheme':
      return <Building className="h-4 w-4" />
    case 'service':
      return <Users className="h-4 w-4" />
    case 'calculator':
      return <Calculator className="h-4 w-4" />
    case 'faq':
      return <HelpCircle className="h-4 w-4" />
    case 'form':
      return <FileText className="h-4 w-4" />
    case 'blog':
      return <BookOpen className="h-4 w-4" />
    case 'leadership':
      return <Users className="h-4 w-4" />
    case 'about':
      return <Building className="h-4 w-4" />
    case 'contact':
      return <Phone className="h-4 w-4" />
    case 'event':
      return <Calendar className="h-4 w-4" />
    case 'download':
      return <Download className="h-4 w-4" />
    case 'career':
      return <Briefcase className="h-4 w-4" />
    case 'page':
      return subcategory === 'tax' ? <TrendingUp className="h-4 w-4" /> : <FileText className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

const categoryColors = {
  faq: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  scheme: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  service: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  page: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  calculator: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  form: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  blog: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  leadership: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  about: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
  contact: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  event: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300',
  download: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  career: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
}

const categoryLabels = {
  faq: 'FAQ',
  scheme: 'Scheme',
  service: 'Service',
  page: 'Page',
  calculator: 'Tool',
  form: 'Form',
  blog: 'Blog',
  leadership: 'Leadership',
  about: 'About',
  contact: 'Contact',
  event: 'Event',
  download: 'Download',
  career: 'Career'
}

interface GlobalSearchProps {
  trigger?: React.ReactNode
}

export function GlobalSearch({ trigger }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches, setTrendingSearches] = useState<{ query: string; count: number }[]>([])

  // Enhanced search with comprehensive data
  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    setIsLoading(true)
    const results = searchComprehensive(searchQuery, {
      limit: 12,
      includeContent: true,
      fuzzyMatch: true
    }).map(result => ({
      ...result,
      icon: getCategoryIcon(result.category, result.subcategory)
    }))
    
    // Track the search
    trackSearch(searchQuery, results.length, results[0]?.category)
    
    setIsLoading(false)
    return results
  }, [searchQuery])

  // Get search suggestions and analytics data
  useEffect(() => {
    if (searchQuery.length > 2) {
      const suggestions = getSearchSuggestions(searchQuery, 5)
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  // Load recent and trending searches when dialog opens
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(getRecentSearches(3))
      setTrendingSearches(getTrendingSearches(7, 3))
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, filteredResults.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (filteredResults[selectedIndex]) {
            trackSearchResultClick(searchQuery, filteredResults[selectedIndex].title)
            window.location.href = filteredResults[selectedIndex].url
            setIsOpen(false)
          }
          break
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredResults, selectedIndex])

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [searchQuery])

  // Handle dialog state changes
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setSearchQuery('')
      setSelectedIndex(0)
      setSearchSuggestions([])
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-0.5 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
  }

  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[650px] h-[85vh] max-h-[700px] p-0 overflow-hidden flex flex-col rounded-lg">
        <div className="flex items-center border-b px-3 sm:px-4 py-2">
          <Search className="h-4 w-4 shrink-0 opacity-50" />
          <Input
            className="flex h-10 sm:h-12 w-full rounded-md bg-transparent py-2 sm:py-3 px-2 sm:px-3 text-sm outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search everything: schemes, services, forms, FAQs, contact info..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {isLoading && (
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full ml-2" />
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto rounded-b-xl bg-background">
          {/* Search Suggestions */}
          {searchQuery && searchSuggestions.length > 0 && filteredResults.length === 0 && (
            <div className="p-3 border-b">
              <div className="text-xs font-medium text-muted-foreground mb-2">Suggestions</div>
              <div className="flex flex-wrap gap-1">
                {searchSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchQuery && filteredResults.length === 0 && !isLoading && (
            <div className="p-4 sm:p-8 text-center">
              <Search className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground/50" />
              <h3 className="mt-2 sm:mt-4 text-base sm:text-lg font-semibold">No results found</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground px-2">
                Try searching for pension schemes, services, forms, or contact information
              </p>
              {searchSuggestions.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Did you mean:</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {searchSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="link"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Search Results */}
          {searchQuery && filteredResults.length > 0 && (
            <div className="p-2">
              <div className="mb-2 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Star className="h-3 w-3" />
                Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
              </div>
              {filteredResults.map((result, index) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={() => {
                    trackSearchResultClick(searchQuery, result.title)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex items-start gap-2 sm:gap-3 rounded-lg p-2 sm:p-3 transition-colors hover:bg-muted active:bg-muted",
                    index === selectedIndex && "bg-muted"
                  )}
                >
                  <div className="mt-0.5 shrink-0">
                    {result.icon}
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
                      <div className="font-medium text-xs sm:text-sm leading-tight">
                        {highlightText(result.title, searchQuery)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge className={cn("text-xs shrink-0", categoryColors[result.category as keyof typeof categoryColors])}>
                          {categoryLabels[result.category as keyof typeof categoryLabels]}
                        </Badge>
                        {result.priority >= 4 && (
                          <Badge variant="secondary" className="text-[10px] px-1">
                            <Star className="h-2 w-2 mr-0.5" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {highlightText(result.description, searchQuery)}
                    </p>
                    {result.subcategory && (
                      <div className="text-[10px] text-muted-foreground">
                        {result.subcategory}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground mt-1 hidden sm:block" />
                </Link>
              ))}
            </div>
          )}
          
          {/* Default State - Popular Searches */}
          {!searchQuery && (
            <div className="p-3 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 sm:mb-3 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Popular searches
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {popularSearchTerms.slice(0, 6).map((term) => (
                      <Button
                        key={term}
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 text-xs w-full"
                        onClick={() => handlePopularSearchClick(term)}
                      >
                        <TrendingUp className="h-3 w-3 mr-2" />
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Recent and Trending Searches */}
                {(recentSearches.length > 0 || trendingSearches.length > 0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Recent
                        </h5>
                        <div className="space-y-1">
                          {recentSearches.map((term) => (
                            <Button
                              key={term}
                              variant="ghost"
                              size="sm"
                              className="justify-start h-7 text-xs w-full"
                              onClick={() => handlePopularSearchClick(term)}
                            >
                              {term}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {trendingSearches.length > 0 && (
                      <div>
                        <h5 className="text-xs font-medium mb-2 text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </h5>
                        <div className="space-y-1">
                          {trendingSearches.map((item) => (
                            <Button
                              key={item.query}
                              variant="ghost"
                              size="sm"
                              className="justify-start h-7 text-xs w-full"
                              onClick={() => handlePopularSearchClick(item.query)}
                            >
                              <span className="flex-1 text-left">{item.query}</span>
                              <span className="text-[10px] text-muted-foreground">{item.count}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium mb-2 sm:mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Quick access
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                    {[
                      { label: 'Member Portal', icon: <Users className="h-3 w-3" />, term: 'member portal' },
                      { label: 'Pension Calculator', icon: <Calculator className="h-3 w-3" />, term: 'pension calculator' },
                      { label: 'Contact Info', icon: <Phone className="h-3 w-3" />, term: 'contact' },
                      { label: 'Enrollment Forms', icon: <FileText className="h-3 w-3" />, term: 'enrollment' },
                    ].map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        size="sm"
                        className="justify-start h-8 text-xs w-full"
                        onClick={() => handlePopularSearchClick(item.term)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="text-xs text-muted-foreground">
                    <div className="hidden sm:flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          ↑↓
                        </kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          ⏎
                        </kbd>
                        Select
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          Esc
                        </kbd>
                        Close
                      </span>
                    </div>
                    <div className="sm:hidden text-center text-xs text-muted-foreground">
                      Search for anything: schemes, forms, FAQs, contact info, and more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 