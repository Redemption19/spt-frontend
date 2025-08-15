import { Metadata } from 'next'
import AboutPageContent from './components/AboutPageContent'

export const metadata: Metadata = {
  title: 'Company Overview',
  description: 'Learn about Standard Pensions Trust, our mission, vision, and values that drive our commitment to securing your financial future.',
}

export default function CompanyOverviewPage() {
  return <AboutPageContent />
}