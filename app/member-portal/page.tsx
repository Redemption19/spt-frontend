import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Lock, ShieldCheck, BarChart4 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Member Portal',
  description: 'Access your pension account, check balances, update information, and manage your retirement planning through our secure member portal.',
}

export default function MemberPortalPage() {
  return (
    <section className="py-8 sm:py-12 lg:py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-center lg:text-left">Member Portal</h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 text-center lg:text-left">
                  Access your pension account, check balances, and manage your retirement planning through our secure portal.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-accent/10 p-2 sm:p-3 rounded-lg shrink-0">
                      <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1">Secure Access</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Bank-level security protects your personal and financial information with optional two-factor authentication.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-accent/10 p-2 sm:p-3 rounded-lg shrink-0">
                      <BarChart4 className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium mb-1">Real-Time Tracking</h3>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Monitor your pension growth, review contribution history, and track your progress toward retirement goals.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                    <Link href="https://portal.standardpensions.com/">
                      Login to Portal
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="https://portal.standardpensions.com/">
                      Set up Account
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <Image 
                  src="/images/login-side-image.png"
                  alt="Member Portal"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Portal Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Account Dashboard</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    A comprehensive view of your pension account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Current balance and fund allocation</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Contribution history and trends</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Projection calculator</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Account performance metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Self-Service Tools</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Manage your account without paperwork
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Update personal information</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Change beneficiary designations</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Request account statements</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Download tax certificates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="card-hover md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Financial Planning</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Tools to help you plan for retirement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Retirement calculator</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Contribution optimizer</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Investment strategy analysis</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-accent shrink-0" />
                      <span className="text-sm sm:text-base">Goal-based planning tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Login Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 sm:p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Login to Your Account</h2>
                  <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                    Access your pension information securely with your credentials. First time user? Contact us to set up your account.
                  </p>
                  
                  <div className="space-y-6">
                    <LoginForm />
                    
                    <div className="text-center space-y-3 sm:space-y-4 pt-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Forgot your password? <Link href="/member-portal/forgot-password" className="text-accent hover:underline">Reset it here</Link>
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Need an account? <a href="/contact" className="text-accent hover:underline">Contact us</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary to-accent p-6 sm:p-8 lg:p-12 text-white flex items-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">New Account Booster</h3>
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                      Maximize your retirement savings with our new Account Booster feature. Set additional contribution goals and track your progress.
                    </p>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
                        <span className="text-sm sm:text-base">Increase your contributions incrementally</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
                        <span className="text-sm sm:text-base">Track the impact on your retirement projection</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 mr-2 shrink-0" />
                        <span className="text-sm sm:text-base">Receive personalized savings recommendations</span>
                      </li>
                    </ul>
                    <Button asChild variant="outline" className="text-white border-white hover:bg-white/20 w-full sm:w-auto">
                      <Link href="/schemes/tier-3">
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LoginForm() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="member-id" className="text-sm font-medium">
          Member ID
        </label>
        <div className="relative">
          <input
            id="member-id"
            type="text"
            className="input-field w-full pl-10"
            placeholder="Enter your member ID"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type="password"
            className="input-field w-full pl-10"
            placeholder="Enter your password"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="remember" className="text-sm text-muted-foreground">
            Remember me
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="two-factor"
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="two-factor" className="text-sm text-muted-foreground">
            Enable 2FA
          </label>
        </div>
      </div>
      
      <Button className="w-full bg-accent hover:bg-accent/90">
        Login to Portal
      </Button>
    </div>
  )
}