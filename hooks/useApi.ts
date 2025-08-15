'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogApi, eventsApi, contentApi, formsApi, galleryApi, surveysApi, dashboardApi, userApi, searchApi, careersApi } from '@/lib/api/services'
import type { ContactForm, NewsletterSubscription, SurveyResponse } from '@/lib/types/api'

// Blog Hooks
export function useBlogPosts(params?: { page?: number; per_page?: number; category?: string; tag?: string; search?: string }) {
  return useQuery({
    queryKey: ['blog-posts', params],
    queryFn: () => blogApi.getPosts(params).then(res => res.data),
  })
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => blogApi.getPost(slug).then(res => res.data),
    enabled: !!slug,
  })
}

export function useBlogCategories() {
  return useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => blogApi.getCategories().then(res => res.data),
  })
}

export function useBlogTags() {
  return useQuery({
    queryKey: ['blog-tags'],
    queryFn: () => blogApi.getTags().then(res => res.data),
  })
}

export function useBlogAuthors() {
  return useQuery({
    queryKey: ['blog-authors'],
    queryFn: () => blogApi.getAuthors().then(res => res.data),
  })
}

// Events Hooks
export function useEvents(params?: { page?: number; upcoming?: boolean; search?: string }) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: () => eventsApi.getEvents(params).then(res => res.data),
  })
}

export function useEvent(slug: string) {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: () => eventsApi.getEvent(slug).then(res => res.data),
    enabled: !!slug,
  })
}

export function useEventRegistration() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: { name: string; email: string; phone?: string } }) =>
      eventsApi.registerForEvent(slug, data).then(res => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['event', variables.slug] })
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

// Content Hooks
export function useHeroSections() {
  return useQuery({
    queryKey: ['hero-sections'],
    queryFn: () => contentApi.getHeroSections().then(res => res.data),
  })
}

export function useTestimonials(featured?: boolean) {
  return useQuery({
    queryKey: ['testimonials', featured],
    queryFn: () => contentApi.getTestimonials(featured).then(res => res.data),
  })
}

export function useDownloads(params?: { category?: string; search?: string; page?: number }) {
  return useQuery({
    queryKey: ['downloads', params],
    queryFn: () => contentApi.getDownloads(params).then(res => res.data),
  })
}

export function useDownloadCategories() {
  return useQuery({
    queryKey: ['download-categories'],
    queryFn: () => contentApi.getDownloadCategories().then(res => res.data),
  })
}

export function useFeaturedDownloads() {
  return useQuery({
    queryKey: ['featured-downloads'],
    queryFn: () => contentApi.getFeaturedDownloads().then(res => res.data),
  })
}

export function useDownloadFile() {
  return useMutation({
    mutationFn: (id: number) => contentApi.downloadFile(id).then(res => res.data),
  })
}

// Forms Hooks
export function useContactForm() {
  return useMutation({
    mutationFn: (data: ContactForm) => formsApi.submitContact(data).then(res => res.data),
  })
}

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (data: NewsletterSubscription) => formsApi.subscribeNewsletter(data).then(res => res.data),
  })
}

export function useSurveySubmission() {
  return useMutation({
    mutationFn: ({ surveyId, data }: { surveyId: number; data: SurveyResponse }) =>
      formsApi.submitSurvey(surveyId, data).then(res => res.data),
  })
}

// Gallery Hooks
export function useGalleryImages(params?: { category?: string; page?: number }) {
  return useQuery({
    queryKey: ['gallery-images', params],
    queryFn: () => galleryApi.getImages(params).then(res => res.data),
  })
}

export function useGalleryCategories() {
  return useQuery({
    queryKey: ['gallery-categories'],
    queryFn: () => galleryApi.getCategories().then(res => res.data),
  })
}

// Surveys Hooks
export function useSurveys() {
  return useQuery({
    queryKey: ['surveys'],
    queryFn: () => surveysApi.getSurveys().then(res => res.data),
  })
}

export function useSurvey(id: number) {
  return useQuery({
    queryKey: ['survey', id],
    queryFn: () => surveysApi.getSurvey(id).then(res => res.data),
    enabled: !!id,
  })
}

// Dashboard Hooks (Protected)
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardApi.getStats().then(res => res.data),
  })
}

export function useRecentActivities(limit?: number) {
  return useQuery({
    queryKey: ['recent-activities', limit],
    queryFn: () => dashboardApi.getRecentActivities(limit).then(res => res.data),
  })
}

export function useAnalytics(type: string, period?: string) {
  return useQuery({
    queryKey: ['analytics', type, period],
    queryFn: () => dashboardApi.getAnalytics(type, period).then(res => res.data),
    enabled: !!type,
  })
}

// User Hooks (Protected)
export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => userApi.getCurrentUser().then(res => res.data),
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: any) => userApi.updateProfile(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

export function useUserEvents() {
  return useQuery({
    queryKey: ['user-events'],
    queryFn: () => userApi.getUserEvents().then(res => res.data),
  })
}

export function useUserDownloads() {
  return useQuery({
    queryKey: ['user-downloads'],
    queryFn: () => userApi.getUserDownloads().then(res => res.data),
  })
}

// Career Hooks
export function useCareers(params?: { 
  page?: number
  search?: string
  department?: string
  location?: string
  employment_type?: string
  experience_level?: string
  featured?: boolean
}) {
  return useQuery({
    queryKey: ['careers', params],
    queryFn: () => careersApi.getCareers(params).then(res => res.data),
  })
}

export function useCareer(slug: string) {
  return useQuery({
    queryKey: ['career', slug],
    queryFn: () => careersApi.getCareer(slug).then(res => res.data),
    enabled: !!slug,
  })
}

export function useFeaturedCareers() {
  return useQuery({
    queryKey: ['featured-careers'],
    queryFn: () => careersApi.getFeatured().then(res => res.data),
  })
}

export function useCareerFilters() {
  return useQuery({
    queryKey: ['career-filters'],
    queryFn: () => careersApi.getFilters().then(res => res.data.data),
  })
}

export function useCareerStatistics() {
  return useQuery({
    queryKey: ['career-statistics'],
    queryFn: () => careersApi.getStatistics().then(res => res.data.data),
  })
}

export function useCareerApplication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: FormData }) =>
      careersApi.apply(slug, data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['careers'] })
    },
  })
}

export function useApplicationStatus() {
  return useMutation({
    mutationFn: (data: { email: string; application_id: number }) =>
      careersApi.checkStatus(data).then(res => res.data),
  })
}

// Search Hook
export function useSearch(query: string, type?: string) {
  return useQuery({
    queryKey: ['search', query, type],
    queryFn: () => searchApi.search(query, type).then(res => res.data),
    enabled: query.length > 2, // Only search if query is longer than 2 characters
  })
}
