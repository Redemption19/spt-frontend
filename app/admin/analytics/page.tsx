'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  BookOpen,
  Database
} from 'lucide-react'
import Link from 'next/link'

export default function AnalyticsPage() {
  // Mock analytics data - replace with actual data from your backend
  const analytics = {
    totalChats: 1247,
    totalUsers: 892,
    averageResponseTime: '2.3s',
    satisfactionRate: 94.2,
    topCategories: [
      { name: 'Pension Schemes', count: 342, percentage: 27.4 },
      { name: 'FAQs', count: 298, percentage: 23.9 },
      { name: 'Enrollment', count: 187, percentage: 15.0 },
      { name: 'Claims', count: 156, percentage: 12.5 },
      { name: 'Company Overview', count: 134, percentage: 10.7 }
    ],
    dailyStats: [
      { date: '2024-01-01', chats: 45, users: 38 },
      { date: '2024-01-02', chats: 52, users: 41 },
      { date: '2024-01-03', chats: 48, users: 39 },
      { date: '2024-01-04', chats: 61, users: 47 },
      { date: '2024-01-05', chats: 58, users: 44 },
      { date: '2024-01-06', chats: 42, users: 35 },
      { date: '2024-01-07', chats: 39, users: 32 }
    ],
    userFeedback: [
      { rating: 5, count: 892, percentage: 71.5 },
      { rating: 4, count: 234, percentage: 18.8 },
      { rating: 3, count: 89, percentage: 7.1 },
      { rating: 2, count: 23, percentage: 1.8 },
      { rating: 1, count: 9, percentage: 0.7 }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-500 hover:text-gray-700">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Chat Analytics</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline">Last 30 days</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalChats.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.5s</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.satisfactionRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Most Popular Knowledge Categories</CardTitle>
            <CardDescription>
              Categories that users ask about most frequently
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{category.count} chats</span>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Satisfaction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Satisfaction Ratings</CardTitle>
              <CardDescription>
                Distribution of user feedback ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.userFeedback.map((rating) => (
                  <div key={rating.rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 w-16">
                      <span className="text-sm font-medium">{rating.rating}</span>
                      {rating.rating === 5 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : rating.rating === 1 ? (
                        <XCircle className="h-4 w-4 text-red-600" />
                      ) : (
                        <HelpCircle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-sm font-medium">{rating.count}</span>
                      <span className="text-xs text-gray-500 ml-1">({rating.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Chat Activity</CardTitle>
              <CardDescription>
                Chat volume over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.dailyStats.map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">{day.users} users</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(day.chats / 70) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{day.chats}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/knowledge">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-medium">Manage Knowledge</h3>
                        <p className="text-sm text-gray-600">Add, edit, or remove knowledge items</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/categories">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <Database className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium">Organize Categories</h3>
                        <p className="text-sm text-gray-600">Manage knowledge categories and structure</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/chat-logs">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                      <div>
                        <h3 className="font-medium">View Chat Logs</h3>
                        <p className="text-sm text-gray-600">Review user interactions and responses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
