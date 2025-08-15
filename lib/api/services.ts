import apiClient from './client'
import type {
  ApiResponse,
  PaginatedResponse,
  BlogPost,
  Event,
  HeroSection,
  Testimonial,
  Download,
  ContactForm,
  NewsletterSubscription,
  DashboardStats,
  RecentActivity,
  GalleryImage,
  Survey,
  SurveyResponse,
  User,
  Career,
  CareerFilters,
  CareerStatistics
} from '@/lib/types/api'

// Blog API
export const blogApi = {
  // Get all blog posts
  getPosts: (params?: { page?: number; category?: string; tag?: string; search?: string }) =>
    apiClient.get<PaginatedResponse<BlogPost>>('/blog', { params }),

  // Get single blog post by slug
  getPost: (slug: string) =>
    apiClient.get<ApiResponse<BlogPost>>(`/blog/${slug}`),

  // Get blog categories
  getCategories: () =>
    apiClient.get<ApiResponse<any[]>>('/blog/categories'),

  // Get blog tags
  getTags: () =>
    apiClient.get<ApiResponse<any[]>>('/blog/tags'),

  // Get blog authors
  getAuthors: () =>
    apiClient.get<ApiResponse<any[]>>('/blog/authors'),
}

// Events API
export const eventsApi = {
  // Get all events
  getEvents: (params?: { page?: number; type?: string; region?: string; status?: string; per_page?: number; upcoming?: boolean; search?: string }) =>
    apiClient.get<PaginatedResponse<Event>>('/events', { params }),

  // Get upcoming events
  getUpcoming: (params?: { limit?: number }) =>
    apiClient.get<ApiResponse<Event[]>>('/events/upcoming', { params }),

  // Get featured events
  getFeatured: () =>
    apiClient.get<ApiResponse<Event[]>>('/events/featured'),

  // Get single event by slug
  getEvent: (slug: string) =>
    apiClient.get<ApiResponse<Event>>(`/events/${slug}`),

  // Register for event
  registerForEvent: (slug: string, data: { 
    name: string; 
    email: string; 
    phone?: string; 
    organization?: string; 
    position?: string; 
    special_requirements?: string; 
  }) =>
    apiClient.post<ApiResponse<any>>(`/events/${slug}/register`, data),

  // Get event speakers
  getSpeakers: (eventId: number) =>
    apiClient.get<ApiResponse<any[]>>(`/events/${eventId}/speakers`),

  // Get event agenda
  getAgenda: (eventId: number) =>
    apiClient.get<ApiResponse<any[]>>(`/events/${eventId}/agenda`),
}

// Content API
export const contentApi = {
  // Get hero sections
  getHeroSections: () =>
    apiClient.get<ApiResponse<HeroSection[]>>('/hero-sections'),

  // Get testimonials
  getTestimonials: (featured?: boolean) =>
    apiClient.get<ApiResponse<Testimonial[]>>('/testimonials', {
      params: featured ? { featured: true } : undefined
    }),

  // Get downloads
  getDownloads: (params?: { category?: string; search?: string; page?: number }) =>
    apiClient.get<PaginatedResponse<Download>>('/downloads', { params }),

  // Get download categories
  getDownloadCategories: () =>
    apiClient.get<ApiResponse<any[]>>('/downloads/categories'),

  // Get featured downloads
  getFeaturedDownloads: () =>
    apiClient.get<ApiResponse<Download[]>>('/downloads/featured'),

  // Get downloads by category
  getDownloadsByCategory: (category: string, params?: { page?: number }) =>
    apiClient.get<PaginatedResponse<Download>>(`/downloads/category/${category}`, { params }),

  // Download file (returns download info)
  downloadFile: (id: number) =>
    apiClient.get<ApiResponse<any>>(`/downloads/${id}/download`),
}

// Forms API
export const formsApi = {
  // Submit contact form
  submitContact: (data: ContactForm) =>
    apiClient.post<ApiResponse<any>>('/contact', data),

  // Subscribe to newsletter
  subscribeNewsletter: (data: NewsletterSubscription) =>
    apiClient.post<ApiResponse<any>>('/newsletter/subscribe', data),

  // Submit survey response
  submitSurvey: (surveyId: number, data: SurveyResponse) =>
    apiClient.post<ApiResponse<any>>(`/surveys/${surveyId}/respond`, data),
}

// Gallery API
export const galleryApi = {
  // Get gallery images
  getImages: (params?: { category?: string; page?: number }) =>
    apiClient.get<PaginatedResponse<GalleryImage>>('/gallery', { params }),

  // Get gallery categories
  getCategories: () =>
    apiClient.get<ApiResponse<any[]>>('/gallery/categories'),
}

// Surveys API
export const surveysApi = {
  // Get active surveys
  getSurveys: () =>
    apiClient.get<ApiResponse<Survey[]>>('/surveys'),

  // Get single survey
  getSurvey: (id: number) =>
    apiClient.get<ApiResponse<Survey>>(`/surveys/${id}`),
}

// Dashboard API (Protected)
export const dashboardApi = {
  // Get dashboard stats
  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats'),

  // Get recent activities
  getRecentActivities: (limit?: number) =>
    apiClient.get<ApiResponse<RecentActivity[]>>('/dashboard/recent', {
      params: limit ? { limit } : undefined
    }),

  // Get analytics data
  getAnalytics: (type: string, period?: string) =>
    apiClient.get<ApiResponse<any>>(`/dashboard/analytics/${type}`, {
      params: period ? { period } : undefined
    }),
}

// User API (Protected)
export const userApi = {
  // Get current user
  getCurrentUser: () =>
    apiClient.get<ApiResponse<User>>('/user'),

  // Update user profile
  updateProfile: (data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>('/user', data),

  // Get user's events
  getUserEvents: () =>
    apiClient.get<ApiResponse<Event[]>>('/user/events'),

  // Get user's downloads
  getUserDownloads: () =>
    apiClient.get<ApiResponse<Download[]>>('/user/downloads'),
}

// Search API
export const searchApi = {
  // Global search
  search: (query: string, type?: string) =>
    apiClient.get<ApiResponse<any>>('/search', {
      params: { q: query, type }
    }),
}

// Survey API Types
export interface SurveySubmissionData {
  survey_type: string;
  responses: Record<string, any>;
  respondent_name?: string;
  respondent_email?: string;
  source?: string;
  anonymous?: boolean;
  completion_time?: number;
}

export interface SurveyTypes {
  [key: string]: string;
}

export interface SurveyStats {
  total_responses: number;
  responses_this_month: number;
  average_rating: number;
}

// Survey API functions
export const surveyApi = {
  // Get available survey types
  getTypes: async (): Promise<SurveyTypes> => {
    const response = await apiClient.get('/surveys/types');
    return response.data;
  },

  // Submit survey response
  submit: async (data: SurveySubmissionData): Promise<{ id: number; submitted_at: string }> => {
    const response = await apiClient.post('/surveys/submit', data);
    return response.data;
  },

  // Get survey statistics
  getStats: async (surveyType?: string): Promise<SurveyStats> => {
    const endpoint = surveyType ? `/surveys/stats/${surveyType}` : '/surveys/stats';
    const response = await apiClient.get(endpoint);
    return response.data;
  },
};

// Careers API
export const careersApi = {
  // Get all careers
  getCareers: (params?: { 
    page?: number
    search?: string
    department?: string
    location?: string
    employment_type?: string
    experience_level?: string
    featured?: boolean
  }) =>
    apiClient.get<PaginatedResponse<Career>>('/careers', { params }),

  // Get featured careers
  getFeatured: () =>
    apiClient.get<ApiResponse<Career[]>>('/careers/featured'),

  // Get single career by slug
  getCareer: (slug: string) =>
    apiClient.get<ApiResponse<Career>>(`/careers/${slug}`),

  // Get career filters
  getFilters: () =>
    apiClient.get<ApiResponse<CareerFilters>>('/careers/filters'),

  // Get career statistics
  getStatistics: () =>
    apiClient.get<ApiResponse<CareerStatistics>>('/careers/statistics'),

  // Apply for career
  apply: (slug: string, data: FormData) =>
    apiClient.post<ApiResponse<any>>(`/careers/${slug}/apply`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // Check application status
  checkStatus: (data: { email: string; application_id: number }) =>
    apiClient.post<ApiResponse<any>>('/careers/application-status', data),
}
