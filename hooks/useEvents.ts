'use client'

import { useState, useEffect } from 'react'
import { eventsApi } from '@/lib/api/services'

// Event interface that matches backend API response
export interface Event {
  id: number
  title: string
  slug: string
  description: string
  event_date: string
  event_time: string
  venue: string
  banner?: string
  type: 'physical' | 'webinar'
  region: 'local' | 'regional' | 'national'
  status: 'draft' | 'published' | 'cancelled' | 'completed' // Backend status options
  capacity: number
  registration_deadline?: string
  is_featured: boolean
  created_at: string
  updated_at: string
  speakers?: any[]
  agenda?: any[]
  registration_count?: number
  available_spots?: number
  is_full?: boolean
  registration_deadline_passed?: boolean
}

interface UseEventsOptions {
  type?: string
  region?: string
  status?: string
  limit?: number
}

interface UseEventsReturn {
  events: Event[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEvents(options: UseEventsOptions = {}): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params: any = {}
      if (options.type) params.type = options.type
      if (options.region) params.region = options.region
      if (options.status) params.status = options.status
      if (options.limit) params.per_page = options.limit

      const response = await eventsApi.getEvents(params)
      setEvents(response.data.data as unknown as Event[])
    } catch (err) {
      console.error('Error fetching events:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [options.type, options.region, options.status, options.limit])

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  }
}

export function useUpcomingEvents(limit: number = 6): UseEventsReturn {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await eventsApi.getUpcoming({ limit })
      setEvents(response.data.data as unknown as Event[])
    } catch (err) {
      console.error('Error fetching upcoming events:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch upcoming events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [limit])

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
  }
} 