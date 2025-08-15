'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Eye, BarChart, Users } from 'lucide-react'
import { companyStats } from '@/lib/constants'

// Simple scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPageContent() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <section className="mb-12 md:mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Company Overview</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-4 md:mb-6">
                    Empowering Ghanaians with confidence and peace of mind for their retirement.
                  </p>
                  <div className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-4">Our Vision</h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      At Standard Pensions Trust, our mission is to empower individuals to embrace their retirement years with financial confidence and peace of mind. We are committed to safeguarding their lifelong dedication to work by providing reliable and transparent pension solutions. Our vision is to foster a thriving community of members who support each other on the path to secure and fulfilling retirements. Through expertise, transparency, and trust, we aim to be the unwavering partner in our members&apos; retirement journey, ensuring they enjoy the retirement they&apos;ve always dreamed of.
                    </p>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2">
                  <Image 
                    src="/images/company-overview.png"
                    alt="Company Overview"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* Who We Are Section */}
          <ScrollReveal delay={0.2}>
            <section className="mb-12 md:mb-16">
              <div className="bg-card border border-border/50 rounded-lg p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Who We Are</h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  Standard Pensions Trust was founded in 2008 with a vision to transform retirement planning in Ghana. Licensed and regulated by the National Pensions Regulatory Authority (NPRA), we&apos;ve grown to become one of Ghana&apos;s most trusted pension administrators. Our team of financial experts is dedicated to helping individuals and organizations navigate the complexities of pension planning and management.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center mt-8 md:mt-10">
                  {companyStats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="flex flex-col p-2 sm:p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                        {stat.value}
                      </span>
                      <span className="text-muted-foreground mt-1 md:mt-2 text-xs sm:text-sm">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* What We Do Section */}
          <ScrollReveal delay={0.3}>
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">Retirement Planning & Pension Fund Management</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    We provide comprehensive retirement planning services and expert management of pension funds to ensure optimal growth and security for your future.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">Tier 2 & Tier 3 Pensions</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    As a licensed pension trustee, we administer both mandatory Tier 2 occupational pension schemes and voluntary Tier 3 personal pension plans.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">Self-Service Solutions</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Our digital platforms provide easy access for both employees and employers to manage contributions, track performance, and plan for retirement.
                  </p>
                </motion.div>
              </div>
            </section>
          </ScrollReveal>

          {/* Core Values Section */}
          <ScrollReveal delay={0.4}>
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-border/50 h-full">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Shield className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl">Trust</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        We earn and maintain the confidence of our members through consistent reliability and integrity in all our operations.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-border/50 h-full">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Eye className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl">Transparency</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        We operate with complete openness, ensuring our members understand their pension plans and our investment strategies.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-border/50 h-full">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Users className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl">Integrity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        We adhere to the highest ethical standards in all our business practices and decision-making processes.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="border-border/50 h-full">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <BarChart className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl">Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        We are committed to continuous improvement and innovation to better serve our members&apos; evolving needs.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </section>
          </ScrollReveal>

          {/* Why Choose Us Section */}
          <ScrollReveal delay={0.5}>
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-semibold mb-6 md:mb-8">Why Choose Us</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">17,710+ Members</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Join our growing community of members who trust us with their retirement planning and pension management.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">8 Branch Offices</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    With locations across Ghana, we provide accessible service and support wherever you are.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">Dedicated Account Managers</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Every client is assigned a personal account manager to provide tailored guidance and support.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-card border border-border/50 rounded-lg p-4 sm:p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4">Fast Claim Processing</h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Our streamlined processes ensure quick and efficient handling of all benefit claims.
                  </p>
                </motion.div>
              </div>
            </section>
          </ScrollReveal>

          {/* Call to Action */}
          <ScrollReveal delay={0.6}>
            <section className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                    <Link href="/services">Explore Our Services</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href="/about/leadership">Meet Our Team</Link>
                  </Button>
                </motion.div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}