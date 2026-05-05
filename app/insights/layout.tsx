import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XATOM Insights | AI BI Co-pilot',
  description: 'Ask data questions in plain English. Get instant SQL queries and visualizations.',
  openGraph: {
    title: 'XATOM Insights',
    description: 'AI-powered business intelligence made simple',
    type: 'website',
  },
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg text-text">
      {children}
    </div>
  )
}
