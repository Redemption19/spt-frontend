// Navigation Items
export const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About Us',
    href: '/about',
    dropdown: [
      { title: 'Company Overview', href: '/about' },
      { title: 'Leadership', href: '/about/leadership' },
      { title: 'Timeline', href: '/about/timeline' },
      { title: 'Careers', href: '/about/careers' },
    ],
  },
  {
    title: 'Services',
    href: '/services',
    dropdown: [
      { title: 'Self-Service Centre', href: '/services/self-service-center' },
      { title: 'Enrollments', href: '/services/enrollment' },
      { title: 'Survey Feedback', href: '/services/survey-feedback' },
      { title: 'FAQs', href: '/services/faq' },
    ],
  },
  {
    title: 'Schemes',
    href: '/schemes',
    dropdown: [
      { title: 'Best Pensions Master Trust Scheme', href: '/schemes/master-trust' },
      { title: 'Best Personal Pensions Scheme', href: '/schemes/personal-pension' },
      { title: 'Best Provident Fund Scheme', href: '/schemes/provident-fund' },
      { title: 'Employer Sponsored Schemes', href: '/schemes/employer-sponsored' },
    ],
  },
  {
    title: 'Media',
    href: '/media',
    dropdown: [
      { title: 'Blog', href: '/media/blog' },
      { title: 'Events', href: '/media/events' },
      { title: 'Downloads', href: '/media/downloads' },
      { title: 'Gallery', href: '/media/gallery' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

// Footer Links
export const footerLinks = {
  services: [
    { title: 'Self-Service Centre', href: '/services/self-service' },
    { title: 'Enrollments', href: '/services/enrollments' },
    { title: 'Survey Feedback', href: '/services/survey-feedback' },
    { title: 'FAQs', href: '/services/faqs' },
  ],
  schemes: [
    { title: 'Master Trust', href: '/schemes/master-trust' },
    { title: 'Personal Pension', href: '/schemes/personal-pension' },
    { title: 'Provident Fund', href: '/schemes/provident-fund' },
    { title: 'Employer Sponsored', href: '/schemes/employer-sponsored' },
  ],
  media: [
    { title: 'Blog', href: '/media/blog' },
    { title: 'Events', href: '/media/events' },
    { title: 'Downloads', href: '/media/downloads' },
    { title: 'Gallery', href: '/media/gallery' },
  ],
  legal: [
    { title: 'Privacy Policy', href: '/legal/privacy-policy' },
    { title: 'Terms & Conditions', href: '/legal/terms' },
    // { title: 'Fee Breakdown', href: '/legal/fees' },
  ],
};

// Pension Schemes
export const pensionSchemes = [
  {
    id: 'master-trust',
    title: 'Master Trust',
    description: 'A multi-employer pension scheme designed for organizations looking for a comprehensive retirement solution.',
    benefits: [
      'Superior investment returns on pension contributions.',
      'Assignment of Tier 2 to secure a primary residential facility.',
      'Discounts granted on insurance cover with Best Assurance.',
    ],
    icon: 'Landmark',
  },
  {
    id: 'personal-pension',
    title: 'Personal Pension',
    description: 'Individual pension plans for self-employed professionals and those seeking additional retirement security.',
    benefits: [
      'Open to Both Formal and Informal Sectors',
      'Tax Reliefs & Exemptions',
      'Flexible Contributions',
      'Enhanced Retirement Benefits',
    ],
    icon: 'User',
  },
  {
    id: 'provident-fund',
    title: 'Provident Fund',
    description: 'A savings scheme where both employers and employees contribute to build a retirement fund.',
    benefits: [
      'Designed for Formal Sector Workers',
      'Tax Reliefs & Exemptions',
      'Regulated by NPRA',
      'Tax Reliefs & Exemptions',
    ],

    icon: 'Landmark',
  },
  {
    id: 'employer-sponsored',
    title: 'Employer Sponsored',
    description: 'Customized pension schemes designed specifically for your organization\'s unique needs.',
    benefits: [
      'Full Ownership by Employers',
      'Corporate Trustee Advantage',
      'Customizable Fee Structure',
      'Trustee Services for Tier 2 & Tier 3 Schemes',
    ],
    icon: 'Briefcase',
  },
];

// Stats
export const companyStats = [
  { 
    value: '8', 
    label: 'Branches',
    description: '',
    icon: 'Building2' 
  },
  { 
    value: '150,000', 
    label: 'Members Trust Us',
    description: '',
    highlight: 'Over',
    icon: 'Users' 
  },
  { 
    value: '2,000', 
    label: 'Employers Enrolled',
    description: '',
    highlight: 'Over',
    icon: 'Building' 
  },
  { 
    value: '100%', 
    label: 'Prompt Payouts to All Claimant',
    description: '',
    highlight: '≈',
    icon: 'CheckCircle' 
  },
];

// Team
export const leadershipTeam = [
  {
    name: 'Mr. David Abeka Nelson',
    position: 'Managing Director',
    bio: 'David is a KPMG-trained and highly accomplished Chartered Accountant who presently serves as a business and financial analyst. He holds ACCA qualifications from the UK (2005) and an ICA qualification from Ghana (2007), alongside a Certificate in Structured Finance from the Africa Import Export Bank. Proficient in data analytics, David boasts extensive experience across diverse sectors such as mining, energy, commodities, and finance. He has held leading finance positions, including CFO & Head of Corporate Planning in the commodities sector, where he was involved in trading refined petroleum and soft commodities, as well as overseeing group financial reporting. In his role, he managed a Balance Sheet with assets totaling over $230 million in the financial sector, demonstrating his exceptional financial management capabilities. Currently, David holds board seats in prominent organizations, including Standard Pensions Trust Limited, Radcon Belma Limited, and Vobatex Express Limited. In these positions, he leverages his leadership qualities, vast experience, and acumen to positively impact board matters, contributing to enhanced board performance and organizational growth.',
    image: '/images/leadership-img/mr-nelson.png',
    social: {
      linkedin: 'https://linkedin.com/in/david-abeka-nelson',
      email: 'david.nelson@standardpensionstrust.com',
      facebook: 'https://facebook.com/david.abeka.nelson',
      instagram: 'https://instagram.com/david_abeka_nelson'
    }
  },
  {
    name: 'Prof. Emmanuel Osei Asiamah, PhD',
    position: 'Chairman',
    bio: 'Professor Asiamah is the Board Chairman of Best Pensions Trust, President/Executive Director of Institute of Certified Business Analysts & Consultants (ICBAC), Chief Executive Officer of Clearance Consult Limited, Executive Director of Governance & Leadership Institute and Chairman of Quench Industries Limited with more than twelve years work experience in the field of Business Consulting. As an Accredited Financial Analyst, Chartered Accountant, Investment and Organization Development Consultant, Professor Asiamah has spent most of his consulting years helping organizations develop to achieve their goals and make productive corporate and strategic decisions. He is the first African to be appointed to the high office of professorship in Educational Leadership and Business Management by the Technology University of America. He is a council member of Chartered Institute of Management Specialists – USA (CIMS) and a Member of International Board of Standards. He holds two Masters Degrees, a Doctor of Philosophy (PhD) in Business Administration and Doctorate in International Business Management and Taxation.',
    image: '/images/leadership-img/prof-emma.png',
    social: {
      linkedin: 'https://linkedin.com/in/prof-emmanuel-asiamah',
      email: 'prof.asiamah@standardpensionstrust.com',
      facebook: 'https://facebook.com/prof.emmanuel.asiamah',
      instagram: 'https://instagram.com/prof_emmanuel_asiamah'
    }
  },
  {
    name: 'Mr. Kwadwo Danso-Dodoo Jnr.',
    position: 'Member',
    bio: 'Mr. Danso-Dodoo is a Management Consultant with expertise in start-up businesses. He is currently the Managing Director for Special Ice Limited. He was formerly the Managing Director of Sun Ridge (Producers of Safina Mineral Water) and Aqua-In Limited. He has held various managerial positions in other businesses. Mr. Danso-Dodoo is a Chartered Accountant by profession and a member of the Institute of Chartered Accountants (Ghana). He also holds a Masters\' Degree in Business Administration in Finance from the University of Ghana. He attended Adisadel College, Cape Coast. He is a very strong and devoted Christian and is married with four children.',
    image: '/images/leadership-img/mr-kwadwo.png',
    social: {
      linkedin: 'https://linkedin.com/in/kwadwo-danso-dodoo',
      email: 'kwadwo.danso@standardpensionstrust.com',
      facebook: 'https://facebook.com/kwadwo.danso.dodoo',
      instagram: 'https://instagram.com/kwadwo_danso_dodoo'
    }
  },
  {
    name: 'Mr. Michael Parker',
    position: 'Member',
    bio: 'Mr. Michael Parker brings extensive experience in corporate finance and strategic planning to our board. With over 15 years in the financial services industry, he has worked with leading institutions across West Africa. Michael holds an MBA in Finance and is a certified public accountant. His expertise in risk management and regulatory compliance has been instrumental in guiding our organization through complex financial landscapes. He is passionate about sustainable business practices and has been a key advocate for ESG initiatives within our organization.',
    image: '/images/leadership-img/mr-michael.png',
    social: {
      linkedin: 'https://linkedin.com/in/michael-parker-ghana',
      email: 'michael.parker@standardpensionstrust.com',
      facebook: 'https://facebook.com/michael.parker.ghana',
      instagram: 'https://instagram.com/michael_parker_gh'
    }
  },
  {
    name: 'Makafui Afua Honya',
    position: 'Independent Member',
    bio: 'Makafui is a driven professional with track record of leveraging cross functional skills for enterprise value. Makafui has worked with Crystal Capital and Investments Limited where as the Head, Corporate Affairs & Strategy Execution, she was responsible for the Company\'s corporate communications, Corporate Social Investment Strategy and also for devising tactics that link the Company\'s strategy to value. Prior to this, she was the Company\'s Head for Strategy Execution and Performance Management. She holds an MSc. in African Studies from University of Oxford, Uk and Bachelor of Arts degree (Hons.) in Political Science and Psychology from the University of Ghana. In her earlier experience, Makafui worked with Home Fundraising UK and Ministry of Foreign Affairs & RI, Ghana.',
    image: '/images/leadership-img/makafui.png',
    social: {
      linkedin: 'https://linkedin.com/in/makafui-afua-honya',
      email: 'makafui.honya@standardpensionstrust.com',
      facebook: 'https://facebook.com/makafui.afua.honya',
      instagram: 'https://instagram.com/makafui_afua_honya'
    }
  },
];

// Timeline Events
export const timelineEvents = [
  {
    year: '2008',
    title: 'Foundation',
    description: 'Standard Pensions Trust was established with a mission to transform retirement planning in Ghana.',
  },
  {
    year: '2010',
    title: 'First Master Trust',
    description: 'Launched our flagship Master Trust scheme, bringing affordable pension solutions to SMEs across Ghana.',
  },
  {
    year: '2013',
    title: 'Digital Transformation',
    description: 'Introduced our first online portal, allowing members to check balances and update information remotely.',
  },
  {
    year: '2015',
    title: 'Expanded Reach',
    description: 'Opened regional offices in Kumasi, Takoradi, and Tamale to serve members across the country.',
  },
  {
    year: '2018',
    title: 'Innovation Award',
    description: 'Recognized for pension innovation with the Ghana Financial Services Excellence Award.',
  },
  {
    year: '2020',
    title: 'Mobile Services',
    description: 'Launched mobile app with integrated payment solutions for seamless pension management.',
  },
  {
    year: '2023',
    title: 'ESG Investment',
    description: 'Introduced sustainable investment options, aligning member values with retirement planning.',
  },
  {
    year: '2025',
    title: 'Looking Forward',
    description: 'Continuing our mission of securing financial futures for all Ghanaians through innovative pension solutions.',
  },
];

// Blog Posts
import { BlogPost, Author } from './schemas/blog-schema'; // Import the new types

// Define a sample author
const sampleAuthor: Author = {
  name: 'SPT Editorial Team',
  avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', // Replace with a generic avatar
  role: 'Content Creators',
  bio: 'Providing insights and updates on pension schemes and financial planning.',
  twitter: 'https://twitter.com/standardpensions',
  linkedin: 'https://linkedin.com/company/standard-pensions-trust',
};

export const blogPosts: BlogPost[] = [
  {
    id: 'understanding-tier-3-contributions', // Changed to be more CUID-like, though these are static
    slug: 'understanding-tier-3-pension-contributions',
    title: 'Understanding Tier 3 Pension Contributions',
    content: 'Tier 3 pension contributions are a voluntary part of Ghana\\\'s three-tier pension scheme. This article delves into the specifics of Tier 3, how it works, its benefits, and how you can leverage it to maximize your retirement savings. We will cover eligibility, contribution limits, tax advantages, and withdrawal conditions. Understanding these aspects is crucial for effective long-term financial planning and ensuring a comfortable retirement. We will also compare Tier 3 with other investment options available in Ghana.',
    excerpt: 'Explore how voluntary Tier 3 contributions can significantly enhance your retirement benefits and provide tax advantages.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/7063777/pexels-photo-7063777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Person reviewing financial documents for Tier 3 pension',
      width: 1260,
      height: 750,
    },
    category: 'Education',
    tags: ['Tier 3', 'Retirement Planning', 'Voluntary Contributions', 'Tax Benefits'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-15T10:00:00Z'),
    updatedAt: new Date('2025-04-18T10:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Understanding Tier 3 Pension Contributions in Ghana',
      metaDescription: 'Learn about Tier 3 voluntary pension contributions, their benefits, and how they can boost your retirement savings in Ghana.',
      keywords: ['Tier 3 Ghana', 'Voluntary Pension', 'Retirement Savings', 'Tax Benefits Ghana'],
    },
    readingTimeMinutes: 8,
    allowComments: true,
    views: 1250,
  },
  {
    id: 'pension-investment-strategies-life-stages',
    slug: 'pension-investment-strategies-for-different-life-stages',
    title: 'Pension Investment Strategies for Different Life Stages',
    content: 'Your approach to pension investment should adapt as you progress through different stages of life. Early in your career, you might opt for higher-growth, higher-risk investments. As you approach retirement, a shift towards more conservative, capital-preservation strategies is often advisable. This post explores tailored investment strategies for young professionals, mid-career individuals, and those nearing retirement, considering risk tolerance, investment horizons, and financial goals. We also discuss the importance of diversification and regular portfolio reviews.',
    excerpt: 'Learn how your pension investment approach should evolve as you progress from early career to near retirement.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Graphs and charts illustrating investment strategies over time',
      width: 1260,
      height: 750,
    },
    category: 'Planning',
    tags: ['Investment Strategy', 'Life Stages', 'Pension Planning', 'Risk Management', 'Diversification'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-08T14:30:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Pension Investment Strategies for All Life Stages',
      metaDescription: 'Discover how to tailor your pension investment strategy based on your age and career stage for optimal retirement outcomes.',
    },
    readingTimeMinutes: 10,
    allowComments: true,
    views: 980,
  },
  {
    id: 'new-pension-regulatory-changes-2025',
    slug: 'new-pension-regulatory-changes-for-2025',
    title: 'New Pension Regulatory Changes for 2025',
    content: 'The pension landscape is continually evolving. This article provides a comprehensive overview of the new regulatory changes affecting pension schemes in Ghana for the year 2025. We will break down the implications of these changes for both contributors and pension fund managers. Key areas to be discussed include updates to contribution limits, withdrawal rules, investment guidelines, and reporting requirements. Staying informed about these changes is vital for ensuring compliance and making informed decisions about your retirement savings.',
    excerpt: 'Stay informed about the latest regulatory updates affecting pension schemes in Ghana and how they impact your retirement savings.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/5668859/pexels-photo-5668859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Legal documents and a gavel, symbolizing regulatory changes',
      width: 1260,
      height: 750,
    },
    category: 'Regulation',
    tags: ['Pension Regulation', 'Ghana Pensions', 'NPRA Updates', 'Compliance', '2025 Changes'],
    author: sampleAuthor,
    publishedAt: new Date('2025-04-01T09:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Ghana Pension Regulatory Changes 2025: What You Need to Know',
      metaDescription: 'An overview of the new pension regulatory changes in Ghana for 2025 and their impact on your retirement planning.',
    },
    readingTimeMinutes: 7,
    allowComments: true,
    views: 1500,
  },
  {
    id: 'retirement-planning-for-entrepreneurs',
    slug: 'retirement-planning-for-entrepreneurs-and-self-employed',
    title: 'Retirement Planning for Entrepreneurs & Self-Employed',
    content: 'Entrepreneurs and self-employed individuals face unique challenges and opportunities when it comes to retirement planning. Unlike salaried employees, they often lack employer-sponsored pension schemes and must take a more proactive approach. This guide covers essential strategies for entrepreneurs, including choosing the right personal pension schemes (like Tier 3), understanding contribution options, managing irregular income for consistent savings, and integrating business exit strategies with retirement goals. We also touch upon tax implications and the importance of disciplined financial planning.',
    excerpt: 'Special considerations for business owners and self-employed individuals looking to secure their financial future.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Entrepreneur working on a laptop in a modern office setting',
      width: 1260,
      height: 750,
    },
    category: 'Business',
    tags: ['Entrepreneurs', 'Self-Employed', 'Retirement Planning', 'Personal Pension', 'Financial Independence'],
    author: sampleAuthor,
    publishedAt: new Date('2025-03-25T11:00:00Z'),
    updatedAt: new Date('2025-03-28T11:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Retirement Planning Guide for Entrepreneurs in Ghana',
      metaDescription: 'Essential retirement planning tips and strategies for entrepreneurs and self-employed individuals in Ghana.',
    },
    readingTimeMinutes: 9,
    allowComments: true,
    views: 1120,
  },
  {
    id: 'maximizing-your-tier-2-benefits',
    slug: 'maximizing-your-tier-2-pension-benefits',
    title: 'Maximizing Your Tier 2 Pension Benefits',
    content: 'Tier 2 pensions form a crucial part of your mandatory retirement savings in Ghana. This article explores ways to maximize these benefits. We will discuss understanding your Tier 2 statements, the role of your employer, options upon changing jobs, and how investment performance impacts your final payout. Additionally, we will cover the process for accessing Tier 2 benefits at retirement or under other qualifying conditions. A clear understanding of Tier 2 can significantly influence your overall retirement preparedness.',
    excerpt: 'Learn how to make the most of your mandatory Tier 2 occupational pension scheme for a better retirement.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/8353793/pexels-photo-8353793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Close-up of a pension statement with a calculator and pen',
      width: 1260,
      height: 750,
    },
    category: 'Education',
    tags: ['Tier 2', 'Occupational Pension', 'Retirement Benefits', 'Ghana Pensions', 'Financial Planning'],
    author: sampleAuthor,
    publishedAt: new Date('2025-05-02T09:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Maximizing Tier 2 Pension Benefits in Ghana',
      metaDescription: 'A guide to understanding and maximizing your Tier 2 occupational pension benefits in Ghana for a secure retirement.',
    },
    readingTimeMinutes: 7,
    allowComments: true,
    views: 850,
  },
  {
    id: 'importance-of-early-retirement-planning',
    slug: 'the-importance-of-starting-retirement-planning-early',
    title: 'The Importance of Starting Retirement Planning Early',
    content: 'The earlier you start planning for retirement, the better your chances of achieving financial independence and a comfortable post-work life. This article highlights the power of compound interest, the benefits of long-term investment horizons, and how starting early can reduce the financial burden in later years. We provide practical tips for young professionals on how to begin their retirement savings journey, even with a modest income. It\\\'s never too early to think about your future! We will also show illustrative examples of how small, consistent savings can grow significantly over time.',
    excerpt: 'Discover why starting your retirement planning journey early can make a significant difference to your financial future.',
    featuredImage: {
      url: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Young person putting a coin into a piggy bank, symbolizing early savings',
      width: 1260,
      height: 750,
    },
    category: 'Planning',
    tags: ['Early Planning', 'Compound Interest', 'Retirement Savings', 'Young Professionals', 'Financial Goals'],
    author: sampleAuthor,
    publishedAt: new Date('2025-05-10T14:00:00Z'),
    status: 'published',
    seo: {
      metaTitle: 'Why Starting Retirement Planning Early is Crucial',
      metaDescription: 'Understand the benefits of early retirement planning and how compound interest can work in your favor for a secure future.',
    },
    readingTimeMinutes: 6,
    allowComments: true,
    views: 1050,
  }
];

// FAQs
export const faqs = [
  {
    question: 'What is the difference between Tier 2 and Tier 3 pensions?',
    answer: 'Tier 2 is the mandatory occupational pension scheme managed by private trustees, while Tier 3 consists of voluntary contributions that provide additional tax benefits and retirement savings. Tier 3 offers more flexibility and can be used for specific goals like housing or education before retirement.',
  },
  {
    question: 'How do I check my pension balance?',
    answer: 'You can check your pension balance through our secure Member Portal, via our mobile app, by visiting any of our branch offices, or by calling our customer service line. We also send quarterly statements to your registered email address.',
  },
  {
    question: 'At what age can I access my pension benefits?',
    answer: 'The standard retirement age in Ghana is 60 years. However, early retirement is possible from age 55, though this may affect your benefit calculations. Special provisions exist for certain professions with different retirement ages.',
  },
  {
    question: 'Can I withdraw from my pension before retirement?',
    answer: 'Limited early withdrawals are possible from Tier 3 voluntary contributions for specific purposes like housing, education, or critical illness. Tier 1 and Tier 2 funds are generally locked until retirement age except in cases of permanent emigration or total incapacity.',
  },
  {
    question: 'How are my pension contributions invested?',
    answer: 'Your contributions are invested according to regulatory guidelines and our investment policy. We maintain a diversified portfolio across government securities, corporate bonds, equities, and alternative investments to balance growth and security. Members can view our investment strategy and performance reports on the Member Portal.',
  },
  {
    question: 'What happens to my pension if I change employers?',
    answer: 'Your pension benefits are portable. When changing employers, you can transfer your Tier 2 contributions to your new employer&apos;s scheme or maintain them with us if your new employer also uses Standard Pensions Trust. We provide a simple transfer process to ensure continuity.',
  },
  {
    question: 'How secure are my pension savings?',
    answer: 'Your pension savings are highly secure, protected by stringent regulatory oversight from the National Pensions Regulatory Authority (NPRA). Funds are held by independent custodians, and we maintain insurance coverage, regular audits, and robust cybersecurity measures to protect your retirement savings.',
  },
  {
    question: 'Can I increase my pension contributions?',
    answer: 'Yes, you can make additional voluntary contributions (Tier 3) to enhance your retirement benefits. These contributions often come with tax advantages and can be arranged through your employer\'s payroll system or direct deposits to your pension account.',
  },
];

// Contact Information
export const contactInfo = {
  headquarters: {
    address: '42 Nii Nortei Nyanchi Street Dzorwulu, Accra-Ghana',
    phone: '+233(0)302 780 765',
    email: 'info@standardpensionstrust.com',
    hours: 'Monday - Friday: 8:00 AM - 5:00 PM',
    map: 'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=42%20Nii%20Nortei%20Nyanchi%20Street%20Dzorwulu%20Accra%20Ghana&t=&z=15&ie=UTF8&iwloc=B&output=embed',
  },
  branches: [
    {
      city: 'Greater Accra',
      address: '42 NII NORTEI NYANCHI STREET, DZORWULU, ACCRA, GHANA', 
      phone: '+233 30 278 0765',
    },
    {
      city: 'Takoradi',
      address: 'AMONOO NIEZER FIE, TOP TEN, TAKORADI, SECOND FLOOR',
      phone: '+233 24 702 3411 // +233 54 248 6962',
    },
    {
      city: 'Kumasi',
      address: 'STADIUM AMAKOM, CITY STYLE BUILDING (ON THE SAME FLOOR WITH ASHF FM)',
      phone: '+233 24 481 6344',
    },
    {
      city: 'Ho',
      address: 'SSNIT PREMISES, 1ST FLOOR',
      phone: '+233 54 070 6701',
    },
    {
      city: 'Dunkwaw-on-Offin',
      address: 'ABAN KESEɛ, SSNIT BUILDING, 1ST FLOOR',
      phone: '+233 54 129 1727 // +233 26 686 2185',
    },
   
    {
      city: 'Cape Coast',
      address: 'SSNIT HOUSE, CAPE COAST, THIRD FLOOR',
      phone: '+233 50 391 996 / +233 55 305 4830',
    },

    {
      city: 'Techiman',
      // address: '15 ADUM STREET, KUMASI, GHANA',
      phone: '+233 20 203 5875',
    },

    // {
    //   city: 'Tamale',
    //   address: '15 Adum Street, Kumasi, Ghana',
    //   phone: '+233 30 000 0003',
    // },
  ],
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61568348944058',
    twitter: 'https://x.com/standardpension?t=9N5iiG6iz4QU47KJGr0P2w&s=09',
    linkedin: 'https://www.linkedin.com/company/standard-pensions-trust/?viewAsMember=true',
    instagram: 'https://www.instagram.com/standardpensions?igsh=MTZkdmd2N3FlNTk2cw==',
    tiktok: 'https://www.tiktok.com/@standard.pensions?_t=ZM-8ysM6Wm2eve&_r=1',
  },
};

// Comprehensive help collections
export const helpCollections= [
  {
    id: '1',
    title: 'Pension Schemes',
    articleCount: 8,
    articles: [
      {
        id: '101',
        title: 'Tier 1 Pension Scheme',
        content: 'Tier 1 is a mandatory basic national pension scheme managed by SSNIT. It provides basic retirement income and is funded by 5.5% of your salary, contributed by your employer.',
        category: 'Pension Schemes'
      },
      {
        id: '102',
        title: 'Tier 2 Pension Scheme',
        content: 'Tier 2 is a mandatory occupational pension scheme managed by approved Trustees. It provides lump sum benefits upon retirement and is funded by 5% of your salary, contributed by your employer.',
        category: 'Pension Schemes'
      },
      {
        id: '103',
        title: 'Personal Pension Plans (Tier 3)',
        content: 'Personal pension plans allow you to make additional voluntary contributions toward your retirement. These plans offer tax benefits and flexibility in contribution amounts.',
        category: 'Pension Schemes'
      },
      {
        id: '104',
        title: 'Master Trust Schemes',
        content: 'Master Trust schemes pool multiple employers and employees into a single pension fund, providing cost-effective pension administration and investment management.',
        category: 'Pension Schemes'
      },
      {
        id: '105',
        title: 'Provident Fund Schemes',
        content: 'Provident Fund schemes provide both retirement and death benefits. They are typically employer-sponsored and offer flexible contribution structures.',
        category: 'Pension Schemes'
      },
      {
        id: '106',
        title: 'Defined Benefit vs Defined Contribution',
        content: 'Defined Benefit schemes promise a specific retirement income, while Defined Contribution schemes depend on contributions and investment returns. Most modern schemes are Defined Contribution.',
        category: 'Pension Schemes'
      },
      {
        id: '107',
        title: 'Hybrid Pension Schemes',
        content: 'Hybrid schemes combine features of both defined benefit and defined contribution plans, offering flexibility and security for employers and employees.',
        category: 'Pension Schemes'
      },
      {
        id: '108',
        title: 'International Pension Schemes',
        content: 'For expatriates and international workers, we offer specialized pension schemes that comply with both local and international regulations.',
        category: 'Pension Schemes'
      }
    ]
  },
  {
    id: '2',
    title: 'Enrollment Process',
    articleCount: 6,
    articles: [
      {
        id: '201',
        title: 'Individual Enrollment',
        content: 'To enroll as an individual, complete the Personal Pension Enrollment Form available in our Self-Service Center. Submit the form with your ID and proof of income.',
        category: 'Enrollment Process'
      },
      {
        id: '202',
        title: 'Corporate Enrollment',
        content: 'For corporate enrollment, contact our corporate services team. We\'ll help set up the scheme, provide employee education, and handle all administrative requirements.',
        category: 'Enrollment Process'
      },
      {
        id: '203',
        title: 'Required Documents',
        content: 'Required documents include: Valid ID (Passport, Voter ID, or Driver\'s License), Proof of Income, Bank Account Details, and Completed Enrollment Forms.',
        category: 'Enrollment Process'
      },
      {
        id: '204',
        title: 'Enrollment Timeline',
        content: 'Individual enrollment typically takes 3-5 business days. Corporate enrollment can take 2-4 weeks depending on company size and complexity.',
        category: 'Enrollment Process'
      },
      {
        id: '205',
        title: 'Employee Education',
        content: 'We provide comprehensive employee education sessions covering pension basics, contribution options, investment choices, and retirement planning.',
        category: 'Enrollment Process'
      },
      {
        id: '206',
        title: 'Digital Enrollment',
        content: 'Our digital enrollment platform allows for quick online enrollment with document upload, electronic signatures, and instant confirmation.',
        category: 'Enrollment Process'
      }
    ]
  },
  {
    id: '3',
    title: 'Benefits & Claims',
    articleCount: 7,
    articles: [
      {
        id: '301',
        title: 'Retirement Benefits',
        content: 'Upon reaching retirement age, you can claim your benefits by submitting the Retirement Benefit Claim Form with supporting documents.',
        category: 'Benefits & Claims'
      },
      {
        id: '302',
        title: 'Death Benefits',
        content: 'Death benefits are paid to nominated beneficiaries. Ensure your beneficiary nominations are up to date through our Self-Service Center.',
        category: 'Benefits & Claims'
      },
      {
        id: '303',
        title: 'Disability Benefits',
        content: 'Disability benefits provide income protection if you become permanently disabled and unable to work.',
        category: 'Benefits & Claims'
      },
      {
        id: '304',
        title: 'Early Retirement',
        content: 'Early retirement options are available from age 50, though benefits may be reduced to account for longer payment periods.',
        category: 'Benefits & Claims'
      },
      {
        id: '305',
        title: 'Lump Sum vs Annuity',
        content: 'You can choose between a lump sum payment, regular annuity payments, or a combination of both for your retirement benefits.',
        category: 'Benefits & Claims'
      },
      {
        id: '306',
        title: 'Tax on Benefits',
        content: 'Retirement benefits are generally tax-free up to certain limits. Consult our tax advisors for specific guidance on your situation.',
        category: 'Benefits & Claims'
      },
      {
        id: '307',
        title: 'Claims Processing',
        content: 'Claims are typically processed within 10-15 business days. Ensure all required documents are submitted to avoid delays.',
        category: 'Benefits & Claims'
      }
    ]
  },
  {
    id: '4',
    title: 'Contributions & Payments',
    articleCount: 5,
    articles: [
      {
        id: '401',
        title: 'Contribution Rates',
        content: 'Standard contribution rates are 5% for Tier 2 (employer-funded) and voluntary amounts for Tier 3. You can increase your contributions at any time.',
        category: 'Contributions & Payments'
      },
      {
        id: '402',
        title: 'Payment Methods',
        content: 'We accept bank transfers, mobile money (MTN, Vodafone, AirtelTigo), standing orders, and direct debit payments.',
        category: 'Contributions & Payments'
      },
      {
        id: '403',
        title: 'Contribution Limits',
        content: 'Annual contribution limits apply for tax benefits. Current limits are GHS 35,000 for Tier 3 contributions.',
        category: 'Contributions & Payments'
      },
      {
        id: '404',
        title: 'Late Payments',
        content: 'Late payments may incur penalties. Contact us immediately if you experience payment difficulties to arrange alternative arrangements.',
        category: 'Contributions & Payments'
      },
      {
        id: '405',
        title: 'Contribution Statements',
        content: 'Monthly contribution statements are available online. Annual statements are mailed to your registered address.',
        category: 'Contributions & Payments'
      }
    ]
  },
  {
    id: '5',
    title: 'Investment Options',
    articleCount: 6,
    articles: [
      {
        id: '501',
        title: 'Investment Funds',
        content: 'We offer multiple investment funds including Conservative, Balanced, and Growth options to match your risk tolerance and time horizon.',
        category: 'Investment Options'
      },
      {
        id: '502',
        title: 'Risk Management',
        content: 'Our investment strategy includes diversification, regular rebalancing, and professional fund management to optimize returns while managing risk.',
        category: 'Investment Options'
      },
      {
        id: '503',
        title: 'Fund Performance',
        content: 'Fund performance is reviewed quarterly and reported annually. Historical performance data is available on our website.',
        category: 'Investment Options'
      },
      {
        id: '504',
        title: 'Switching Funds',
        content: 'You can switch between investment funds up to four times per year. Fund switches are processed within 5 business days.',
        category: 'Investment Options'
      },
      {
        id: '505',
        title: 'ESG Investing',
        content: 'We offer Environmental, Social, and Governance (ESG) investment options for socially conscious investors.',
        category: 'Investment Options'
      },
      {
        id: '506',
        title: 'International Investments',
        content: 'Our international investment options provide global diversification and access to emerging market opportunities.',
        category: 'Investment Options'
      }
    ]
  },
  {
    id: '6',
    title: 'Tax Benefits',
    articleCount: 4,
    articles: [
      {
        id: '601',
        title: 'Tax Deductions',
        content: 'Pension contributions are tax-deductible up to annual limits. This reduces your taxable income and can result in significant tax savings.',
        category: 'Tax Benefits'
      },
      {
        id: '602',
        title: 'Tax-Free Growth',
        content: 'Investment returns within your pension fund grow tax-free, allowing your savings to compound more effectively over time.',
        category: 'Tax Benefits'
      },
      {
        id: '603',
        title: 'Tax on Withdrawals',
        content: 'Retirement benefits are generally tax-free up to certain limits. Early withdrawals may be subject to tax penalties.',
        category: 'Tax Benefits'
      },
      {
        id: '604',
        title: 'Tax Planning',
        content: 'Our tax advisors can help you optimize your pension contributions for maximum tax efficiency and retirement savings.',
        category: 'Tax Benefits'
      }
    ]
  },
  {
    id: '7',
    title: 'Digital Services',
    articleCount: 5,
    articles: [
      {
        id: '701',
        title: 'Self-Service Center',
        content: 'Our Self-Service Center provides 24/7 access to your pension information, contribution history, and account management.',
        category: 'Digital Services'
      },
      {
        id: '702',
        title: 'Mobile App',
        content: 'Our mobile app allows you to check your balance, make contributions, and manage your pension on the go.',
        category: 'Digital Services'
      },
      {
        id: '703',
        title: 'Online Forms',
        content: 'All pension forms are available online for easy download and submission. Digital signatures are accepted for most transactions.',
        category: 'Digital Services'
      },
      {
        id: '704',
        title: 'E-Statements',
        content: 'Opt for electronic statements to reduce paper waste and receive instant access to your pension information.',
        category: 'Digital Services'
      },
      {
        id: '705',
        title: 'Secure Access',
        content: 'Multi-factor authentication and encryption ensure your pension information remains secure and private.',
        category: 'Digital Services'
      }
    ]
  },
  {
    id: '8',
    title: 'Customer Support',
    articleCount: 4,
    articles: [
      {
        id: '801',
        title: 'Contact Information',
        content: 'Contact us via phone: +233 30 123 4567, email: info@sptpension.com, or visit our office at 123 Pension Street, Accra.',
        category: 'Customer Support'
      },
      {
        id: '802',
        title: 'Office Hours',
        content: 'Our offices are open Monday to Friday, 8:00 AM to 5:00 PM. Extended hours available on Thursdays until 7:00 PM.',
        category: 'Customer Support'
      },
      {
        id: '803',
        title: 'Emergency Support',
        content: 'Emergency support is available 24/7 for urgent pension matters. Call our hotline: +233 30 123 4568.',
        category: 'Customer Support'
      },
      {
        id: '804',
        title: 'Complaint Resolution',
        content: 'We aim to resolve all complaints within 5 business days. Escalation procedures are available for complex issues.',
        category: 'Customer Support'
      }
    ]
  },
  {
    id: '9',
    title: 'Psychological & Emotional Support',
    articleCount: 20,
    articles: [
      {
        id: '901',
        title: 'Why do I naturally resist planning for retirement when I know it\'s important?',
        content: 'Your brain is wired for immediate survival, making future planning feel abstract and unreal. This "present bias" affects everyone - you\'re not lazy or irresponsible. SPT\'s approach bridges this gap by making your future self emotionally real through visualization tools and connecting daily choices to long-term security.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '902',
        title: 'How do I emotionally connect with my 65-year-old self?',
        content: 'Imagine meeting yourself at 65. What would that person want to tell you about today\'s financial decisions? Our Future Self Visualization tool helps you "visit" your retirement, experience different financial scenarios, and feel the emotional reality of financial security versus insecurity. This connection transforms abstract planning into personal motivation.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '903',
        title: 'What would my future self want me to know about pension planning today?',
        content: 'Your future self would say: "Thank you for thinking beyond today\'s immediate needs. Every cedi you invest now works 24/7 for decades. The sacrifices feel significant today but become invisible compared to the security and dignity they create. Start now - time is your most powerful wealth-building tool."',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '904',
        title: 'How does SPT help me overcome the feeling that pension contributions are "lost money"?',
        content: 'We reframe contributions as "paying your future self" rather than losing money. Each contribution is hiring your money to work for you, earning returns while you sleep. Our visualization tools show how today\'s ₵500 becomes tomorrow\'s ₵1,640, transforming the loss feeling into investment excitement and wealth-building momentum.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '905',
        title: 'Why does retirement planning feel overwhelming, and how can I simplify it?',
        content: 'Complexity paralysis is normal when facing 40+ years of financial planning. SPT uses "progressive disclosure" - revealing complexity only as you develop capacity. Start with one simple decision: "Do I want basic security or enhanced growth?" From there, we guide you step-by-step, building confidence through small, manageable choices.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '906',
        title: 'How do I build sustainable pension contribution habits that become automatic?',
        content: 'Habits form through consistent repetition and emotional rewards. Set up automatic contributions on payday, celebrate each milestone (₵1,000, ₵5,000 saved), and visualize your growing security. After 3-6 months, contributions become as automatic as brushing teeth - effortless habits protecting your future dignity and independence.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '907',
        title: 'What psychological tricks help me maintain consistent contributions during tough times?',
        content: 'During financial stress, remember: stopping contributions guarantees falling behind, while continuing gives you the chance to benefit when conditions improve. Reduce amounts if needed rather than stopping completely. Think "momentum maintenance" - small, consistent steps matter more than perfect amounts. Consistency beats perfection in wealth building.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '908',
        title: 'How does SPT make optimal pension decisions easier than suboptimal ones?',
        content: 'We use "choice architecture" - designing your environment to encourage good decisions. Default options favor your long-term interests, automatic escalation increases contributions with salary growth, and timely reminders prevent missed opportunities. The easiest path becomes the best path for your financial future.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '909',
        title: 'How do I stay motivated when pension benefits feel distant and uncertain?',
        content: 'Break the journey into meaningful milestones: first ₵1,000, ₵10,000, ₵50,000 saved. Each milestone brings pride and momentum. Our progress tracking shows both accumulated wealth and time remaining, making the distant future feel achievable. Celebrate progress regularly - motivation grows through recognition of advancement.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '910',
        title: 'What role does my family play in my pension planning success?',
        content: 'Family support multiplies success probability. Share your goals, explain how your security protects them from future burden, and involve them in milestone celebrations. When family understands that your pension planning enhances rather than threatens current lifestyle, they become powerful allies in maintaining long-term discipline.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '911',
        title: 'How do I handle social pressure to spend money instead of saving for retirement?',
        content: 'Reframe peer pressure conversations: "I\'m not depriving myself - I\'m paying my future self first." Share that pension planning lets you be generous longer by avoiding becoming a financial burden. Most people admire financial discipline once they understand it creates freedom rather than restriction.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '912',
        title: 'Why do market drops feel so scary, and how do I prepare emotionally?',
        content: 'Market volatility triggers our loss aversion - losses feel twice as painful as equivalent gains feel good. Prepare by understanding that temporary paper losses during accumulation years actually help you by allowing purchases at discount prices. Historical evidence shows disciplined investors benefit most from volatile periods.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '913',
        title: 'How does SPT help transform my financial anxiety into financial confidence?',
        content: 'We address anxiety through education, visualization, and control. Understanding how pension systems work reduces fear of the unknown. Seeing your progress through clear dashboards builds confidence. Having control over contribution amounts and investment choices creates empowerment. Knowledge + visibility + control = confidence.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '914',
        title: 'What does successful retirement really mean beyond having money?',
        content: 'Successful retirement means maintaining dignity, independence, and the ability to contribute meaningfully to family and community. It\'s having choices about how to spend time, maintaining health through reduced financial stress, and leaving a positive legacy. Pension planning protects these deeper values, not just bank account numbers.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '915',
        title: 'How do I balance enjoying life today while securing my future?',
        content: 'Optimal balance comes from intentional trade-offs rather than accidental neglect. Identify which current expenses truly enhance your life versus mindless spending. Redirect mindless spending to pension contributions while protecting meaningful current experiences. This conscious approach ensures neither present happiness nor future security is sacrificed.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '916',
        title: 'How does Standard Pensions Trust\'s mission align with my personal retirement goals?',
        content: 'SPT transforms retirement planning through expert administration and innovative solutions, but your goals drive the strategy. We provide the platform, tools, and guidance while you define success. Our role is enabling your vision through technical excellence, cultural sensitivity, and personalized support throughout your wealth-building journey.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '917',
        title: 'What makes SPT different from other pension administrators in addressing my emotional needs?',
        content: 'SPT uniquely integrates advanced analytics with emotional intelligence, recognizing that pension decisions are emotional decisions supported by data. We address anxiety, build confidence, and provide culturally sensitive guidance rather than just processing transactions. Our approach honors both your financial goals and emotional wellbeing throughout the journey.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '918',
        title: 'How does Ghana\'s three-tier system protect me from putting all my retirement eggs in one basket?',
        content: 'The three-tier system provides security through diversification. Tier 1 (SSNIT) offers government-backed basic income. Tier 2 (SPT-managed) adds professionally managed employer funding. Tier 3 (Personal) enables individual control and acceleration. This structure protects against single-point failure while maximizing wealth-building potential across multiple vehicles.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '919',
        title: 'How do I know if my pension planning is on track for my personal definition of success?',
        content: 'Success metrics include both numbers and feelings. Quantitatively: replacement ratio approaching 75-80% of pre-retirement income, emergency fund adequacy, debt management progress. Qualitatively: reduced financial anxiety, increased confidence in future security, family financial harmony. Regular reviews ensure alignment between progress and personal success definitions.',
        category: 'Psychological & Emotional Support'
      },
      {
        id: '920',
        title: 'What mindset shift transforms pension planning from burden to empowerment?',
        content: 'Shift from "I have to save" to "I get to build wealth." Each contribution represents choosing freedom over dependency, control over helplessness, dignity over desperation. You\'re not sacrificing for an uncertain future - you\'re investing in guaranteed personal empowerment. This mindset transforms obligation into opportunity and burden into blessing.',
        category: 'Psychological & Emotional Support'
      }
    ]
  }
];
