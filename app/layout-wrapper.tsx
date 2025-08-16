'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Header />}
      <main>{children}</main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </>
  )
}
