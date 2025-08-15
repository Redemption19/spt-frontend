'use client'

import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Download, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// export const metadata: Metadata = {
//   title: 'Self-Service Centre',
//   description: 'Submit requests, download forms, and manage your pension information easily and securely.',
// }

interface PensionFormPdf {
  id: number
  title: string
  description: string
  download_url: string
  file_size: number
  download_count: number
}

const forms = [
  {
    name: 'Employer Enrolment Form',
    description: 'For employers registering their company pension scheme',
    type: 'PDF',
    category: 'Employer',
    formType: 'employer_enrollment',
    onlineFormUrl: '/forms/employer-enrollment'
  },
  {
    name: 'Employee Enrolment Form',
    description: 'For individual employees joining a pension scheme',
    type: 'PDF',
    category: 'Employee',
    formType: 'employee_enrollment',
    onlineFormUrl: '/forms/employee-enrollment'
  },
  {
    name: 'Tier 2 Benefit Claim Form',
    description: 'For claiming Tier 2 pension benefits',
    type: 'PDF',
    category: 'Claims',
    formType: 'tier2_benefit_claim',
    onlineFormUrl: '/forms/tier-2-benefit-claim'
  },
  {
    name: 'Tier 2 Beneficiary Claim Form',
    description: 'For beneficiaries claiming Tier 2 benefits',
    type: 'PDF',
    category: 'Claims',
    formType: 'tier2_beneficiary_claim',
    onlineFormUrl: '/forms/tier-2-beneficiary-claim'
  },
  {
    name: 'Tier 3 Benefit Claim Form',
    description: 'For claiming Tier 3 pension benefits',
    type: 'PDF',
    category: 'Claims',
    formType: 'tier3_benefit_claim',
    onlineFormUrl: '/forms/tier-3-benefit-claim'
  },
  {
    name: 'Tier 3 Beneficiary Claim Form',
    description: 'For beneficiaries claiming Tier 3 benefits',
    type: 'PDF',
    category: 'Claims',
    formType: 'tier3_beneficiary_claim',
    onlineFormUrl: '/forms/tier-3-beneficiary-claim'
  },
  {
    name: 'Personal Pension Claim Form',
    description: 'For claiming personal pension benefits',
    type: 'PDF',
    category: 'Claims',
    formType: 'personal_pension_claim',
    onlineFormUrl: '/forms/personal-pension-claim'
  },
]

type Form = {
  name: string
  description: string
  type: string
  category: string
  formType: string
  onlineFormUrl: string
}

export default function SelfServiceCenterPage() {
  const [pensionPdfs, setPensionPdfs] = useState<PensionFormPdf[]>([])
  const [loadingPdfs, setLoadingPdfs] = useState(true)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  useEffect(() => {
    fetchPensionFormPdfs()
  }, [])

  const fetchPensionFormPdfs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/pension-forms/pdfs`)
      const data = await response.json()
      
      if (data.status === 'success') {
        setPensionPdfs(data.data)
      }
    } catch (error) {
      console.error('Error fetching pension form PDFs:', error)
    } finally {
      setLoadingPdfs(false)
    }
  }

  const handleDownloadPdf = async (form: Form) => {
    try {
      // Find the PDF ID from our backend data
      const pdf = pensionPdfs.find(p => {
        const titleLower = p.title.toLowerCase()
        const nameWords = form.name.toLowerCase().split(' ')
        return nameWords.every(word => titleLower.includes(word))
      })

      if (!pdf) {
        // Fallback to static PDF if not found in backend
        window.open(`/forms/${form.formType.replace('_', '-')}.pdf`, '_blank')
        return
      }

      setDownloadingId(pdf.id)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/pension-forms/download-pdf/${pdf.id}`)
      
      if (response.ok) {
        // For direct file download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${form.name.replace(/\s+/g, '_')}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        // Fallback to opening in new tab
        window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/pension-forms/download-pdf/${pdf.id}`, '_blank')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      // Fallback to static PDF
      window.open(`/forms/${form.formType.replace('_', '-')}.pdf`, '_blank')
    } finally {
      setDownloadingId(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getPdfInfo = (form: Form) => {
    const pdf = pensionPdfs.find(p => {
      const titleLower = p.title.toLowerCase()
      const nameWords = form.name.toLowerCase().split(' ')
      return nameWords.every(word => titleLower.includes(word))
    })
    return pdf
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero/Intro Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Self-Service Centre</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Easy access to our forms and services. Submit requests, download forms, and manage your pension information easily and securely.
            </p>
          </div>

          {/* Loading State */}
          {loadingPdfs && (
            <div className="text-center mb-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading form information...</p>
            </div>
          )}

          {/* Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {forms.map((form: Form, index) => {
              const pdfInfo = getPdfInfo(form)
              const isDownloading = downloadingId === pdfInfo?.id
              
              return (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{form.name}</CardTitle>
                        <CardDescription>{form.description}</CardDescription>
                        {pdfInfo && (
                          <div className="text-xs text-muted-foreground mt-2">
                            Size: {formatFileSize(pdfInfo.file_size)} • Downloads: {pdfInfo.download_count}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">
                          {form.type}
                        </span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {form.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleDownloadPdf(form)}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Downloading...
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </>
                        )}
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={form.onlineFormUrl} className="flex items-center justify-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Fill Online
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Status Check Section */}
          <div className="bg-card border border-border/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Check Form Status</h2>
            <p className="text-muted-foreground mb-6">
              Already submitted a form? Track your submission status using your reference number.
            </p>
            <Button asChild variant="outline">
              <Link href="/services/form-status" className="flex items-center">
                Check Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Submission Instructions */}
          <div className="bg-card border border-border/50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">How to Submit Forms</h2>
            <p className="text-muted-foreground mb-6">
              Submit forms via email, in person, or upload through the portal. Our team will process your request and get back to you within 2-3 business days.
            </p>
            <Button asChild variant="outline">
              <Link href="/contact" className="flex items-center">
                Need Help? Contact Our Office
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}