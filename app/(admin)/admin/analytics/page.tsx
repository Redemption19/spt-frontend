'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building2, 
  PiggyBank,
  Calendar,
  Download,
  Eye
} from 'lucide-react'

export default function AnalyticsPage() {
  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ]

  const metrics = [
    {
      title: 'Total Members',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      description: 'vs last period'
    },
    {
      title: 'Active Employers',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: Building2,
      description: 'vs last period'
    },
    {
      title: 'Total Assets',
      value: '₵2.4B',
      change: '+15.3%',
      changeType: 'positive',
      icon: PiggyBank,
      description: 'vs last period'
    },
    {
      title: 'Monthly Growth',
      value: '5.7%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      description: 'vs last period'
    }
  ]

  const topSchemes = [
    {
      name: 'Master Trust Scheme',
      members: 5432,
      assets: '₵890M',
      growth: '+18.2%',
      status: 'active'
    },
    {
      name: 'Personal Pension',
      members: 3210,
      assets: '₵456M',
      growth: '+12.7%',
      status: 'active'
    },
    {
      name: 'Employer Sponsored',
      members: 2890,
      assets: '₵678M',
      growth: '+9.4%',
      status: 'active'
    },
    {
      name: 'Provident Fund',
      members: 1567,
      assets: '₵234M',
      growth: '+6.8%',
      status: 'active'
    }
  ]

  const recentTrends = [
    {
      period: 'Jan 2024',
      members: 11800,
      contributions: 42.1,
      claims: 156
    },
    {
      period: 'Feb 2024',
      members: 12100,
      contributions: 44.8,
      claims: 142
    },
    {
      period: 'Mar 2024',
      members: 12400,
      contributions: 47.2,
      claims: 138
    },
    {
      period: 'Apr 2024',
      members: 12700,
      contributions: 49.5,
      claims: 165
    },
    {
      period: 'May 2024',
      members: 12900,
      contributions: 51.8,
      claims: 178
    },
    {
      period: 'Jun 2024',
      members: 12847,
      contributions: 45.2,
      claims: 189
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your pension trust performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}>
                  {metric.changeType === 'positive' ? (
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 inline mr-1" />
                  )}
                  {metric.change}
                </span>
                <span>{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Member Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Member Growth Trend</CardTitle>
            <CardDescription>
              Monthly member enrollment over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{trend.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {trend.members.toLocaleString()} members
                    </span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ 
                          width: `${((trend.members - 11000) / 2000) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contribution Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Contribution Trends</CardTitle>
            <CardDescription>
              Monthly contribution amounts in millions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{trend.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      ₵{trend.contributions}M
                    </span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ 
                          width: `${(trend.contributions / 60) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Schemes */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Schemes</CardTitle>
          <CardDescription>
            Schemes ranked by member count and asset growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSchemes.map((scheme, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{scheme.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{scheme.members.toLocaleString()} members</span>
                      <span>•</span>
                      <span>{scheme.assets}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    {scheme.growth}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Claims Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claims Processing</CardTitle>
            <CardDescription>
              Monthly benefit claims and processing times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{trend.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      {trend.claims} claims
                    </span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full"
                        style={{ 
                          width: `${(trend.claims / 200) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>
              Member distribution across regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Greater Accra</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">45%</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-red-500 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Ashanti Region</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">28%</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-blue-500 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Western Region</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">15%</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Other Regions</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">12%</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/4 h-full bg-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
