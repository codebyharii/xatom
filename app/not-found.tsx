'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="bg-[#060608]">
      <Navbar />

      {/* 404 Content */}
      <section className="min-h-[calc(100vh-200px)] flex items-center justify-center px-[5%] py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-9xl font-black gradient-purple mb-4">404</h1>
          <h2 className="font-display text-4xl font-black mb-4">Oops! Page not found</h2>
          <p className="text-lg text-[#A09CB8] max-w-[500px] mx-auto mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link href="/">
            <button className="px-8 py-3 bg-[#7B5EFF] text-white font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 hover:shadow-purple hover:-translate-y-0.5">
              Back to home →
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
