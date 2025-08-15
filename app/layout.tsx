import './globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';
import { ServiceWorkerProvider } from '@/components/service-worker-provider';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Standard Pensions Trust | Ghana\'s Premier Pension Administrator',
    template: '%s | Standard Pensions Trust',
  },
  description: 'Standard Pensions Trust is Ghana\'s leading pension administrator, offering comprehensive retirement planning solutions and pension schemes for individuals and businesses.',
  keywords: ['pension', 'retirement', 'Ghana', 'pension fund', 'retirement planning', 'personal pension', 'master trust', 'provident fund'],
  authors: [{ name: 'Standard Pensions Trust' }],
  creator: 'Standard Pensions Trust',
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://standardpensionstrust.com',
    title: 'Standard Pensions Trust | Ghana\'s Premier Pension Administrator',
    description: 'Standard Pensions Trust is Ghana\'s leading pension administrator, offering comprehensive retirement planning solutions and pension schemes for individuals and businesses.',
    siteName: 'Standard Pensions Trust',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standard Pensions Trust | Ghana\'s Premier Pension Administrator',
    description: 'Standard Pensions Trust is Ghana\'s leading pension administrator, offering comprehensive retirement planning solutions and pension schemes for individuals and businesses.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Standard Pensions Trust" />
      </head>
      <body className="antialiased font-sans">
        <Providers>
          <ServiceWorkerProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Header />
              <main>{children}</main>
              <Footer />
              <WhatsAppButton />
              <Toaster />
            </ThemeProvider>
          </ServiceWorkerProvider>
        </Providers>
      </body>
    </html>
  );
}