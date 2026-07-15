import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gold IRA Calculators 2026 — Free Precious Metals Retirement Tools',
  description:
    'Free gold IRA calculators for 2026. Project retirement growth, calculate 401k rollover tax savings, compare gold vs stocks, and optimize your precious metals allocation. Updated IRS rules.',
  keywords: [
    'gold IRA calculator',
    '401k to gold IRA rollover calculator',
    'gold vs stocks calculator',
    'gold IRA fee calculator',
    'precious metals IRA',
    'gold IRA contribution limits 2026',
    'gold IRA growth calculator',
    'self directed IRA gold',
    'gold retirement calculator',
    'Augusta Precious Metals',
  ],
  metadataBase: new URL('https://goldiracalculators.app'),
  alternates: { canonical: 'https://goldiracalculators.app' },
  openGraph: {
    title: 'Gold IRA Calculators 2026 — Free Precious Metals Retirement Tools',
    description:
      'Free gold IRA calculators for 2026. Project retirement growth, calculate 401k rollover implications, and compare gold vs stocks.',
    url: 'https://goldiracalculators.app',
    siteName: 'goldiracalculators.app',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Free Gold IRA Calculators 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold IRA Calculators 2026 — Free Precious Metals Retirement Tools',
    description: 'Free gold IRA calculators for 2026. Project retirement growth and compare precious metals vs stocks.',
    images: ['/twitter-image.png'],
  },
  robots: { index: true, follow: true },
  verification: { google: 'PLACEHOLDER_GOOGLE_SITE_VERIFICATION' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5035661017594256" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('gic-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KMD293K0CC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KMD293K0CC');
          `}
        </Script>
      </head>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-[#e2e8f0]"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5035661017594256"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
