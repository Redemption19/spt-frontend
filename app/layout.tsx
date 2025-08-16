import './globals.css';
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Providers from './providers';
import { ServiceWorkerProvider } from '@/components/service-worker-provider';
import LayoutWrapper from './layout-wrapper';

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Standard Pensions Trust | Ghana\'s leading pension administrator',
    template: '%s | Standard Pensions Trust',
  },
  description: 'Standard Pensions Trust is Ghana\'s leading pension administrator, offering comprehensive retirement planning solutions and pension schemes for individuals and businesses.',
  keywords: ['pension', 'retirement', 'Ghana', 'pension fund', 'retirement planning', 'personal pension', 'master trust', 'provident fund'],
  authors: [{ name: 'Standard Pensions Trust' }],
  creator: 'Standard Pensions Trust',
  icons: [
    {
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/favicon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      url: '/favicon-180x180.png',
      rel: 'apple-touch-icon',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      url: '/favicon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      url: '/favicon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
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
        {/* Favicon Links */}
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
        
        {/* Manifest and PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Standard Pensions Trust" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global Image Protection
              (function() {
                // Prevent right-click on images
                document.addEventListener('contextmenu', function(e) {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                  }
                });
                
                // Prevent drag and drop of images
                document.addEventListener('dragstart', function(e) {
                  if (e.target.tagName === 'IMG') {
                    e.preventDefault();
                    return false;
                  }
                });
                
                // Prevent keyboard shortcuts for saving
                document.addEventListener('keydown', function(e) {
                  // Prevent Ctrl+S (Save)
                  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                    e.preventDefault();
                    return false;
                  }
                  
                  // Prevent Ctrl+Shift+S (Save As)
                  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
                    e.preventDefault();
                    return false;
                  }
                  
                  // Prevent F12 (Developer Tools)
                  if (e.key === 'F12') {
                    e.preventDefault();
                    return false;
                  }
                });
                
                // Disable image selection
                const images = document.querySelectorAll('img');
                images.forEach(function(img) {
                  img.style.userSelect = 'none';
                  img.style.webkitUserSelect = 'none';
                  img.style.mozUserSelect = 'none';
                  img.style.msUserSelect = 'none';
                  img.style.webkitTouchCallout = 'none';
                  img.style.pointerEvents = 'none';
                });
                
                // Monitor for dynamically added images
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                      if (node.nodeType === 1 && node.tagName === 'IMG') {
                        node.style.userSelect = 'none';
                        node.style.webkitUserSelect = 'none';
                        node.style.mozUserSelect = 'none';
                        node.style.msUserSelect = 'none';
                        node.style.webkitTouchCallout = 'none';
                        node.style.pointerEvents = 'none';
                      }
                    });
                  });
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true
                });
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans">
        <Providers>
          <ServiceWorkerProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <Toaster />
            </ThemeProvider>
          </ServiceWorkerProvider>
        </Providers>
      </body>
    </html>
  );
}