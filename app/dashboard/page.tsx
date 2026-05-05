'use client'

import { motion } from 'framer-motion'
import { Database, FileText, MessageCircle, Zap, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

const products = [
  {
    name: 'Insights',
    icon: Database,
    color: '#00D4FF',
    usage: '45 queries this month',
  },
  {
    name: 'Hire',
    icon: FileText,
    color: '#FFB347',
    usage: '3 resume batches uploaded',
  },
  {
    name: 'Chat',
    icon: MessageCircle,
    color: '#00E5A0',
    usage: '5 active rooms',
  },
  {
    name: 'Agents',
    icon: Zap,
    color: '#7B5EFF',
    usage: '2 agents scheduled',
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#060608] flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-6 flex flex-col justify-between">
        {/* Top */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-5 h-5 bg-cyan-400" />
            <span className="font-display text-lg font-black">XATOM</span>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {products.map((product, i) => (
              <Link
                key={i}
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#A09CB8] hover:text-white hover:bg-[#16161F] transition-all"
              >
                <product.icon size={20} style={{ color: product.color }} />
                <span className="font-medium">{product.name}</span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-[rgba(255,255,255,0.06)] my-6" />

          {/* Settings */}
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#A09CB8] hover:text-white hover:bg-[#16161F] transition-all"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>

        {/* Bottom */}
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[#A09CB8] hover:text-white hover:bg-[#16161F] transition-all">
          <LogOut size={20} />
          <span className="font-medium">Sign out</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display text-4xl font-black mb-2">Welcome back, User! 👋</h1>
            <p className="text-[#A09CB8]">Here's what's happening with your XATOM products.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Queries', value: '156', color: '#00D4FF' },
              { label: 'Resumes Screened', value: '87', color: '#FFB347' },
              { label: 'Chat Rooms', value: '12', color: '#00E5A0' },
              { label: 'Agents Running', value: '5', color: '#7B5EFF' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-[#5A5670] text-sm font-semibold mb-2">{stat.label}</p>
                <p className="font-display text-3xl font-black" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Products Grid */}
          <div>
            <h2 className="font-display text-2xl font-black mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={i}
                  className="border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 hover:bg-[#1C1C28] transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-[#5A5670] text-sm font-semibold mb-1">XATOM {product.name}</p>
                      <p className="text-white font-display text-xl font-black">{product.name}</p>
                    </div>
                    <product.icon size={24} style={{ color: product.color }} />
                  </div>
                  <p className="text-[#A09CB8] text-sm">{product.usage}</p>
                  <button
                    className="mt-6 w-full py-2 border border-[rgba(255,255,255,0.06)] rounded-lg text-sm font-semibold text-white hover:border-[#7B5EFF] hover:text-[#7B5EFF] transition-all"
                  >
                    Open →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
