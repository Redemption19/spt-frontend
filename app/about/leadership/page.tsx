"use client";

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Linkedin, PlusCircle, MinusCircle, Calendar, Award, ExternalLink, Shield, Users2, TrendingUp, Facebook, Instagram, Mail } from 'lucide-react'
import { leadershipTeam } from '@/lib/constants'
import React, { useState } from 'react';

import { getOptimizedImageProps, handleImageError } from '@/lib/utils/image-optimization';

// Scroll Reveal Component
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

// Metadata is moved to a layout.tsx or root layout for Client Components.

export default function LeadershipPage() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedMember(expandedMember === index ? null : index);
  };

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
                Board of Directors
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
              Team of diverse and exceptional leadership.
              </motion.p>
          </section>
          </ScrollReveal>
          
          {/* Board of Directors Section */}
          <section className="mb-12 md:mb-16">
            <div className="space-y-12 md:space-y-16">
              {leadershipTeam.map((member, index) => (
                <ScrollReveal key={index} delay={index * 0.2}>
                  <motion.div 
                    className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 lg:gap-12 p-4 sm:p-6 rounded-lg border border-border/40 shadow-sm ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-full md:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                    <Image 
                      {...getOptimizedImageProps(
                        member.image,
                        member.name,
                        'leadership',
                        {
                          priority: index === 0, // First image gets priority
                          quality: 90
                        }
                      )}
                      fill
                      className="object-cover"
                      onError={handleImageError}
                    />
                    </motion.div>
                  <div className="w-full md:w-1/2">
                      <motion.p 
                        className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-muted-foreground mb-2"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {member.position}
                      </motion.p>
                      <motion.h2 
                        className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 md:mb-4 text-foreground"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {member.name}
                      </motion.h2>
                      <motion.p 
                        className="text-muted-foreground mb-3 md:mb-4 text-justify text-sm sm:text-base"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {expandedMember === index ? member.bio : `${member.bio.substring(0, 200)}...`}
                      </motion.p>

                      {/* Social Media Links */}
                      <motion.div
                        className="flex flex-wrap gap-3 mb-4"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <motion.a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#0077B5] text-white hover:bg-[#005885] transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Linkedin className="w-5 h-5" />
                          <span className="sr-only">LinkedIn Profile</span>
                        </motion.a>
                        
                        <motion.a
                          href={`mailto:${member.social.email}`}
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail className="w-5 h-5" />
                          <span className="sr-only">Email Contact</span>
                        </motion.a>
                        
                        <motion.a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:bg-[#166FE5] transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Facebook className="w-5 h-5" />
                          <span className="sr-only">Facebook Profile</span>
                        </motion.a>
                        
                        <motion.a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Instagram className="w-5 h-5" />
                          <span className="sr-only">Instagram Profile</span>
                        </motion.a>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                    <Button 
                      variant="link" 
                          className="px-0 text-primary hover:text-primary/80 flex items-center gap-2 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedMember === index ? <><MinusCircle className="h-4 w-4" /> Read Less</> : <><PlusCircle className="h-4 w-4" /> Read More</>}
                    </Button>
                      </motion.div>
                  </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </section>
          

          
          {/* Call to Action */}
          <ScrollReveal delay={0.5}>
            <section className="text-center mt-12 md:mt-16 py-8 sm:py-12 bg-primary rounded-lg text-primary-foreground">
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Have Questions About Your Pension?
              </motion.h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
              Our team is ready to assist you. Reach out to us for personalized guidance and support.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/contact">Contact Our Office</Link>
            </Button>
              </motion.div>
          </section>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}