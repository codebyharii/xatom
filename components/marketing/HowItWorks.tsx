'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Connect your data',
    desc: 'Link DB or upload files',
  },
  {
    num: '02',
    title: 'Ask in plain English',
    desc: 'AI converts to SQL/tasks',
  },
  {
    num: '03',
    title: 'Get instant results',
    desc: 'Charts, rankings, replies',
  },
  {
    num: '04',
    title: 'Automate & scale',
    desc: 'Agents run 24/7 on schedule',
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  const demoContent = {
    0: 'Connect your database or upload CSV files securely to XATOM.',
    1: 'Type any question about your data in natural language.',
    2: 'Get instant AI-powered results with beautiful visualizations.',
    3: 'Schedule agents to run automatically on your data.',
  }

  return (
    <section id="how-it-works" className="py-20 px-[5%]">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-[#7B5EFF] tracking-widest uppercase mb-4">
            How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            Intelligent by design
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: Steps */}
          <div>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="border-t border-[rgba(255,255,255,0.06)] py-7 cursor-pointer"
                onClick={() => setActiveStep(i)}
                whileHover={{ paddingLeft: 8 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className={`transition-all duration-300 ${activeStep === i ? 'border-l-2 border-[#7B5EFF] pl-4' : ''}`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${activeStep === i ? 'text-[#7B5EFF]' : 'text-[#5A5670]'}`}>
                    Step {step.num}
                  </p>
                  <p className={`text-lg font-semibold mb-1 transition-colors duration-300 ${activeStep === i ? 'text-[#9B7FFF]' : 'text-[#F0EFFE]'}`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-[#A09CB8]">{step.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right: Demo Panel */}
          <motion.div
            className="border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 min-h-[400px] flex flex-col justify-between"
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <p className="text-[#A09CB8] mb-6">{demoContent[activeStep as keyof typeof demoContent]}</p>

              {/* Demo Content */}
              <div className="space-y-4">
                {activeStep === 0 && (
                  <div className="space-y-2">
                    <div className="w-full h-8 bg-[#0D0D12] rounded text-xs text-[#5A5670] flex items-center px-3">
                      postgresql://user:pass@db.com
                    </div>
                    <button className="w-full py-2 border border-[#7B5EFF] text-[#7B5EFF] rounded text-sm hover:bg-[#7B5EFF] hover:text-white transition-all">
                      Test Connection
                    </button>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="bg-[#0D0D12] rounded p-4 space-y-2">
                    <div className="text-[#00D4FF] text-sm font-mono">
                      What are my top customers by revenue?
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="flex items-end gap-2 h-24 justify-center">
                    {[60, 75, 90, 70, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#7B5EFF] to-[#9B7FFF] rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-2 font-mono text-xs text-[#00E5A0]">
                    <div>[14:32:01] Agent initialized</div>
                    <div>[14:32:05] Connecting to database...</div>
                    <div>[14:32:10] Query executed successfully</div>
                    <div className="text-[#7B5EFF]">[14:32:12] ✓ Complete</div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] text-xs text-[#5A5670]">
              Step {activeStep + 1} of {steps.length}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
