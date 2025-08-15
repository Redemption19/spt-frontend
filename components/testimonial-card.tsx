"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { QuoteIcon, Star } from "lucide-react"
import { Testimonial } from "@/lib/types/api"

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const fallbackImage = 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full group hover:border-primary/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <CardHeader className="flex flex-row items-center gap-4 pb-6 relative">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 overflow-hidden">
              <Image
                src={testimonial.image_url || fallbackImage}
                alt={testimonial.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImage;
                }}
              />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
              {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            {testimonial.company && (
              <p className="text-sm text-muted-foreground">{testimonial.company}</p>
            )}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-primary text-primary transition-colors duration-300"
                />
              ))}
              {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                <Star
                  key={`empty-${i}`}
                  className="h-4 w-4 text-muted-foreground/30 transition-colors duration-300"
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 relative">
          <div className="relative">
            <QuoteIcon className="absolute -top-2 -left-2 h-6 w-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="pl-6 text-muted-foreground leading-relaxed"
            >
              {testimonial.message}
            </motion.p>
          </div>
          {testimonial.location && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                📍 {testimonial.location}
              </p>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                {testimonial.category.replace('_', ' ')}
              </span>
              {testimonial.featured && (
                <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
