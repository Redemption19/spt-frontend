'use client'

import * as React from "react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { TestimonialCard } from "@/components/testimonial-card"
import { useTestimonials } from "@/hooks/useApi"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const testimonialCategories = [
  { label: "All Categories", value: "all" },
  { label: "General", value: "general" },
  { label: "Pension Scheme", value: "pension_scheme" },
  { label: "Customer Service", value: "customer_service" },
  { label: "Investment", value: "investment" },
  { label: "Retirement Planning", value: "retirement_planning" },
]

const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "5 Stars", value: "5" },
  { label: "4+ Stars", value: "4" },
]

export default function TestimonialsPage(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRating, setSelectedRating] = useState("all")
  
  const { data: testimonialsData, isLoading, error } = useTestimonials()

  // Filter testimonials based on selected criteria
  const filteredTestimonials = React.useMemo(() => {
    if (!testimonialsData?.data) return []
    
    return testimonialsData.data
      .filter((t) => selectedCategory === "all" || t.category === selectedCategory)
      .filter((t) => selectedRating === "all" || t.rating >= parseInt(selectedRating))
      .sort((a, b) => b.rating - a.rating)
  }, [testimonialsData?.data, selectedCategory, selectedRating])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-background border-b">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Client Success Stories
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover how Standard Pensions Trust has helped businesses and individuals 
                across Ghana secure their financial future through expert pension management 
                and dedicated customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Category:</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {testimonialCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Rating:</label>
                <Select value={selectedRating} onValueChange={setSelectedRating}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ratingOptions.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value}>
                        {rating.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading testimonials...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Unable to load testimonials at the moment.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : filteredTestimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No testimonials found for the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
