"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, ChevronLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNumber: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Implement login logic
    console.log(values)
  }

  return (
    <section className="py-8 sm:py-12 lg:py-20 min-h-screen flex items-center">
      <div className="container-custom w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image and Text */}
            <div className="hidden lg:flex flex-col justify-center order-1 lg:order-1">
              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h2 className="text-2xl xl:text-3xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-muted-foreground text-base xl:text-lg">
                  Access your pension account securely and manage your retirement planning with ease.
                </p>
              </div>
              
              {/* Image */}
              <div className="relative w-full max-w-md xl:max-w-lg mx-auto">
                <Image
                  src="/images/login-side-image.png"
                  alt="Login"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl animate-float"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto order-2 lg:order-2">
              <Button
                variant="ghost"
                className="mb-4 sm:mb-6 -ml-2"
                onClick={() => router.back()}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Card className="w-full animate-fadeIn">
                <CardHeader className="space-y-2 text-center px-4 sm:px-6 pt-6">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full">
                      <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl">Member Portal Login</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Account Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your account number" 
                                type="text" 
                                className="input-field text-sm sm:text-base h-10 sm:h-11" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="Enter your password"
                                  type={showPassword ? "text" : "password"}
                                  className="input-field pr-10 text-sm sm:text-base h-10 sm:h-11"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-10 sm:h-11 text-sm sm:text-base">
                        Login
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3 sm:space-y-4 text-center px-4 sm:px-6 pb-6">
                  <Link 
                    href="https://portal.standardpensions.com/setpassword/"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Not registered yet?{" "}
                    <Link 
                      href="https://portal.standardpensions.com/setup/"
                      className="text-primary hover:underline"
                    >
                      Complete setup
                    </Link>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Mobile Welcome Text */}
              <div className="lg:hidden text-center mt-8 px-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-3">Welcome Back!</h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Access your pension account securely and manage your retirement planning with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
