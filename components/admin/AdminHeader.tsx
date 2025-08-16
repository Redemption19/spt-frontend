'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, Bell } from 'lucide-react'


interface AdminHeaderProps {
  onSidebarToggle: () => void
}

export default function AdminHeader({ onSidebarToggle }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white dark:bg-gray-800 px-4 md:px-6 shadow-sm">


      {/* Desktop Sidebar Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSidebarToggle}
        className="hidden md:flex"
      >
        <Menu className="h-5 w-5" />
      </Button>



      {/* Search */}
      <div className="flex-1 max-w-md ml-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search admin panel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Spacer to push notification to far right */}
      <div className="flex-1"></div>

      {/* Notifications - Far Right */}
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-5 w-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
          3
        </span>
      </Button>

    </header>
  )
}
