'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Conversation {
  id: number;
  session_id: string;
  user_message: string;
  bot_response: string;
  message_type: string;
  response_time: number;
  was_helpful: boolean | null;
  created_at: string;
  user_ip: string;
  page_url: string;
}

interface Analytics {
  total_conversations: number;
  unique_sessions: number;
  average_response_time: number;
  message_types: Array<{ message_type: string; count: number }>;
  popular_questions: Array<{ user_message: string; frequency: number }>;
  daily_volume: Array<{ date: string; count: number }>;
  satisfaction_rate: {
    total_feedback: number;
    helpful_responses: number;
    satisfaction_rate: number;
  };
}

export default function ChatAnalytics() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchAnalytics();
    fetchConversations();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/v1/admin/chat/analytics`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`, // If using auth
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedType !== 'all') params.append('message_type', selectedType);
      
      const response = await fetch(`${backendUrl}/api/v1/admin/chat/conversations?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getMessageTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'enrollment': 'bg-blue-100 text-blue-800',
      'claims': 'bg-green-100 text-green-800',
      'scheme_info': 'bg-purple-100 text-purple-800',
      'calculator': 'bg-orange-100 text-orange-800',
      'tax_info': 'bg-yellow-100 text-yellow-800',
      'portal_access': 'bg-indigo-100 text-indigo-800',
      'support': 'bg-red-100 text-red-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Chat Analytics</h1>
        <Button onClick={fetchAnalytics} variant="outline">
          Refresh Data
        </Button>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.total_conversations}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.unique_sessions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.average_response_time?.toFixed(2) || 0}s
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.satisfaction_rate.satisfaction_rate}%
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics.satisfaction_rate.helpful_responses} of {analytics.satisfaction_rate.total_feedback} rated helpful
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversations">Recent Conversations</TabsTrigger>
          <TabsTrigger value="popular">Popular Questions</TabsTrigger>
          <TabsTrigger value="types">Message Types</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          {/* Filters */}
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Types</option>
              <option value="enrollment">Enrollment</option>
              <option value="claims">Claims</option>
              <option value="scheme_info">Scheme Info</option>
              <option value="calculator">Calculator</option>
              <option value="tax_info">Tax Info</option>
              <option value="portal_access">Portal Access</option>
              <option value="support">Support</option>
              <option value="general">General</option>
            </select>
            <Button onClick={fetchConversations}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Conversations List */}
          <div className="space-y-4">
            {conversations.map((conv) => (
              <Card key={conv.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getMessageTypeColor(conv.message_type)}>
                        {conv.message_type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(conv.created_at)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {conv.response_time?.toFixed(2)}s
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {conv.was_helpful === true && (
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      )}
                      {conv.was_helpful === false && (
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-blue-600 mb-1">User Question:</div>
                    <div className="text-sm bg-blue-50 p-3 rounded">{conv.user_message}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-600 mb-1">Bot Response:</div>
                    <div className="text-sm bg-green-50 p-3 rounded max-h-40 overflow-y-auto">
                      {conv.bot_response}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Session: {conv.session_id} | IP: {conv.user_ip} | Page: {conv.page_url}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {analytics?.popular_questions && (
            <Card>
              <CardHeader>
                <CardTitle>Most Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.popular_questions.map((q, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex-1">{q.user_message}</div>
                      <Badge variant="secondary">{q.frequency} times</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          {analytics?.message_types && (
            <Card>
              <CardHeader>
                <CardTitle>Message Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.message_types.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <Badge className={getMessageTypeColor(type.message_type)}>
                          {type.message_type}
                        </Badge>
                      </div>
                      <div className="text-lg font-semibold">{type.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 