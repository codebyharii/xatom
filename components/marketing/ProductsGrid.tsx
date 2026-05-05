'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Database, FileText, MessageCircle, Zap } from 'lucide-react'

const products = [
  {
    id: 'insights',
    name: 'XATOM Insights',
    tagline: 'NL → SQL → Charts',
    description: 'Ask your database anything in plain English. Instant charts, no SQL needed.',
    icon: Database,
    iconBg: 'rgba(0, 212, 255, 0.08)',
    tag: 'cyan',
    color: '#00D4FF',
  },
  {
    id: 'hire',
    name: 'XATOM Hire',
    tagline: 'AI Ranking',
    description: 'Upload hundreds of resumes. AI scores and ranks every candidate with detailed reasoning.',
    icon: FileText,
    iconBg: 'rgba(255, 179, 71, 0.08)',
    tag: 'amber',
    color: '#FFB347',
  },
  {
    id: 'chat',
    name: 'XATOM Chat',
    tagline: 'Realtime',
    description: 'Team chat where the AI remembers everything. Long-term memory via vector search.',
    icon: MessageCircle,
    iconBg: 'rgba(0, 229, 160, 0.08)',
    tag: 'green',
    color: '#00E5A0',
  },
  {
    id: 'agents',
    name: 'XATOM Agents',
    tagline: 'Autonomous',
    description: 'Self-planning AI agents that execute complex tasks. Build workflows visually.',
    icon: Zap,
    iconBg: 'rgba(123, 94, 255, 0.10)',
    tag: 'purple',
    color: '#7B5EFF',
  },
]

export function ProductsGrid() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section className="py-20 px-[5%] bg-[#060608]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold text-[#7B5EFF] tracking-widest uppercase mb-4">
            Our Products
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Four tools. One platform.
          </h2>
          <p className="text-lg text-[#A09CB8] max-w-[600px] mx-auto">
            Everything your team needs to harness AI.
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.06)] rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.06)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {products.map((product) => {
            const href = product.id === 'insights' ? '/insights' : product.id === 'hire' ? '/hire' : null
            const Card = href ? Link : 'div'

            return (
              <Card
                key={product.id}
                {...(href ? { href } : {})}
                className={href ? '' : 'cursor-default'}
              >
                <motion.div
                  className="bg-[#0D0D12] p-12 relative group overflow-hidden h-full"
                  variants={itemVariants}
                  whileHover={href ? { backgroundColor: '#12121A' } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(600px at var(--mx, 50%) var(--my, 50%), ${product.color}15, transparent 80%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: product.iconBg }}
                    >
                      <product.icon size={24} style={{ color: product.color }} />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-black mb-2 text-white">{product.name}</h3>
                    <p className="text-[#A09CB8] mb-6 leading-relaxed">{product.description}</p>

                    {/* Tag */}
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full border"
                        style={{
                          borderColor: product.color,
                          backgroundColor: `${product.color}15`,
                          color: product.color,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {product.tagline}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.04)] transition-all duration-300 ${href ? 'group-hover:bg-[#7B5EFF] group-hover:rotate-45' : 'opacity-50'}`}
                      >
                        <ArrowUpRight size={16} style={{ color: product.color }} className={href ? 'group-hover:text-white' : ''} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
