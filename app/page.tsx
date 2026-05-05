import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/marketing/Hero'
import { LogoMarquee } from '@/components/marketing/LogoMarquee'
import { ProductsGrid } from '@/components/marketing/ProductsGrid'
import { FeatureStrip } from '@/components/marketing/FeatureStrip'
import { HowItWorks } from '@/components/marketing/HowItWorks'
import { Pricing } from '@/components/marketing/Pricing'
import { CTASection } from '@/components/marketing/CTASection'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#060608] overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Products Grid */}
      <ProductsGrid />

      {/* Feature Strip */}
      <FeatureStrip />

      {/* How It Works */}
      <HowItWorks />

      {/* Pricing */}
      <Pricing />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
