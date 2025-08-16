"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ChevronLeft, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
})

const accountSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("email")
  const router = useRouter()

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
  })

  const accountForm = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: { accountNumber: "" },
  })

  async function onSubmit(values: any) {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // TODO: Implement forgot password logic
      console.log(`Reset password for ${activeTab}:`, values)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setShowSuccess(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCurrentForm = () => {
    switch (activeTab) {
      case "email": return emailForm
      case "phone": return phoneForm
      case "account": return accountForm
      default: return emailForm
    }
  }

  const getSubmitHandler = () => {
    switch (activeTab) {
      case "email": return emailForm.handleSubmit(onSubmit)
      case "phone": return phoneForm.handleSubmit(onSubmit)
      case "account": return accountForm.handleSubmit(onSubmit)
      default: return emailForm.handleSubmit(onSubmit)
    }
  }

  if (showSuccess) {
    return (
      <section className="py-8 sm:py-12 lg:py-20 min-h-screen flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md mx-auto">
              <Card className="animate-fadeIn">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto bg-green-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  
                  <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Check Your {activeTab === "email" ? "Email" : activeTab === "phone" ? "Phone" : "Account"}</h1>
                  
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    {activeTab === "email" && "We've sent password reset instructions to your email address. Please check your inbox and follow the link to reset your password."}
                    {activeTab === "phone" && "We've sent a verification code to your phone number. Please check your messages and follow the instructions."}
                    {activeTab === "account" && "We've located your account. Password reset instructions have been sent to your registered email address."}
                  </p>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="https://portal.standardpensions.com/">
                        Back to Login
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setShowSuccess(false)
                        getCurrentForm().reset()
                      }}
                    >
                      Try Different Method
                    </Button>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground mt-6">
                    Didn't receive anything? Check your spam folder or{" "}
                    <button 
                      className="text-primary hover:underline"
                      onClick={() => {
                        setShowSuccess(false)
                        getCurrentForm().reset()
                      }}
                    >
                      try again
                    </button>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 lg:py-20 min-h-screen flex items-center">
      <div className="container-custom w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image and Information */}
            <div className="hidden lg:flex flex-col justify-center order-1">
              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-bold mb-4">Forgot Your Password?</h2>
                <p className="text-muted-foreground text-base xl:text-lg">
                  No worries! We'll help you reset your password and get back into your account securely.
                </p>
              </div>
              
              <div className="relative w-full max-w-md xl:max-w-lg mx-auto">
                <Image
                  src="/images/login-side-image.png"
                  alt="Password Reset"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl animate-float"
                  priority
                />
              </div>
              
              {/* Help Information */}
              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Need Additional Help?
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Contact our Digital Team: <strong>0302 782 686</strong></p>
                  <p>• Email us: <strong>support@standardpensionstrust.com</strong></p>
                  <p>• Visit any of our branch offices</p>
                </div>
              </div>
            </div>

            {/* Right Side - Reset Form */}
            <div className="w-full max-w-md mx-auto order-2">
              <Button
                variant="ghost"
                className="mb-4 sm:mb-6 -ml-2"
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>

              <Card className="w-full animate-fadeIn">
                <CardHeader className="text-center px-4 sm:px-6 pt-6">
                  <CardTitle className="text-xl sm:text-2xl">Reset Your Password</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Choose how you'd like to receive your password reset instructions
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-6">
                  {error && (
                    <Alert className="mb-4 border-red-200 bg-red-50">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="email" className="text-xs sm:text-sm">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Email
                      </TabsTrigger>
                      <TabsTrigger value="phone" className="text-xs sm:text-sm">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Phone
                      </TabsTrigger>
                      <TabsTrigger value="account" className="text-xs sm:text-sm">
                        Account
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="email">
                      <Form {...emailForm}>
                        <form onSubmit={getSubmitHandler()} className="space-y-4">
                          <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your registered email" 
                                    type="email" 
                                    className="h-10 sm:h-11 text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            We'll send reset instructions to your registered email address.
                          </p>
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-11"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              "Send Reset Email"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="phone">
                      <Form {...phoneForm}>
                        <form onSubmit={getSubmitHandler()} className="space-y-4">
                          <FormField
                            control={phoneForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your registered phone number" 
                                    type="tel" 
                                    className="h-10 sm:h-11 text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            We'll send a verification code to your registered phone number.
                          </p>
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-11"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              "Send SMS Code"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="account">
                      <Form {...accountForm}>
                        <form onSubmit={getSubmitHandler()} className="space-y-4">
                          <FormField
                            control={accountForm.control}
                            name="accountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm sm:text-base">Account Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your account number" 
                                    type="text" 
                                    className="h-10 sm:h-11 text-sm sm:text-base"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            We'll send reset instructions to the email associated with this account.
                          </p>
                          <Button 
                            type="submit" 
                            className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-11"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Looking up...
                              </>
                            ) : (
                              "Find Account"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Mobile Help Information */}
              <div className="lg:hidden mt-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  Need Help?
                </h3>
                <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p>Call: <strong>0302 782 686</strong></p>
                  <p>Email: <strong>support@standardpensionstrust.com</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 