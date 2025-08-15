'use client'

import React, { useState, useEffect } from 'react'
import { Search, Command } from 'lucide-react'
import { GlobalSearch } from './global-search'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SearchCommandProps {
  className?: string
  placeholder?: string
  showKeyboardHint?: boolean
}

export function SearchCommand({ 
  className, 
  placeholder = "Search everything...", 
  showKeyboardHint = true 
}: SearchCommandProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <GlobalSearch 
      trigger={
        <Button
          variant="outline"
          className={cn(
            "relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
            className
          )}
          onClick={() => setIsOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline-flex">{placeholder}</span>
          <span className="inline-flex lg:hidden">Search...</span>
          {showKeyboardHint && (
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </Button>
      }
    />
  )
}

// Compact search button for mobile/tablet
export function SearchButton({ className }: { className?: string }) {
  return (
    <GlobalSearch 
      trigger={
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("relative h-9 w-9 p-0 touch-manipulation hover:bg-accent", className)}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      }
    />
  )
}

// Search bar component for headers
export function SearchBar({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <SearchCommand 
        className="w-full"
        placeholder="Search pension schemes, services, FAQs..."
        showKeyboardHint={true}
      />
    </div>
  )
}
