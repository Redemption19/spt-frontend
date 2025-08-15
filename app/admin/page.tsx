'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Users, 
  BarChart3, 
  Settings,
  FileText,
  MessageSquare,
  Database,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Mock data - replace with actual data from your backend
        const stats = {
        totalKnowledgeItems: 205, // All 205 FAQ items from new-knowledge.md
        totalCategories: 20, // All knowledge categories
        totalUsers: 1250,
        activeChats: 23,
        knowledgeGrowth: '+41%',
        userGrowth: '+8%'
      }

        const categories = [
        { name: 'Company Overview', count: 15, color: 'bg-blue-100 text-blue-800' },
        { name: 'Pension Schemes', count: 42, color: 'bg-green-100 text-green-800' },
        { name: 'FAQs', count: 28, color: 'bg-purple-100 text-purple-800' },
        { name: 'Leadership', count: 12, color: 'bg-orange-100 text-orange-800' },
        { name: 'Enrollment', count: 18, color: 'bg-red-100 text-red-800' },
        { name: 'Claims', count: 16, color: 'bg-indigo-100 text-indigo-800' },
        { name: 'Member Services', count: 9, color: 'bg-pink-100 text-pink-800' },
        { name: 'Tax Benefits', count: 6, color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Psychological Planning', count: 20, color: 'bg-purple-100 text-purple-800' },
        { name: 'Contribution Strategies', count: 35, color: 'bg-emerald-100 text-emerald-800' },
        { name: 'Investment Strategies', count: 20, color: 'bg-teal-100 text-teal-800' },
        { name: 'Benefit Claims', count: 15, color: 'bg-cyan-100 text-cyan-800' },
        { name: 'Digital Services', count: 15, color: 'bg-slate-100 text-slate-800' },
        { name: 'Regulatory Compliance', count: 10, color: 'bg-amber-100 text-amber-800' },
        { name: 'Family Life Planning', count: 20, color: 'bg-rose-100 text-rose-800' },
        { name: 'Informal Sector', count: 15, color: 'bg-lime-100 text-lime-800' },
        { name: 'Financial Trauma', count: 15, color: 'bg-violet-100 text-violet-800' },
        { name: 'Healthcare Planning', count: 15, color: 'bg-sky-100 text-sky-800' },
        { name: 'Cybersecurity', count: 15, color: 'bg-stone-100 text-stone-800' },
        { name: 'Crisis Emergency', count: 10, color: 'bg-red-100 text-red-800' }
      ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Knowledge
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Knowledge Items</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalKnowledgeItems}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stats.knowledgeGrowth}</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Knowledge categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stats.userGrowth}</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeChats}</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Knowledge Management
              </CardTitle>
              <CardDescription>
                Manage your AI chatbot knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/knowledge">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Knowledge
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/knowledge">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Knowledge
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/categories">
                  <Database className="h-4 w-4 mr-2" />
                  Manage Categories
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat Analytics
              </CardTitle>
              <CardDescription>
                Monitor chatbot performance and user interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/chat-logs">
                  <FileText className="h-4 w-4 mr-2" />
                  Chat Logs
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/feedback">
                  <Activity className="h-4 w-4 mr-2" />
                  User Feedback
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                System Settings
              </CardTitle>
              <CardDescription>
                Configure chatbot behavior and system preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  General Settings
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  User Management
                </Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/backup">
                  <Database className="h-4 w-4 mr-2" />
                  Backup & Restore
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Categories</CardTitle>
            <CardDescription>
              Overview of knowledge distribution across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </div>
                  <Badge className={category.color}>
                    {category.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
