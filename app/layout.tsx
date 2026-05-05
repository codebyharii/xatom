import type { Metadata } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { GlowOrbs } from '@/components/effects/GlowOrbs'
import { NoiseTexture } from '@/components/effects/NoiseTexture'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { GoogleAnalytics } from '@/components/providers/GoogleAnalytics'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'XATOM.IN - AI SaaS Platform | Insights, Hire, Chat, Agents',
  description: 'One platform. Four powerful AI tools. Chat with your data, screen resumes, collaborate in real-time, and run autonomous agents. 100% free to deploy.',
  keywords: ['AI', 'SaaS', 'Automation', 'AI Agents', 'Database', 'Resume Screening', 'Chat AI', 'No Code'],
  authors: [{ name: 'XATOM.IN' }],
  creator: 'XATOM',
  publisher: 'Vercel',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'XATOM.IN - Where Intelligence Meets Automation',
    description: 'Four powerful AI tools in one platform. Insights, Hire, Chat, and Agents.',
    url: 'https://xatom.in',
    siteName: 'XATOM.IN',
    images: [
      {
        url: 'https://xatom.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'XATOM.IN - AI SaaS Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XATOM.IN - AI SaaS Platform',
    description: 'One platform. Four powerful AI tools.',
    images: ['https://xatom.in/og-image.png'],
    creator: '@xatomai',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${mono.variable} scroll-smooth`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[#060608] text-[#F0EFFE] font-body">
        <ScrollProgress />
        <GlowOrbs />
        <NoiseTexture />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
