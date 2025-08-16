// Enhanced context system for better chatbot responses
export const getEnhancedContext = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Scheme-specific contexts
  if (lowerQuery.includes('tier 2') || lowerQuery.includes('master trust') || lowerQuery.includes('occupational')) {
    return `
TIER 2 MASTER TRUST DETAILED INFO:
- Mandatory for all formal sector employees
- 5% employer contribution of basic salary
- Administered by licensed trustees (SPT)
- Lump sum benefit at retirement (age 60)
- Cannot be accessed before retirement except in extreme cases
- Employer automatically enrolls eligible employees
- Professional fund management with NPRA oversight
- Form: /forms/employer-enrollment for companies, automatic employee enrollment
    `;
  }
  
  if (lowerQuery.includes('tier 3') || lowerQuery.includes('personal pension') || lowerQuery.includes('voluntary')) {
    return `
TIER 3 PERSONAL PENSION DETAILED INFO:
- Voluntary additional pension savings
- Up to 16.5% of gross income contribution
- Tax-deductible contributions (significant savings)
- Flexible contribution amounts and timing
- Portable between employers
- Can access after 10 years or at retirement
- Ideal for self-employed individuals
- Enhanced retirement security beyond basic pension
- Form: /forms/employee-enrollment for individual registration
    `;
  }
  
  if (lowerQuery.includes('provident fund')) {
    return `
PROVIDENT FUND DETAILED INFO:
- Tier 3 scheme with matched employer-employee contributions
- Both parties contribute to accelerate savings
- Up to 16.5% combined contribution limit
- Tax benefits on contributions
- Lump sum payment at retirement
- Emergency access under specific conditions
- Competitive interest rates
- Professional fund management
    `;
  }
  
  if (lowerQuery.includes('enroll') || lowerQuery.includes('join') || lowerQuery.includes('sign up')) {
    return `
ENROLLMENT STEP-BY-STEP:

For Individuals:
1. Visit /services/enrollment to learn about options
2. Choose between Tier 3 schemes based on your needs
3. Complete online form at /forms/employee-enrollment
4. Gather documents: Ghana Card, SSNIT number, employment proof
5. Submit form and documents
6. Receive account details and Member Portal access
7. Begin contributions

For Employers:
1. Visit /services/enrollment (employer section)
2. Complete /forms/employer-enrollment
3. Register with NPRA
4. Set up payroll deductions
5. Enroll employees in chosen scheme

Required Documents: Ghana Card/Passport, SSNIT number, bank details, employment proof, beneficiary info
    `;
  }
  
  if (lowerQuery.includes('claim') || lowerQuery.includes('benefit') || lowerQuery.includes('withdraw')) {
    return `
BENEFIT CLAIMS PROCESS:

Tier 2 Claims:
- Available at retirement (age 60)
- Form: /forms/tier-2-benefit-claim
- Processing: 10-15 working days
- Documents: Ghana Card, employment history, bank details

Tier 3 Claims:
- Available after 10 years or retirement
- Form: /forms/tier-3-benefit-claim  
- Various withdrawal options available
- Tax implications may apply for early withdrawal

Beneficiary Claims (if member deceased):
- Forms: /forms/tier-2-beneficiary-claim or /forms/tier-3-beneficiary-claim
- Required: Death certificate, proof of relationship
- Process through next of kin or nominated beneficiaries

Check claim status: /services/form-status with reference number
    `;
  }
  
  if (lowerQuery.includes('tax') || lowerQuery.includes('deduct') || lowerQuery.includes('benefit')) {
    return `
TAX BENEFITS DETAILED:

Tier 3 Contributions:
- Up to 16.5% of gross income is tax-deductible
- Significant annual tax savings
- Reduces taxable income for Ghana Revenue Authority filing
- Annual tax certificates provided by SPT

Employer Benefits:
- Pension contributions are tax-deductible business expenses
- Reduces corporate tax liability
- Enhances employee benefits package

Tax-Free Growth:
- Investment returns grow tax-free within pension fund
- Maximizes compound growth over time
- Only taxed upon withdrawal (if applicable)

Documentation: SPT provides annual tax certificates for GRA filing
    `;
  }
  
  if (lowerQuery.includes('portal') || lowerQuery.includes('online') || lowerQuery.includes('account')) {
    return `
MEMBER PORTAL FEATURES:

Access: https://portal.standardpensions.com/ with account number and password

Features Available:
- Real-time balance checking
- Contribution history and tracking  
- Download statements (monthly/quarterly/annual)
- Update personal details and beneficiaries
- Fund performance monitoring
- Retirement planning projections
- Secure messaging with customer service
- Document uploads for claims

Security:
- Two-factor authentication available
- Bank-level encryption
- Secure login protocols
- Regular security updates

Mobile Access: Fully responsive design for smartphones and tablets
Support: 24/7 online access, customer service during business hours
    `;
  }
  
  if (lowerQuery.includes('calculator') || lowerQuery.includes('projection') || lowerQuery.includes('estimate')) {
    return `
PENSION CALCULATOR FEATURES:

Location: /pension-calculator

Comprehensive Calculations:
- Tier 1 SSNIT pension projections
- Tier 2 occupational pension estimates  
- Tier 3 voluntary pension projections
- Combined total retirement income

Input Parameters:
- Current age and planned retirement age
- Current salary and salary growth expectations
- Contribution history and years of service
- Investment return assumptions
- Inflation expectations

Results Include:
- Monthly pension estimates at retirement
- Lump sum projections for Tier 2 & 3
- Pension rights percentage calculation
- Replacement ratio (income vs final salary)
- Early retirement impact analysis
- Survivor and invalidity benefits
- Retirement readiness score

Advanced Features:
- Scenario modeling for different contribution levels
- Charts showing fund growth over time
- Professional recommendations based on results
- Downloadable projection reports
    `;
  }
  
  return ''; // Return empty string if no specific context matches
};

export const getQuickFacts = (topic: string): string[] => {
  const facts: Record<string, string[]> = {
    'ghana_pension': [
      'Ghana has a 3-tier pension system established in 2008',
      'Tier 1 (SSNIT): 13.5% worker contribution, government managed',
      'Tier 2: 5% employer contribution, privately managed',
      'Tier 3: Up to 16.5% voluntary, tax-deductible',
      'SPT manages Tier 2 & 3 schemes under NPRA license'
    ],
    'spt_benefits': [
      'Professional fund management with 20+ years experience',
      'NPRA licensed and regulated for consumer protection',
      'Tax-deductible contributions up to 16.5%',
      '24/7 Member Portal access with mobile support',
      'Comprehensive retirement planning tools',
      'Multiple pension scheme options for different needs'
    ],
    'quick_help': [
      'Forms and enrollment: /services/self-service-center',
      'Check account balance: https://portal.standardpensions.com/ login',
      'Calculate pension: /pension-calculator',
      'Track form status: /services/form-status',
      'Get help: /contact or WhatsApp support',
      'Learn about schemes: /schemes'
    ]
  };
  
  return facts[topic] || [];
}; 