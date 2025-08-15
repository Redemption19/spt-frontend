'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, ArrowRight, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface PensionFormPdf {
  id: number
  title: string
  description: string
  download_url: string
  file_size: number
  download_count: number
}

interface PensionFormOptionsProps {
  formType: 'employee' | 'employer' | 'benefit' | 'porting'
  title: string
  description: string
  onlineFormComponent: React.ReactNode
}

export default function PensionFormOptions({ 
  formType, 
  title, 
  description, 
  onlineFormComponent 
}: PensionFormOptionsProps) {
  const [pdfs, setPdfs] = useState<PensionFormPdf[]>([])
  const [loading, setLoading] = useState(true)
  const [showOnlineForm, setShowOnlineForm] = useState(false)

  useEffect(() => {
    fetchPensionFormPdfs()
  }, [])

  const fetchPensionFormPdfs = async () => {
    try {
      // Map each form type to its corresponding PDF
      const formMap = {
        'employee': {
          id: 1,
          title: 'Employee Registration Form',
          description: 'Complete this form to enroll as an employee in our pension scheme',
          download_url: '/documents/EMPLOYEE REGISTRATION FORM.pdf',
          file_size: 500000
        },
        'employer': {
          id: 2,
          title: 'Employer Registration Form',
          description: 'Register your organization as an employer in our pension scheme',
          download_url: '/documents/EMPLOYER FORM-1.pdf',
          file_size: 500000
        },
        'benefit': {
          id: 3,
          title: 'Benefit Withdrawal Form',
          description: 'Use this form to claim your pension benefits',
          download_url: '/documents/Benefit Withdrawal Form-rev.pdf',
          file_size: 500000
        },
        'porting': {
          id: 4,
          title: 'Fund Porting Form',
          description: 'Transfer your pension funds between schemes',
          download_url: '/documents/FUND PORTING FORM12.pdf',
          file_size: 500000
        }
      }

      const formData = formMap[formType]
      if (formData) {
        setPdfs([{
          ...formData,
          download_count: 0
        }])
      }
    } catch (error) {
      console.error('Error setting up pension form PDFs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPdf = async (pdfId: number) => {
    try {
      const pdf = pdfs.find(p => p.id === pdfId)
      if (pdf) {
        // Open PDF in new tab
        window.open(pdf.download_url, '_blank')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{description}</p>
          </div>

          {/* Form Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Online Form Option */}
            <Card className="relative overflow-hidden border-2 hover:border-blue-200 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Fill Online Form</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete the form digitally with instant submission and confirmation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Estimated time: 10-15 minutes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Instant Submission</Badge>
                    <Badge variant="secondary">Auto-validation</Badge>
                    <Badge variant="secondary">Email Confirmation</Badge>
                  </div>
                </div>
                
                <Dialog open={showOnlineForm} onOpenChange={setShowOnlineForm}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      Start Online Form
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{title}</DialogTitle>
                      <DialogDescription>
                        Complete the form below and submit electronically
                      </DialogDescription>
                    </DialogHeader>
                    {onlineFormComponent}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* PDF Download Option */}
            <Card className="relative overflow-hidden border-2 hover:border-green-200 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Download PDF Form</CardTitle>
                <CardDescription className="text-gray-600">
                  Download a printable PDF version to fill manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading PDF forms...</p>
                  </div>
                ) : pdfs.length > 0 ? (
                  <div className="space-y-3">
                    {pdfs.map((pdf) => (
                      <div key={pdf.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{pdf.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{pdf.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Size: {formatFileSize(pdf.file_size)}</span>
                              <span>Downloads: {pdf.download_count}</span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadPdf(pdf.id)}
                            className="ml-4"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline">Printable</Badge>
                      <Badge variant="outline">Manual Submission</Badge>
                      <Badge variant="outline">Offline Access</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No PDF forms available for this type</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <p className="font-medium mb-1">Online Form Support:</p>
                    <p>If you encounter issues with the online form, try refreshing the page or contact our support team.</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">PDF Form Instructions:</p>
                    <p>After downloading, print the form, fill it manually, and submit to our office or email scanned copies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 