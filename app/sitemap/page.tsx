import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sitemap | SPT Pension',
  description: 'Complete sitemap of all pages and sections available on the SPT Pension website.',
  robots: 'index, follow',
};

interface SitemapSection {
  title: string;
  description: string;
  links: {
    href: string;
    label: string;
    description?: string;
  }[];
}

const sitemapSections: SitemapSection[] = [
  {
    title: 'Main Pages',
    description: 'Primary navigation and key information pages',
    links: [
      { href: '/', label: 'Home', description: 'Welcome to SPT Pension' },
      { href: '/about', label: 'About Us', description: 'Learn about our company and mission' },
      { href: '/contact', label: 'Contact', description: 'Get in touch with our team' },
      { href: '/testimonials', label: 'Testimonials', description: 'What our clients say about us' },
    ],
  },
  {
    title: 'About Section',
    description: 'Detailed information about our organization',
    links: [
      { href: '/about/careers', label: 'Careers', description: 'Join our team' },
      { href: '/about/leadership', label: 'Leadership', description: 'Meet our leadership team' },
      { href: '/about/timeline', label: 'Timeline', description: 'Our company history and milestones' },
    ],
  },
  {
    title: 'Pension Schemes',
    description: 'Explore our comprehensive pension and retirement solutions',
    links: [
      { href: '/schemes', label: 'All Schemes', description: 'Overview of all pension schemes' },
      { href: '/schemes/master-trust', label: 'Master Trust', description: 'Multi-employer pension scheme' },
      { href: '/schemes/personal-pension', label: 'Personal Pension', description: 'Individual retirement planning' },
      { href: '/schemes/employer-sponsored', label: 'Employer Sponsored', description: 'Customized pension schemes for organizations' },
      { href: '/schemes/provident-fund', label: 'Provident Fund', description: 'Voluntary savings program' },

    ],
  },
  {
    title: 'Services',
    description: 'Our comprehensive pension services and support',
    links: [
      { href: '/services/enrollment', label: 'Enrollment', description: 'Join our pension schemes' },
      { href: '/services/faq', label: 'FAQ', description: 'Frequently asked questions' },
      { href: '/services/self-service-center', label: 'Self-Service Center', description: 'Manage your account online' },
      { href: '/services/form-status', label: 'Form Status', description: 'Check your application status' },
      { href: '/services/survey-feedback', label: 'Survey & Feedback', description: 'Share your experience with us' },
    ],
  },
  {
    title: 'Forms & Applications',
    description: 'Access all enrollment and claim forms',
    links: [
      { href: '/forms/employee-enrollment', label: 'Employee Enrollment', description: 'Enroll as an employee' },
      { href: '/forms/employer-enrollment', label: 'Employer Enrollment', description: 'Register your organization' },
      { href: '/forms/personal-pension-claim', label: 'Personal Pension Claim', description: 'Claim your personal pension benefits' },
      { href: '/forms/tier-2-benefit-claim', label: 'Tier 2 Benefit Claim', description: 'Claim Tier 2 benefits' },
      { href: '/forms/tier-2-beneficiary-claim', label: 'Tier 2 Beneficiary Claim', description: 'Beneficiary claims for Tier 2' },
      { href: '/forms/tier-3-benefit-claim', label: 'Tier 3 Benefit Claim', description: 'Claim Tier 3 benefits' },
      { href: '/forms/tier-3-beneficiary-claim', label: 'Tier 3 Beneficiary Claim', description: 'Beneficiary claims for Tier 3' },
    ],
  },
  {
    title: 'Media & Resources',
    description: 'News, events, and downloadable resources',
    links: [
      { href: '/media/blog', label: 'Blog', description: 'Latest news and insights' },
      { href: '/media/events', label: 'Events', description: 'Upcoming and past events' },
      { href: '/media/gallery', label: 'Gallery', description: 'Photo gallery of our events' },
      { href: '/media/downloads', label: 'Downloads', description: 'Forms, guides, and resources' },
    ],
  },
  {
    title: 'Tools & Calculators',
    description: 'Interactive tools to help plan your retirement',
    links: [
      { href: '/pension-calculator', label: 'Pension Calculator', description: 'Calculate your retirement benefits' },
      { href: '/chat', label: 'AI Assistant', description: 'Get instant help with our AI chatbot' },
    ],
  },
  {
    title: 'Legal & Policies',
    description: 'Important legal information and policies',
    links: [
      { href: '/legal/privacy-policy', label: 'Privacy Policy', description: 'How we protect your privacy' },
      { href: '/legal/terms', label: 'Terms of Service', description: 'Terms and conditions of use' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-700 mb-4">
            Site Map
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through all pages and sections of Standard Pensions Trust. Find exactly what you're looking for.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {section.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-red-600 hover:text-red-800 hover:underline transition-colors duration-200"
                    >
                      <div className="font-medium text-red-600 group-hover:text-red-800">
                        {link.label}
                      </div>
                      {link.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {link.description}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help Finding Something?
            </h3>
            <p className="text-gray-600 mb-4">
              If you can't find what you're looking for, try our search function or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-700 hover:bg-red-800 transition-colors duration-150"
              >
                Contact Support
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center px-6 py-3 border border-red-300 text-base font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors duration-150"
              >
                Try AI Assistant
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: January 15, 2024
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.standardpensions.com/sitemap" />
        </div>
      </div>
    </div>
  );
}