"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  FileText, 
  Scale, 
  AlertTriangle, 
  Shield, 
  Users, 
  CreditCard, 
  Mail, 
  Phone, 
  Calendar,
  Building2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Gavel,
  DollarSign,
  TrendingUp
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

export default function TermsConditionsPage() {
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
              <Scale className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Terms & Conditions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These terms govern your use of Standard Pensions Trust services and our commitment to transparent pension management.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                Effective: January 2025
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <FileText className="h-3 w-3" />
                Version 2.0
              </Badge>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Alert className="border-accent/20 bg-accent/5">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <AlertDescription className="text-sm">
                <strong>Important:</strong> By using our services or website, you agree to these terms and conditions. 
                Please read them carefully as they contain important information about your rights and obligations.
              </AlertDescription>
            </Alert>
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
              <Link href="#acceptance" className="text-accent hover:underline">Acceptance of Terms</Link>
              <Link href="#services" className="text-accent hover:underline">Our Services</Link>
              <Link href="#eligibility" className="text-accent hover:underline">Eligibility</Link>
              <Link href="#responsibilities" className="text-accent hover:underline">Your Responsibilities</Link>
              <Link href="#fees" className="text-accent hover:underline">Fees & Charges</Link>
              <Link href="#investment" className="text-accent hover:underline">Investment Risks</Link>
              <Link href="#limitations" className="text-accent hover:underline">Limitations</Link>
              <Link href="#termination" className="text-accent hover:underline">Termination</Link>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Acceptance of Terms */}
            <motion.div id="acceptance" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <CheckCircle className="h-6 w-6 text-primary mr-3" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing our website, opening a pension account, or using any of our services, you acknowledge that you have read, 
                    understood, and agree to be bound by these Terms and Conditions and our Privacy Policy.
                  </p>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-3">Agreement Scope</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• All pension services provided by Standard Pensions Trust</li>
                      <li>• Use of our website and digital platforms</li>
                      <li>• Member portal and mobile applications</li>
                      <li>• Customer service and support interactions</li>
                      <li>• All communications and documentation</li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">Changes to Terms</h4>
                    <p className="text-sm text-muted-foreground">
                      We may update these terms periodically. Significant changes will be communicated via email, 
                      website notice, or direct mail. Continued use of our services constitutes acceptance of revised terms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Our Services */}
            <motion.div id="services" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Building2 className="h-6 w-6 text-primary mr-3" />
                    Our Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Standard Pensions Trust is licensed by the National Pensions Regulatory Authority (NPRA) to provide comprehensive pension services.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Pension Schemes</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Best Master Trust Scheme (Tier 2)</li>
                        <li>• Best Personal Pension Scheme (Tier 3)</li>
                        <li>• Best Provident Fund Scheme</li>
                        <li>• Employer Sponsored Schemes</li>
                        <li>• Account Booster Programs</li>
                      </ul>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-3">Additional Services</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Investment management</li>
                        <li>• Retirement planning consultation</li>
                        <li>• Benefit claims processing</li>
                        <li>• Annual statements and reporting</li>
                        <li>• Digital account management</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Service Standards</h4>
                    <p className="text-sm text-muted-foreground">
                      We are committed to providing professional, transparent, and efficient pension services in accordance with 
                      regulatory requirements and industry best practices. Our services are subject to applicable laws and regulations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Eligibility and Account Opening */}
            <motion.div id="eligibility" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    Eligibility and Account Opening
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">General Eligibility</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Must be at least 18 years of age</li>
                        <li>• Valid identification (Ghana Card or equivalent)</li>
                        <li>• SSNIT number for Tier 2 schemes</li>
                        <li>• Completion of Know Your Customer (KYC) procedures</li>
                        <li>• Agreement to terms and conditions</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Employment-Based Schemes</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Current employment with participating employer</li>
                        <li>• Employer registration with Standard Pensions Trust</li>
                        <li>• Completion of employee enrollment process</li>
                        <li>• Minimum contribution requirements as applicable</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Individual Schemes</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Self-employed or employed individuals</li>
                        <li>• Minimum initial contribution requirements</li>
                        <li>• Regular contribution commitments</li>
                        <li>• Bank account for automated payments</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">Account Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right to verify information provided and may request additional documentation. 
                      False or misleading information may result in account suspension or termination.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Responsibilities */}
            <motion.div id="responsibilities" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="h-6 w-6 text-primary mr-3" />
                    Your Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    As a member of Standard Pensions Trust, you have certain responsibilities to ensure the proper management of your pension account.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Accurate Information",
                        items: [
                          "Provide truthful and complete information during enrollment",
                          "Update personal details promptly when changes occur",
                          "Notify us of changes in employment status",
                          "Maintain current contact information"
                        ]
                      },
                      {
                        title: "Contribution Obligations",
                        items: [
                          "Make contributions as agreed in your plan",
                          "Ensure employer contributions are made (where applicable)",
                          "Report contribution discrepancies promptly",
                          "Maintain minimum balance requirements"
                        ]
                      },
                      {
                        title: "Account Security",
                        items: [
                          "Keep login credentials confidential",
                          "Report unauthorized access immediately",
                          "Use secure devices for online access",
                          "Log out after each session"
                        ]
                      },
                      {
                        title: "Compliance Requirements",
                        items: [
                          "Comply with all applicable laws and regulations",
                          "Provide required documentation promptly",
                          "Cooperate with audits and reviews",
                          "Report any suspected fraud or irregularities"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="bg-card border border-border/30 rounded-lg p-4">
                        <h4 className="font-semibold text-primary mb-3">{section.title}</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
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

            {/* Fees and Charges */}
            <motion.div id="fees" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <CreditCard className="h-6 w-6 text-primary mr-3" />
                    Fees and Charges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Our fee structure is transparent and competitive, designed to provide excellent value while ensuring sustainable service delivery.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Management Fees
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Annual management fee on account balance</li>
                        <li>• Investment management charges</li>
                        <li>• Custodial and administration fees</li>
                        <li>• Regulatory compliance costs</li>
                      </ul>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Transaction Fees
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Contribution processing fees</li>
                        <li>• Benefit payment charges</li>
                        <li>• Transfer and rollover fees</li>
                        <li>• Document processing charges</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Fee Disclosure</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      All fees are clearly disclosed in your plan documents and annual statements. 
                      We provide detailed fee schedules upon request and notify members of any fee changes in advance.
                    </p>
                    <div className="text-sm">
                      <Link href="/media/downloads" className="text-accent hover:underline">
                        Download current fee schedule →
                      </Link>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">Fee Changes</h4>
                    <p className="text-sm text-muted-foreground">
                      We may adjust fees periodically to reflect changes in costs, regulations, or service enhancements. 
                      Members will receive 30 days advance notice of any fee increases.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Investment Risks and Disclaimers */}
            <motion.div id="investment" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <AlertTriangle className="h-6 w-6 text-primary mr-3" />
                    Investment Risks and Disclaimers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h4 className="font-semibold text-destructive mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Important Risk Disclosure
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      All investments carry risk, including the potential loss of principal. Past performance does not guarantee future results. 
                      The value of your pension account may fluctuate based on market conditions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Market Risks</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Fluctuations in equity and bond markets</li>
                        <li>• Currency exchange rate variations</li>
                        <li>• Interest rate changes</li>
                        <li>• Economic and political uncertainties</li>
                        <li>• Inflation and purchasing power erosion</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Investment Principles</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Diversified portfolio approach</li>
                        <li>• Long-term investment horizon</li>
                        <li>• Professional fund management</li>
                        <li>• Regular portfolio monitoring and rebalancing</li>
                        <li>• Compliance with regulatory investment guidelines</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Performance Disclaimers</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• No guarantee of investment returns</li>
                        <li>• Historical performance is not indicative of future results</li>
                        <li>• Investment outcomes depend on market conditions</li>
                        <li>• Regular contributions enhance long-term growth potential</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Our Commitment</h4>
                    <p className="text-sm text-muted-foreground">
                      While we cannot guarantee investment returns, we are committed to prudent investment management, 
                      transparent reporting, and acting in the best interests of our members at all times.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div id="limitations" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <XCircle className="h-6 w-6 text-primary mr-3" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    While we strive to provide excellent service, our liability is limited as outlined below, subject to applicable law and regulatory requirements.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Service Limitations</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• We are not liable for market performance or investment losses</li>
                        <li>• System downtime or technical issues beyond our control</li>
                        <li>• Delays caused by regulatory or legal requirements</li>
                        <li>• Third-party service provider failures</li>
                        <li>• Member's failure to provide accurate information</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Maximum Liability</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Except where prohibited by law, our total liability for any claim shall not exceed:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• The fees paid by you in the 12 months preceding the claim</li>
                        <li>• Direct damages actually incurred and proven</li>
                        <li>• Amounts recoverable under our professional indemnity insurance</li>
                      </ul>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Excluded Damages</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        We shall not be liable for:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Indirect, consequential, or punitive damages</li>
                        <li>• Lost profits or business opportunities</li>
                        <li>• Emotional distress or mental anguish</li>
                        <li>• Damages arising from unauthorized account access</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <h4 className="font-semibold text-accent mb-2">Regulatory Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      As a licensed pension fund administrator, we maintain professional indemnity insurance and 
                      operate under NPRA oversight, providing additional protection for member funds.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Termination */}
            <motion.div id="termination" variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Clock className="h-6 w-6 text-primary mr-3" />
                    Termination of Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Member-Initiated Termination</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Written notice required</li>
                        <li>• Transfer to another approved fund</li>
                        <li>• Benefit payment upon eligibility</li>
                        <li>• Settlement of outstanding fees</li>
                        <li>• Account closure procedures</li>
                      </ul>
                    </div>

                    <div className="bg-accent/5 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-3">Company-Initiated Termination</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Breach of terms and conditions</li>
                        <li>• Fraudulent activities</li>
                        <li>• Non-payment of required fees</li>
                        <li>• Failure to update information</li>
                        <li>• Regulatory requirements</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Termination Process</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upon termination, we will:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Provide 30 days written notice (where applicable)</li>
                      <li>• Calculate final account balance</li>
                      <li>• Facilitate benefit payment or transfer</li>
                      <li>• Provide final statements and documentation</li>
                      <li>• Close all associated accounts and services</li>
                    </ul>
                  </div>

                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <h4 className="font-semibold text-destructive mb-2">Important Note</h4>
                    <p className="text-sm text-muted-foreground">
                      Early withdrawal may result in tax implications and penalties. Please consult with a financial 
                      advisor or tax professional before making termination decisions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dispute Resolution */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Gavel className="h-6 w-6 text-primary mr-3" />
                    Dispute Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    We are committed to resolving any disputes fairly and efficiently through our established complaint handling procedures.
                  </p>

                  <div className="grid gap-4">
                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">Internal Resolution Process</h4>
                      <ol className="space-y-2 text-sm text-muted-foreground">
                        <li>1. Submit complaint in writing to our Customer Service team</li>
                        <li>2. Acknowledgment within 2 business days</li>
                        <li>3. Investigation and response within 15 business days</li>
                        <li>4. Escalation to management if required</li>
                        <li>5. Final response within 30 business days</li>
                      </ol>
                    </div>

                    <div className="bg-card border border-border/30 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">External Resolution</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        If you are not satisfied with our internal resolution:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• National Pensions Regulatory Authority (NPRA)</li>
                        <li>• Financial Industry Disputes Centre</li>
                        <li>• Ghana Arbitration Centre</li>
                        <li>• Courts of competent jurisdiction in Ghana</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Governing Law</h4>
                    <p className="text-sm text-muted-foreground">
                      These terms and conditions are governed by the laws of Ghana. Any disputes shall be subject to 
                      the exclusive jurisdiction of the courts of Ghana.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeInUp}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Mail className="h-6 w-6 text-primary mr-3" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    For questions about these Terms and Conditions or our services, please contact us:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">General Inquiries</h4>
                      <div className="space-y-3 text-sm">
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          info@standardpensionstrust.com
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
                      <h4 className="font-semibold text-accent mb-3">Legal & Compliance</h4>
                      <div className="space-y-3 text-sm">
                        <p className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-accent" />
                          legal@standardpensionstrust.com
                        </p>
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-accent" />
                          +233 (0) 302 780 765 Ext. 205
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          For legal matters, compliance issues, and formal complaints
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Business Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 8:00 AM - 5:00 PM (GMT)<br />
                      Saturday: 9:00 AM - 1:00 PM (GMT)<br />
                      Closed on Sundays and public holidays
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Footer Notice */}
            <motion.div variants={fadeInUp}>
              <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Thank You for Your Trust</h3>
                  <p className="text-muted-foreground mb-4">
                    By choosing Standard Pensions Trust, you're securing your financial future with Ghana's trusted pension administrator.
                  </p>
                  <div className="flex justify-center">
                    <Link 
                      href="/legal/privacy-policy" 
                      className="text-accent hover:underline font-medium flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      View Privacy Policy
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