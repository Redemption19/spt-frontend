'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Calendar, 
  Image, 
  MessageSquare, 
  Shield, 
  Database,
  ChevronLeft,
  ChevronRight,
  Home,
  Building2,
  PiggyBank,
  HelpCircle,
  Contact,
  Newspaper,
  Star,
  Menu,
  Layout,
  Clock,
  Briefcase,
  Download,
  MapPin,
  Mail,
  Clipboard,
  Wrench,
  Activity
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: string
}

const sidebarItems: { title: string; items: SidebarItem[] }[] = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboard,
        badge: 'New'
      },
      {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3
      }
    ]
  },
  {
    title: 'Hero & Content',
    items: [
      {
        title: 'Hero Sections',
        href: '/admin/hero-sections',
        icon: Home
      },
      {
        title: 'Page Content',
        href: '/admin/content',
        icon: FileText
      },
      {
        title: 'Navigation',
        href: '/admin/navigation',
        icon: Menu
      },
      {
        title: 'Footer',
        href: '/admin/footer',
        icon: Layout
      }
    ]
  },
  {
    title: 'About Us',
    items: [
      {
        title: 'Company Overview',
        href: '/admin/about/overview',
        icon: Building2
      },
      {
        title: 'Leadership Team',
        href: '/admin/about/leadership',
        icon: Users
      },
      {
        title: 'Company Timeline',
        href: '/admin/about/timeline',
        icon: Clock
      },
      {
        title: 'Careers',
        href: '/admin/about/careers',
        icon: Briefcase
      }
    ]
  },
  {
    title: 'Services',
    items: [
      {
        title: 'Self-Service Center',
        href: '/admin/services/self-service',
        icon: Settings
      },
      {
        title: 'Surveys & Feedback',
        href: '/admin/services/surveys',
        icon: MessageSquare
      },
      {
        title: 'FAQs',
        href: '/admin/services/faqs',
        icon: HelpCircle
      },
      {
        title: 'Enrollments',
        href: '/admin/services/enrollments',
        icon: FileText
      }
    ]
  },
  {
    title: 'Media & Events',
    items: [
      {
        title: 'Blog Posts',
        href: '/admin/media/blog',
        icon: Newspaper
      },
      {
        title: 'Events',
        href: '/admin/media/events',
        icon: Calendar
      },
      {
        title: 'Downloads',
        href: '/admin/media/downloads',
        icon: Download
      },
              {
          title: 'Gallery',
          href: '/admin/media/gallery',
          icon: Image
        }
    ]
  },
  {
    title: 'Contact & Support',
    items: [
      {
        title: 'Contact Info',
        href: '/admin/contact',
        icon: Contact
      },
      {
        title: 'Office Locations',
        href: '/admin/contact/locations',
        icon: MapPin
      },
      {
        title: 'Contact Forms',
        href: '/admin/contact/forms',
        icon: FileText
      },
      {
        title: 'Inquiries',
        href: '/admin/contact/inquiries',
        icon: MessageSquare
      }
    ]
  },
  {
    title: 'Newsletter',
    items: [
      {
        title: 'Subscribers',
        href: '/admin/newsletter/subscribers',
        icon: Users
      },
      {
        title: 'Campaigns',
        href: '/admin/newsletter/campaigns',
        icon: Mail
      },
      {
        title: 'Templates',
        href: '/admin/newsletter/templates',
        icon: FileText
      }
    ]
  },
  {
    title: 'User Management',
    items: [

      {
        title: 'Admin Users',
        href: '/admin/users/admins',
        icon: Shield
      }
    ]
  },
  {
    title: 'Pension Services',
    items: [
      {
        title: 'Schemes',
        href: '/admin/services/schemes',
        icon: PiggyBank
      },
      {
        title: 'Claims',
        href: '/admin/services/claims',
        icon: FileText
      },
      {
        title: 'Forms',
        href: '/admin/services/forms',
        icon: Clipboard
      }
    ]
  },
  {
    title: 'System',
    items: [
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings
      },
      {
        title: 'Knowledge Base',
        href: '/admin/knowledge',
        icon: Database
      },
      {
        title: 'Backup & Maintenance',
        href: '/admin/system/maintenance',
        icon: Wrench
      },
      {
        title: 'Activity Logs',
        href: '/admin/system/logs',
        icon: Activity
      }
    ]
  }
]

export default function AdminSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex h-full border-r border-gray-200 bg-white dark:bg-gray-800 shadow-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex w-full flex-col gap-2">
        {/* Header */}
        <div className="flex h-[60px] items-center border-b border-gray-200 px-2 bg-gray-50 dark:bg-gray-700">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SPT</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl text-red-800 dark:text-red-200 font-bold">Admin Panel</span>
            )}
          </Link>
        </div>
        
        {/* Toggle Button */}
        <div className="flex justify-end px-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-4 py-2">
            {sidebarItems.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-1">
                {!isCollapsed && (
                  <h4 className="px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wider border-b border-red-200 dark:border-red-800 mb-2">
                    {group.title}
                  </h4>
                )}
                {group.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                        isActive ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-r-2 border-red-600" : "text-gray-600 dark:text-gray-300"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <div className="flex items-center gap-2">
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Shield className="h-4 w-4" />
              <span>Admin Access</span>
            </div>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mt-2"
            >
              <Home className="h-4 w-4" />
              <span>Back to Frontend</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
