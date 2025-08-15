"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { employerEnrollmentSchema } from "@/lib/schemas/employer-enrollment-schema"

type FormValues = z.infer<typeof employerEnrollmentSchema>;

export default function EmployerEnrollmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(employerEnrollmentSchema),
    defaultValues: {
      declarationAgreed: false,
      numberOfEmployees: 0,
      totalContributionAtRegistration: 0,
      nameOfPreviousScheme: "",
      nameOfPreviousTrustee: "",
      inputOfficer: "",
      inputDate: "",
      authorizingOfficer: "",
      authorizingDate: "",
    },
  })
  
  function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      alert("Form submitted successfully!")
    }, 2000)
  }
  
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Employer Registration Form</h1>
            <p className="text-muted-foreground">
              Please complete all the required fields to register your company.
            </p>
          </div>

                      {/* Main Form Card */}
            <Card className="border-t-4 border-t-primary bg-card shadow-2xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Scheme Selection Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      Scheme Selection
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="schemeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Scheme Name</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-input border-border text-foreground">
                                  <SelectValue placeholder="Select scheme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-popover border-border">
                                <SelectItem value="Best Master Trust">Best Master Trust</SelectItem>
                                <SelectItem value="Best Provident Fund">Best Provident Fund</SelectItem>
                                <SelectItem value="Best Personal Pension">Best Personal Pension</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="schemeType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Scheme Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-input border-border text-foreground">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-popover border-border">
                                <SelectItem value="Tier 2">Tier 2</SelectItem>
                                <SelectItem value="Tier 3">Tier 3</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Employer Particulars */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      1. Employer Particulars
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="employerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Name of Employer</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter employer name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessRegistrationNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Business Registration No.</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter registration number"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter email address"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ssnitEmployerNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">SSNIT Employer No.</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter SSNIT number"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fixedLines"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Fixed Lines</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter fixed lines"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="businessLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Business Location</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter business location"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gpsAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">GPS Address</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter GPS address"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="industryCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Industry Category</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter industry category"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">TIN</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter TIN"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="mailingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">Mailing Address</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-[80px]"
                              placeholder="Enter mailing address"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Person Details */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      2. Contact Person (One Director and two others)
                    </h2>
                    
                    {/* Director */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-muted-foreground">Director</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="directorName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter director name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter director email"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter director phone"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="directorPosition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Position</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter director position"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Contact Person 1 */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-muted-foreground">Contact Person 1</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="contact1Name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact1Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact email"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact1Phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact phone"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact1Position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Position</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact position"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Contact Person 2 */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-muted-foreground">Contact Person 2</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="contact2Name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Name</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact2Email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact email"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact2Phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Phone</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact phone"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contact2Position"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Position</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter contact position"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contribution Details */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      3. Contribution Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="numberOfEmployees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Number of Employees</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter number of employees"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="totalContributionAtRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Total 5% Contribution at Registration</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter total contribution"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                value={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Previous Information */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      4. Previous Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nameOfPreviousScheme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Name of Previous Scheme</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter previous scheme name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nameOfPreviousTrustee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Name of Previous Trustee</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter previous trustee name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Declaration Section */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      5. Declaration
                    </h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="representativeOf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Representative of</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Representative of..."
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="signature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Signature</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter signature"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="designation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Designation</FormLabel>
                              <FormControl>
                                <Input 
                                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                  placeholder="Enter designation"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="dateOfSignature"
                        render={({ field }) => (
                          <FormItem className="max-w-md">
                            <FormLabel className="text-foreground font-medium">Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date"
                                className="bg-input border-border text-foreground"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="declarationAgreed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-foreground font-medium">
                                I declare and certify that the information given is accurate and true.
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* For Office Use Only */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                      6. For Office Use Only
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="inputOfficer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Input Officer</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter input officer name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="inputDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date"
                                className="bg-input border-border text-foreground"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="authorizingOfficer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Authorizing Officer</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter authorizing officer name"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="authorizingDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date"
                                className="bg-input border-border text-foreground"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration Form"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 