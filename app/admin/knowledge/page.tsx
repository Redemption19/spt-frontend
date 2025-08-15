'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  Download,
  Upload,
  Save,
  X,
  Database
} from 'lucide-react'
import Link from 'next/link'
import { 
  loadAllKnowledge, 
  getCategoryLabel, 
  getCategoryColor,
  getCategoryStats,
  type KnowledgeItem 
} from '@/lib/utils/knowledge-loader'

      const categories = [
        'company_overview',
        'pension_schemes',
        'faq',
        'leadership',
        'trustees',
        'enrollment',
        'claims',
        'member_services',
        'tax_benefits',
        'investment_management',
        'psychological_planning',
        'contribution_strategies',
        'investment_strategies',
        'benefit_claims',
        'digital_services',
        'regulatory_compliance',
        'family_life_planning',
        'informal_sector',
        'financial_trauma',
        'healthcare_planning',
        'cybersecurity',
        'crisis_emergency'
      ]

export default function KnowledgeManagement() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([])
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null)
  const [newItem, setNewItem] = useState({
    category: '',
    title: '',
    content: '',
    keywords: '',
    route: ''
  })

  // Load knowledge items from all sources
  useEffect(() => {
    const loadKnowledgeItems = async () => {
      try {
        const data = await loadAllKnowledge()
        setKnowledgeItems(data)
        setFilteredItems(data)
      } catch (error) {
        console.error('Failed to load knowledge items:', error)
        // Fallback to mock data
        setKnowledgeItems(mockData)
        setFilteredItems(mockData)
      }
    }
    loadKnowledgeItems()
  }, [])

  // Filter items based on search and category
  useEffect(() => {
    let filtered = knowledgeItems

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredItems(filtered)
  }, [searchTerm, selectedCategory, knowledgeItems])

  const handleAddItem = () => {
    if (!newItem.category || !newItem.title || !newItem.content) return

    const item: KnowledgeItem = {
      id: Date.now(),
      category: newItem.category,
      title: newItem.title,
      content: newItem.content,
      keywords: newItem.keywords.split(',').map(k => k.trim()),
      route: newItem.route || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setKnowledgeItems([...knowledgeItems, item])
    setNewItem({ category: '', title: '', content: '', keywords: '', route: '' })
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (item: KnowledgeItem) => {
    setEditingItem(item)
    setNewItem({
      category: item.category,
      title: item.title,
      content: item.content,
      keywords: item.keywords.join(', '),
      route: item.route || ''
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (!editingItem) return

    const updatedItems = knowledgeItems.map(item => 
      item.id === editingItem.id 
        ? {
            ...item,
            category: newItem.category,
            title: newItem.title,
            content: newItem.content,
            keywords: newItem.keywords.split(',').map(k => k.trim()),
            route: newItem.route || undefined,
            updatedAt: new Date().toISOString()
          }
        : item
    )

    setKnowledgeItems(updatedItems)
    setEditingItem(null)
    setNewItem({ category: '', title: '', content: '', keywords: '', route: '' })
    setIsEditDialogOpen(false)
  }

  const handleDeleteItem = (id: string | number) => {
    if (confirm('Are you sure you want to delete this knowledge item?')) {
      setKnowledgeItems(knowledgeItems.filter(item => item.id !== id))
    }
  }

  const exportKnowledge = () => {
    const dataStr = JSON.stringify(knowledgeItems, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'knowledge-base.json'
    link.click()
    URL.revokeObjectURL(url)
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
              <h1 className="text-2xl font-bold text-gray-900">Knowledge Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={exportKnowledge}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Knowledge
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Knowledge Item</DialogTitle>
                    <DialogDescription>
                      Add a new piece of knowledge to your AI chatbot database
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {getCategoryLabel(category)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={newItem.title}
                        onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                        placeholder="Enter knowledge title"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        value={newItem.content}
                        onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                        placeholder="Enter knowledge content"
                        rows={6}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Keywords (comma-separated)</label>
                      <Input
                        value={newItem.keywords}
                        onChange={(e) => setNewItem({...newItem, keywords: e.target.value})}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Route (optional)</label>
                      <Input
                        value={newItem.route}
                        onChange={(e) => setNewItem({...newItem, route: e.target.value})}
                        placeholder="/path/to/page"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddItem}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search knowledge items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {getCategoryLabel(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Sources Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Knowledge Sources
            </CardTitle>
            <CardDescription>
              Your knowledge base is loaded from multiple specialized files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 border rounded-lg bg-blue-50">
                <h4 className="font-medium text-blue-900">Core Knowledge</h4>
                <p className="text-sm text-blue-700">Company & scheme information</p>
                <p className="text-xs text-blue-600 mt-1">Main knowledge base</p>
              </div>
              <div className="p-3 border rounded-lg bg-purple-50">
                <h4 className="font-medium text-purple-900">Psychological Planning</h4>
                <p className="text-sm text-purple-700">Behavioral aspects & motivation</p>
                <p className="text-xs text-purple-600 mt-1">20 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-emerald-50">
                <h4 className="font-medium text-emerald-900">Contribution Strategies</h4>
                <p className="text-sm text-emerald-700">Optimization & planning</p>
                <p className="text-xs text-emerald-600 mt-1">35 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-teal-50">
                <h4 className="font-medium text-teal-900">Investment Strategies</h4>
                <p className="text-sm text-teal-700">Portfolio management</p>
                <p className="text-xs text-teal-600 mt-1">20 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-cyan-50">
                <h4 className="font-medium text-cyan-900">Benefit Claims</h4>
                <p className="text-sm text-cyan-700">Retirement & withdrawal</p>
                <p className="text-xs text-cyan-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-slate-50">
                <h4 className="font-medium text-slate-900">Digital Services</h4>
                <p className="text-sm text-slate-700">Technology & platform</p>
                <p className="text-xs text-slate-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-amber-50">
                <h4 className="font-medium text-amber-900">Regulatory</h4>
                <p className="text-sm text-amber-700">NPRA & compliance</p>
                <p className="text-xs text-amber-600 mt-1">10 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-rose-50">
                <h4 className="font-medium text-rose-900">Family Planning</h4>
                <p className="text-sm text-rose-700">Life events & coordination</p>
                <p className="text-xs text-rose-600 mt-1">20 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-lime-50">
                <h4 className="font-medium text-lime-900">Informal Sector</h4>
                <p className="text-sm text-lime-700">Specialized workers</p>
                <p className="text-xs text-lime-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-violet-50">
                <h4 className="font-medium text-violet-900">Financial Trauma</h4>
                <p className="text-sm text-violet-700">Recovery & confidence</p>
                <p className="text-xs text-violet-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-sky-50">
                <h4 className="font-medium text-sky-900">Healthcare</h4>
                <p className="text-sm text-sky-700">Medical planning</p>
                <p className="text-xs text-sky-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-stone-50">
                <h4 className="font-medium text-stone-900">Cybersecurity</h4>
                <p className="text-sm text-stone-700">Digital safety</p>
                <p className="text-xs text-stone-600 mt-1">15 FAQ items</p>
              </div>
              <div className="p-3 border rounded-lg bg-red-50">
                <h4 className="font-medium text-red-900">Crisis Planning</h4>
                <p className="text-sm text-red-700">Emergency preparedness</p>
                <p className="text-xs text-red-600 mt-1">10 FAQ items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredItems.length} of {knowledgeItems.length} knowledge items
          </p>
        </div>

        {/* Knowledge Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                    <Badge className={getCategoryColor(item.category)}>
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {item.content}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.keywords.slice(0, 5).map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {item.keywords.length > 5 && (
                    <Badge variant="secondary" className="text-xs">
                      +{item.keywords.length - 5} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Updated: {new Date(item.updatedAt).toLocaleDateString()}</span>
                  {item.route && (
                    <Link href={item.route} className="text-blue-600 hover:underline">
                      View Page
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No knowledge items found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Knowledge Item</DialogTitle>
            <DialogDescription>
              Update the knowledge item information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {getCategoryLabel(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Enter knowledge title"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={newItem.content}
                onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                placeholder="Enter knowledge content"
                rows={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Keywords (comma-separated)</label>
              <Input
                value={newItem.keywords}
                onChange={(e) => setNewItem({...newItem, keywords: e.target.value})}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Route (optional)</label>
              <Input
                value={newItem.route}
                onChange={(e) => setNewItem({...newItem, route: e.target.value})}
                placeholder="/path/to/page"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateItem}>
                <Save className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Mock data for development
const mockData: KnowledgeItem[] = [
  {
    id: 1,
    category: 'company_overview',
    title: 'About Standard Pensions Trust',
    content: 'Standard Pensions Trust (SPT) is Ghana\'s leading pension administrator...',
    keywords: ['about', 'company', 'overview', 'pension administrator', 'ghana'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    category: 'pension_schemes',
    title: 'Ghana\'s Three-Tier Pension System',
    content: 'Ghana operates a three-tier pension system...',
    keywords: ['three-tier', 'ssnit', 'tier 1', 'tier 2', 'tier 3'],
    route: '/schemes/',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
]
