"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  FileText, 
  Mail, 
  Phone, 
  Calendar,
  Building2,
  UserCheck,
  Download
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is fundamental to our mission. Learn how Standard Pensions Trust protects and manages your personal information.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Last Updated: January 2025
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Version 2.0
              </Badge>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div 
            className="bg-card border border-border/50 rounded-lg p-6 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Eye className="h-5 w-5 text-primary mr-2" />
              Quick Navigation
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <Link href="#information-we-collect" className="text-accent hover:underline">Information Collection</Link>
              <Link href="#how-we-use" className="text-accent hover:underline">How We Use Data</Link>
              <Link href="#data-sharing" className="text-accent hover:underline">Data Sharing</Link>
              <Link href="#data-security" className="text-accent hover:underline">Data Security</Link>
              <Link href="#your-rights" className="text-accent hover:underline">Your Rights</Link>
              <Link href="#cookies" className="text-accent hover:underline">Cookies Policy</Link>
              <Link href="#retention" className="text-accent hover:underline">Data Retention</Link>
              <Link href="#contact" className="text-accent hover:underline">Contact Us</Link>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Information We Collect */}
            <motion.div id="information-we-collect" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="h-6 w-6 text-primary mr-3" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We collect information necessary to provide pension services, ensure regulatory compliance, and improve your experience with Standard Pensions Trust.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Personal Information
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Full name and title</li>
                        <li>• Ghana Card number and other ID documents</li>
                        <li>• Date of birth and nationality</li>
                        <li>• Contact details (email, phone, address)</li>
                        <li>• GPS address and hometown</li>
                        <li>• Marital status and gender</li>
                        <li>• Next of kin information</li>
                      </ul>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-3 flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Employment & Financial Data
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• SSNIT number and employment history</li>
                        <li>• Employer details and salary information</li>
                        <li>• Bank account details</li>
                        <li>• Pension contribution records</li>
                        <li>• Investment preferences</li>
                        <li>• Benefit claim information</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Technical Information</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• IP address and location data</li>
                        <li>• Browser type and device information</li>
                        <li>• Website usage patterns</li>
                        <li>• Session data and cookies</li>
                        <li>• Mobile app usage analytics</li>
                      </ul>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Communication Data</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Contact form submissions</li>
                        <li>• Survey responses and feedback</li>
                        <li>• Event registration information</li>
                        <li>• Customer service interactions</li>
                        <li>• Newsletter subscription preferences</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div id="how-we-use" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We use your information to deliver pension services, meet regulatory requirements, and enhance your experience.
                  </p>
                  
                  <div className="grid gap-4">
                    {[
                      {
                        title: "Pension Administration",
                        items: ["Managing your pension accounts", "Processing contributions and benefits", "Investment management", "Generating statements and reports"]
                      },
                      {
                        title: "Regulatory Compliance",
                        items: ["NPRA reporting requirements", "Tax obligations", "Anti-money laundering checks", "Know Your Customer (KYC) verification"]
                      },
                      {
                        title: "Customer Service",
                        items: ["Responding to inquiries", "Providing account support", "Processing benefit claims", "Resolving issues and complaints"]
                      },
                      {
                        title: "Communication",
                        items: ["Sending account updates", "Regulatory notifications", "Educational content", "Marketing (with consent)"]
                      },
                      {
                        title: "Service Improvement",
                        items: ["Website and app analytics", "Survey responses analysis", "User experience optimization", "Product development"]
                      }
                    ].map((section, index) => (
                      <div key={index} className="bg-card border border-border/30 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-3">{section.title}</h4>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {section.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Sharing and Disclosure */}
            <motion.div id="data-sharing" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="h-6 w-6 text-primary mr-3" />
                    Data Sharing and Disclosure
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">We Never Sell Your Data</h4>
                    <p className="text-sm text-muted-foreground">
                      Standard Pensions Trust does not sell, rent, or trade your personal information to third parties for marketing purposes.
                    </p>
                  </div>

                  <p className="text-muted-foreground">
                    We only share your information in the following circumstances:
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Regulatory Authorities",
                        description: "National Pensions Regulatory Authority (NPRA), Ghana Revenue Authority, Bank of Ghana, and other regulatory bodies as required by law.",
                        icon: <Building2 className="h-5 w-5 text-primary" />
                      },
                      {
                        title: "Service Providers",
                        description: "Custodians, fund managers, auditors, actuaries, and technology providers who assist in delivering pension services under strict confidentiality agreements.",
                        icon: <Users className="h-5 w-5 text-primary" />
                      },
                      {
                        title: "Legal Requirements",
                        description: "When required by law, court order, or to protect our rights, property, or safety, or that of our members or the public.",
                        icon: <Shield className="h-5 w-5 text-primary" />
                      },
                      {
                        title: "With Your Consent",
                        description: "When you explicitly consent to sharing information for specific purposes, such as employer reporting or benefit transfers.",
                        icon: <UserCheck className="h-5 w-5 text-primary" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-card border border-border/30 rounded-lg">
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div id="data-security" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="h-6 w-6 text-primary mr-3" />
                    Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We implement robust security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">Technical Safeguards</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• SSL/TLS encryption for data transmission</li>
                        <li>• Advanced encryption for data storage</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Regular security monitoring</li>
                        <li>• Firewall and intrusion detection</li>
                        <li>• Secure backup systems</li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-primary">Administrative Safeguards</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Role-based access controls</li>
                        <li>• Staff training on data protection</li>
                        <li>• Regular security audits</li>
                        <li>• Incident response procedures</li>
                        <li>• Vendor security assessments</li>
                        <li>• Physical security measures</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Data Breach Response</h4>
                    <p className="text-sm text-muted-foreground">
                      In the unlikely event of a data breach, we will notify affected members and relevant authorities within 72 hours, as required by law.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div id="your-rights" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <UserCheck className="h-6 w-6 text-primary mr-3" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Under Ghana's Data Protection Act and international best practices, you have the following rights regarding your personal information:
                  </p>

                  <div className="grid gap-4">
                    {[
                      {
                        right: "Right to Access",
                        description: "Request a copy of the personal information we hold about you."
                      },
                      {
                        right: "Right to Rectification",
                        description: "Request correction of inaccurate or incomplete personal information."
                      },
                      {
                        right: "Right to Erasure",
                        description: "Request deletion of your personal information, subject to legal and regulatory requirements."
                      },
                      {
                        right: "Right to Restrict Processing",
                        description: "Request limitation of how we process your personal information in certain circumstances."
                      },
                      {
                        right: "Right to Data Portability",
                        description: "Request transfer of your personal information to another organization in a structured format."
                      },
                      {
                        right: "Right to Object",
                        description: "Object to processing of your personal information for marketing purposes or legitimate interests."
                      },
                      {
                        right: "Right to Withdraw Consent",
                        description: "Withdraw consent for processing where we rely on consent as the legal basis."
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-card border border-border/30 rounded-lg p-4">
                        <h4 className="font-semibold text-accent mb-2">{item.right}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">How to Exercise Your Rights</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      To exercise any of these rights, contact our Data Protection Officer:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-accent" />
                        privacy@standardpensionstrust.com
                      </p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-accent" />
                        +233 (0) 302 780 765
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookies Policy */}
            <motion.div id="cookies" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="h-6 w-6 text-primary mr-3" />
                    Cookies and Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We use cookies and similar technologies to enhance your experience, analyze usage, and improve our services.
                  </p>

                  <div className="grid gap-4">
                    {[
                      {
                        type: "Essential Cookies",
                        purpose: "Required for basic website functionality, security, and user authentication.",
                        opt: "Cannot be disabled"
                      },
                      {
                        type: "Performance Cookies",
                        purpose: "Help us understand how visitors interact with our website by collecting anonymous information.",
                        opt: "Can be disabled"
                      },
                      {
                        type: "Functional Cookies",
                        purpose: "Remember your preferences and provide enhanced, personalized features.",
                        opt: "Can be disabled"
                      },
                      {
                        type: "Marketing Cookies",
                        purpose: "Track your activity across websites to provide relevant advertisements.",
                        opt: "Can be disabled"
                      }
                    ].map((cookie, index) => (
                      <div key={index} className="bg-card border border-border/30 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-primary">{cookie.type}</h4>
                          <Badge variant={cookie.opt.includes("Cannot") ? "destructive" : "secondary"} className="text-xs">
                            {cookie.opt}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{cookie.purpose}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Managing Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality and your user experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Retention */}
            <motion.div id="retention" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Calendar className="h-6 w-6 text-primary mr-3" />
                    Data Retention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We retain personal information only as long as necessary for the purposes outlined in this policy and as required by law.
                  </p>

                  <div className="grid gap-4">
                    {[
                      {
                        category: "Active Members",
                        period: "Duration of membership plus 7 years after termination",
                        reason: "Regulatory requirements and potential claims"
                      },
                      {
                        category: "Pension Records",
                        period: "Permanent retention for active benefits",
                        reason: "Ongoing pension obligations and payments"
                      },
                      {
                        category: "Financial Transactions",
                        period: "7 years from transaction date",
                        reason: "Tax and regulatory compliance"
                      },
                      {
                        category: "Marketing Data",
                        period: "Until consent is withdrawn or 3 years of inactivity",
                        reason: "Marketing effectiveness and consent management"
                      },
                      {
                        category: "Website Analytics",
                        period: "26 months maximum",
                        reason: "Service improvement and trend analysis"
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-card border border-border/30 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-1">{item.category}</h4>
                        <p className="text-sm font-medium text-accent mb-2">{item.period}</p>
                        <p className="text-sm text-muted-foreground">{item.reason}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Secure Disposal</h4>
                    <p className="text-sm text-muted-foreground">
                      When personal information is no longer needed, we securely delete or anonymize it using industry-standard methods to prevent unauthorized recovery.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* International Transfers */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Building2 className="h-6 w-6 text-primary mr-3" />
                    International Data Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Your personal information is primarily processed within Ghana. However, some data may be transferred internationally for:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li>• Cloud storage and backup services</li>
                    <li>• Software support and maintenance</li>
                    <li>• Regulatory reporting to international bodies</li>
                    <li>• Investment management services</li>
                  </ul>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      All international transfers are protected by appropriate safeguards, including adequacy decisions, standard contractual clauses, or certification schemes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div id="contact" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Mail className="h-6 w-6 text-primary mr-3" />
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy or how we handle your personal information, please contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Data Protection Officer</h4>
                      <div className="space-y-3 text-sm">
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          privacy@standardpensionstrust.com
                        </p>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-primary" />
                          +233 (0) 302 780 765
                        </p>
                        <p className="flex items-start">
                          <Building2 className="h-4 w-4 mr-2 text-primary mt-0.5" />
                          42 Nii Nortei Nyanchi Street<br />
                          Dzorwulu, Accra, Ghana
                        </p>
                      </div>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-3">Complaints Authority</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        If you're not satisfied with our response, you can lodge a complaint with:
                      </p>
                      <div className="text-sm">
                        <p className="font-medium">Data Protection Commission</p>
                        <p className="text-muted-foreground">Ghana</p>
                        <p className="text-accent">dpc.gov.gh</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground">
                      We will acknowledge your privacy-related inquiries within 2 business days and provide a complete response within 30 days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer Notice */}
            <motion.div variants={fadeInUp}>
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Stay Informed</h3>
                  <p className="text-muted-foreground mb-4">
                    We may update this Privacy Policy periodically. We'll notify you of significant changes via email or our website.
                  </p>
                  <div className="flex justify-center">
                    <Link 
                      href="/legal/terms" 
                      className="text-accent hover:underline font-medium flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Terms & Conditions
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 