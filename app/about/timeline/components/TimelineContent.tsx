'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timelineEvents } from '@/lib/constants'

// Simple scroll reveal component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export default function TimelineContent() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <section className="mb-12 md:mb-16 text-center bg-card rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 border border-border/40">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Journey Through the Years
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Since our founding, Standard Pensions Trust has grown steadily, expanding our services and reach to better serve Ghanaians in their retirement planning journey.
              </motion.p>
            </section>
          </ScrollReveal>
          
          {/* Timeline Section - Mobile First Design */}
          <section className="mb-16 relative">
            {/* Vertical line - Hidden on mobile, visible on larger screens */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border z-0"></div>
            
            {/* Mobile timeline line - Left aligned */}
            <div className="md:hidden absolute left-6 top-0 h-full w-0.5 bg-border z-0"></div>
            
            <div className="space-y-12 md:space-y-20 w-full relative z-10">
              {timelineEvents.map((event, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Mobile Layout */}
                    <div className="md:hidden flex items-start">
                      <motion.div 
                        className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-background flex-shrink-0 mt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-background"></div>
                      </motion.div>
                      <motion.div 
                        className="ml-6 flex-1"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      >
                        <motion.h3 
                          className="text-xl sm:text-2xl font-bold text-primary mb-2"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {event.year}
                        </motion.h3>
                        <h4 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">{event.title}</h4>
                        <p className="text-muted-foreground text-sm sm:text-base">{event.description}</p>
                      </motion.div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex items-center w-full">
                      <div className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}>
                        <motion.div 
                          className="w-full max-w-sm"
                          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                          whileHover={{ x: index % 2 === 0 ? -5 : 5 }}
                        >
                          <motion.h3 
                            className="text-2xl font-bold text-primary mb-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.year}
                          </motion.h3>
                          <h4 className="text-xl font-semibold mb-2 text-foreground">{event.title}</h4>
                          <p className="text-muted-foreground text-sm">{event.description}</p>
                        </motion.div>
                      </div>
                      
                      <div className="w-0 flex justify-center relative">
                        <motion.div 
                          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring" }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className="w-3 h-3 rounded-full bg-background"></div>
                        </motion.div>
                      </div>
                      
                      <div className="w-1/2"></div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </section>
          
          {/* Looking Ahead Section */}
          <ScrollReveal delay={0.5}>
            <section className="bg-card border border-border/50 rounded-lg p-6 sm:p-8 shadow-sm text-left">
              <motion.h2 
                className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-foreground"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Looking Ahead
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg text-muted-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                As we continue to grow, Standard Pensions Trust remains committed to innovation and excellence in pension administration. Our future plans include:
              </motion.p>
              <ul className="space-y-4 mx-0">
                {[
                  "Expanding our digital services with AI-powered retirement planning tools",
                  "Opening additional branches in underserved regions to improve accessibility",
                  "Developing specialized pension products for informal sector workers",
                  "Enhancing our ESG (Environmental, Social, Governance) investment options"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="bg-primary/10 p-2 rounded-full mr-3 mt-1 flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </motion.div>
                    <p className="text-muted-foreground text-sm sm:text-base">{item}</p>
                  </motion.li>
                ))}
              </ul>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
} 