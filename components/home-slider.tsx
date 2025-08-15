'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  buttons: { text: string; href: string }[]
  textPosition: 'left' | 'right'
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/slider/slider 5 2.png',
    title: 'Secure Your\nFinancial Future',
    subtitle: 'Expert pension administration and retirement planning solutions for all Ghanaians.',
    buttons: [
      { text: 'Explore Our Schemes', href: '/schemes' },
      { text: 'Enroll Now', href: '/services/self-service-center' },
    ],
    textPosition: 'left',
  },
  {
    id: 2,
    image: '/images/slider/slider 4.png',
    title: 'Plan for\nRetirement with Confidence',
    subtitle: 'Use our calculator to estimate your pension and make informed decisions for your future.',
    buttons: [
      { text: 'Try Our Calculator', href: '/pension-calculator' },
      { text: 'Learn More', href: '/about' },
    ],
    textPosition: 'right',
  },
  {
    id: 3,
    image: '/images/slider/slider 6.png',
    title: 'Join Thousands\nof Satisfied Members',
    subtitle: 'Over 17,000 Ghanaians trust us to manage their retirement savings and benefits.',
    buttons: [
      { text: 'Become a Member', href: '/forms/employee-enrollment' },
      { text: 'Contact Us', href: '/contact' },
    ],
    textPosition: 'left',
  },
]

export function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-slide function
  const autoSlide = () => {
    if (!isPaused) {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }
  }

  // Start auto-slide interval
  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(autoSlide, 5000) // Change slide every 5 seconds
  }

  // Stop auto-slide interval
  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Manual slide change
  const changeSlide = (newIndex: number) => {
    if (newIndex === currentSlide) return
    
    setIsAnimating(true)
    setCurrentSlide(newIndex)
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    // Restart auto-slide timer after manual interaction
    stopAutoSlide()
    setTimeout(() => {
      if (!isPaused) {
        startAutoSlide()
      }
    }, 1000)
  }

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length
    changeSlide(newIndex)
  }

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length
    changeSlide(newIndex)
  }

  const goToSlide = (index: number) => {
    changeSlide(index)
  }

  // Initialize auto-slide when component mounts and handle pause state
  useEffect(() => {
    if (!isPaused) {
      startAutoSlide()
    } else {
      stopAutoSlide()
    }
    
    return () => {
      stopAutoSlide()
    }
  }, [isPaused])

  // Pause auto-slide on hover
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const slide = slides[currentSlide]

  return (
    <section 
      className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-background"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.title.replace(/\n/g, ' ')}
              fill
              className="object-cover object-[center_5%]"
              priority={currentSlide === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full">
        <div className="container-custom h-full">
          <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${slide.id === 3 ? 'items-end' : 'items-center'} h-full py-12 sm:py-16`}>
            
            {/* Text Content */}
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, x: slide.textPosition === 'left' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`${slide.textPosition === 'right' ? 'lg:order-2 lg:pl-12' : ''} space-y-4 sm:space-y-6 ${slide.id === 2 ? 'lg:pl-16' : ''} ${slide.id === 3 ? 'mt-16 sm:mt-20 lg:mt-0' : ''} px-4 sm:px-0`}
            >
              {/* Main Title */}
              <div className="space-y-2">
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {slide.title.split('\n').map((line, i) => (
                    <span key={i} className="block">
                      {i === 1 ? (
                        <span className="text-primary">{line}</span>
                      ) : (
                        line
                      )}
                    </span>
                  ))}
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-white/90 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {slide.subtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {slide.buttons.map((btn, i) => (
                  <Button
                    key={btn.text}
                    asChild
                    className={
                      i === 0
                        ? 'bg-primary hover:bg-primary/90 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 text-sm h-auto rounded-md'
                        : 'bg-transparent border border-white text-white hover:bg-white hover:text-primary font-medium px-4 sm:px-6 py-2 sm:py-3 text-sm h-auto rounded-md'
                    }
                  >
                    <Link href={btn.href} className="flex items-center justify-center">
                      <span className="hidden sm:inline">{btn.text}</span>
                      <span className="sm:hidden">
                        {btn.text.includes('Calculator') ? 'Calculator' :
                         btn.text.includes('Schemes') ? 'Schemes' :
                         btn.text.includes('Member') ? 'Join Now' :
                         btn.text.includes('Quote') ? 'Quote' :
                         btn.text.includes('Learn') ? 'Learn' :
                         btn.text.includes('Contact') ? 'Contact' :
                         btn.text.split(' ')[0]}
                      </span>
                      {i === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Link>
                  </Button>
                ))}
              </motion.div>
            </motion.div>

            {/* Visual Content Area */}
            <motion.div
              key={`visual-${slide.id}`}
              initial={{ opacity: 0, x: slide.textPosition === 'left' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`${slide.textPosition === 'right' ? 'lg:order-1' : ''} hidden lg:flex items-center justify-center`}
            >
              {/* Visual elements based on slide content */}
              {slide.id === 1 && (
                <div className="relative">
                  {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                    <div className="text-center text-white">
                      <div className="text-2xl lg:text-3xl font-bold mb-2">1000+</div>
                      <div className="text-sm opacity-80">Happy Members</div>
                    </div>
                  </div> */}
                </div>
              )}
              
              {slide.id === 2 && (
                <div className="relative">
                  {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                    <div className="text-center text-white">
                      <div className="text-xl lg:text-2xl font-bold mb-2">Calculate Your</div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">Pension</div>
                      <div className="text-sm opacity-80">Estimate Your Future</div>
                    </div>
                  </div> */}
                </div>
              )}
              
              {slide.id === 3 && (
                <div className="relative">
                  {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
                    <div className="text-center text-white">
                      <div className="text-xl lg:text-2xl font-bold mb-2">Join Our</div>
                      <div className="text-2xl lg:text-3xl font-bold text-primary mb-2">Community</div>
                      <div className="text-sm opacity-80">Trusted by Thousands</div>
                    </div>
                  </div> */}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Previous slide"
        disabled={isAnimating}
      >
        <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-300 backdrop-blur-sm border border-white/20"
        aria-label="Next slide"
        disabled={isAnimating}
      >
        <svg width="16" height="16" className="sm:w-5 sm:h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}