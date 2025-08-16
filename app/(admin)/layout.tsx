'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin-specific layout - completely separate from frontend */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar} 
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader onSidebarToggle={toggleSidebar} />
          
          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
