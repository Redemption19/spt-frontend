'use client'

import { useState, useEffect } from 'react'
import { eventsApi } from '@/lib/api/services'
import { Event } from './useEvents'

interface UseEventReturn {
  event: Event | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useEvent(slug: string): UseEventReturn {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvent = async () => {
    if (!slug) return
    
    try {
      setLoading(true)
      setError(null)
      
      const response = await eventsApi.getEvent(slug)
      setEvent(response.data.data as unknown as Event)
    } catch (err) {
      console.error('Error fetching event:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch event')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvent()
  }, [slug])

  return {
    event,
    loading,
    error,
    refetch: fetchEvent,
  }
} 