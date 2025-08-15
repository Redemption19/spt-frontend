"use client"

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, ChevronDown } from 'lucide-react'

import { navItems } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { SearchCommand, SearchButton } from '@/components/search-command'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function MainHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3 md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <LogoWithTheme />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 min-w-0 justify-center lg:justify-start">
            <nav className="flex items-center">
              <DesktopNav currentPath={pathname} />
            </nav>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <SearchCommand 
              className="w-24 lg:w-28 xl:w-32"
              placeholder="Search"
              showKeyboardHint={true}
            />
            <ThemeToggle />
            <Button asChild variant="outline" className="font-medium whitespace-nowrap text-xs lg:text-sm px-2 lg:px-3 py-1.5">
              <Link href="https://portal.standardpensions.com/" target="_blank">Member Portal</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium whitespace-nowrap text-xs lg:text-sm px-2 lg:px-3 py-1.5">
              <Link href="https://validate.standardpensions.com/validation-portal/" target="_blank">Make Payment</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <SearchButton />
            <ThemeToggle />
            <button
              className="p-2.5 rounded-lg text-foreground hover:bg-accent transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <MobileNav currentPath={pathname} />
        </div>
      )}
    </header>
  )
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      {navItems.map((item) => {
        const isActive = currentPath === item.href || 
                        (item.dropdown && item.dropdown.some(subItem => currentPath === subItem.href))

        // If item has dropdown
        if (item.dropdown && item.dropdown.length > 0) {
          return (
            <div key={item.href} className="relative group">
              <Button
                variant="ghost"
                className={cn(
                  "h-8 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none whitespace-nowrap",
                  isActive && "text-accent font-medium"
                )}
              >
                {item.title}
                <ChevronDown className="ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180" />
              </Button>
              
              {/* Custom Dropdown Content */}
              <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                <div className="p-1">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent/20 focus:bg-accent/20 focus:outline-none",
                        currentPath === subItem.href && "bg-accent/20 text-accent"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        // If item has no dropdown
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "h-8 px-2 lg:px-3 py-1 text-xs lg:text-sm font-medium transition-colors hover:bg-accent/20 hover:text-accent-foreground focus:bg-accent/20 focus:text-accent-foreground focus:outline-none whitespace-nowrap rounded-md",
              isActive && "text-accent font-medium"
            )}
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  )
}

function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="flex flex-col bg-card border-b border-border/40 max-h-[calc(100vh-80px)] overflow-y-auto shadow-lg">
      <div className="flex flex-col space-y-4 p-6">
        {navItems.map((item) => {
          const isActive = currentPath === item.href || 
                          (item.dropdown && item.dropdown.some(subItem => currentPath === subItem.href))

          // If item has dropdown
          if (item.dropdown && item.dropdown.length > 0) {
            return (
              <div key={item.href} className="space-y-3">
                <Link
                  href={item.href}
                  className={cn(
                    "text-lg font-semibold block py-2 px-3 rounded-lg transition-colors touch-manipulation",
                    isActive ? "text-accent bg-accent/10" : "text-foreground hover:bg-accent/5"
                  )}
                >
                  {item.title}
                </Link>
                <div className="pl-6 border-l-2 border-border/60 space-y-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block text-base py-2 px-3 rounded-md transition-colors touch-manipulation",
                        currentPath === subItem.href ? "text-accent font-medium bg-accent/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )
          }

          // If item has no dropdown
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-semibold block py-3 px-3 rounded-lg transition-colors touch-manipulation",
                isActive ? "text-accent bg-accent/10" : "text-foreground hover:text-accent hover:bg-accent/5"
              )}
            >
              {item.title}
            </Link>
          )
        })}

        {/* Mobile CTA Buttons */}
        <div className="pt-6 space-y-4 border-t border-border/40 mt-6">
          <Button asChild variant="outline" className="w-full justify-center h-12 text-base font-medium">
            <Link href="https://portal.standardpensions.com/">Member Portal</Link>
          </Button>
          <Button asChild className="w-full justify-center h-12 text-base font-medium bg-accent hover:bg-accent/90">
            <Link href="https://validate.standardpensions.com/validation-portal/">Make Payment</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'

function LogoWithTheme() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const [imageError, setImageError] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
    console.log('LogoWithTheme mounted:', { theme, resolvedTheme, mounted: true })
  }, [])

  React.useEffect(() => {
    console.log('Theme changed:', { theme, resolvedTheme, mounted })
    // Reset image states when theme changes
    setImageLoaded(false)
    setImageError(false)
  }, [theme, resolvedTheme, mounted])

  if (!mounted) {
    // Return placeholder during SSR to prevent hydration mismatch
    console.log('LogoWithTheme: Not mounted, showing placeholder')
    return (
      <div className="h-12 w-[120px] md:h-16 md:w-[180px] bg-gray-200 rounded-md animate-pulse" />
    )
  }

  // Use resolvedTheme to handle "system" theme
  const isDark = resolvedTheme === 'dark'
  const logoSrc = isDark ? '/images/logo/spt-logo-light.png' : '/images/logo/spt-logo-dark.png'
  
  console.log('LogoWithTheme: Rendering with', { isDark, logoSrc, resolvedTheme, imageLoaded, imageError })

  return (
    <div className="relative h-12 w-[120px] md:h-16 md:w-[180px]">
      <Image
        src={logoSrc}
        alt="Standard Pensions Trust"
        width={180}
        height={160}
        className="h-12 w-auto md:h-16 rounded-md"
        priority
        onLoad={() => {
          console.log('Logo loaded successfully:', logoSrc)
          setImageLoaded(true)
          setImageError(false)
        }}
        onError={(e) => {
          console.error('Logo failed to load:', logoSrc, e)
          setImageError(true)
          setImageLoaded(false)
        }}
        style={{ display: imageError ? 'none' : 'block' }}
      />
      {imageError && (
        <div className="h-12 w-full md:h-16 bg-red-100 border border-red-300 rounded-md flex items-center justify-center text-xs text-red-600">
          Logo Error
        </div>
      )}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-100 rounded-md animate-pulse" />
      )}
    </div>
  )
}