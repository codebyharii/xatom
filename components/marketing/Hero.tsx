'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-[5%]">
      <div className="max-w-[1100px] mx-auto w-full">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(123,94,255,0.35)] bg-[rgba(123,94,255,0.08)] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold text-[#A09CB8] tracking-widest uppercase">
              Now live on xatom.in — 4 AI Products
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="font-display font-black mb-6 leading-tight">
            <span className="block text-white">Where</span>
            <span className="block gradient-purple">Intelligence</span>
            <span className="block text-white">Meets</span>
            <span className="block gradient-cyan">Automation</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="max-w-[580px] text-lg text-[#A09CB8] mb-12 leading-relaxed"
          >
            One platform. Four powerful AI tools. Chat with your data, screen resumes, collaborate in
            real-time, and run autonomous agents. 100% free to deploy.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-16">
            <Link
              href="/features"
              className="px-8 py-3 bg-[#7B5EFF] text-white text-base font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 hover:shadow-purple hover:-translate-y-0.5 active:scale-95 inline-flex items-center justify-center"
            >
              Start building free →
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 border border-[rgba(255,255,255,0.10)] text-white text-base font-semibold rounded-[10px] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 inline-flex items-center justify-center"
            >
              Watch demo ■
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[640px] border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 grid grid-cols-4 gap-6 mb-16"
          >
            {[
              { num: '4', label: 'AI Products' },
              { num: '70', label: 'Days to Build' },
              { num: '$0', label: 'Deploy Cost' },
              { num: '∞', label: 'Possibilities' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="gradient-purple text-2xl font-black mb-1">{stat.num}</div>
                <div className="text-xs text-[#5A5670] font-semibold uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Demo Card */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-[800px] border border-[rgba(255,255,255,0.06)] rounded-[20px] bg-[#16161F] p-8 overflow-hidden"
          >
            <div className="bg-[#0D0D12] rounded-[12px] p-6 space-y-4 min-h-[300px] flex flex-col justify-between">
              {/* Chat UI Demo */}
              <div className="space-y-3">
                <div className="flex justify-end">
                  <div className="bg-[#7B5EFF] text-white px-4 py-2 rounded-lg text-sm max-w-[200px]">
                    What are my top 5 customers by revenue this month?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-[#1C1C28] text-[#A09CB8] px-4 py-2 rounded-lg text-sm max-w-[300px]">
                    <div className="font-mono text-xs text-[#00E5A0] mb-2">SELECT customer, SUM(revenue)...</div>
                    <div>Analyzing your data...</div>
                  </div>
                </div>
              </div>

              {/* Chart Preview */}
              <div className="flex items-end gap-2 h-20 justify-center">
                {[65, 80, 92, 75, 88].map((height, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#7B5EFF] to-[#9B7FFF] rounded-t"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
