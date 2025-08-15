import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Standard Pensions Trust protects and manages your personal information in accordance with Ghana\'s data protection regulations.',
  keywords: ['privacy policy', 'data protection', 'Ghana', 'pension', 'personal information', 'GDPR'],
  openGraph: {
    title: 'Privacy Policy | Standard Pensions Trust',
    description: 'Learn how Standard Pensions Trust protects and manages your personal information in accordance with Ghana\'s data protection regulations.',
    type: 'website',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 