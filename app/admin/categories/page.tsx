'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  Plus, 
  Edit, 
  Trash2, 
  Database,
  BookOpen,
  Users,
  Settings,
  TrendingUp,
  Shield,
  Home,
  FileText,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  displayName: string
  description: string
  icon: string
  color: string
  itemCount: number
  isActive: boolean
  createdAt: string
}

const defaultCategories: Category[] = [
  {
    id: 'company_overview',
    name: 'company_overview',
    displayName: 'Company Overview',
    description: 'Information about Standard Pensions Trust company, mission, and values',
    icon: 'Home',
    color: 'bg-blue-100 text-blue-800',
    itemCount: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'pension_schemes',
    name: 'pension_schemes',
    displayName: 'Pension Schemes',
    description: 'Details about various pension schemes and their benefits',
    icon: 'Shield',
    color: 'bg-green-100 text-green-800',
    itemCount: 42,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'faq',
    name: 'faq',
    displayName: 'Frequently Asked Questions',
    description: 'Common questions and answers about pensions and services',
    icon: 'MessageSquare',
    color: 'bg-purple-100 text-purple-800',
    itemCount: 28,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'leadership',
    name: 'leadership',
    displayName: 'Leadership Team',
    description: 'Information about company leadership and board members',
    icon: 'Users',
    color: 'bg-orange-100 text-orange-800',
    itemCount: 12,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'enrollment',
    name: 'enrollment',
    displayName: 'Enrollment Process',
    description: 'Step-by-step guides for individual and employer enrollment',
    icon: 'FileText',
    color: 'bg-red-100 text-red-800',
    itemCount: 18,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'claims',
    name: 'claims',
    displayName: 'Benefit Claims',
    description: 'Process and requirements for claiming pension benefits',
    icon: 'TrendingUp',
    color: 'bg-indigo-100 text-indigo-800',
    itemCount: 16,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'member_services',
    name: 'member_services',
    displayName: 'Member Services',
    description: 'Digital services and member portal information',
    icon: 'Settings',
    color: 'bg-pink-100 text-pink-800',
    itemCount: 9,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'tax_benefits',
    name: 'tax_benefits',
    displayName: 'Tax Benefits',
    description: 'Tax advantages and incentives for pension contributions',
    icon: 'Database',
    color: 'bg-yellow-100 text-yellow-800',
    itemCount: 6,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

const iconOptions = [
  { value: 'Home', label: 'Home', icon: Home },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'MessageSquare', label: 'Message', icon: MessageSquare },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'FileText', label: 'File', icon: FileText },
  { value: 'TrendingUp', label: 'Trending', icon: TrendingUp },
  { value: 'Settings', label: 'Settings', icon: Settings },
  { value: 'Database', label: 'Database', icon: Database },
  { value: 'BookOpen', label: 'Book', icon: BookOpen }
]

const colorOptions = [
  { value: 'bg-blue-100 text-blue-800', label: 'Blue' },
  { value: 'bg-green-100 text-green-800', label: 'Green' },
  { value: 'bg-purple-100 text-purple-800', label: 'Purple' },
  { value: 'bg-orange-100 text-orange-800', label: 'Orange' },
  { value: 'bg-red-100 text-red-800', label: 'Red' },
  { value: 'bg-indigo-100 text-indigo-800', label: 'Indigo' },
  { value: 'bg-pink-100 text-pink-800', label: 'Pink' },
  { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow' },
  { value: 'bg-teal-100 text-teal-800', label: 'Teal' }
]

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: '',
    displayName: '',
    description: '',
    icon: 'Home',
    color: 'bg-blue-100 text-blue-800'
  })

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.displayName || !newCategory.description) return

    const category: Category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '_'),
      name: newCategory.name.toLowerCase().replace(/\s+/g, '_'),
      displayName: newCategory.displayName,
      description: newCategory.description,
      icon: newCategory.icon,
      color: newCategory.color,
      itemCount: 0,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setCategories([...categories, category])
    setNewCategory({ name: '', displayName: '', description: '', icon: 'Home', color: 'bg-blue-100 text-blue-800' })
    setIsAddDialogOpen(false)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      displayName: category.displayName,
      description: category.description,
      icon: category.icon,
      color: category.color
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return

    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id 
        ? {
            ...category,
            name: newCategory.name.toLowerCase().replace(/\s+/g, '_'),
            displayName: newCategory.displayName,
            description: newCategory.description,
            icon: newCategory.icon,
            color: newCategory.color
          }
        : category
    )

    setCategories(updatedCategories)
    setEditingCategory(null)
    setNewCategory({ name: '', displayName: '', description: '', icon: 'Home', color: 'bg-blue-100 text-blue-800' })
    setIsEditDialogOpen(false)
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? This will affect all knowledge items in this category.')) {
      setCategories(categories.filter(category => category.id !== id))
    }
  }

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, isActive: !category.isActive }
        : category
    ))
  }

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconOptions.find(option => option.value === iconName)?.icon || Home
    return <IconComponent className="h-5 w-5" />
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
              <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new category for organizing knowledge items
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Category Name</label>
                      <Input
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="e.g., company_overview"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Display Name</label>
                      <Input
                        value={newCategory.displayName}
                        onChange={(e) => setNewCategory({...newCategory, displayName: e.target.value})}
                        placeholder="e.g., Company Overview"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                        placeholder="Brief description of this category"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Icon</label>
                        <select
                          value={newCategory.icon}
                          onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          {iconOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Color</label>
                        <select
                          value={newCategory.color}
                          onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          {colorOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCategory}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
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
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {getIconComponent(category.icon)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.displayName}</CardTitle>
                      <Badge variant={category.isActive ? "default" : "secondary"}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={category.isActive ? "text-orange-600" : "text-green-600"}
                    >
                      {category.isActive ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {category.itemCount} knowledge items
                  </span>
                  <span className="text-gray-400">
                    ID: {category.name}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {categories.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No categories found. Create your first category to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category Name</label>
              <Input
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="e.g., company_overview"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <Input
                value={newCategory.displayName}
                onChange={(e) => setNewCategory({...newCategory, displayName: e.target.value})}
                placeholder="e.g., Company Overview"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Brief description of this category"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Icon</label>
                <select
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Color</label>
                <select
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                  className="w-full p-2 border rounded-md"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateCategory}>
                <Edit className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
