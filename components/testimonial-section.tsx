"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuoteIcon, ArrowRight, Loader2, Play, Users, Star } from "lucide-react"
import Link from "next/link"
import { useTestimonials } from "@/hooks/useApi"

export function TestimonialSection(): React.JSX.Element {
  const { data: testimonialsData, isLoading, error } = useTestimonials(true) // Get featured testimonials

  // Get the first featured testimonial or fallback
  const featuredTestimonial = testimonialsData?.data?.[0] || {
    name: "John Mensah",
    role: "CEO",
    company: "Accra Tech Solutions",
    message: "Standard Pensions Trust has been instrumental in helping us secure our employees' future. Their expertise in pension management and dedication to customer service is unmatched."
  }

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from businesses and individuals who have transformed their
            retirement planning with Standard Pensions Trust.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading testimonials...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto"
          >
            {/* Video Side - Replaced with Placeholder */}
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
              <CardContent className="p-8">
                <div className="relative aspect-video w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Client Testimonials
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Watch our client success stories and hear directly from businesses and individuals who have transformed their retirement planning with Standard Pensions Trust.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>Trusted by 1000+ clients</span>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="group">
                        <Play className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                        Watch Testimonials
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Side */}
            <div className="space-y-6">
              <Card className="relative border-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
                <CardContent className="pt-6">
                  <QuoteIcon className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                  <blockquote className="pl-12 relative">
                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                      {featuredTestimonial.message}
                    </p>
                    <footer className="mt-4">
                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-border/60" />
                        <div>
                          <cite className="not-italic">
                            <div className="font-semibold text-foreground">
                              {featuredTestimonial.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {featuredTestimonial.role}{featuredTestimonial.company && `, ${featuredTestimonial.company}`}
                            </div>
                          </cite>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" variant="outline" className="group">
            <Link
              href="/testimonials"
              className="flex items-center"
            >
              View More Testimonials
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
