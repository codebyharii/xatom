'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignUpPage() {
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    let strength = 0
    if (password.length > 6) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[@$!%*?&]/)) strength++
    setPasswordStrength(strength)
  }

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-green-500']

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

          <h1 className="font-display text-3xl font-black mb-2">Create account</h1>
          <p className="text-[#A09CB8] text-sm mb-8">Join thousands building with XATOM.</p>

          {/* Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#A09CB8] mb-2 uppercase tracking-widest">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-[10px] bg-[#0D0D12] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#5A5670] focus:outline-none focus:border-[#7B5EFF] transition-all"
              />
            </div>

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
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 rounded-[10px] bg-[#0D0D12] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#5A5670] focus:outline-none focus:border-[#7B5EFF] transition-all"
              />

              {/* Password Strength */}
              {passwordStrength > 0 && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : 'bg-[#1C1C28]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#A09CB8]">
                    Password strength:{' '}
                    <span className={strengthColors[passwordStrength - 1].replace('bg-', '')}>
                      {strengthLabels[passwordStrength - 1]}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 mb-6">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 accent-[#7B5EFF]"
            />
            <label htmlFor="terms" className="text-xs text-[#A09CB8]">
              I agree to the{' '}
              <Link href="#" className="text-[#7B5EFF] hover:text-[#9B7FFF]">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-[#7B5EFF] hover:text-[#9B7FFF]">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit */}
          <button className="w-full py-3 bg-[#7B5EFF] text-white font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 mb-4">
            Create account
          </button>

          {/* OAuth */}
          <button className="w-full py-3 border border-[rgba(255,255,255,0.06)] text-white font-semibold rounded-[10px] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-200 mb-8">
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#A09CB8]">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-[#7B5EFF] hover:text-[#9B7FFF] font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
