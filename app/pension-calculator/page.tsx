import { Metadata } from 'next'
import { PensionCalculator } from '@/components/pension-calculator'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { BarChart, LineChart } from 'lucide-react'
import { InfoCircledIcon } from '@radix-ui/react-icons'

export const metadata: Metadata = {
  title: 'Pension Calculator',
  description: 'Calculate your estimated pension benefits at retirement based on your current salary, age, and contribution levels.',
}

export default function PensionCalculatorPage() {
  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Pension Calculator</h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
          Use our interactive pension calculator to estimate your monthly retirement income based on your current situation.
        </p>
      </div>
      
          {/* Calculator Component */}
          <div className="mb-12 sm:mb-16">
      <PensionCalculator />
          </div>
      
          {/* Understanding Section */}
          <div className="py-20">
            <Card className="overflow-hidden">
              <CardHeader className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <CardTitle className="text-center text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
                  Understanding Your Pension Calculation
                </CardTitle>
                <CardDescription className="text-center text-sm sm:text-base lg:text-lg leading-relaxed px-2 sm:px-4">
              This calculator provides an estimate of your monthly pension at retirement based on your current age, salary, 
              contribution percentage, and expected retirement age. The calculation includes:
            </CardDescription>
          </CardHeader>
              
              <CardContent className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8">
                {/* Tier 1 SSNIT */}
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 bg-blue-50/50 dark:bg-blue-950/20 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="shrink-0">
                    <BarChart className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-blue-600 mx-auto lg:mx-0" />
                  </div>
                  <div className="text-center lg:text-left w-full">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-900 dark:text-blue-100">
                      Tier 1 - SSNIT Pension (13.5%)
                    </h3>
                    <p className="text-sm sm:text-base text-blue-700 dark:text-blue-200 leading-relaxed">
                      <strong>Worker contribution:</strong> 13.5% of gross income (mandatory). This goes to the Social Security and National Insurance Trust (SSNIT) and provides a monthly pension based on your pension rights percentage and best 3-year average salary.
                    </p>
                  </div>
                </div>

                {/* Tier 2 Occupational */}
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 bg-green-50/50 dark:bg-green-950/20 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
              <div className="shrink-0">
                    <BarChart className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-green-600 mx-auto lg:mx-0" />
              </div>
                  <div className="text-center lg:text-left w-full">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-900 dark:text-green-100">
                      Tier 2 - Occupational Pension (5.0%)
                    </h3>
                    <p className="text-sm sm:text-base text-green-700 dark:text-green-200 leading-relaxed">
                      <strong>Employer contribution:</strong> 5% of basic salary (mandatory). Managed by licensed private trustees, this provides a lump sum benefit and potential annuity income at retirement based on investment performance.
            </p>
              </div>
          </div>
          
                {/* Tier 3 Voluntary */}
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8 bg-purple-50/50 dark:bg-purple-950/20 p-4 sm:p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="shrink-0">
                    <LineChart className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-purple-600 mx-auto lg:mx-0" />
              </div>
                  <div className="text-center lg:text-left w-full">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-purple-900 dark:text-purple-100">
                      Tier 3 - Voluntary Contributions (0-16.5%)
                    </h3>
                    <p className="text-sm sm:text-base text-purple-700 dark:text-purple-200 leading-relaxed">
                      <strong>Optional personal contributions:</strong> Up to 16.5% of gross income. These voluntary contributions are tax-deductible and provide additional retirement savings to supplement your mandatory pension benefits.
            </p>
              </div>
          </div>

                {/* Summary Box */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-6 rounded-lg border border-border/40">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">Total Contribution Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-blue-600">13.5%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Tier 1 (Worker)</div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-green-600">5.0%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Tier 2 (Employer)</div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600">0-16.5%</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Tier 3 (Voluntary)</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center px-2">
                    <div className="text-base sm:text-lg font-semibold">
                      Mandatory Total: <span className="text-primary">18.5%</span> (Tier 1 + Tier 2)
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Plus your voluntary Tier 3 contributions
                    </div>
                  </div>
                </div>
          
            {/* Important Notes */}
                <div className="bg-amber-100/20 text-amber-800 dark:bg-neutral-800 p-4 sm:p-6 rounded-lg border border-amber-300 dark:border-yellow-300">
                  <div className="flex items-start sm:items-center space-x-3 mb-4">
                    <InfoCircledIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-amber-600 dark:text-yellow-300 mt-0.5 sm:mt-0" />
                    <h3 className="text-lg sm:text-xl font-semibold text-amber-800 dark:text-yellow-200">Important Notes</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-amber-700 dark:text-yellow-100">
                    <li className="text-sm sm:text-base leading-relaxed">
                      This calculator uses simplified assumptions and is meant for illustrative purposes only.
                    </li>
                    <li className="text-sm sm:text-base leading-relaxed">
                      Actual pension values will depend on investment performance, inflation rates, and regulatory changes.
                    </li>
                    <li className="text-sm sm:text-base leading-relaxed">
                      The calculation assumes consistent contributions throughout your working years.
                    </li>
                    <li className="text-sm sm:text-base leading-relaxed">
                      Tier 1 pension rights: 37.5% for first 15 years + 1.125% per additional year (max 60%).
                    </li>
                    <li className="text-sm sm:text-base leading-relaxed">
                      We recommend reviewing your pension plan regularly with a financial advisor.
                    </li>
                    <li className="text-sm sm:text-base leading-relaxed">
                      References: SSNIT Act, 2008 (Act 766) and National Pensions Regulatory Authority (NPRA) guidelines.
                    </li>
            </ul>
          </div>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
    </section>
  )
}