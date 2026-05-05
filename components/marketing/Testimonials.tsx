'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: 'XATOM transformed how we screen candidates. Cut our hiring time by 70%.',
    author: 'Sarah Johnson',
    role: 'HR Manager at TechCorp',
    avatar: 'SJ',
  },
  {
    quote: 'The AI insights from our database saved us thousands in analysis time.',
    author: 'Alex Chen',
    role: 'Data Lead at StartupXYZ',
    avatar: 'AC',
  },
  {
    quote: 'Building agents with XATOM was so intuitive. No steep learning curve.',
    author: 'Jordan Smith',
    role: 'Dev at CloudSoft',
    avatar: 'JS',
  },
  {
    quote: 'Real-time team collaboration with AI memory is a game changer.',
    author: 'Emma Davis',
    role: 'Product Manager at Nexus',
    avatar: 'ED',
  },
  {
    quote: 'Deployed to production in minutes. The free tier is incredibly generous.',
    author: 'Michael Brown',
    role: 'CTO at InnovateLabs',
    avatar: 'MB',
  },
  {
    quote: 'Finally, AI tools that actually work together seamlessly.',
    author: 'Lisa Wong',
    role: 'CEO at FutureScale',
    avatar: 'LW',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-[5%] overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#7B5EFF] tracking-widest uppercase mb-4">
            Social Proof
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-6">
            What builders say about <span className="gradient-cyan">XATOM</span>
          </h2>
        </div>

        {/* Marquee Container - Row 1 (Left) */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -50%] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-96 border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 hover:bg-[#1C1C28] transition-all duration-300"
              >
                <p className="text-lg text-[#F0EFFE] mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B5EFF] to-[#00D4FF] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                    <p className="text-xs text-[#5A5670]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee Container - Row 2 (Right) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [-50%, 0] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-96 border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 hover:bg-[#1C1C28] transition-all duration-300"
              >
                <p className="text-lg text-[#F0EFFE] mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#00E5A0] flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.author}</p>
                    <p className="text-xs text-[#5A5670]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
