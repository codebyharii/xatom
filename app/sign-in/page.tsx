'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <main className="bg-[#060608] min-h-screen flex flex-col">
      <Navbar />

      {/* Auth Container */}
      <div className="flex-1 flex items-center justify-center pt-20 pb-20 px-[5%]">
        <motion.div
          className="w-full max-w-[420px] border border-[rgba(255,255,255,0.06)] rounded-[20px] bg-[#16161F] p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-cyan-400" />
            <span className="font-display text-lg font-black">XATOM</span>
          </div>

          <h1 className="font-display text-3xl font-black mb-2">Sign in</h1>
          <p className="text-[#A09CB8] text-sm mb-8">Welcome back to XATOM.</p>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#A09CB8] mb-2 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-[10px] bg-[#0D0D12] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#5A5670] focus:outline-none focus:border-[#7B5EFF] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A09CB8] mb-2 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-[10px] bg-[#0D0D12] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#5A5670] focus:outline-none focus:border-[#7B5EFF] transition-all"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-8">
            <Link
              href="#"
              className="text-xs text-[#7B5EFF] hover:text-[#9B7FFF] transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button className="w-full py-3 bg-[#7B5EFF] text-white font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 mb-4">
            Sign in
          </button>

          {/* OAuth */}
          <button className="w-full py-3 border border-[rgba(255,255,255,0.06)] text-white font-semibold rounded-[10px] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 mb-8">
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[#A09CB8]">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-[#7B5EFF] hover:text-[#9B7FFF] font-semibold">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
