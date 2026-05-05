'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect to get started',
    features: [
      '100 queries/month',
      '10 resume uploads',
      '3 chat rooms',
      '5 agent runs',
      '100MB storage',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$499',
    description: 'For growing teams',
    features: [
      'Unlimited queries',
      'Unlimited resumes',
      'Unlimited rooms',
      '100 agent runs',
      '5GB storage',
      'Priority support',
      'Custom agents',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '$1,999',
    description: 'Enterprise scale',
    features: [
      'Everything in Pro',
      'API access',
      'Team management',
      'Custom agent marketplace',
      'SLA + dedicated support',
      'Unlimited storage',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  const getPrice = (price: string) => {
    if (price === '$0') return '$0'
    const num = parseInt(price.replace('$', ''))
    return isYearly ? `$${Math.floor(num * 12 * 0.8)}` : price
  }

  return (
    <section className="py-20 px-[5%]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#7B5EFF] tracking-widest uppercase mb-4">
            Pricing
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-8">
            Simple, transparent pricing
          </h2>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-[#A09CB8]'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 rounded-full bg-[#7B5EFF] transition-all"
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white"
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-[#A09CB8]'}`}>
              Yearly <span className="text-[#00E5A0] text-xs ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(255,255,255,0.06)] rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.06)]">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`p-12 relative ${plan.highlighted ? 'border-2 border-[#7B5EFF] md:scale-105' : 'border border-transparent'}`}
              style={{
                backgroundColor: plan.highlighted ? '#16161F' : '#0D0D12',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Featured Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#7B5EFF] text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-8">
                <h3 className="font-display text-2xl font-black mb-2">{plan.name}</h3>
                <p className="text-[#A09CB8] text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-4xl font-black">
                    {getPrice(plan.price)}
                  </span>
                  {plan.price !== '$0' && <span className="text-[#5A5670]">/month</span>}
                </div>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-[10px] font-semibold text-sm mb-8 transition-all duration-200 ${
                  plan.highlighted
                    ? 'bg-[#7B5EFF] text-white hover:bg-[#9B7FFF]'
                    : 'border border-[rgba(255,255,255,0.10)] text-white hover:border-[#7B5EFF] hover:text-[#7B5EFF]'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className="text-[#7B5EFF] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#A09CB8]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Floating animation for featured */}
              {plan.highlighted && (
                <motion.div
                  className="absolute inset-0 opacity-0"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-sm text-[#5A5670]">
            No credit card required · Free forever plan · Deploy in minutes
          </p>
        </div>
      </div>
    </section>
  )
}
