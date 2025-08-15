import { format, parseISO, isPast, isBefore } from 'date-fns'
import { Event } from '@/hooks/useEvents'

// Transform backend event to frontend format
export function transformEvent(backendEvent: any): Event & {
  date: string
  time: string
  eventStatus: 'upcoming' | 'past' // Use different name to avoid conflict
  isUpcoming: boolean
  isPast: boolean
  isRegistrationOpen: boolean
  availableSpots: number
  registrationStatusText: string
  registrationStatusType: 'available' | 'limited' | 'full' | 'closed'
} {
  const eventDate = parseISO(backendEvent.event_date)
  const registrationDeadline = backendEvent.registration_deadline ? parseISO(backendEvent.registration_deadline) : null
  const now = new Date()
  
  const isEventPast = isPast(eventDate) || backendEvent.status === 'completed'
  const isRegistrationDeadlinePassed = registrationDeadline ? isBefore(registrationDeadline, now) : false
  const availableSpots = backendEvent.available_spots || (backendEvent.capacity - (backendEvent.registration_count || 0))
  const isFull = availableSpots <= 0
  
  // Determine registration status
  let registrationStatusText = 'Register Now'
  let registrationStatusType: 'available' | 'limited' | 'full' | 'closed' = 'available'
  
  if (backendEvent.status === 'cancelled') {
    registrationStatusText = 'Event Cancelled'
    registrationStatusType = 'closed'
  } else if (backendEvent.status === 'completed' || isEventPast) {
    registrationStatusText = 'Event Ended'
    registrationStatusType = 'closed'
  } else if (backendEvent.status === 'draft') {
    registrationStatusText = 'Coming Soon'
    registrationStatusType = 'closed'
  } else if (isRegistrationDeadlinePassed) {
    registrationStatusText = 'Registration Closed'
    registrationStatusType = 'closed'
  } else if (isFull) {
    registrationStatusText = 'Event Full'
    registrationStatusType = 'full'
  } else if (availableSpots <= 10) {
    registrationStatusText = `${availableSpots} spots left`
    registrationStatusType = 'limited'
  }

  return {
    ...backendEvent,
    date: format(eventDate, 'MMMM d, yyyy'),
    time: backendEvent.event_time || 'Time TBD',
    eventStatus: isEventPast ? 'past' : 'upcoming', // Use different property name
    isUpcoming: !isEventPast,
    isPast: isEventPast,
    isRegistrationOpen: !isEventPast && !isRegistrationDeadlinePassed && !isFull,
    availableSpots,
    registrationStatusText,
    registrationStatusType,
    banner: backendEvent.banner ? `http://127.0.0.1:8000/storage/${backendEvent.banner}` : undefined,
  }
}

// Format event date for display
export function formatEventDate(dateString: string): string {
  const date = parseISO(dateString)
  return format(date, 'MMMM d, yyyy')
}

// Format event time for display
export function formatEventTime(timeString: string): string {
  return timeString || 'Time TBD'
}

// Get event type display text
export function getEventTypeText(type: string): string {
  switch (type) {
    case 'webinar':
      return 'Virtual'
    case 'physical':
      return 'In-Person'
    default:
      return type
  }
}

// Get region display text
export function getRegionText(region: string): string {
  switch (region) {
    case 'local':
      return 'Local'
    case 'regional':
      return 'Regional'
    case 'national':
      return 'National'
    default:
      return region
  }
}

// Check if event is sold out
export function isEventSoldOut(event: any): boolean {
  if (!event.capacity || !event.registration_count) return false
  return event.registration_count >= event.capacity
}

// Get registration button variant based on status
export function getRegistrationButtonVariant(statusType: string): 'default' | 'destructive' | 'outline' | 'secondary' {
  switch (statusType) {
    case 'available':
      return 'default'
    case 'limited':
      return 'outline'
    case 'full':
    case 'closed':
      return 'secondary'
    default:
      return 'default'
  }
} 