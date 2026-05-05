'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/features' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/blog' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 h-9 z-50 flex items-center justify-center border-b border-[#1E1E2E]"
        style={{
          background: 'linear-gradient(90deg, rgba(123, 94, 255, 0.13), rgba(0, 212, 255, 0.13))',
        }}
      >
        <div className="flex items-center gap-2 text-[#A09CB8] text-xs font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>XATOM v1.0 is now live on xatom.in — Explore all 4 AI products →</span>
        </div>
        <button className="absolute right-5" onClick={() => {}}>
          <X size={16} className="text-[#5A5670]" />
        </button>
      </motion.div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed top-9 left-0 right-0 h-17 z-40 flex items-center justify-between px-[5%] border-b border-[rgba(255,255,255,0.06)] backdrop-blur-[20px]"
        style={{
          background: 'rgba(6, 6, 8, 0.75)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-6 h-6 bg-cyan-400" />
            <span className="font-display text-xl font-black tracking-tight">
              <span className="text-white">X</span>
              <span className="text-cyan-400">ATOM</span>
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ color: '#F0EFFE' }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={item.href}
                className="text-sm font-medium text-[#A09CB8] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button className="hidden md:block px-5 py-2 text-sm font-medium text-[#F0EFFE] hover:text-white transition-colors">
            Sign in
          </button>
          <button className="px-6 py-2 bg-[#7B5EFF] text-white text-sm font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 hover:shadow-purple">
            Get started free →
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed top-0 right-0 bottom-0 w-80 bg-[#0D0D12] border-l border-[rgba(255,255,255,0.06)] z-30 pt-32 px-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="block py-3 text-[#A09CB8] hover:text-[#F0EFFE] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}
