'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setEmail('')
    setIsLoading(false)

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-[500px] mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5670] w-5 h-5" />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-[10px] bg-[#16161F] border border-[rgba(255,255,255,0.06)] text-white placeholder-[#5A5670] focus:outline-none focus:border-[#7B5EFF] transition-all"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-[#7B5EFF] text-white font-semibold rounded-[10px] hover:bg-[#9B7FFF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={!isLoading ? { scale: 1.05 } : {}}
          whileTap={!isLoading ? { scale: 0.95 } : {}}
        >
          {isSubmitted ? (
            <>
              <Check size={16} />
              Subscribed!
            </>
          ) : isLoading ? (
            'Subscribing...'
          ) : (
            'Subscribe'
          )}
        </motion.button>
      </div>
      <p className="text-xs text-[#5A5670] mt-3 text-center">
        No spam, unsubscribe anytime. We respect your privacy.
      </p>
    </motion.form>
  )
}
