'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProtectedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
}

export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75
}: ProtectedImageProps) {
  const [isProtected, setIsProtected] = useState(true)

  const handleContextMenu = (e: React.MouseEvent) => {
    if (isProtected) {
      e.preventDefault()
      return false
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (isProtected) {
      e.preventDefault()
      return false
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isProtected) {
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
    }
  }

  return (
    <div 
      className={`protected-image-container ${className}`}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        display: 'inline-block',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        WebkitTouchCallout: 'none',
        pointerEvents: isProtected ? 'none' : 'auto'
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        className="protected-image"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitUserDrag: 'none',
          KhtmlUserDrag: 'none',
          MozUserDrag: 'none',
          OUserDrag: 'none',
          userDrag: 'none',
          pointerEvents: isProtected ? 'none' : 'auto'
        } as React.CSSProperties}
      />
      
      {/* Optional: Add a subtle overlay to indicate protection */}
      {isProtected && (
        <div 
          className="protection-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
    </div>
  )
}
