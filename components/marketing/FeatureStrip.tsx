'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Database, Radio } from 'lucide-react'

const features = [
  {
    icon: Zap,
    label: '100% Free Deploy',
    desc: 'Vercel + Supabase, forever free',
    color: '#7B5EFF',
  },
  {
    icon: Database,
    label: 'Claude AI Powered',
    desc: "Anthropic's latest Claude models",
    color: '#00D4FF',
  },
  {
    icon: CheckCircle2,
    label: 'pgvector Built-in',
    desc: 'No external vector DB needed',
    color: '#00E5A0',
  },
  {
    icon: Radio,
    label: 'Real-time Ready',
    desc: 'WebSockets via Supabase Realtime',
    color: '#FFB347',
  },
]

export function FeatureStrip() {
  return (
    <section className="border-y border-[rgba(255,255,255,0.06)] bg-[#16161F]">
      <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[rgba(255,255,255,0.06)]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 p-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex-shrink-0">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: feature.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{feature.label}</p>
              <p className="text-xs text-[#A09CB8]">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
