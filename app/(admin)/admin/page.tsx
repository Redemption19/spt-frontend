'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building2, 
  PiggyBank, 
  TrendingUp, 
  FileText, 
  Calendar,
  MessageSquare,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Members',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      description: 'Active pension members'
    },
    {
      title: 'Employers',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: Building2,
      description: 'Registered companies'
    },
    {
      title: 'Total Assets',
      value: '₵2.4B',
      change: '+15.3%',
      changeType: 'positive',
      icon: PiggyBank,
      description: 'Under management'
    },
    {
      title: 'Monthly Growth',
      value: '5.7%',
      change: '+5.7%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'This month'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New member enrollment',
      description: 'John Doe enrolled in Master Trust Scheme',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'contribution',
      title: 'Contribution received',
      description: '₵2,500 from ABC Company Ltd',
      time: '15 minutes ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'claim',
      title: 'Benefit claim submitted',
      description: 'Sarah Johnson - Retirement benefit',
      time: '1 hour ago',
      status: 'pending'
    },
    {
      id: 4,
      type: 'enquiry',
      title: 'Support ticket opened',
      description: 'Technical issue with member portal',
      time: '2 hours ago',
      status: 'open'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Member',
      description: 'Enroll a new pension member',
      icon: Users,
      href: '/admin/members/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Process Claims',
      description: 'Review pending benefit claims',
      icon: FileText,
      href: '/admin/claims',
      color: 'bg-green-500'
    },
    {
      title: 'Generate Reports',
      description: 'Create monthly reports',
      icon: TrendingUp,
      href: '/admin/reports',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage FAQs',
      description: 'Update help content',
      icon: MessageSquare,
      href: '/admin/faqs',
      color: 'bg-orange-500'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'open':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <Users className="h-4 w-4" />
      case 'contribution':
        return <PiggyBank className="h-4 w-4" />
      case 'claim':
        return <FileText className="h-4 w-4" />
      case 'enquiry':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here's what's happening with your pension trust today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">Last updated: 2 min ago</Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3 inline" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 inline" />
                  )}
                  {stat.change}
                </span>
                <span>from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest actions and updates in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mr-3`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Current system status and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  99.9%
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>
              Latest member registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Member</p>
                    <p className="text-xs text-muted-foreground">John Doe</p>
                  </div>
                </div>
                <Badge variant="secondary">Today</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Employer</p>
                    <p className="text-xs text-muted-foreground">XYZ Corp</p>
                  </div>
                </div>
                <Badge variant="secondary">Yesterday</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Enrollments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
