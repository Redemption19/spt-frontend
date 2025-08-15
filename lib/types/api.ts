// Base API Response
export interface ApiResponse<T> {
  data: T
  message?: string
  status: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

// Blog Types
export interface BlogAuthor {
  id: number
  name: string
  email: string
  bio?: string
  avatar?: string
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  description?: string
}

export interface BlogTag {
  id: number
  name: string
  slug: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  featured_image_url?: string
  category_id: number
  author_id: number
  status: string
  published_at: string
  meta_title?: string
  meta_description?: string
  keywords?: string
  reading_time_minutes?: number
  views?: number
  created_at: string
  updated_at: string
  author?: {
    id: number
    name: string
    avatar?: string
    role?: string
    bio?: string
    twitter?: string
    linkedin?: string
  }
  category?: {
    id: number
    name: string
    slug: string
    description?: string
  }
  tags?: {
    id: number
    name: string
  }[]
}

// Event Types
export interface EventSpeaker {
  id: number
  name: string
  title: string
  bio?: string
  image?: string
}

export interface EventAgenda {
  id: number
  time: string
  title: string
  description?: string
  speaker?: string
}

export interface Event {
  id: number
  title: string
  description: string
  start_date: string
  end_date: string
  location?: string
  featured_image?: string
  max_attendees?: number
  current_attendees: number
  registration_deadline?: string
  created_at: string
  updated_at: string
  speakers: EventSpeaker[]
  agenda: EventAgenda[]
}

// Content Types
export interface HeroSection {
  id: number
  title: string
  subtitle?: string
  background_image?: string
  cta_text?: string
  cta_link?: string
  is_active: boolean
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company?: string
  image?: string
  image_url?: string
  message: string
  category: string
  rating: number
  featured: boolean
  active: boolean
  location?: string
  testimonial_date?: string
  created_at: string
  updated_at: string
}

// Download Types
export interface Download {
  id: number
  title: string
  description?: string
  file_path: string
  category: string
  file_size: number
  download_count: number
  file_type: string
  version?: string
  featured: boolean
  requires_login: boolean
  published_at: string
  created_at: string
  updated_at?: string
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterSubscription {
  email: string
  name?: string
}

// User Types
export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  is_active: boolean
  created_at: string
  roles: Role[]
}

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface Permission {
  id: number
  name: string
}

// Dashboard Types
export interface DashboardStats {
  total_users: number
  total_blog_posts: number
  total_events: number
  total_downloads: number
  recent_registrations: number
  newsletter_subscribers: number
}

export interface RecentActivity {
  id: number
  type: string
  description: string
  user?: string
  created_at: string
}

// Gallery Types
export interface GalleryCategory {
  id: number
  name: string
  slug: string
  description?: string
  active: boolean
  sort_order: number
  images_count?: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: number
  category_id: number
  title: string
  description?: string
  image_path: string
  alt_text?: string
  featured: boolean
  active: boolean
  sort_order: number
  image_size?: string
  image_dimensions?: string
  views: number
  uploaded_at: string
  created_at: string
  updated_at: string
  category?: GalleryCategory
}

// Survey Types
export interface Survey {
  id: number
  title: string
  description?: string
  questions: SurveyQuestion[]
  is_active: boolean
  created_at: string
}

export interface SurveyQuestion {
  id: number
  question: string
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select'
  options?: string[]
  required: boolean
}

export interface SurveyResponse {
  survey_id: number
  responses: Record<string, string | string[]>
}

// Career Types
export interface Career {
  id: number
  title: string
  slug: string
  description: string
  requirements?: string
  responsibilities?: string
  benefits?: string
  department: string
  location: string
  employment_type: 'full_time' | 'part_time' | 'contract' | 'internship'
  experience_level: 'entry' | 'mid' | 'senior' | 'executive'
  salary_range?: string
  salary_negotiable: boolean
  application_deadline?: string
  positions_available: number
  featured: boolean
  active: boolean
  skills_required?: string[]
  qualifications?: string[]
  contact_info?: any
  application_instructions?: string
  status: 'draft' | 'published' | 'closed' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
  // Computed attributes
  is_active?: boolean
  is_featured?: boolean
  days_remaining?: number | null | null
  application_count?: number
  formatted_salary?: string
}

export interface CareerApplication {
  id: number
  career_id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  linkedin_profile?: string
  portfolio_website?: string
  cover_letter: string
  resume_path?: string
  portfolio_files?: string[]
  additional_info?: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected'
  referral_source?: string
  willing_to_relocate: boolean
  expected_salary_range?: string
  available_start_date?: string
  created_at: string
  updated_at: string
  // Computed attributes
  full_name?: string
  status_label?: string
  days_since_application?: number
  resume_url?: string
}

export interface CareerFilters {
  departments: Record<string, string>
  locations: Record<string, string>
  employment_types: Record<string, string>
  experience_levels: Record<string, string>
}

export interface CareerStatistics {
  total_active_positions: number
  featured_positions: number
  departments_hiring: number
  recent_positions: number
}


