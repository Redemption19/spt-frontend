import { Metadata } from 'next'
import TimelineContent from './components/TimelineContent'

export const metadata: Metadata = {
  title: 'Our Timeline',
  description: 'Explore the history and growth of Standard Pensions Trust from our founding to the present day.',
}

export default function TimelinePage() {
  return <TimelineContent />
}