'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function CTASection() {
  return (
    <section className="py-20 px-[5%] bg-[#0D0D12] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1100px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold text-[#7B5EFF] tracking-widest uppercase mb-4">
            Ready to build?
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
            Start building <span className="gradient-purple">XATOM</span> today.
          </h2>
          <p className="text-lg text-[#A09CB8] max-w-[600px] mx-auto mb-12">
            70 days. 4 AI products. One unforgettable portfolio.
          </p>

          {/* CTAs */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <Link
              href="/sign-up"
              className="px-8 py-3 bg-[#7B5EFF] text-white font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 hover:shadow-purple hover:-translate-y-0.5 inline-flex items-center justify-center"
            >
              Start building free →
            </Link>
            <Link
              href="/blog"
              className="px-8 py-3 border border-[rgba(255,255,255,0.10)] text-white font-semibold rounded-[10px] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 inline-flex items-center justify-center"
            >
              View documentation
            </Link>
          </div>

          {/* Bottom Info */}
          <p className="text-xs text-[#5A5670]">
            No credit card required · Free forever plan · Deploy in minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}
