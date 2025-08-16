'use client'

import { useEffect, useRef } from 'react'

interface ImageProtectionProps {
  children: React.ReactNode
  className?: string
}

export default function ImageProtection({ children, className = '' }: ImageProtectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent keyboard shortcuts (Ctrl+S, Ctrl+Shift+S, F12, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+Shift+S (Save As)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
        e.preventDefault()
        return false
      }
      
      // Prevent F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+Shift+I (Developer Tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+Shift+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }
      
      // Prevent Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        return false
      }
    }

    // Prevent selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Prevent copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent cut
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Add event listeners
    container.addEventListener('contextmenu', handleContextMenu)
    container.addEventListener('dragstart', handleDragStart)
    container.addEventListener('keydown', handleKeyDown)
    container.addEventListener('selectstart', handleSelectStart)
    container.addEventListener('copy', handleCopy)
    container.addEventListener('cut', handleCut)

    // Cleanup
    return () => {
      container.removeEventListener('contextmenu', handleContextMenu)
      container.removeEventListener('dragstart', handleDragStart)
      container.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('selectstart', handleSelectStart)
      container.removeEventListener('copy', handleCopy)
      container.removeEventListener('cut', handleCut)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`protected-image ${className}`}
      style={{
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        pointerEvents: 'none'
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
