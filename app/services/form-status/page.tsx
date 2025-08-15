'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Search, CheckCircle, Clock, AlertCircle, FileText, ArrowLeft, Calendar, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface FormStatus {
  reference_number: string
  form_type: string
  status: string
  submitted_at: string
  processed_by?: string
  notes?: string
}

export default function FormStatusPage() {
  const [referenceNumber, setReferenceNumber] = useState('')
  const [status, setStatus] = useState<FormStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!referenceNumber.trim()) {
      setError('Please enter a reference number')
      return
    }

    setLoading(true)
    setError(null)
    setStatus(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/pension-forms/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reference_number: referenceNumber.trim() }),
      })

      const data = await response.json()

      if (data.status === 'success') {
        setStatus(data.data)
        setError(null)
      } else {
        setError(data.message || 'Submission not found. Please check your reference number.')
        setStatus(null)
      }
    } catch (err) {
      setError('Unable to check status. Please check your internet connection and try again.')
      setStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
      case 'replied':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processed':
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusDescription = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'Your form has been received and is waiting to be reviewed.'
      case 'processing':
        return 'Your form is currently being reviewed by our team.'
      case 'processed':
        return 'Your form has been successfully processed.'
      case 'replied':
        return 'We have responded to your submission. Check your email for details.'
      case 'archived':
        return 'Your form has been archived for our records.'
      default:
        return 'Status information available.'
    }
  }

  const formatFormType = (formType: string) => {
    return formType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button asChild variant="outline" className="mb-6">
              <Link href="/services/self-service-center" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Self-Service Centre
              </Link>
            </Button>
            <h1 className="text-4xl font-bold mb-4">Check Form Status</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track the progress of your submitted pension forms using your reference number.
            </p>
          </div>

          {/* Status Check Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Status Lookup
              </CardTitle>
              <CardDescription>
                Enter your reference number to check the status of your form submission. 
                Reference numbers are provided via email when you submit a form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckStatus} className="space-y-4">
                <div>
                  <Label htmlFor="reference-number">Reference Number</Label>
                  <Input
                    id="reference-number"
                    type="text"
                    placeholder="e.g., EE-000001, ER-000001, T2BC-000001"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your reference number was provided when you submitted your form online.
                  </p>
                </div>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  {loading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Checking Status...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check Status
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Error State */}
          {error && (
            <Alert className="mb-8 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Status Result */}
          {status && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Form Submission Details
                </CardTitle>
                <CardDescription>
                  Complete information about your form submission
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Header */}
                <div className="flex items-center justify-between p-4 rounded-lg border-2 border-dashed">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status.status)}
                    <div>
                      <Badge className={`${getStatusColor(status.status)} border`}>
                        {status.status.toUpperCase()}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getStatusDescription(status.status)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-muted-foreground">Reference</p>
                    <p className="text-lg font-mono font-bold">{status.reference_number}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      <FileText className="mr-2 h-4 w-4" />
                      Form Type
                    </div>
                    <p className="text-lg font-medium">{formatFormType(status.form_type)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Submitted On
                    </div>
                    <p className="text-lg">{formatDate(status.submitted_at)}</p>
                  </div>

                  {status.processed_by && (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        Processed By
                      </div>
                      <p className="text-lg">{status.processed_by}</p>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                {status.notes && (
                  <div className="space-y-3">
                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Additional Notes
                    </div>
                    <div className="p-4 bg-muted rounded-lg border">
                      <p className="text-sm leading-relaxed">{status.notes}</p>
                    </div>
                  </div>
                )}

                {/* Status Timeline */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Processing Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Form submitted - {formatDate(status.submitted_at)}</span>
                    </div>
                    {(status.status === 'processing' || status.status === 'processed' || status.status === 'replied') && (
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Review in progress</span>
                      </div>
                    )}
                    {(status.status === 'processed' || status.status === 'replied') && (
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Form processed successfully</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reference Number Examples */}
          {!status && !loading && (
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-blue-900 mb-3">Reference Number Examples</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <p className="font-medium mb-2">Employee Forms:</p>
                    <ul className="space-y-1 font-mono text-xs">
                      <li>• EE-000001 (Employee Enrollment)</li>
                      <li>• T2BC-000001 (Tier 2 Benefit Claim)</li>
                      <li>• T3BC-000001 (Tier 3 Benefit Claim)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Employer & Other Forms:</p>
                    <ul className="space-y-1 font-mono text-xs">
                      <li>• ER-000001 (Employer Enrollment)</li>
                      <li>• PPC-000001 (Personal Pension Claim)</li>
                      <li>• T2BenC-000001 (Beneficiary Claims)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Help Section */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-amber-900 mb-3">Need Additional Help?</h3>
              <div className="space-y-2 text-sm text-amber-800">
                <p>• If you can't find your reference number, check your email confirmation</p>
                <p>• Reference numbers are case-sensitive, please enter exactly as provided</p>
                <p>• For urgent matters, contact our office directly</p>
                <p>• Processing times vary by form type (typically 2-5 business days)</p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/services/faq">View FAQ</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/services/self-service-center">Submit New Form</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}