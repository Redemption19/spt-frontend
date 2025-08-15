import { comprehensiveKnowledge, faqData, leadershipInfo, schemeDetails } from '@/lib/enhanced-knowledge-base'
import { navItems, footerLinks, pensionSchemes, companyStats, leadershipTeam, timelineEvents, blogPosts, faqs, contactInfo } from '@/lib/constants'

// Enhanced search result interface
export interface EnhancedSearchResult {
  id: string
  title: string
  description: string
  content: string
  category: 'page' | 'service' | 'scheme' | 'form' | 'faq' | 'leadership' | 'blog' | 'calculator' | 'contact' | 'about' | 'legal' | 'career' | 'event' | 'download'
  subcategory?: string
  url: string
  keywords: string[]
  priority: number // 1-5, higher is more important
  section?: string
  lastUpdated?: Date
}

// Comprehensive search index
export const comprehensiveSearchIndex: EnhancedSearchResult[] = [
  // Company & About Pages
  {
    id: 'about-company',
    title: 'About Standard Pensions Trust',
    description: 'Learn about Ghana\'s leading pension administrator and our commitment to securing your financial future.',
    content: 'Standard Pensions Trust (SPT) is Ghana\'s leading pension administrator, offering comprehensive retirement planning solutions and pension schemes for individuals and businesses. We are a licensed pension fund administrator under the National Pensions Regulatory Authority (NPRA) and provide expert management of Tier 2 and Tier 3 pension schemes according to Ghana\'s three-tier pension system established by the National Pensions Act, 2008 (Act 766). Our mission is to secure financial futures for all Ghanaians through innovative pension solutions.',
    category: 'about',
    url: '/about',
    keywords: ['about', 'company', 'standard pensions trust', 'spt', 'ghana', 'pension administrator', 'npra', 'licensed', 'mission', 'vision'],
    priority: 5
  },
  {
    id: 'leadership-team',
    title: 'Leadership Team & Board of Directors',
    description: 'Meet our experienced board of directors and management team leading Standard Pensions Trust.',
    content: `Our leadership team includes Mr. David Abeka Nelson (Managing Director) - KPMG-trained Chartered Accountant with ACCA and ICA Ghana qualifications, Prof. Emmanuel Osei Asiamah PhD (Chairman) - Business consulting expert with 12+ years experience, Mr. Kwadwo Danso-Dodoo Jnr (Member) - Management Consultant and Chartered Accountant, Mr. Michael Parker (Member) - Corporate finance expert with 15+ years experience, and Makafui Afua Honya (Independent Member) - Oxford graduate with strategy execution expertise.`,
    category: 'leadership',
    url: '/about/leadership',
    keywords: ['leadership', 'board', 'directors', 'management', 'david nelson', 'emmanuel asiamah', 'kwadwo danso', 'michael parker', 'makafui honya', 'chairman', 'managing director'],
    priority: 4
  },
  {
    id: 'company-timeline',
    title: 'Company History & Timeline',
    description: 'Explore the history and growth of Standard Pensions Trust from our founding to the present day.',
    content: 'Standard Pensions Trust was established in 2008 with a mission to transform retirement planning in Ghana. Key milestones include launching our Master Trust scheme in 2010, digital transformation in 2013, expanded reach in 2015, innovation award in 2018, mobile services in 2020, ESG investment in 2023.',
    category: 'about',
    url: '/about/timeline',
    keywords: ['history', 'timeline', 'founded', '2008', 'milestones', 'growth', 'expansion', 'innovation'],
    priority: 3
  },

  // Pension Schemes
  {
    id: 'master-trust-scheme',
    title: 'Best Pension Master Trust Scheme (Tier 2)',
    description: 'Mandatory Tier 2 occupational pension scheme with 5% contribution of basic salary for retirement security.',
    content: 'Our Best Pension Master Trust Scheme is a mandatory Tier 2 occupational pension scheme. Contribution: 5% of basic salary contributed by employer monthly. Benefits include lump sum payment at retirement, reduced administrative costs through economies of scale, expert investment management, and full regulatory compliance with NPRA. Eligibility: All formal sector employees whose employers have registered with the scheme.',
    category: 'scheme',
    subcategory: 'tier-2',
    url: '/schemes/master-trust',
    keywords: ['master trust', 'tier 2', 'occupational', '5% contribution', 'employer', 'lump sum', 'formal sector', 'mandatory'],
    priority: 5
  },
  {
    id: 'personal-pension-scheme',
    title: 'Best Personal Pension Scheme (Tier 3)',
    description: 'Flexible Tier 3 voluntary pension plan with tax benefits for enhanced retirement security.',
    content: 'Our Best Personal Pension Scheme is a flexible Tier 3 voluntary pension plan. Contribution: Up to 16.5% of gross income, voluntary contributions. Tax Benefits: Contributions are tax-deductible, providing significant tax savings. Features include complete control over contribution amounts, portability between employers, enhanced retirement security, and emergency access under specific conditions.',
    category: 'scheme',
    subcategory: 'tier-3',
    url: '/schemes/personal-pension',
    keywords: ['personal pension', 'tier 3', 'voluntary', '16.5%', 'tax benefits', 'self-employed', 'flexible', 'deductible'],
    priority: 5
  },
  {
    id: 'provident-fund-scheme',
    title: 'Best Provident Fund Scheme (Tier 3)',
    description: 'Fully funded and privately managed Tier 3 provident fund scheme with tax benefits.',
    content: 'The Best Provident Fund Scheme is a Tier 3 supplementary retirement savings plan under Ghana\'s National Pensions Act, 2008 (Act 766). It allows both employers and employees in the formal sector to contribute additional funds beyond mandatory Tier 1 and Tier 2 schemes. Features include tax reliefs for contributions up to 16.5% of employee salary, flexible contribution options, and professional fund management.',
    category: 'scheme',
    subcategory: 'tier-3',
    url: '/schemes/provident-fund',
    keywords: ['provident fund', 'tier 3', 'savings', 'employer', 'employee', 'formal sector', 'tax reliefs', '16.5%'],
    priority: 4
  },
  {
    id: 'employer-sponsored-schemes',
    title: 'Employer Sponsored Pension Schemes',
    description: 'Comprehensive trustee services for 2nd & 3rd Tier pensions with full establishment ownership.',
    content: 'Customized pension schemes designed specifically for your organization\'s unique needs. Features include full ownership by employers, corporate trustee advantage, customizable fee structure, and trustee services for Tier 2 & Tier 3 schemes. Contribution rates include employer and employee contributions as agreed upon, with tax reliefs for contributions up to 16.5% of basic salary.',
    category: 'scheme',
    subcategory: 'employer',
    url: '/schemes/employer-sponsored',
    keywords: ['employer sponsored', 'customized', 'corporate trustee', 'tier 2', 'tier 3', 'organization', 'ownership'],
    priority: 4
  },

  // Services
  {
    id: 'enrollment-services',
    title: 'Pension Enrollment Services',
    description: 'Secure your future in just a few steps. Learn how to enroll in our pension schemes as an individual or employer.',
    content: 'Individual Enrollment Process: Step 1: Choose Your Scheme, Step 2: Complete Enrollment Form, Step 3: Submit Documentation (Ghana Card, SSNIT number, proof of employment), Step 4: Account Setup, Step 5: Begin Contributions. Required documents include Ghana Card or passport, SSNIT number, proof of employment, bank account details, and beneficiary information.',
    category: 'service',
    url: '/services/enrollment',
    keywords: ['enrollment', 'registration', 'join', 'signup', 'ghana card', 'ssnit', 'documents', 'individual', 'employer'],
    priority: 5
  },
  {
    id: 'self-service-center',
    title: 'Self-Service Centre',
    description: 'Access forms, check status, and manage your pension information easily and securely.',
    content: 'Submit requests, download forms, and manage your pension information. Available forms include Employer Enrollment Form, Employee Enrollment Form, Tier 2 Benefit Claim Form, Tier 2 Beneficiary Claim Form, Tier 3 Benefit Claim Form, Tier 3 Beneficiary Claim Form, and Personal Pension Claim Form. All forms are available for download and online submission.',
    category: 'service',
    url: '/services/self-service-center',
    keywords: ['self-service', 'forms', 'download', 'submit', 'manage', 'benefit claims', 'enrollment', 'beneficiary'],
    priority: 5
  },
  {
    id: 'member-portal',
    title: 'Member Portal - Digital Services',
    description: 'Access your pension account, check balances, update information, and manage your retirement planning.',
    content: 'Member Portal Features include 24/7 account access, real-time balance checking, contribution history tracking, statement downloads, personal detail updates, beneficiary management. Available services: fund performance monitoring, contribution planning tools, retirement projections, document downloads, online form submissions, secure messaging with customer service. Login requirements: Member account number and secure password.',
    category: 'service',
    url: '/member-portal',
    keywords: ['member portal', 'online access', 'balance checking', 'statements', 'account', 'login', 'digital services', 'secure'],
    priority: 5
  },
  {
    id: 'pension-calculator',
    title: 'Pension Calculator & Planning Tools',
    description: 'Calculate your estimated pension benefits at retirement based on your current salary, age, and contribution levels.',
    content: 'Comprehensive Pension Calculator with advanced tools calculating Tier 1 SSNIT, Tier 2 Occupational, and Tier 3 Voluntary pension projections. Input parameters include current age, retirement age, salary, contribution history, investment return assumptions. Results include monthly pension estimates, lump sum projections, survivor benefits, invalidity benefits, total retirement income.',
    category: 'calculator',
    url: '/pension-calculator',
    keywords: ['pension calculator', 'retirement planning', 'estimates', 'projections', 'benefits', 'tier 1', 'tier 2', 'tier 3', 'ssnit'],
    priority: 5
  },

  // Forms
  {
    id: 'tier-2-benefit-claim',
    title: 'Tier 2 Benefit Claim Form',
    description: 'Submit your claim for Tier 2 pension benefits at retirement.',
    content: 'Complete the Tier 2 Benefit Claim Form to claim your mandatory occupational pension benefits. Required information includes contributor name, SSNIT number, scheme member ID, Ghana Card ID, employment history, and bank details. Processing time is typically 10-15 working days after approval.',
    category: 'form',
    url: '/forms/tier-2-benefit-claim',
    keywords: ['tier 2', 'benefit claim', 'retirement', 'form', 'ssnit', 'ghana card', 'processing', 'occupational pension'],
    priority: 4
  },
  {
    id: 'tier-3-benefit-claim',
    title: 'Tier 3 Benefit Claim Form',
    description: 'Submit your claim for Tier 3 pension benefits and voluntary contributions.',
    content: 'Claim your Tier 3 voluntary pension benefits using this form. Submit after meeting withdrawal conditions (typically after 10 years or at retirement). Required documentation includes proof of eligibility and employment termination letter if applicable.',
    category: 'form',
    url: '/forms/tier-3-benefit-claim',
    keywords: ['tier 3', 'benefit claim', 'voluntary', 'withdrawal', '10 years', 'retirement', 'personal pension'],
    priority: 4
  },
  {
    id: 'employee-enrollment-form',
    title: 'Employee Enrollment Form',
    description: 'Online form for individual employees joining a pension scheme.',
    content: 'Complete enrollment form for individual employees. Required information includes scheme details, personal particulars (name, Ghana Card, SSNIT, contact info), employment details, next of kin information, and beneficiary details. Supports multiple beneficiaries with percentage allocation.',
    category: 'form',
    url: '/forms/employee-enrollment',
    keywords: ['employee enrollment', 'individual', 'ghana card', 'ssnit', 'beneficiaries', 'personal details', 'employment'],
    priority: 5
  },
  {
    id: 'employer-enrollment-form',
    title: 'Employer Enrollment Form',
    description: 'Register your company pension scheme with Standard Pensions Trust.',
    content: 'Employer registration form for companies joining our pension schemes. Includes company details, scheme selection, employee information, and regulatory compliance documentation. Supports both Tier 2 and Tier 3 scheme registration.',
    category: 'form',
    url: '/forms/employer-enrollment',
    keywords: ['employer enrollment', 'company', 'registration', 'tier 2', 'tier 3', 'regulatory', 'compliance'],
    priority: 4
  },

  // FAQ Content
  ...faqData.map((faq, index) => ({
    id: `faq-${index + 1}`,
    title: faq.question,
    description: faq.answer.substring(0, 150) + '...',
    content: `Q: ${faq.question}\nA: ${faq.answer}`,
    category: 'faq' as const,
    url: '/services/faq',
    keywords: faq.question.toLowerCase().split(' ').concat(faq.answer.toLowerCase().split(' ')).filter(word => word.length > 3),
    priority: 3
  })),

  // Blog Posts
  ...blogPosts.map(post => ({
    id: `blog-${post.slug}`,
    title: post.title,
    description: post.excerpt,
    content: post.content,
    category: 'blog' as const,
    subcategory: post.category.toLowerCase(),
    url: `/media/blog/${post.slug}`,
    keywords: [...(post.tags || []).map(tag => tag.toLowerCase()), ...post.title.toLowerCase().split(' ')],
    priority: 3,
    lastUpdated: post.updatedAt || post.publishedAt
  })),

  // Contact Information
  {
    id: 'contact-info',
    title: 'Contact Information & Office Locations',
    description: 'Get in touch with Standard Pensions Trust through our headquarters and branch offices.',
    content: `Contact Standard Pensions Trust: Headquarters at 42 Nii Nortei Nyanchi Street Dzorwulu, Accra-Ghana. Phone: +233(0)302 780 765, Email: info@standardpensionstrust.com. Branch offices in Greater Accra, Takoradi, and Kumasi. Office hours: Monday - Friday: 8:00 AM - 5:00 PM.`,
    category: 'contact',
    url: '/contact',
    keywords: ['contact', 'phone', 'email', 'address', 'office', 'headquarters', 'accra', 'takoradi', 'kumasi', 'branches'],
    priority: 5
  },

  // Media & Events
  {
    id: 'events-media',
    title: 'Events & Seminars',
    description: 'Join our retirement planning seminars, client workshops, and educational webinars.',
    content: 'Participate in our events including Annual Retirement Planning Seminars, Client Workshops on Pension Benefits, and webinars on understanding Tier 2 and Tier 3 pensions. Events cover investment strategies, pension options, benefit access, and interactive Q&A sessions.',
    category: 'event',
    url: '/media/events',
    keywords: ['events', 'seminars', 'workshops', 'webinars', 'retirement planning', 'investment strategies', 'education'],
    priority: 3
  },

  // Downloads & Resources
  {
    id: 'downloads-resources',
    title: 'Downloads & Resources',
    description: 'Download forms, brochures, and financial statements from our resource center.',
    content: 'Available downloads include pension enrollment forms, withdrawal request forms, beneficiary nomination forms, scheme brochures (Tier 2 and Tier 3), voluntary contributions information, and annual financial statements. All resources are available in PDF format.',
    category: 'download',
    url: '/media/downloads',
    keywords: ['downloads', 'forms', 'brochures', 'resources', 'pdf', 'financial statements', 'enrollment', 'withdrawal'],
    priority: 4
  },

  // Careers
  {
    id: 'careers-opportunities',
    title: 'Career Opportunities',
    description: 'Explore career opportunities and join the Standard Pensions Trust team.',
    content: 'Career opportunities include Senior Frontend Developer, Pension Administrator, Investment Analyst, and Customer Service Representative positions. We offer competitive packages, professional development, and opportunities to make a difference in retirement planning.',
    category: 'career',
    url: '/about/careers',
    keywords: ['careers', 'jobs', 'opportunities', 'developer', 'administrator', 'analyst', 'customer service', 'employment'],
    priority: 3
  },

  // Tax Benefits & Regulations
  {
    id: 'tax-benefits',
    title: 'Tax Benefits & Incentives',
    description: 'Understanding tax advantages of pension contributions and regulatory compliance.',
    content: 'Tier 3 Tax Deductions: Contributions up to 16.5% of gross income are tax-deductible. Employer Benefits: Employer contributions are tax-deductible business expenses. Tax-Free Growth: Investment returns grow tax-free until withdrawal. Withdrawal Tax Treatment: Tax-free withdrawals after 10 years for formal sector employees.',
    category: 'page',
    subcategory: 'tax',
    url: '/services/faq',
    keywords: ['tax benefits', 'deductions', '16.5%', 'tax-free', 'ghana revenue authority', 'tax certificates', 'corporate tax'],
    priority: 4
  },

  // Three-Tier System Education
  {
    id: 'three-tier-system',
    title: 'Ghana\'s Three-Tier Pension System',
    description: 'Understanding Ghana\'s comprehensive three-tier pension system and how each tier works.',
    content: 'Ghana operates a three-tier pension system: Tier 1 SSNIT (Social Security and National Insurance Trust) - mandatory basic pension managed by government providing 13.5% worker contribution. Tier 2 Occupational Pension - mandatory scheme with 5% employer contribution to licensed private trustees. Tier 3 Voluntary Personal Pension - optional additional savings with up to 16.5% contribution.',
    category: 'page',
    subcategory: 'education',
    url: '/schemes',
    keywords: ['three-tier', 'pension system', 'ssnit', 'tier 1', 'tier 2', 'tier 3', 'ghana', 'occupational', 'voluntary', 'mandatory'],
    priority: 5
  }
]

// Enhanced search function with ranking and fuzzy matching
export function searchComprehensive(query: string, options?: {
  categories?: string[]
  limit?: number
  includeContent?: boolean
  fuzzyMatch?: boolean
}): EnhancedSearchResult[] {
  if (!query.trim()) return []

  const {
    categories = [],
    limit = 20,
    includeContent = false,
    fuzzyMatch = true
  } = options || {}

  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 2)

  const results = comprehensiveSearchIndex
    .filter(item => categories.length === 0 || categories.includes(item.category))
    .map(item => {
      let score = 0
      const matchedTerms: string[] = []

      // Title matching (highest weight)
      const titleLower = item.title.toLowerCase()
      if (titleLower.includes(normalizedQuery)) {
        score += 10 * item.priority
        matchedTerms.push('title-exact')
      } else {
        queryWords.forEach(word => {
          if (titleLower.includes(word)) {
            score += 5 * item.priority
            matchedTerms.push(`title-${word}`)
          }
        })
      }

      // Description matching
      const descriptionLower = item.description.toLowerCase()
      if (descriptionLower.includes(normalizedQuery)) {
        score += 5 * item.priority
        matchedTerms.push('description-exact')
      } else {
        queryWords.forEach(word => {
          if (descriptionLower.includes(word)) {
            score += 2 * item.priority
            matchedTerms.push(`description-${word}`)
          }
        })
      }

      // Keywords matching
      item.keywords.forEach(keyword => {
        if (keyword.includes(normalizedQuery)) {
          score += 8 * item.priority
          matchedTerms.push(`keyword-${keyword}`)
        } else {
          queryWords.forEach(word => {
            if (keyword.includes(word)) {
              score += 3 * item.priority
              matchedTerms.push(`keyword-${keyword}`)
            }
          })
        }
      })

      // Content matching (if enabled)
      if (includeContent && item.content) {
        const contentLower = item.content.toLowerCase()
        if (contentLower.includes(normalizedQuery)) {
          score += 3 * item.priority
          matchedTerms.push('content-exact')
        } else {
          queryWords.forEach(word => {
            if (contentLower.includes(word)) {
              score += 1 * item.priority
              matchedTerms.push(`content-${word}`)
            }
          })
        }
      }

      // Fuzzy matching for typos (if enabled)
      if (fuzzyMatch && score === 0) {
        const titleWords = titleLower.split(/\s+/)
        queryWords.forEach(queryWord => {
          titleWords.forEach(titleWord => {
            if (titleWord.length > 3 && queryWord.length > 3) {
              const similarity = calculateSimilarity(queryWord, titleWord)
              if (similarity > 0.7) {
                score += 1 * item.priority
                matchedTerms.push(`fuzzy-${titleWord}`)
              }
            }
          })
        })
      }

      return {
        ...item,
        score,
        matchedTerms
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      // Primary sort by score
      if (b.score !== a.score) return b.score - a.score
      // Secondary sort by priority
      if (b.priority !== a.priority) return b.priority - a.priority
      // Tertiary sort by title length (shorter titles first)
      return a.title.length - b.title.length
    })
    .slice(0, limit)

  return results
}

// Helper function for fuzzy string matching
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1
  
  if (longer.length === 0) return 1.0
  
  const distance = levenshteinDistance(longer, shorter)
  return (longer.length - distance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  
  return matrix[str2.length][str1.length]
}

// Search suggestion function
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  if (!query.trim()) return []

  const suggestions = new Set<string>()
  const normalizedQuery = query.toLowerCase()

  // Add suggestions from titles and keywords
  comprehensiveSearchIndex.forEach(item => {
    // Extract relevant terms from title
    const titleWords = item.title.toLowerCase().split(/\s+/)
    titleWords.forEach(word => {
      if (word.length > 3 && word.startsWith(normalizedQuery.substring(0, 3))) {
        suggestions.add(word)
      }
    })

    // Extract relevant keywords
    item.keywords.forEach(keyword => {
      if (keyword.length > 3 && keyword.startsWith(normalizedQuery.substring(0, 3))) {
        suggestions.add(keyword)
      }
    })
  })

  return Array.from(suggestions).slice(0, limit)
}

// Category-based search
export function searchByCategory(category: string, limit: number = 10): EnhancedSearchResult[] {
  return comprehensiveSearchIndex
    .filter(item => item.category === category)
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
}

// Recent/popular searches (you can enhance this with analytics)
export const popularSearchTerms = [
  'pension calculator',
  'tier 2 benefits',
  'tier 3 tax benefits',
  'enrollment form',
  'member portal login',
  'benefit claims',
  'retirement planning',
  'contact information',
  'investment performance',
  'withdrawal conditions'
]
