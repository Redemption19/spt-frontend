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
    category: 'Psychological & Behavioral Aspects',
    questions: [
      {
        question: 'Why do I naturally resist planning for retirement when I know it\'s important?',
        answer: 'Your brain is wired for immediate survival, making future planning feel abstract and unreal. This "present bias" affects everyone - you\'re not lazy or irresponsible. SPT\'s approach bridges this gap by making your future self emotionally real through visualization tools and connecting daily choices to long-term security.'
      },
      {
        question: 'How do I emotionally connect with my 65-year-old self?',
        answer: 'Imagine meeting yourself at 65. What would that person want to tell you about today\'s financial decisions? Our Future Self Visualization tool helps you "visit" your retirement, experience different financial scenarios, and feel the emotional reality of financial security versus insecurity. This connection transforms abstract planning into personal motivation.'
      },
      {
        question: 'What would my future self want me to know about pension planning today?',
        answer: 'Your future self would say: "Thank you for thinking beyond today\'s immediate needs. Every cedi you invest now works 24/7 for decades. The sacrifices feel significant today but become invisible compared to the security and dignity they create. Start now - time is your most powerful wealth-building tool."'
      },
      {
        question: 'How does SPT help me overcome the feeling that pension contributions are "lost money"?',
        answer: 'We reframe contributions as "paying your future self" rather than losing money. Each contribution is hiring your money to work for you, earning returns while you sleep. Our visualization tools show how today\'s ₵500 becomes tomorrow\'s ₵1,640, transforming the loss feeling into investment excitement and wealth-building momentum.'
      },
      {
        question: 'Why does retirement planning feel overwhelming, and how can I simplify it?',
        answer: 'Complexity paralysis is normal when facing 40+ years of financial planning. SPT uses "progressive disclosure" - revealing complexity only as you develop capacity. Start with one simple decision: "Do I want basic security or enhanced growth?" From there, we guide you step-by-step, building confidence through small, manageable choices.'
      },
      {
        question: 'How do I build sustainable pension contribution habits that become automatic?',
        answer: 'Habits form through consistent repetition and emotional rewards. Set up automatic contributions on payday, celebrate each milestone (₵1,000, ₵5,000 saved), and visualize your growing security. After 3-6 months, contributions become as automatic as brushing teeth - effortless habits protecting your future dignity and independence.'
      },
      {
        question: 'What psychological tricks help me maintain consistent contributions during tough times?',
        answer: 'During financial stress, remember: stopping contributions guarantees falling behind, while continuing gives you the chance to benefit when conditions improve. Reduce amounts if needed rather than stopping completely. Think "momentum maintenance" - small, consistent steps matter more than perfect amounts. Consistency beats perfection in wealth building.'
      },
      {
        question: 'How do I stay motivated when pension benefits feel distant and uncertain?',
        answer: 'Break the journey into meaningful milestones: first ₵1,000, ₵10,000, ₵50,000 saved. Each milestone brings pride and momentum. Our progress tracking shows both accumulated wealth and time remaining, making the distant future feel achievable. Celebrate progress regularly - motivation grows through recognition of advancement.'
      },
      {
        question: 'How do I handle social pressure to spend money instead of saving for retirement?',
        answer: 'Reframe peer pressure conversations: "I\'m not depriving myself - I\'m paying my future self first." Share that pension planning lets you be generous longer by avoiding becoming a financial burden. Most people admire financial discipline once they understand it creates freedom rather than restriction.'
      },
      {
        question: 'Why do market drops feel so scary, and how do I prepare emotionally?',
        answer: 'Market volatility triggers our loss aversion - losses feel twice as painful as equivalent gains feel good. Prepare by understanding that temporary paper losses during accumulation years actually help you by allowing purchases at discount prices. Historical evidence shows disciplined investors benefit most from volatile periods.'
      },
      {
        question: 'How does SPT help transform my financial anxiety into financial confidence?',
        answer: 'We address anxiety through education, visualization, and control. Understanding how pension systems work reduces fear of the unknown. Seeing your progress through clear dashboards builds confidence. Having control over contribution amounts and investment choices creates empowerment. Knowledge + visibility + control = confidence.'
      },
      {
        question: 'What does successful retirement really mean beyond having money?',
        answer: 'Successful retirement means maintaining dignity, independence, and the ability to contribute meaningfully to family and community. It\'s having choices about how to spend time, maintaining health through reduced financial stress, and leaving a positive legacy. Pension planning protects these deeper values, not just bank account numbers.'
      },
      {
        question: 'How do I balance enjoying life today while securing my future?',
        answer: 'Optimal balance comes from intentional trade-offs rather than accidental neglect. Identify which current expenses truly enhance your life versus mindless spending. Redirect mindless spending to pension contributions while protecting meaningful current experiences. This conscious approach ensures neither present happiness nor future security is sacrificed.'
      },
      {
        question: 'What mindset shift transforms pension planning from burden to empowerment?',
        answer: 'Shift from "I have to save" to "I get to build wealth." Each contribution represents choosing freedom over dependency, control over helplessness, dignity over desperation. You\'re not sacrificing for an uncertain future - you\'re investing in guaranteed personal empowerment. This mindset transforms obligation into opportunity and burden into blessing.'
      }
    ]
  },
  {
    category: 'Contribution Strategies & Optimization',
    questions: [
      {
        question: 'What\'s the minimum Tier 3 contribution that makes a meaningful difference?',
        answer: 'Start with ₵100 monthly - seemingly small but grows to ₵89,000 over 20 years with 12% returns. However, ₵300 monthly creates more significant impact: ₵267,000 over 20 years. The key is consistency over amount. Starting small builds habits; increasing gradually amplifies results without overwhelming your budget.'
      },
      {
        question: 'How do I optimize contribution timing to maximize compound growth benefits?',
        answer: 'Contribute early in each month rather than month-end to maximize daily compounding. Annual lump sums work best in January for full-year growth. Bonus payments benefit from immediate contribution rather than gradual spending. Every day your money isn\'t invested is a day of lost growth potential.'
      },
      {
        question: 'What\'s the optimal percentage of income to contribute across all pension tiers?',
        answer: 'Target total pension contributions of 15-20% of gross income for comfortable retirement. Ghana\'s system provides: Tier 1 (13.5% mandatory), Tier 2 (5% employer), ideal Tier 3 (8-12% personal). This combination approaches international best practices for retirement income replacement while maintaining current lifestyle sustainability.'
      },
      {
        question: 'How do salary increases create opportunities for contribution acceleration?',
        answer: 'Allocate 50% of salary increases to lifestyle enhancement, 50% to pension acceleration. This maintains lifestyle improvement momentum while significantly boosting retirement security. A ₵500 monthly salary increase could mean ₵250 additional pension contribution, growing to ₵186,000 over 20 years.'
      },
      {
        question: 'Should I prioritize maximizing Tier 2 or Tier 3 contributions first?',
        answer: 'Tier 2 is mandatory (no choice), but maximize Tier 3 for tax benefits and control. Tier 3 contributions are tax-deductible up to 16.5% of gross income, providing immediate 25% "return" through tax savings plus long-term growth. Tier 3 also offers flexibility unavailable in Tier 2.'
      },
      {
        question: 'How do catch-up contributions work for members starting pension planning late?',
        answer: 'Members over 50 can contribute up to 25% of gross income with full tax deductibility, versus 16.5% for younger members. This enhanced limit helps overcome lost time through higher contribution intensity. Combined with potentially higher earnings in peak career years, catch-up provisions enable meaningful retirement security despite late starts.'
      },
      {
        question: 'What contribution strategies work best for irregular income patterns?',
        answer: 'Establish minimum base contribution during low income periods to maintain momentum. Allocate 20-30% of windfall income (bonuses, commissions) to pension acceleration. Set up automatic contributions based on conservative income estimates, with manual top-ups during high-earning periods. Consistency matters more than perfect amounts.'
      },
      {
        question: 'How do employer contributions coordinate with my personal pension strategy?',
        answer: 'Employer Tier 2 contributions (5% of basic salary) form your foundation. Personal Tier 3 contributions provide acceleration and control. Coordinate by ensuring total pension savings (employer + personal) reach 15-20% of gross income. Use employer contributions as base, personal contributions for optimization.'
      },
      {
        question: 'What happens if I can\'t maintain my planned contribution level?',
        answer: 'Reduce rather than stop completely. Maintaining even minimal contributions preserves habits and account momentum. Temporary reductions during financial stress are normal and manageable. Resume higher levels when circumstances improve. The worst pension strategy is perfect contributions followed by complete stopping.'
      },
      {
        question: 'How do I balance pension contributions with other financial priorities?',
        answer: 'Use percentage-based allocation: emergency fund (10%), debt repayment (15%), pension (15-20%), current needs (55-60%). Adjust percentages based on progress toward each goal. Pension planning complements rather than competes with other financial priorities when properly balanced and integrated.'
      },
      {
        question: 'Can I change contribution amounts frequently, and what are the implications?',
        answer: 'Yes, Tier 3 allows monthly adjustments through Member Portal. However, frequent changes may indicate lack of strategic planning. Establish sustainable base contribution with periodic reviews (quarterly/annually) rather than constant adjustments. Stability builds better habits than frequent modifications driven by emotions.'
      },
      {
        question: 'How do automatic contribution escalation features benefit long-term wealth building?',
        answer: 'Automatic annual increases (typically 1-3%) align contribution growth with salary progression and inflation. This "set and forget" approach removes emotional decision-making from increases while ensuring purchasing power maintenance. Over 20 years, automatic escalation can double retirement wealth compared to static contributions.'
      },
      {
        question: 'What tax optimization strategies maximize contribution efficiency?',
        answer: 'Maximize Tier 3 contributions up to 16.5% limit for full tax deductibility. Time contributions to optimize tax year benefits. Consider year-end contribution acceleration if under annual limits. Coordinate with other tax deductions to maximize overall tax efficiency while building retirement wealth.'
      },
      {
        question: 'How do contribution holidays affect long-term retirement outcomes?',
        answer: 'Even 6-month contribution breaks significantly impact final outcomes due to lost compound growth. A ₵500 monthly break costs approximately ₵15,000 in final retirement value. If breaks are necessary, minimize duration and resume quickly. Consider reduced contributions rather than complete stops to maintain momentum.'
      },
      {
        question: 'What contribution benchmarks indicate I\'m on track for retirement success?',
        answer: 'Age-based benchmarks: By 30, have 1x annual salary saved; by 40, have 3x; by 50, have 6x; by 60, have 10x annual salary. These targets across all pension tiers indicate progress toward 75-80% income replacement in retirement. Adjust targets based on desired lifestyle and other retirement resources.'
      },
      {
        question: 'How do I coordinate spousal pension contributions for household optimization?',
        answer: 'Both spouses should maximize individual tax-deductible limits (16.5% each) before considering other investments. Coordinate contribution timing, investment allocations, and withdrawal strategies. Consider risk capacity differences and age gaps in joint planning. Two optimized individual plans often outperform one shared approach.'
      },
      {
        question: 'What role do voluntary additional contributions play beyond standard limits?',
        answer: 'After maximizing tax-deductible limits, voluntary contributions still benefit from professional fund management and pension structure. However, consider other tax-advantaged opportunities first: business investments, real estate, or other retirement vehicles. Voluntary excess contributions provide diversification within proven pension framework.'
      },
      {
        question: 'How do I recover from periods of missed or reduced contributions?',
        answer: 'Calculate lost ground using our catch-up calculator. Increase current contributions above normal levels temporarily to compensate for missed growth. Consider allocating windfalls (bonuses, gifts) to recovery efforts. Focus on consistent forward progress rather than perfect recovery - some catch-up is better than none.'
      },
      {
        question: 'What contribution strategies optimize for early retirement goals?',
        answer: 'Early retirement requires accelerated savings rates (25-30% of income) and potentially more aggressive investment allocation. Maximize Tier 3 contributions for early access options while building supplementary savings. Consider geographic arbitrage, lifestyle optimization, and alternative income sources to reduce required retirement capital.'
      },
      {
        question: 'How do changing life circumstances affect optimal contribution strategies?',
        answer: 'Major life events trigger contribution strategy reviews: marriage (coordination), children (competing priorities), career changes (income adjustments), health issues (priority shifts). Build flexibility into contribution plans while maintaining long-term momentum. Regular strategy reviews ensure alignment with evolving circumstances and goals.'
      }
    ]
  },
  {
    category: 'Investment & Portfolio Management',
    questions: [
      {
        question: 'How do I choose between conservative, balanced, and growth investment options?',
        answer: 'Your choice depends on time horizon and risk tolerance. Growth portfolios (80% equities) suit members under 45 with 15+ years to retirement. Balanced portfolios (60% equities) work for middle-aged members wanting moderate growth with stability. Conservative portfolios (30% equities) suit those within 5 years of retirement prioritizing capital preservation.'
      },
      {
        question: 'What does it really mean when my pension balance drops during market downturns?',
        answer: 'Temporary balance drops are paper losses, not real losses unless you withdraw funds. Think of market drops as discount sales - your monthly contributions buy more shares at lower prices. Historical evidence shows patient investors benefit most from volatile periods through this "dollar-cost averaging" effect.'
      },
      {
        question: 'How do I emotionally prepare for market volatility affecting my pension balance?',
        answer: 'Expect 3-5 significant market declines during your career, each typically recovering within 18-36 months. Prepare mentally by understanding that volatility creates opportunity rather than loss for long-term investors. Focus on contribution consistency rather than balance fluctuations. Volatility is the price we pay for superior long-term returns.'
      },
      {
        question: 'What role should international investments play in my pension portfolio?',
        answer: 'International exposure (15-25% of portfolio) provides currency diversification and access to global growth opportunities. This reduces dependence on Ghana\'s economy alone while capturing worldwide innovation and development. International investments help offset local market volatility and inflation through geographic diversification.'
      },
      {
        question: 'How often should I review and potentially adjust my investment allocation?',
        answer: 'Review allocation annually or after major life changes, but avoid frequent adjustments based on short-term market movements. Successful investing requires discipline to maintain long-term strategy despite temporary market noise. Emotional investment decisions typically reduce returns compared to patient, strategic approaches.'
      },
      {
        question: 'What investment knowledge do I need to make informed portfolio decisions?',
        answer: 'Understand these fundamentals: stocks offer higher long-term returns but more volatility; bonds provide stability but lower returns; diversification reduces risk without sacrificing returns; time horizon determines optimal risk level; and your personal risk tolerance affects sleep quality. Master these before making allocation decisions.'
      },
      {
        question: 'How does SPT\'s fund performance compare to other investment options available in Ghana?',
        answer: 'SPT consistently ranks in top quartile performance over 3-5 year periods, averaging 14.2% annually versus industry average of 12.1%. Our risk-adjusted returns (Sharpe ratio) exceed benchmarks by 15-20%. Performance data with detailed benchmarking is available in quarterly reports and Member Portal analytics.'
      },
      {
        question: 'What fees and costs should I understand about pension fund investments?',
        answer: 'Annual management fees range from 2.0-2.5% of fund value, covering investment management, administration, and custody services. No front-end loads or exit fees after 2 years. Fee transparency is complete with annual statements showing all charges. These fees are competitive and provide access to professional management unavailable to individual investors.'
      }
    ]
  },
  {
    category: 'Learning & Skill Development',
    questions: [
      {
        question: 'How do I progress from pension planning beginner to sophisticated wealth builder?',
        answer: 'Follow our competency pathway: Foundation (emotional connection, basic concepts), Building (contribution optimization, investment understanding), Enhancement (tax strategies, portfolio management), and Mastery (holistic integration, generational planning). Each level builds on previous knowledge while introducing new capabilities. Progress at your comfortable pace.'
      },
      {
        question: 'What should I learn first about pension planning as a complete beginner?',
        answer: 'Start with emotional foundation: connect with your future self and understand why early action matters exponentially. Then grasp the basic concept: consistent contributions grow through compound returns over time. Master these fundamentals before exploring investment options, tax strategies, or complex planning techniques.'
      },
      {
        question: 'How do I know when I\'m ready to move from basic to intermediate pension strategies?',
        answer: 'You\'re ready for intermediate strategies when you: maintain consistent contributions for 6+ months, understand compound growth principles, feel comfortable with basic investment concepts, and actively monitor your account progress. Confidence with fundamentals indicates readiness for contribution optimization, asset allocation choices, and tax strategy integration.'
      },
      {
        question: 'What investment knowledge do I need before making portfolio allocation decisions?',
        answer: 'Understand these core concepts: risk-return relationship (higher potential returns require accepting higher volatility), diversification benefits (spreading investments reduces overall risk), time horizon impact (longer timeframes allow more growth focus), and your personal risk tolerance. Master these before choosing between conservative, balanced, or growth portfolios.'
      },
      {
        question: 'How does SPT assess my financial literacy level to provide appropriate guidance?',
        answer: 'Our adaptive system evaluates your responses, decisions, and engagement patterns to gauge sophistication level. We provide explanations matching your current understanding while gradually introducing more complex concepts. This ensures you receive appropriately challenging information without overwhelming complexity or insulting simplicity.'
      },
      {
        question: 'What behavioral patterns indicate I\'m becoming a successful pension planner?',
        answer: 'Success indicators include: automatic contribution habits (no longer requiring conscious decisions), regular account monitoring without anxiety, long-term thinking in other financial decisions, family financial conversations improvement, and confidence in explaining pension basics to others. These behaviors demonstrate internalized wealth-building mindset development.'
      },
      {
        question: 'How do I track whether my pension education translates into better financial decisions?',
        answer: 'Monitor behavioral changes: increased contribution rates, improved investment allocation choices, reduced financial stress levels, enhanced emergency fund management, and better integration of pension planning with other financial goals. Education succeeds when knowledge transforms into consistent beneficial actions.'
      },
      {
        question: 'What learning resources help me advance my pension planning sophistication?',
        answer: 'Resources include interactive webinars, scenario-based learning modules, video tutorials, quarterly newsletters, peer discussion forums, and one-on-one advisory sessions. Choose formats matching your learning style: visual, auditory, kinesthetic, or reading-based. Regular engagement with diverse resources accelerates competency development.'
      },
      {
        question: 'How do I build confidence in making important pension planning decisions?',
        answer: 'Confidence grows through knowledge, experience, and support. Start with small, reversible decisions to build success experiences. Use our decision-support tools providing pros/cons analysis. Consult advisors for major choices. Remember: most pension decisions are optimizable over time rather than permanently binding, reducing decision pressure.'
      },
      {
        question: 'What questions should I ask myself to evaluate my pension planning progress?',
        answer: 'Key self-assessment questions: Am I contributing consistently? Do I understand my investment allocation? Can I explain my strategy to family members? Do I feel confident about retirement prospects? Am I integrating pension planning with other financial goals? Regular honest self-evaluation guides continued learning priorities.'
      },
      {
        question: 'How does peer learning accelerate my pension planning education?',
        answer: 'Learning from similar members\' experiences provides practical insights beyond theoretical knowledge. Anonymous case studies show real strategies, common mistakes, and successful approaches. Peer discussions reveal diverse perspectives and solutions. Social learning reduces isolation and builds community around shared wealth-building goals.'
      },
      {
        question: 'What role do mistakes play in developing pension planning expertise?',
        answer: 'Mistakes provide valuable learning opportunities if approached constructively. Common errors include inconsistent contributions, emotional investment decisions, or delayed starting. Our system helps identify and correct mistakes quickly while explaining underlying principles to prevent repetition. Expertise develops through guided experience, including learning from errors.'
      },
      {
        question: 'How do I teach my family members about pension planning basics?',
        answer: 'Start with emotional connection: help them visualize their future selves and understand compound growth magic. Use simple metaphors (planting trees, hiring money to work). Share your journey, including challenges and successes. Encourage questions and provide resources matching their sophistication levels. Lead by example through consistent discipline.'
      },
      {
        question: 'What advanced pension strategies should sophisticated planners consider?',
        answer: 'Advanced strategies include tax-loss harvesting, asset location optimization, Roth conversion considerations, charitable giving integration, estate planning coordination, and international investment exposure. These techniques require solid foundational knowledge and often benefit from professional guidance to ensure proper implementation and tax compliance.'
      },
      {
        question: 'How do I stay current with changing pension regulations and opportunities?',
        answer: 'Subscribe to our regulatory updates, attend quarterly member briefings, and maintain regular advisor contact. Join professional networks or investment clubs for peer insights. Follow reputable financial news sources focusing on retirement planning. Continuous learning ensures your strategies remain optimal as laws and opportunities evolve.'
      }
    ]
  },
  {
    category: 'SPT Services & Support',
    questions: [
      {
        question: 'How does Standard Pensions Trust\'s mission align with my personal retirement goals?',
        answer: 'SPT transforms retirement planning through expert administration and innovative solutions, but your goals drive the strategy. We provide the platform, tools, and guidance while you define success. Our role is enabling your vision through technical excellence, cultural sensitivity, and personalized support throughout your wealth-building journey.'
      },
      {
        question: 'What makes SPT different from other pension administrators in addressing my emotional needs?',
        answer: 'SPT uniquely integrates advanced analytics with emotional intelligence, recognizing that pension decisions are emotional decisions supported by data. We address anxiety, build confidence, and provide culturally sensitive guidance rather than just processing transactions. Our approach honors both your financial goals and emotional wellbeing throughout the journey.'
      },
      {
        question: 'How does Ghana\'s three-tier system protect me from putting all my retirement eggs in one basket?',
        answer: 'The three-tier system provides security through diversification. Tier 1 (SSNIT) offers government-backed basic income. Tier 2 (SPT-managed) adds professionally managed employer funding. Tier 3 (Personal) enables individual control and acceleration. This structure protects against single-point failure while maximizing wealth-building potential across multiple vehicles.'
      },
      {
        question: 'How do I know if my pension planning is on track for my personal definition of success?',
        answer: 'Success metrics include both numbers and feelings. Quantitatively: replacement ratio approaching 75-80% of pre-retirement income, emergency fund adequacy, debt management progress. Qualitatively: reduced financial anxiety, increased confidence in future security, family financial harmony. Regular reviews ensure alignment between progress and personal success definitions.'
      },
      {
        question: 'How does SPT use "choice architecture" to make optimal pension decisions easier?',
        answer: 'We use "choice architecture" - designing your environment to encourage good decisions. Default options favor your long-term interests, automatic escalation increases contributions with salary growth, and timely reminders prevent missed opportunities. The easiest path becomes the best path for your financial future.'
      }
    ]
  },
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
      },
      {
        question: 'Can an employee ever lose his/her contribution as a result of poor investment decisions?',
        answer: 'The three-tier pension scheme is heavily regulated by the national pension regulatory authority. They have designed investment guidelines which are meant to provide a high level of security for pension funds. Nonetheless, approved trustees have the fiduciary responsibility to ensure that they strictly follow the guidelines and investment best practices to ensure the preservation of capital.'
      },
      {
        question: 'What happens if I leave my current employer?',
        answer: 'Tier 2 benefits: When an employee changes employment, the law provides for the employee to elect to transfer his/her accrued benefits to another scheme in accordance with the regulations of that scheme. The approved trustees of the respective schemes shall comply with requirements with respect to the transfer of the benefits. Tier 3 benefits: Subject to the vesting rules of the scheme, the employee may forfeit part or the total amount of the employer\'s contribution if the worker leaves the employment of the employer before the end of the vesting period. An employee who satisfies the vesting requirements may elect to receive his accrued benefits subject to a tax clawback of 15% before ten years or transfer it to a personal pension scheme.'
      },
      {
        question: 'What happens to my pension trust if I change jobs?',
        answer: 'You typically have several options, including leaving your pension funds with your previous employer, transferring them to a new employer\'s plan, or rolling them into a personal retirement account. Understanding the implications of each choice is important in making an informed decision.'
      },
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