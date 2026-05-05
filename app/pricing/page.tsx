'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Pricing } from '@/components/marketing/Pricing'
import { motion } from 'framer-motion'

export default function PricingPage() {
  return (
    <main className="bg-[#060608]">
      <Navbar />

      {/* Pricing Hero */}
      <section className="pt-40 pb-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-black mb-6">
              Simple <span className="gradient-purple">Pricing</span>
            </h1>
            <p className="text-lg text-[#A09CB8] max-w-[600px] mx-auto">
              Choose the perfect plan for your team. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Component */}
      <Pricing />

      {/* FAQ - Coming Soon */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="border border-[rgba(255,255,255,0.06)] rounded-[20px] bg-[#16161F] p-20 text-center">
            <h2 className="font-display text-2xl font-black mb-4">FAQ Coming Soon</h2>
            <p className="text-[#A09CB8]">Common questions about pricing and billing</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
