import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review the terms and conditions governing your use of Standard Pensions Trust services and website.',
  keywords: ['terms and conditions', 'legal', 'Ghana', 'pension', 'service agreement', 'user terms'],
  openGraph: {
    title: 'Terms & Conditions | Standard Pensions Trust',
    description: 'Review the terms and conditions governing your use of Standard Pensions Trust services and website.',
    type: 'website',
  },
}

export default function TermsConditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 