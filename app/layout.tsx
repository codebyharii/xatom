import type { Metadata } from 'next'
import { Syne, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { GlowOrbs } from '@/components/effects/GlowOrbs'
import { NoiseTexture } from '@/components/effects/NoiseTexture'

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
  title: 'XATOM.IN - Where Intelligence Meets Automation',
  description: 'One platform. Four powerful AI tools. Chat with your data, screen resumes, collaborate in real-time, and run autonomous agents.',
  keywords: 'AI, SaaS, Insights, Hire, Chat, Agents, Automation',
  openGraph: {
    title: 'XATOM.IN - AI SaaS Platform',
    description: 'Powerful AI tools for business automation',
    type: 'website',
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
      </head>
      <body className="bg-[#060608] text-[#F0EFFE] font-body">
        <GlowOrbs />
        <NoiseTexture />
        {children}
      </body>
    </html>
  )
}
