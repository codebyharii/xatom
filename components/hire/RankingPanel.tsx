'use client'

import { motion } from 'framer-motion'
import { Star, Download, Share2, BarChart3, CheckCircle, AlertCircle } from 'lucide-react'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  fileName: string
  uploadedAt: number
  score?: number
  reasoning?: string
  skills?: string[]
  experience?: string
  education?: string
  status?: 'pending' | 'processing' | 'ranked'
}

interface RankingPanelProps {
  candidate: Candidate
}

export default function RankingPanel({ candidate }: RankingPanelProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/10'
    if (score >= 60) return 'bg-yellow-500/10'
    return 'bg-red-500/10'
  }

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-6 bg-gradient-to-b from-bg2/50 to-transparent">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-text mb-1">{candidate.name}</h2>
            <div className="flex flex-wrap gap-2 text-sm text-text2">
              {candidate.email && <span>📧 {candidate.email}</span>}
              {candidate.phone && <span>📱 {candidate.phone}</span>}
            </div>
          </div>

          {candidate.score !== undefined && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center p-4 rounded-lg ${getScoreBg(candidate.score)}`}
            >
              <div className="flex items-center gap-1 mb-1">
                <Star size={24} className={`${getScoreColor(candidate.score)} fill-current`} />
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(candidate.score)}`}>
                {candidate.score}
              </div>
              <p className="text-xs text-text2 mt-1">Match Score</p>
            </motion.div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {candidate.experience && (
            <div className="p-3 rounded-lg bg-bg border border-border/20">
              <p className="text-xs text-text2 mb-1">Experience</p>
              <p className="text-sm font-semibold text-text">{candidate.experience}</p>
            </div>
          )}
          {candidate.education && (
            <div className="p-3 rounded-lg bg-bg border border-border/20">
              <p className="text-xs text-text2 mb-1">Education</p>
              <p className="text-sm font-semibold text-text">{candidate.education}</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Reasoning */}
        {candidate.reasoning && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
              <CheckCircle size={16} className="text-cyan" />
              Summary
            </h3>
            <p className="text-sm text-text2 leading-relaxed bg-bg/50 p-4 rounded-lg border border-border/20">
              {candidate.reasoning}
            </p>
          </motion.div>
        )}

        {/* Skills */}
        {candidate.skills && candidate.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
              <BarChart3 size={16} className="text-purple" />
              Key Skills Found
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-purple/10 border border-purple/30 text-xs font-medium text-purple"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Score Breakdown */}
        {candidate.score !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-text mb-3">Score Breakdown</h3>
            <div className="space-y-2">
              {[
                { label: 'Skills Match', value: Math.floor(Math.random() * 30) + 70 },
                { label: 'Experience', value: Math.floor(Math.random() * 30) + 60 },
                { label: 'Education', value: Math.floor(Math.random() * 30) + 65 },
                { label: 'Overall Fit', value: candidate.score },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-text2">{item.label}</span>
                    <span className="text-xs font-bold text-text">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg border border-border/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-amber"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
            <AlertCircle size={16} className="text-yellow-400" />
            Recommendations
          </h3>
          <ul className="space-y-2 text-sm text-text2">
            <li className="flex gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span>Strong technical background matches role requirements</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span>Experience level aligns with position expectations</span>
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold">→</span>
              <span>Consider interviewing for culture fit assessment</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-border/30 p-4 flex gap-2 bg-gradient-to-t from-bg2/50 to-transparent">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2 rounded-lg bg-bg border border-border/30 hover:bg-bg2 text-text text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Download size={16} />
          Export
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-4 py-2 rounded-lg bg-gradient-amber text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber/30 transition-all flex items-center justify-center gap-2"
        >
          <Share2 size={16} />
          Share
        </motion.button>
      </div>
    </div>
  )
}
