'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ArrowRight, Search, X } from 'lucide-react'
import Link from 'next/link'

// Remove metadata export since this is now a client component
// export const metadata: Metadata = {
//   title: 'Frequently Asked Questions',
//   description: 'Find answers to common questions about pensions, claims, and more.',
// }

const faqCategories = [
  {
    category: 'General Information',
    questions: [
      {
        question: 'Who is a trustee?',
        answer: 'A trustee means an individual or a company appointed to carry out the purposes of a trust in accordance with the provisions of the trust instrument and general principles of trust law. Occupational pension schemes, provident fund schemes, personal pension schemes and other privately managed pension schemes shall only be managed by trustees licensed and approved by NPRA.'
      },
      {
        question: 'What are the three-tier pension schemes?',
        answer: 'In 2008 an act was passed by parliament in response to the public agitation to ensure the creation of a sustainable unified pension structure for all workers in the country. The act established a contributory scheme consisting of the following tiers: Tier 1: A mandatory basic national social security scheme; Tier 2: A mandatory fully funded and privately managed occupational scheme; Tier 3: A voluntary fully funded and privately managed provident fund and personal pension scheme.'
      },
      {
        question: 'What are the benefits of the three-tier pension scheme?',
        answer: 'Tax relief: The law allows up to 35% of an employee\'s income to be treated as deductible income if set aside as contributions to pension funds. In other words, towards retirement: 13.5% contributed to Tier 1, 5% to Tier 2, and up to 16.5% to Tier 3 of your basic salary is treated as tax exempt. This far outweighs any investment vehicle in the first years of investment. Transparency: One of the key elements of the reforms is to give employees greater transparency and accountability with regards to their pension. Security: The main objective of the three-tier pension scheme is to provide for pension benefits that will ensure retirement income security for workers.'
      }
    ]
  },
  {
    category: 'Investment & Security',
    questions: [
      {
        question: 'Can an employee ever lose his/her contribution as a result of poor investment decisions?',
        answer: 'The three-tier pension scheme is heavily regulated by the national pension regulatory authority. They have designed investment guidelines which are meant to provide a high level of security for pension funds. Nonetheless, approved trustees have the fiduciary responsibility to ensure that they strictly follow the guidelines and investment best practices to ensure the preservation of capital.'
      }
    ]
  },
  {
    category: 'Employment Changes',
    questions: [
      {
        question: 'What happens if I leave my current employer?',
        answer: 'Tier 2 benefits: When an employee changes employment, the law provides for the employee to elect to transfer his/her accrued benefits to another scheme in accordance with the regulations of that scheme. The approved trustees of the respective schemes shall comply with requirements with respect to the transfer of the benefits. Tier 3 benefits: Subject to the vesting rules of the scheme, the employee may forfeit part or the total amount of the employer\'s contribution if the worker leaves the employment of the employer before the end of the vesting period. An employee who satisfies the vesting requirements may elect to receive his accrued benefits subject to a tax clawback of 15% before ten years or transfer it to a personal pension scheme.'
      },
      {
        question: 'What happens to my pension trust if I change jobs?',
        answer: 'You typically have several options, including leaving your pension funds with your previous employer, transferring them to a new employer\'s plan, or rolling them into a personal retirement account. Understanding the implications of each choice is important in making an informed decision.'
      }
    ]
  },
  {
    category: 'Withdrawals & Management',
    questions: [
      {
        question: 'What is the minimum age for withdrawing funds from my pension trust?',
        answer: 'The minimum age for pension fund withdrawals typically aligns with the legal retirement age in your country, which is often around 60 to 65. However, some plans may offer early withdrawals or partial distributions under specific circumstances.'
      },
      {
        question: 'Can I change my pension contribution amount?',
        answer: 'In many pension trusts, you can adjust your contribution amount within certain limits. It\'s advisable to consult with your pension trust administrator or employer to understand the flexibility and options available.'
      },
      {
        question: 'How are taxes handled when I receive pension payments?',
        answer: 'The tax treatment of pension payments can vary based on your jurisdiction and the type of pension trust. Generally, taxes are applied when you withdraw funds. It\'s recommended to consult a tax advisor for guidance on your specific situation.'
      }
    ]
  }
]

// Function to highlight search terms in text
const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text
  
  const regex = new RegExp(`(${searchTerm})`, 'gi')
  const parts = text.split(regex)
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
        {part}
      </mark>
    ) : part
  )
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  // Filter FAQs based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)
  
  const totalResults = filteredCategories.reduce((acc, category) => acc + category.questions.length, 0)
  
  const clearSearch = () => {
    setSearchTerm('')
  }
  
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find answers to common questions about pensions, claims, and more.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* Search Results Info */}
            {searchTerm && (
              <div className="mt-3 text-sm text-muted-foreground text-center">
                {totalResults > 0 ? (
                  <>Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchTerm}"</>
                ) : (
                  <>No results found for "{searchTerm}"</>
                )}
              </div>
            )}
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto mb-12">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                        <AccordionTrigger>
                          {highlightText(faq.question, searchTerm)}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none">
                            {highlightText(faq.answer, searchTerm)}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            ) : searchTerm ? (
              /* No Results Found */
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-4">
                  Try searching with different keywords or{' '}
                  <button 
                    onClick={clearSearch}
                    className="text-primary hover:underline"
                  >
                    clear your search
                  </button>{' '}
                  to see all FAQs.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Search suggestions:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['trustee', 'tier 2', 'tier 3', 'withdrawal', 'employer', 'tax', 'contribution'].map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchTerm(suggestion)}
                        className="px-3 py-1 bg-muted rounded-full hover:bg-muted/80 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Show all categories when no search */
              faqCategories.map((category, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </div>

          {/* Still Need Help Section */}
          <div className="bg-card border border-border/50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/contact" className="flex items-center">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild>
                <Link href="/services/self-service-center" className="flex items-center">
                  Visit Self-Service Centre
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}