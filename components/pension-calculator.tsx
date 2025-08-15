"use client"

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  PiggyBank,
  Briefcase,
  Heart,
  HelpCircle,
  BarChart3,
  User,
  Clock,
  Award
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar, AreaChart, Area } from 'recharts'

interface PensionInputs {
  currentAge: number
  retirementAge: number
  currentSalary: number
  bestThreeYearAverage: number
  monthsContributed: number
  yearsContributed: number
  tier2Rate: number
  tier3Rate: number
  tier2ReturnRate: number
  tier3ReturnRate: number
  salaryGrowthRate: number
  inflationRate: number
  discountRate: number
  isEarlyRetirement: boolean
  earlyRetirementPenalty: number
}

interface PensionResults {
  tier1MonthlyPension: number
  tier1AnnualPension: number
  pensionRightPercentage: number
  tier2FundValue: number
  tier2LumpSum: number
  tier2AnnuityIncome: number
  tier3FundValue: number
  tier3LumpSum: number
  tier3AnnuityIncome: number
  totalMonthlyIncome: number
  totalAnnualIncome: number
  replacementRatio: number
  survivorBenefit: number
  invalidityBenefit: number
  finalProjectedSalary: number
  totalContributions: number
  totalInvestmentGains: number
}

export function PensionCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [inputs, setInputs] = useState<PensionInputs>({
    currentAge: 30,
    retirementAge: 60,
    currentSalary: 5000,
    bestThreeYearAverage: 60000,
    monthsContributed: 60,
    yearsContributed: 5,
    tier2Rate: 5.0,
    tier3Rate: 5.0,
    tier2ReturnRate: 10.0,
    tier3ReturnRate: 12.0,
    salaryGrowthRate: 8.0,
    inflationRate: 10.0,
    discountRate: 15.0,
    isEarlyRetirement: false,
    earlyRetirementPenalty: 0
  })
  
  const [results, setResults] = useState<PensionResults | null>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (inputs.retirementAge < 60) {
      const yearsEarly = 60 - inputs.retirementAge
      const penalty = Math.min(yearsEarly * 10, 50)
      setInputs(prev => ({ ...prev, isEarlyRetirement: true, earlyRetirementPenalty: penalty }))
    } else {
      setInputs(prev => ({ ...prev, isEarlyRetirement: false, earlyRetirementPenalty: 0 }))
    }
  }, [inputs.retirementAge])

  const calculatePensionRights = (monthsContributed: number): number => {
    const yearsContributed = monthsContributed / 12
    if (yearsContributed < 15) return 0
    
    const basePercentage = 37.5
    const additionalYears = Math.min(yearsContributed - 15, 20)
    const additionalPercentage = additionalYears * 1.125
    
    return Math.min(basePercentage + additionalPercentage, 60)
  }

  const calculateTier1Pension = (): { monthly: number; annual: number; pensionRights: number } => {
    const pensionRights = calculatePensionRights(inputs.monthsContributed)
    const avgSalary = inputs.bestThreeYearAverage
    
    let monthlyPension = (avgSalary * (pensionRights / 100)) / 12
    
    if (inputs.isEarlyRetirement) {
      monthlyPension *= (1 - (inputs.earlyRetirementPenalty / 100))
    }
    
    return {
      monthly: Math.max(monthlyPension, 0),
      annual: Math.max(monthlyPension * 12, 0),
      pensionRights
    }
  }

  const calculateTier2Benefits = (): { fundValue: number; lumpSum: number; annuity: number } => {
    const TIER2_RATE = 5.0 // Fixed at 5% as per Ghana pension system
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    let totalFund = 0
    let currentSalary = inputs.currentSalary
    
    for (let year = 0; year < yearsToRetirement; year++) {
      const annualContribution = currentSalary * 12 * (TIER2_RATE / 100)
      totalFund = (totalFund + annualContribution) * (1 + (inputs.tier2ReturnRate / 100))
      currentSalary *= (1 + (inputs.salaryGrowthRate / 100))
    }
    
    totalFund *= Math.pow(0.99, yearsToRetirement)
    
    const lumpSum = totalFund * 0.5
    const annuityPortion = totalFund * 0.5
    const monthlyAnnuity = annuityPortion / (20 * 12)
    
    return {
      fundValue: totalFund,
      lumpSum,
      annuity: monthlyAnnuity
    }
  }

  const calculateTier3Benefits = (): { fundValue: number; lumpSum: number; annuity: number } => {
    if (inputs.tier3Rate === 0) return { fundValue: 0, lumpSum: 0, annuity: 0 }
    
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    let totalFund = 0
    let currentSalary = inputs.currentSalary
    
    for (let year = 0; year < yearsToRetirement; year++) {
      const annualContribution = currentSalary * 12 * (inputs.tier3Rate / 100)
      totalFund = (totalFund + annualContribution) * (1 + (inputs.tier3ReturnRate / 100))
      currentSalary *= (1 + (inputs.salaryGrowthRate / 100))
    }
    
    totalFund *= Math.pow(0.995, yearsToRetirement)
    
    const lumpSum = totalFund * 0.75
    const annuityPortion = totalFund * 0.25
    const monthlyAnnuity = annuityPortion / (15 * 12)
    
    return {
      fundValue: totalFund,
      lumpSum,
      annuity: monthlyAnnuity
    }
  }

  const calculateAdditionalBenefits = (tier1Monthly: number): { survivor: number; invalidity: number } => {
    const survivorBenefit = tier1Monthly * 12 * 15 / Math.pow(1 + (inputs.discountRate / 100), 15)
    const minimumPension = inputs.bestThreeYearAverage * 0.375 / 12
    const contributionRefund = inputs.currentSalary * 12 * 0.185 * inputs.yearsContributed * 1.05 // Using 18.5% total for tier 1+2
    const invalidityBenefit = Math.max(minimumPension, contributionRefund)
    
    return {
      survivor: survivorBenefit,
      invalidity: invalidityBenefit
    }
  }

  const calculatePension = () => {
    const TIER2_RATE = 5.0 // Fixed at 5%
    const tier1 = calculateTier1Pension()
    const tier2 = calculateTier2Benefits()
    const tier3 = calculateTier3Benefits()
    const additional = calculateAdditionalBenefits(tier1.monthly)
    
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    const finalSalary = inputs.currentSalary * Math.pow(1 + (inputs.salaryGrowthRate / 100), yearsToRetirement)
    
    const totalMonthly = tier1.monthly + tier2.annuity + tier3.annuity
    const totalAnnual = totalMonthly * 12
    const replacementRatio = (totalMonthly / (finalSalary / 12)) * 100
    
    const totalTier2Contributions = inputs.currentSalary * 12 * (TIER2_RATE / 100) * yearsToRetirement
    const totalTier3Contributions = inputs.currentSalary * 12 * (inputs.tier3Rate / 100) * yearsToRetirement
    const totalContributions = totalTier2Contributions + totalTier3Contributions
    const totalInvestmentGains = (tier2.fundValue + tier3.fundValue) - totalContributions
    
    const calculatedResults: PensionResults = {
      tier1MonthlyPension: tier1.monthly,
      tier1AnnualPension: tier1.annual,
      pensionRightPercentage: tier1.pensionRights,
      tier2FundValue: tier2.fundValue,
      tier2LumpSum: tier2.lumpSum,
      tier2AnnuityIncome: tier2.annuity,
      tier3FundValue: tier3.fundValue,
      tier3LumpSum: tier3.lumpSum,
      tier3AnnuityIncome: tier3.annuity,
      totalMonthlyIncome: totalMonthly,
      totalAnnualIncome: totalAnnual,
      replacementRatio,
      survivorBenefit: additional.survivor,
      invalidityBenefit: additional.invalidity,
      finalProjectedSalary: finalSalary,
      totalContributions,
      totalInvestmentGains
    }
    
    setResults(calculatedResults)
    generateChartData(calculatedResults)
    setShowResults(true)
  }

  const generateChartData = (results: PensionResults) => {
    const TIER2_RATE = 5.0 // Fixed at 5%
    const data = []
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    let currentSalary = inputs.currentSalary
    let tier2Fund = 0
    let tier3Fund = 0
    
    for (let year = inputs.currentAge; year <= inputs.retirementAge; year++) {
      if (year > inputs.currentAge) {
        currentSalary *= (1 + (inputs.salaryGrowthRate / 100))
      }
      
      const tier2Contribution = currentSalary * 12 * (TIER2_RATE / 100)
      const tier3Contribution = currentSalary * 12 * (inputs.tier3Rate / 100)
      
      tier2Fund = (tier2Fund + tier2Contribution) * (1 + (inputs.tier2ReturnRate / 100))
      tier3Fund = (tier3Fund + tier3Contribution) * (1 + (inputs.tier3ReturnRate / 100))
      
      data.push({
        year,
        age: year,
        salary: Math.round(currentSalary * 12),
        tier2Fund: Math.round(tier2Fund),
        tier3Fund: Math.round(tier3Fund),
        totalFund: Math.round(tier2Fund + tier3Fund)
      })
    }
    
    setChartData(data)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getReplacementRatioColor = (ratio: number): string => {
    if (ratio >= 80) return 'text-green-500'
    if (ratio >= 60) return 'text-blue-500'
    if (ratio >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getReadinessScore = (ratio: number): string => {
    if (ratio >= 80) return 'Excellent'
    if (ratio >= 60) return 'Good'
    if (ratio >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  const stepTitles = [
    'Basic Information',
    'Contribution History',
    'Investment Assumptions',
    'Results & Analysis'
  ]

  const nextStep = () => {
    if (currentStep < 4) {
      if (currentStep === 3) calculatePension()
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Advanced Pension Calculator
          </h2>
          <Badge variant="outline" className="text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2 self-start sm:self-auto">
            Step {currentStep} of 4
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {stepTitles.map((title, index) => (
            <div key={index} className={`text-center ${currentStep > index + 1 ? 'opacity-100' : currentStep === index + 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center text-xs sm:text-sm ${
                currentStep > index + 1 ? 'bg-green-500 text-white' : 
                currentStep === index + 1 ? 'bg-primary text-white' : 
                'bg-gray-200 text-gray-400'
              }`}>
                {currentStep > index + 1 ? <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" /> : index + 1}
              </div>
              <p className="text-xs sm:text-sm font-medium hidden sm:block">{title}</p>
              <p className="text-xs font-medium sm:hidden">
                {title.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>
        
        <Progress value={(currentStep / 4) * 100} className="h-2" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <Card className="mb-6 sm:mb-8">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl">
                  <User className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Basic Information & Earnings
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Enter your current age, salary, and retirement plans
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">Current Age: {inputs.currentAge}</Label>
                    <Slider
                      value={[inputs.currentAge]}
                      onValueChange={(value) => setInputs({...inputs, currentAge: value[0]})}
                      min={18}
                      max={59}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span>18</span>
                      <span>59</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Retirement Age: {inputs.retirementAge}
                      {inputs.isEarlyRetirement && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Early Retirement ({inputs.earlyRetirementPenalty}% penalty)
                        </Badge>
                      )}
                    </Label>
                    <Slider
                      value={[inputs.retirementAge]}
                      onValueChange={(value) => setInputs({...inputs, retirementAge: value[0]})}
                      min={55}
                      max={65}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span>55 (Early)</span>
                      <span>65 (Extended)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">Current Monthly Basic Salary (GHS)</Label>
                    <Input
                      type="number"
                      value={inputs.currentSalary}
                      onChange={(e) => setInputs({...inputs, currentSalary: Number(e.target.value)})}
                      className="text-base sm:text-lg"
                      min={500}
                      max={100000}
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">Your current basic monthly salary before allowances</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">Best 3-Year Average Annual Salary (GHS)</Label>
                    <Input
                      type="number"
                      value={inputs.bestThreeYearAverage}
                      onChange={(e) => setInputs({...inputs, bestThreeYearAverage: Number(e.target.value)})}
                      className="text-base sm:text-lg"
                      min={6000}
                      max={1200000}
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Average of your highest 36 monthly contributions (for SSNIT Tier 1 calculation)
                    </p>
                  </div>
                </div>

                {inputs.isEarlyRetirement && (
                  <Alert className="mt-4 sm:mt-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Early Retirement Impact</AlertTitle>
                    <AlertDescription className="text-sm">
                      Retiring at age {inputs.retirementAge} will reduce your Tier 1 pension by {inputs.earlyRetirementPenalty}%. 
                      Consider working until age 60 for full benefits.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Contribution History */}
          {currentStep === 2 && (
            <Card className="mb-6 sm:mb-8">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl">
                  <Calendar className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Contribution History
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Your pension contribution history determines your pension rights
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Months Contributed to Tier 1: {inputs.monthsContributed}
                    </Label>
                    <Slider
                      value={[inputs.monthsContributed]}
                      onValueChange={(value) => {
                        setInputs({
                          ...inputs, 
                          monthsContributed: value[0],
                          yearsContributed: Math.floor(value[0] / 12)
                        })
                      }}
                      min={0}
                      max={420}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                      <span>0 months</span>
                      <span>420 months (35 years)</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium">Years: </span>{inputs.yearsContributed} years
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">Pension Rights Percentage</Label>
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                        {calculatePensionRights(inputs.monthsContributed).toFixed(1)}%
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <div>• First 15 years: 37.5%</div>
                        <div>• Additional years: +{((inputs.monthsContributed / 12) - 15 > 0 ? Math.min((inputs.monthsContributed / 12) - 15, 20) * 1.125 : 0).toFixed(1)}%</div>
                        <div>• Maximum: 60%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contribution Rates Section */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Ghana 3-Tier Pension System Contribution Rates</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Tier 1 - Fixed */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm sm:text-base lg:text-lg font-semibold">Tier 1 SSNIT</Label>
                        <Badge variant="secondary" className="text-xs">Mandatory</Badge>
                      </div>
                      <div className="p-3 sm:p-4 bg-card rounded-lg border-2 border-border">
                        <div className="text-center mb-4">
                          <div className="text-2xl sm:text-3xl font-bold text-blue-600">13.5%</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Worker Contribution</div>
                        </div>
                        {/* Fixed Rate Indicator */}
                        <div className="w-full mb-3">
                          <div className="relative">
                            <div className="w-full h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-blue-600 rounded-full" 
                                style={{ width: `${(13.5 / 20) * 100}%` }}
                              ></div>
                            </div>
                            <div 
                              className="absolute top-0 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow transform -translate-y-1"
                              style={{ left: `calc(${(13.5 / 20) * 100}% - 8px)` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <span>0%</span>
                          <span>20%</span>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <div>• 13.5% of gross income</div>
                          <div>• Paid by employee</div>
                          <div>• Managed by SSNIT</div>
                          <div>• Provides monthly pension</div>
                        </div>
                      </div>
                    </div>

                    {/* Tier 2 - Fixed */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm sm:text-base lg:text-lg font-semibold">Tier 2 Occupational</Label>
                        <Badge variant="secondary" className="text-xs">Mandatory</Badge>
                      </div>
                      <div className="p-3 sm:p-4 bg-card rounded-lg border-2 border-border">
                        <div className="text-center mb-4">
                          <div className="text-2xl sm:text-3xl font-bold text-green-600">5.0%</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Employer Contribution</div>
                        </div>
                        {/* Fixed Rate Indicator */}
                        <div className="w-full mb-3">
                          <div className="relative">
                            <div className="w-full h-2 bg-muted rounded-full">
                              <div 
                                className="h-2 bg-green-600 rounded-full" 
                                style={{ width: `${(5.0 / 20) * 100}%` }}
                              ></div>
                            </div>
                            <div 
                              className="absolute top-0 w-4 h-4 bg-green-600 border-2 border-white rounded-full shadow transform -translate-y-1"
                              style={{ left: `calc(${(5.0 / 20) * 100}% - 8px)` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <span>0%</span>
                          <span>20%</span>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <div>• 5% of basic salary</div>
                          <div>• Paid by employer</div>
                          <div>• Managed by licensed trustees</div>
                          <div>• Provides lump sum benefit</div>
                        </div>
                      </div>
                    </div>

                    {/* Tier 3 - Variable */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm sm:text-base lg:text-lg font-semibold">Tier 3 Voluntary</Label>
                        <Badge variant="outline" className="text-xs">Optional</Badge>
                      </div>
                      <div className="p-3 sm:p-4 bg-card rounded-lg border-2 border-border">
                        <div className="text-center mb-4">
                          <div className="text-2xl sm:text-3xl font-bold text-purple-600">{inputs.tier3Rate}%</div>
                          <div className="text-xs sm:text-sm text-muted-foreground">Your Choice</div>
                        </div>
                        <Slider
                          value={[inputs.tier3Rate]}
                          onValueChange={(value) => setInputs({...inputs, tier3Rate: value[0]})}
                          min={0}
                          max={16.5}
                          step={0.5}
                          className="w-full mb-3"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mb-3">
                          <span>0%</span>
                          <span>16.5%</span>
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                          <div>• Voluntary contribution</div>
                          <div>• Tax deductible</div>
                          <div>• Up to 16.5% of gross income</div>
                          <div>• Additional retirement savings</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/20 rounded-lg border">
                    <h4 className="text-base sm:text-lg font-semibold mb-3 text-center">Your Total Contribution Summary</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
                      <div className="p-2 sm:p-3">
                        <div className="text-base sm:text-lg font-bold text-blue-600">13.5%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Tier 1 (Worker)</div>
                      </div>
                      <div className="p-2 sm:p-3">
                        <div className="text-base sm:text-lg font-bold text-green-600">5.0%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Tier 2 (Employer)</div>
                      </div>
                      <div className="p-2 sm:p-3">
                        <div className="text-base sm:text-lg font-bold text-purple-600">{inputs.tier3Rate}%</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Tier 3 (Voluntary)</div>
                      </div>
                      <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-border pt-2 sm:pt-0 sm:pl-3">
                        <div className="text-lg sm:text-xl font-bold text-primary">
                          {(18.5 + inputs.tier3Rate).toFixed(1)}%
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">Total Contribution</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          (18.5% Mandatory + {inputs.tier3Rate}% Voluntary)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Investment Assumptions */}
          {currentStep === 3 && (
            <Card className="mb-6 sm:mb-8">
              <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl">
                  <TrendingUp className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  Investment & Economic Assumptions
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Configure return rates and economic assumptions for projections
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Expected Annual Salary Growth: {inputs.salaryGrowthRate}%
                    </Label>
                    <Slider
                      value={[inputs.salaryGrowthRate]}
                      onValueChange={(value) => setInputs({...inputs, salaryGrowthRate: value[0]})}
                      min={0}
                      max={15}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Expected annual increase in your salary (typically 8-12% in Ghana)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Tier 2 Expected Annual Return: {inputs.tier2ReturnRate}%
                    </Label>
                    <Slider
                      value={[inputs.tier2ReturnRate]}
                      onValueChange={(value) => setInputs({...inputs, tier2ReturnRate: value[0]})}
                      min={5}
                      max={18}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Conservative investment portfolio (typically 8-12%)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Tier 3 Expected Annual Return: {inputs.tier3ReturnRate}%
                    </Label>
                    <Slider
                      value={[inputs.tier3ReturnRate]}
                      onValueChange={(value) => setInputs({...inputs, tier3ReturnRate: value[0]})}
                      min={6}
                      max={20}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      More aggressive investment options (typically 10-15%)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base sm:text-lg font-semibold">
                      Expected Annual Inflation: {inputs.inflationRate}%
                    </Label>
                    <Slider
                      value={[inputs.inflationRate]}
                      onValueChange={(value) => setInputs({...inputs, inflationRate: value[0]})}
                      min={5}
                      max={20}
                      step={0.5}
                      className="w-full"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Used for real return calculations and purchasing power analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && results && (
            <div className="space-y-6 sm:space-y-8">
              {/* Results Summary */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-t-lg p-4 sm:p-6">
                  <CardTitle className="flex items-center text-lg sm:text-xl lg:text-2xl">
                    <Calculator className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    Your Pension Calculation Results
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base lg:text-lg">
                    Comprehensive breakdown of your retirement benefits
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  {/* Main Results Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    {/* Tier 1 SSNIT */}
                    <div className="text-center p-4 sm:p-6 bg-card rounded-lg border">
                      <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Tier 1 SSNIT Pension</h3>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-2">
                        {formatCurrency(results.tier1MonthlyPension)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Monthly</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {results.pensionRightPercentage.toFixed(1)}% pension rights
                      </p>
                    </div>

                    {/* Tier 2 Occupational */}
                    <div className="text-center p-4 sm:p-6 bg-card rounded-lg border">
                      <Briefcase className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Tier 2 Occupational</h3>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-1">
                        {formatCurrency(results.tier2FundValue)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Fund</p>
                      <div className="text-base sm:text-lg font-semibold text-green-600 mt-2">
                        {formatCurrency(results.tier2AnnuityIncome)}
                      </div>
                      <p className="text-xs text-muted-foreground">Monthly Annuity</p>
                    </div>

                    {/* Tier 3 Voluntary */}
                    <div className="text-center p-4 sm:p-6 bg-card rounded-lg border">
                      <PiggyBank className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Tier 3 Voluntary</h3>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 mb-1">
                        {formatCurrency(results.tier3FundValue)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total Fund</p>
                      <div className="text-base sm:text-lg font-semibold text-purple-600 mt-2">
                        {formatCurrency(results.tier3AnnuityIncome)}
                      </div>
                      <p className="text-xs text-muted-foreground">Monthly Annuity</p>
                    </div>
                  </div>

                  {/* Total Income Summary */}
                  <div className="text-center p-4 sm:p-6 lg:p-8 bg-muted/20 rounded-lg border mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Total Retirement Income</h3>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                      {formatCurrency(results.totalMonthlyIncome)}
                    </div>
                    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6">Monthly Income at Retirement</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-2">Replacement Ratio</h4>
                        <div className={`text-2xl sm:text-3xl font-bold ${getReplacementRatioColor(results.replacementRatio)}`}>
                          {results.replacementRatio.toFixed(1)}%
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          of final salary ({formatCurrency(results.finalProjectedSalary / 12)}/month)
                        </p>
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-2">Readiness Score</h4>
                        <div className={`text-2xl sm:text-3xl font-bold ${getReplacementRatioColor(results.replacementRatio)}`}>
                          {getReadinessScore(results.replacementRatio)}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Based on 70% target replacement ratio
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Benefits */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="p-4 sm:p-6 bg-card rounded-lg border">
                      <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mb-3" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Survivor Benefit</h3>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-amber-600">
                        {formatCurrency(results.survivorBenefit)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Present value of 15 years pension</p>
                    </div>

                    <div className="p-4 sm:p-6 bg-card rounded-lg border">
                      <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 mb-3" />
                      <h3 className="text-base sm:text-lg font-semibold mb-2">Invalidity Benefit</h3>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
                        {formatCurrency(results.invalidityBenefit)}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Monthly benefit if unable to work</p>
                    </div>
                  </div>

                  {/* Fund Growth Chart */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Pension Fund Growth Projection</h3>
                    <div className="w-full overflow-x-auto">
                      <ResponsiveContainer width="100%" height={300} minWidth={600}>
                        <AreaChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis tickFormatter={(value) => formatCurrency(value)} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Area type="monotone" dataKey="tier2Fund" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="tier3Fund" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Monthly Income Breakdown */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Monthly Income Breakdown</h3>
                    <div className="w-full overflow-x-auto">
                      <ResponsiveContainer width="100%" height={250} minWidth={400}>
                        <BarChart data={[{
                          name: 'Monthly Income',
                          'Tier 1 SSNIT': results.tier1MonthlyPension,
                          'Tier 2 Annuity': results.tier2AnnuityIncome,
                          'Tier 3 Annuity': results.tier3AnnuityIncome
                        }]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => formatCurrency(value)} />
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          <Legend />
                          <Bar dataKey="Tier 1 SSNIT" fill="#3b82f6" />
                          <Bar dataKey="Tier 2 Annuity" fill="#10b981" />
                          <Bar dataKey="Tier 3 Annuity" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-4 sm:p-6 bg-muted/20 rounded-lg border">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                      <Award className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      Recommendations
                    </h3>
                    <div className="space-y-3">
                      {results.replacementRatio < 70 && (
                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Consider Increasing Contributions</AlertTitle>
                          <AlertDescription className="text-sm">
                            Your replacement ratio is below the recommended 70%. Consider increasing your Tier 3 contributions.
                          </AlertDescription>
                        </Alert>
                      )}
                      {inputs.monthsContributed < 240 && (
                        <Alert>
                          <Clock className="h-4 w-4" />
                          <AlertTitle>Extend Contributing Years</AlertTitle>
                          <AlertDescription className="text-sm">
                            Contributing for more years will increase your pension rights percentage up to 60%.
                          </AlertDescription>
                        </Alert>
                      )}
                      {results.replacementRatio >= 70 && (
                        <Alert>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertTitle>Great Retirement Planning!</AlertTitle>
                          <AlertDescription className="text-sm">
                            Your projected retirement income meets recommended standards. Continue your contributions!
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center justify-center w-full sm:w-auto order-2 sm:order-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        {currentStep < 4 ? (
          <Button onClick={nextStep} className="flex items-center justify-center w-full sm:w-auto order-1 sm:order-2">
            {currentStep === 3 ? 'Calculate Pension' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => {
              setCurrentStep(1)
              setShowResults(false)
              setResults(null)
            }}
            variant="outline"
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Start New Calculation
          </Button>
        )}
      </div>
    </div>
  )
}