export interface KnowledgeItem {
  id: string | number
  category: string
  title: string
  content: string
  keywords: string[]
  route?: string
  createdAt: string
  updatedAt: string
}

export interface KnowledgeSource {
  name: string
  path: string
  description: string
}

export const knowledgeSources: KnowledgeSource[] = [
  {
    name: 'Core Knowledge Base',
    path: '/spt-comprehensive-knowledge.json',
    description: 'Main company and scheme information'
  },
  {
    name: 'Psychological Planning',
    path: '/knowledge/psychological-faqs.json',
    description: 'Behavioral and psychological aspects of pension planning'
  },
  {
    name: 'Contribution Strategies',
    path: '/knowledge/contribution-strategies.json',
    description: 'Optimization and strategies for pension contributions'
  },
  {
    name: 'Investment Strategies',
    path: '/knowledge/investment-strategies.json',
    description: 'Portfolio management and investment guidance'
  },
  {
    name: 'Benefit Claims & Withdrawals',
    path: '/knowledge/benefit-claims.json',
    description: 'Retirement benefit claiming and withdrawal strategies'
  },
  {
    name: 'Digital Services & Technology',
    path: '/knowledge/digital-services.json',
    description: 'Digital platform features and technology support'
  },
  {
    name: 'Regulatory & Compliance',
    path: '/knowledge/regulatory-compliance.json',
    description: 'NPRA oversight and regulatory protections'
  },
  {
    name: 'Family & Life Planning',
    path: '/knowledge/family-life-planning.json',
    description: 'Family coordination and life event planning'
  },
  {
    name: 'Informal Sector & Specialized Workers',
    path: '/knowledge/informal-sector.json',
    description: 'Pension planning for informal sector workers'
  },
  {
    name: 'Financial Trauma & Recovery',
    path: '/knowledge/financial-trauma.json',
    description: 'Overcoming financial trauma and building confidence'
  },
  {
    name: 'Healthcare & Medical Planning',
    path: '/knowledge/healthcare-planning.json',
    description: 'Healthcare costs and medical planning in retirement'
  },
  {
    name: 'Cybersecurity & Digital Safety',
    path: '/knowledge/cybersecurity.json',
    description: 'Digital security and fraud protection'
  },
  {
    name: 'Crisis & Emergency Planning',
    path: '/knowledge/crisis-emergency.json',
    description: 'Emergency preparedness and crisis management'
  }
]

export async function loadAllKnowledge(): Promise<KnowledgeItem[]> {
  const allKnowledge: KnowledgeItem[] = []
  
  try {
    // Load from all sources
    for (const source of knowledgeSources) {
      try {
        const response = await fetch(source.path)
        if (response.ok) {
          const data = await response.json()
          // Ensure each item has a unique ID by prefixing with source name
          const itemsWithSource = data.map((item: KnowledgeItem) => ({
            ...item,
            id: `${source.name.toLowerCase().replace(/\s+/g, '_')}_${item.id}`
          }))
          allKnowledge.push(...itemsWithSource)
        }
      } catch (error) {
        console.warn(`Failed to load knowledge from ${source.name}:`, error)
      }
    }
    
    // Sort by creation date (newest first)
    allKnowledge.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    return allKnowledge
  } catch (error) {
    console.error('Error loading knowledge:', error)
    return []
  }
}

export async function loadKnowledgeByCategory(category: string): Promise<KnowledgeItem[]> {
  const allKnowledge = await loadAllKnowledge()
  return allKnowledge.filter(item => item.category === category)
}

export async function searchKnowledge(query: string): Promise<KnowledgeItem[]> {
  const allKnowledge = await loadAllKnowledge()
  const lowerQuery = query.toLowerCase()
  
  return allKnowledge.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery) ||
    item.keywords.some(keyword => 
      keyword.toLowerCase().includes(lowerQuery)
    )
  )
}

export function getCategoryStats(knowledgeItems: KnowledgeItem[]) {
  const stats: { [key: string]: number } = {}
  
  knowledgeItems.forEach(item => {
    stats[item.category] = (stats[item.category] || 0) + 1
  })
  
  return stats
}

export function getCategoryLabel(category: string): string {
  return category.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

export function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    company_overview: 'bg-blue-100 text-blue-800',
    pension_schemes: 'bg-green-100 text-green-800',
    schemes: 'bg-green-100 text-green-800',
    faq: 'bg-purple-100 text-purple-800',
    leadership: 'bg-orange-100 text-orange-800',
    trustees: 'bg-orange-100 text-orange-800',
    enrollment: 'bg-red-100 text-red-800',
    claims: 'bg-indigo-100 text-indigo-800',
    member_services: 'bg-pink-100 text-pink-800',
    tax_benefits: 'bg-yellow-100 text-yellow-800',
    investment_management: 'bg-teal-100 text-teal-800',
    investment_strategies: 'bg-teal-100 text-teal-800',
    psychological_planning: 'bg-purple-100 text-purple-800',
    contribution_strategies: 'bg-emerald-100 text-emerald-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}
