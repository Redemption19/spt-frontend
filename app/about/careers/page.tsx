'use client'

import * as React from "react"
import { useState } from "react"
// Client component - metadata handled by layout
import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Search,
  Star,
  Calendar,
  Building2,
  Filter,
  Loader2,
  TrendingUp,
  Award,
  Target
} from 'lucide-react'
import { useCareers, useCareerFilters, useCareerStatistics } from "@/hooks/useApi"
import type { Career } from "@/lib/types/api"

// Metadata defined in layout.tsx

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("all")
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("all")
  
  const { data: careersData, isLoading, error } = useCareers({
    search: searchTerm || undefined,
    department: selectedDepartment !== "all" ? selectedDepartment : undefined,
    location: selectedLocation !== "all" ? selectedLocation : undefined,
    employment_type: selectedEmploymentType !== "all" ? selectedEmploymentType : undefined,
    experience_level: selectedExperienceLevel !== "all" ? selectedExperienceLevel : undefined,
  })

  const { data: filtersData } = useCareerFilters()
  const { data: statsData } = useCareerStatistics()

  const careers = careersData?.data || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Build Your Career With Us
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Join Standard Pensions Trust and contribute to securing the financial future of thousands of Ghanaians. 
                  Explore our current career opportunities and become part of our mission.
                </p>
              </motion.div>

              {/* Statistics */}
              {statsData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{statsData.total_active_positions}</div>
                    <div className="text-sm text-muted-foreground">Open Positions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{statsData.departments_hiring}</div>
                    <div className="text-sm text-muted-foreground">Departments Hiring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{statsData.featured_positions}</div>
                    <div className="text-sm text-muted-foreground">Featured Roles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{statsData.recent_positions}</div>
                    <div className="text-sm text-muted-foreground">New This Month</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover the benefits and opportunities that make Standard Pensions Trust a great place to build your career.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Impactful Work</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Contribute to a mission that positively impacts thousands of lives across Ghana through pension security.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Growth Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Benefit from continuous learning, professional development, and clear career advancement paths.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Competitive Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Enjoy attractive compensation packages, health benefits, and a supportive work environment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Filter className="h-4 w-4" />
                Filter Jobs:
              </div>
              
              <div className="flex flex-wrap gap-4 items-center flex-1">
                <div className="relative min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search positions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {filtersData && (
                  <>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {Object.entries(filtersData.departments).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {String(label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {Object.entries(filtersData.locations).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {String(label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedEmploymentType} onValueChange={setSelectedEmploymentType}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {Object.entries(filtersData.employment_types).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {String(label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedExperienceLevel} onValueChange={setSelectedExperienceLevel}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {Object.entries(filtersData.experience_levels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {String(label)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Current Opportunities 
                {careers.length > 0 && (
                  <span className="text-muted-foreground text-lg font-normal ml-2">
                    ({careers.length} position{careers.length !== 1 ? 's' : ''})
                  </span>
                )}
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading career opportunities...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Unable to load career opportunities at the moment.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : careers.length > 0 ? (
              <div className="space-y-6">
                {careers.map((career: Career, index: number) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-border/50">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                                {career.title}
                              </h3>
                              {career.featured && (
                                <Badge variant="secondary" className="bg-primary/10 text-primary">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              {career.days_remaining != null && career.days_remaining <= 7 && (
                                <Badge variant="outline" className="text-red-600 border-red-200">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {career.days_remaining} days left
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Building2 className="h-4 w-4" />
                                {filtersData?.departments?.[career.department] || career.department}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {filtersData?.locations?.[career.location] || career.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4" />
                                {filtersData?.employment_types?.[career.employment_type] || career.employment_type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {filtersData?.experience_levels?.[career.experience_level] || career.experience_level}
                              </div>
                              {career.formatted_salary && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {career.formatted_salary}
                                </div>
                              )}
                            </div>

                            <p className="text-muted-foreground line-clamp-2">
                              {career.description}
                            </p>

                            {career.skills_required && career.skills_required.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {career.skills_required.slice(0, 5).map((skill: string) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {career.skills_required.length > 5 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{career.skills_required.length - 5} more
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 lg:items-end">
                            <Button asChild>
                              <Link href={`/about/careers/${career.slug}`}>
                                View Details
                              </Link>
                            </Button>
                            {career.application_deadline && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Apply by {new Date(career.application_deadline).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Briefcase className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-xl text-muted-foreground mb-2">
                  No positions found matching your criteria.
                </p>
                <p className="text-muted-foreground">
                  Try adjusting your filters or check back later for new opportunities.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* General Application Section */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Can't Find Your Ideal Role?
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-8 opacity-90">
              Submit a general application, and we'll keep your profile in mind for future openings that match your skills and interests.
            </p>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link href="/contact">
                Submit General Application
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 