import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Products - XATOM.IN | Insights, Hire, Chat, Agents',
  description: 'Explore all 4 XATOM products. Deep dive into Insights, Hire, Chat, and Agents with interactive demos and use cases.',
  keywords: ['XATOM Products', 'Features', 'Demos', 'Use Cases', 'AI Tools'],
  openGraph: {
    title: 'XATOM Products',
    description: 'Four powerful AI products in one platform',
    type: 'website',
  },
}

export default function FeaturesPage() {
  return (
    <main className="bg-[#060608]">
      <Navbar />

      {/* Features Hero */}
      <section className="pt-40 pb-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto text-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-6">
              Explore all <span className="gradient-cyan">4 Products</span>
            </h1>
            <p className="text-lg text-[#A09CB8] max-w-[600px] mx-auto">
              Deep dive into each AI tool and see how they can transform your workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Tabs - Coming Soon */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="border border-[rgba(255,255,255,0.06)] rounded-[20px] bg-[#16161F] p-20 text-center">
            <h2 className="font-display text-2xl font-black mb-4">Detailed Features Coming Soon</h2>
            <p className="text-[#A09CB8]">Each product page with interactive demos and use cases</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
