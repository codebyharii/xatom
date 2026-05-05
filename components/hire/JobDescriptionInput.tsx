'use client'

import { motion } from 'framer-motion'
import { Loader, Sparkles } from 'lucide-react'

interface JobDescriptionInputProps {
  value: string
  onChange: (value: string) => void
  onRank: () => void
  isRanking: boolean
  candidateCount: number
}

const JOB_TEMPLATES = [
  {
    title: 'Senior Full-Stack Engineer',
    description: `Required Skills:
• 5+ years experience with React/Node.js
• Strong backend architecture knowledge
• Database design (PostgreSQL/MongoDB)
• System design and scalability

Nice to Have:
• AWS/Cloud deployment experience
• Leadership/mentoring experience
• Open source contributions`,
  },
  {
    title: 'Product Manager',
    description: `Required Skills:
• 3+ years product management experience
• Data-driven decision making
• Cross-functional collaboration
• User research and validation

Nice to Have:
• B2B SaaS experience
• Analytics/SQL knowledge
• Design collaboration`,
  },
  {
    title: 'Data Scientist',
    description: `Required Skills:
• Python/R programming
• Machine learning algorithms
• Statistics and A/B testing
• Data visualization

Nice to Have:
• Deep learning experience
• SQL and data warehousing
• MLOps/deployment experience`,
  },
]

export default function JobDescriptionInput({
  value,
  onChange,
  onRank,
  isRanking,
  candidateCount,
}: JobDescriptionInputProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border/30">
        <p className="text-sm font-semibold text-text2 flex items-center gap-2">
          <Sparkles size={14} />
          Job Description
        </p>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Templates Quick Select */}
        {!value && (
          <div className="px-3 py-3 border-b border-border/30 space-y-2">
            <p className="text-xs text-text3 font-semibold">Quick templates:</p>
            <div className="space-y-1">
              {JOB_TEMPLATES.map(template => (
                <button
                  key={template.title}
                  onClick={() => onChange(template.description)}
                  className="w-full text-left text-xs px-2 py-1 rounded bg-bg/50 hover:bg-bg border border-border/20 transition-colors text-text2 hover:text-text truncate"
                >
                  📋 {template.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Text Input */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste job description, requirements, or skills needed..."
          className="flex-1 px-4 py-3 bg-bg border-none text-text text-sm placeholder-text3 focus:outline-none resize-none"
        />
      </div>

      {/* Rank Button */}
      <div className="border-t border-border/30 p-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRank}
          disabled={!value.trim() || candidateCount === 0 || isRanking}
          className="w-full px-4 py-2 rounded-lg bg-gradient-amber text-white font-semibold hover:shadow-lg hover:shadow-amber/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isRanking ? (
            <>
              <Loader size={18} className="animate-spin" />
              Ranking...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Rank Candidates
            </>
          )}
        </motion.button>
        <p className="text-xs text-text3 text-center">
          {candidateCount === 0
            ? 'Upload resumes first'
            : `${candidateCount} candidate${candidateCount !== 1 ? 's' : ''} ready`}
        </p>
      </div>
    </div>
  )
}
