'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  ArrowRight, 
  Building, 
  Calculator,
  User,
  Landmark,
  Briefcase,
  BarChart,
  PieChart,
  Clock,
  Shield,
  TrendingUp,
  Laptop,
  Users,
  Loader2,
  Building2,
  CheckCircle,
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { pensionSchemes, companyStats } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TestimonialSection } from '@/components/testimonial-section'
import { BlogCard } from '@/components/blog-card'
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import { HomeSlider } from '@/components/home-slider'
import { useBlogPosts } from '@/hooks/useApi'
import { BlogPost } from '@/lib/types/api'

// Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '', decimals = 0, formatCommas = false }: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  formatCommas?: boolean
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = end * easeOutQuart
      
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {prefix}{formatCommas ? count.toLocaleString() : count.toFixed(decimals)}{suffix}
    </motion.span>
  )
}

// Circular Progress Component
function CircularProgress({ percentage, size = 120, label }: {
  percentage: number
  size?: number
  label?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Responsive size adjustments
  const responsiveSize = size === 120 ? 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32' : 
                        size === 100 ? 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28' : 
                        `w-${size/4} h-${size/4}`
  
  const strokeWidth = 6
  const actualSize = size === 120 ? 96 : size === 100 ? 80 : size // Adjusted for mobile
  const radius = (actualSize - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative inline-flex flex-col items-center"
    >
      <div className="relative">
        <svg className={`${responsiveSize} transform -rotate-90`} viewBox={`0 0 ${actualSize} ${actualSize}`}>
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            stroke="#8A0F3C"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{percentage}%</div>
          </motion.div>
        </div>
      </div>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-center text-muted-foreground"
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  )
}

// Progress Bar Component
function ProgressBar({ percentage, label, color = 'primary' }: {
  percentage: number
  label?: string
  color?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm font-semibold text-primary"
          >
            {percentage}%
          </motion.span>
        </div>
      )}
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="h-full bg-primary rounded-full relative overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5, repeat: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Scroll Reveal Component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  // Fetch latest 3 blog posts for homepage
  const { data: blogPostsData, isLoading: blogLoading, error: blogError } = useBlogPosts({ 
    page: 1,
    per_page: 3 
  })
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HomeSlider />

      {/* Stats Section */}
      <section className="py-8 sm:py-12 gradient-bg text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            {companyStats.map((stat, index) => {
              // Map icon strings to actual icon components
              const IconComponent = stat.icon === 'Building2' ? Building2 : 
                                   stat.icon === 'Users' ? Users :
                                   stat.icon === 'Building' ? Building : 
                                   stat.icon === 'CheckCircle' ? CheckCircle : Building2
              
              return (
                <motion.div 
                  key={index} 
                  className="flex flex-col items-center space-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="bg-white/10 p-2 sm:p-3 rounded-full mb-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.div>
                  
                  {/* Number with highlight badge for stats with highlight property */}
                  {stat.highlight ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="bg-gradient-to-r from-white to-gray-50 text-primary px-3 py-1 rounded-full text-sm sm:text-base font-semibold shadow-lg border border-gray-200">
                        {stat.highlight}
                      </span>
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        <AnimatedCounter 
                          end={parseFloat(stat.value.replace(/[,%]/g, ''))} 
                          suffix={stat.value.includes('%') ? '%' : ''}
                          decimals={stat.value.includes('.') ? 1 : 0}
                          formatCommas={stat.value.includes(',')}
                        />
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                      <AnimatedCounter 
                        end={parseFloat(stat.value.replace(/[,%]/g, ''))} 
                        suffix={stat.value.includes('%') ? '%' : ''}
                        decimals={stat.value.includes('.') ? 1 : 0}
                        formatCommas={stat.value.includes(',')}
                      />
                    </span>
                  )}
                  
                  {/* Label */}
                  <div className="text-center">
                    {stat.label === 'Members Trust us' ? (
                      <>
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg block">Members</span>
                        <span className="text-white/60 font-normal text-xs sm:text-sm md:text-base block">Trust us</span>
                      </>
                    ) : stat.label === 'Employers Enrolled' ? (
                      <>
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg block">Employers</span>
                        <span className="text-white/60 font-normal text-xs sm:text-sm md:text-base block">Enrolled</span>
                      </>
                    ) : stat.label === 'Branches' ? (
                      <>
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg block">Branches</span>
                        <span className="text-white/60 font-normal text-xs sm:text-sm md:text-base block">Across the Country</span>
                      </>
                    ) : stat.label === 'Prompt Payouts to All Claimant' ? (
                      <>
                        <span className="text-white font-bold text-sm sm:text-base md:text-lg block">Prompt Payouts</span>
                        <span className="text-white/60 font-normal text-xs sm:text-sm md:text-base block">to All Claimant</span>
                      </>
                    ) : (
                      <span className="text-white font-semibold text-sm sm:text-base md:text-lg">{stat.label}</span>
                    )}
                  </div>
                  
                  {/* Description */}
                  {stat.description && (
                    <p className="text-white/80 text-xs sm:text-xs max-w-[120px] leading-tight">
                      {stat.highlight && stat.description.includes(stat.highlight) ? (
                        <>
                          {stat.description.split(stat.highlight).map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold text-sm sm:text-sm">
                                  {stat.highlight}
                                </span>
                              )}
                            </span>
                          ))}
                        </>
                      ) : (
                        stat.description
                      )}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Schemes Section */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="section-title">Our Pension Schemes</h2>
            <p className="section-subtitle mx-auto px-4 sm:px-0">
              Tailored retirement solutions to meet the needs of individuals and organizations throughout Ghana.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pensionSchemes.map((scheme, index) => {
              const Icon = scheme.icon === 'Building' ? Building : 
                          scheme.icon === 'User' ? User :
                          scheme.icon === 'Landmark' ? Landmark : Briefcase
              
              return (
                <ScrollReveal key={scheme.id} delay={index * 0.1}>
                  <Card className="card-hover border-border/50 group h-full">
                    <CardHeader className="pb-4">
                      <motion.div 
                        className="bg-primary/10 p-3 w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl sm:text-2xl">{scheme.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-muted-foreground mb-4 text-base sm:text-lg">{scheme.description}</p>
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2">•</span>
                            <span className="text-sm sm:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full group hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:scale-105 text-base">
                        <Link href={`/schemes/${scheme.id}`} className="flex items-center justify-center">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <ScrollReveal>
              <div className="relative h-full min-h-[300px] sm:min-h-[400px]">
                  <Image 
                    src="/images/pension-cal.jpeg"
                    alt="Planning for retirement"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
            <div className="space-y-6">
                <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">Secure Retirement Planning Made Simple</h2>
                <p className="text-muted-foreground text-base sm:text-lg">
                At Standard Pensions Trust, we provide comprehensive tools and expert guidance to help you plan and secure your financial future.
              </p>
              
                <div className="grid grid-cols-1 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <ScrollReveal delay={0.4}>
                    <div className="flex gap-3 sm:gap-4">
                      <motion.div 
                        className="bg-primary/10 p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.div>
                  <div>
                        <h3 className="text-lg sm:text-xl font-medium mb-1">Pension Calculator</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                      Plan your retirement with our interactive calculator tool that provides realistic projections.
                    </p>
                  </div>
                </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.5}>
                    <div className="flex gap-3 sm:gap-4">
                      <motion.div 
                        className="bg-primary/10 p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.div>
                  <div>
                        <h3 className="text-lg sm:text-xl font-medium mb-1">Investment Strategies</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                      Diverse investment options tailored to your risk profile and retirement timeline.
                    </p>
                  </div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.6}>
                    <div className="flex gap-3 sm:gap-4">
                      <motion.div 
                        className="bg-primary/10 p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium mb-1">Fund Performance</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Transparent reporting and real-time access to your pension fund performance.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                  
                  <ScrollReveal delay={0.7}>
                    <div className="flex gap-3 sm:gap-4">
                      <motion.div 
                        className="bg-primary/10 p-2 sm:p-3 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-lg shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-medium mb-1">Self-Service Portal</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          24/7 access to your pension information through our secure member portal.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
                
                <ScrollReveal delay={0.8}>
                  <Button asChild className="mt-4 hover:shadow-lg hover:scale-105 transition-all duration-300 text-base sm:text-lg">
                    <Link href="/pension-calculator">Try Our Pension Calculator</Link>
                  </Button>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Retirement Planning Progress Section
      <section className="py-16 sm:py-20 bg-background">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Track Your Retirement Planning Progress</h2>
              <p className="section-subtitle mx-auto px-4 sm:px-0">
                Monitor your journey towards a secure financial future with our comprehensive progress tracking tools.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 border shadow-lg">
                <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 text-center">Your Retirement Planning Progress</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <ProgressBar percentage={85} label="Savings Goal Progress" />
                  <ProgressBar percentage={72} label="Investment Diversification" />
                  <ProgressBar percentage={93} label="Risk Assessment Complete" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                  <div className="text-center">
                    <CircularProgress percentage={78} size={100} label="Overall Progress" />
                  </div>
                  <div className="text-center">
                    <CircularProgress percentage={91} size={100} label="Plan Compliance" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 gradient-bg text-white">
        <div className="container-custom text-center">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            Ready to Secure Your Financial Future?
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
            Join thousands of Ghanaians who trust Standard Pensions Trust for their retirement planning.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button asChild size="lg" variant="outline" className="border-white gradient-bg hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              <Link href="/contact">Contact Us</Link>
            </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 text-sm sm:text-base">
              <Link href="/schemes">Explore Our Schemes</Link>
            </Button>
            </motion.div>
        </div>
      </section>
      </ScrollReveal>

      {/* Testimonial Section */}
      <ScrollReveal>
      <TestimonialSection />
      </ScrollReveal>
      
      {/* Blog Section */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Our Blog</h2>
              <p className="section-subtitle mx-auto px-4 sm:px-0">Discover insights, news, and updates from our team.</p>
          </div>
          </ScrollReveal>
          <div className="max-w-7xl mx-auto">
            {blogLoading ? (
              <ScrollReveal delay={0.3}>
              <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground text-sm sm:text-base">Loading latest blog posts...</span>
              </div>
              </ScrollReveal>
            ) : blogError ? (
              <ScrollReveal delay={0.3}>
              <div className="text-center py-12">
                  <p className="text-muted-foreground text-sm sm:text-base">Unable to load blog posts at the moment.</p>
              </div>
              </ScrollReveal>
            ) : blogPostsData?.data && blogPostsData.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {blogPostsData.data.map((post, index) => (
                  <ScrollReveal key={post.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal delay={0.3}>
              <div className="text-center py-12">
                  <p className="text-muted-foreground text-sm sm:text-base">No blog posts available yet.</p>
              </div>
              </ScrollReveal>
            )}
            {blogPostsData?.data && blogPostsData.data.length > 0 && (
              <ScrollReveal delay={0.6}>
                <div className="text-center mt-8 sm:mt-12">
                  <Button asChild variant="outline" className="hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  <Link href="/media/blog">View All Blog Posts</Link>
                </Button>
              </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
      
      {/* Tailored Pension Solutions Section */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Tailored to meet your pension needs</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">
              We believe everyone deserves a retirement plan as unique as they are. Let us customize a solution for you.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>
          </ScrollReveal>
      
          <ScrollReveal delay={0.3}>
          <Tabs defaultValue="individual" className="max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 h-auto">
                <TabsTrigger value="individual" className="flex items-center gap-2 py-2 sm:py-3 text-xs sm:text-sm">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" /> 
                  <span className="hidden sm:inline">Pensions for Individuals</span>
                  <span className="sm:hidden">Individuals</span>
              </TabsTrigger>
                <TabsTrigger value="organization" className="flex items-center gap-2 py-2 sm:py-3 text-xs sm:text-sm">
                  <Building className="h-4 w-4 sm:h-5 sm:w-5" /> 
                  <span className="hidden sm:inline">Pensions With Organizations</span>
                  <span className="sm:hidden">Organizations</span>
              </TabsTrigger>
            </TabsList>
      
            <TabsContent value="individual">
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-4 sm:space-y-6">
                    <motion.div 
                      className="flex items-center gap-3 sm:gap-4 mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Landmark className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      <h3 className="text-xl sm:text-2xl font-semibold">Your Retirement Plan</h3>
                    </motion.div>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    Take control of your financial future. Our structured approach helps you build the cushion you need for a comfortable and secure retirement.
                  </p>
                    <Button asChild className="hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    <Link href="/schemes/personal-pension">Start Your Retirement Journey</Link>
                  </Button>
                </div>
                  <motion.div 
                    className="relative h-48 sm:h-64 rounded-lg overflow-hidden order-first lg:order-last"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                  <Image 
                    src="/images/pension-types.png" 
                    alt="Individual retirement planning"
                    fill
                    className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  </motion.div>
                </motion.div>
            </TabsContent>
      
            <TabsContent value="organization">
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-4 sm:space-y-6">
                    <motion.div 
                      className="flex items-center gap-3 sm:gap-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      <h3 className="text-xl sm:text-2xl font-semibold">Comprehensive Employee Benefits</h3>
                    </motion.div>
                    <p className="text-muted-foreground text-sm sm:text-base">
                    Attract and retain top talent with valuable benefits that extend beyond salary, like essential retirement plan contributions and healthcare coverage.
                  </p>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <motion.div 
                      className="flex items-center gap-3 sm:gap-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BarChart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                      <h3 className="text-xl sm:text-2xl font-semibold">Optimized Employer Pensions</h3>
                    </motion.div>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
                    Focus on your core business while we handle your pension scheme. Benefit from professional management, reduced fees, and other advantages that support your organization.
                  </p>
                    <Button asChild className="hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                    <Link href="/schemes/employer-sponsored">Explore Organizational Solutions</Link>
                  </Button>
                </div>
                </motion.div>
            </TabsContent>
          </Tabs>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Standard Pensions Trust Section - REDESIGNED */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              WHY CHOOSE US
            </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4 sm:px-0">
              Why <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Standard Pensions Trust</span> is The Right Choice for You
            </h2>
          </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Left side - 3 cards in grid */}
            <div className="grid gap-4 sm:gap-6">
              {/* Control Systems */}
              <ScrollReveal delay={0.2}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3 sm:pb-4">
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl font-bold">Control Systems</CardTitle>
                </CardHeader>
                <CardContent>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    We have in place rigorous internal control systems as we recognize this as vital for our survival in the fiduciary services business
                  </p>
                </CardContent>
              </Card>
                </motion.div>
              </ScrollReveal>

              {/* Good Investments */}
              <ScrollReveal delay={0.3}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3 sm:pb-4">
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BarChart className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl font-bold">Good Investments</CardTitle>
                </CardHeader>
                <CardContent>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    Our investment team has extensive experience and analytical methodologies to actively identify and exploit investment opportunities as they arise.
                  </p>
                </CardContent>
              </Card>
                </motion.div>
              </ScrollReveal>

              {/* IT Platform */}
              <ScrollReveal delay={0.4}>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3 sm:pb-4">
                      <motion.div 
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Laptop className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl font-bold">IT Platform</CardTitle>
                </CardHeader>
                <CardContent>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    We have a top-of-the-range IT platform to improve the efficiency with which we deliver our services, with the use of Web and Mobile Technology as well as USSD.
                  </p>
                </CardContent>
              </Card>
                </motion.div>
              </ScrollReveal>
            </div>

            {/* Right side - Large card */}
            <ScrollReveal delay={0.5}>
            <div className="flex">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="gradient-bg text-white flex-1 flex flex-col justify-between min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]">
                <div>
                      <CardHeader className="pb-4 sm:pb-6">
                        <motion.div 
                          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </motion.div>
                        <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                      Client Involvement
                    </CardTitle>
                  </CardHeader>
                      <CardContent className="pb-4 sm:pb-6">
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                        At Standard Pensions Trust Limited, putting the client at the heart of everything we do is not just a statement—it&apos;s our practice and promise. As a licensed corporate trustee under NPRA, we go beyond standard stewardship to engage with you through a truly customer-centered approach.
                    </p>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        We invest time to learn your unique financial goals and retirement aspirations—whether you&apos;re an employer designing a Tier 2 or Tier 3 scheme, or an individual planning your personal pension. This enables us to craft solutions that genuinely reflect your priorities.
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        We believe in building lasting relationships through transparency, dedication, and personalized service that puts your financial goals at the center of everything we do.
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="pt-0">
                  <Button 
                    asChild 
                    size="lg" 
                        className="bg-white text-primary hover:bg-white/90 font-semibold group w-full sm:w-auto hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                  >
                    <Link href="/services/self-service-center" className="flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
                </motion.div>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
      {/* Corporate Partners Section */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              OUR PARTNERS
            </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4 sm:px-0">
              Trusted by Leading <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Corporate Partners</span>
            </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
              We collaborate with industry leaders to provide comprehensive pension solutions and enhance value for our members.
            </p>
          </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center max-w-5xl mx-auto">
            {[...Array(9)].map((_, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div 
                  className="relative group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-background rounded-lg p-3 sm:p-4 lg:p-6 transition-all duration-300 hover:shadow-lg flex items-center justify-center h-[80px] sm:h-[100px] lg:h-[120px]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                  <Image
                    src={`/images/partners-images/brand-1-${index + 1}.png`}
                    alt={`Corporate Partner ${index + 1}`}
                        width={120}
                        height={60}
                        className="object-contain filter transition-all duration-300 max-w-full h-auto"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                    </motion.div>
                </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Signup Section Container */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 bg-background">
        <div className="container-custom">
          <NewsletterSignup />
        </div>
      </section>
      </ScrollReveal>
      
    </div>
  )
}