import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XATOM Hire | AI Resume Screening',
  description: 'Upload hundreds of resumes. AI scores and ranks every candidate with detailed reasoning.',
  openGraph: {
    title: 'XATOM Hire',
    description: 'AI-powered recruitment made smart',
    type: 'website',
  },
}

export default function HireLayout({
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
