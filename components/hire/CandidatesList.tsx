'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Star, Trash2, Download } from 'lucide-react'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  fileName: string
  uploadedAt: number
  score?: number
  status?: 'pending' | 'processing' | 'ranked'
}

interface CandidatesListProps {
  candidates: Candidate[]
  activeCandidate: Candidate | null
  onSelectCandidate: (candidate: Candidate) => void
  onDeleteCandidate: (id: string) => void
}

export default function CandidatesList({
  candidates,
  activeCandidate,
  onSelectCandidate,
  onDeleteCandidate,
}: CandidatesListProps) {
  const sortedCandidates = [...candidates].sort((a, b) => {
    // Ranked candidates first (sorted by score descending)
    if (a.score !== undefined && b.score !== undefined) {
      return b.score - a.score
    }
    // Then pending by upload date
    return b.uploadedAt - a.uploadedAt
  })

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border/30">
        <p className="text-sm font-semibold text-text2">Candidates ({candidates.length})</p>
      </div>

      {candidates.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-xs text-text3 text-center">No candidates yet</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 p-3 scrollbar-thin scrollbar-thumb-amber/30 scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {sortedCandidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => onSelectCandidate(candidate)}
                className={`p-3 rounded-lg transition-all cursor-pointer group ${
                  activeCandidate?.id === candidate.id
                    ? 'bg-amber/20 border border-amber/40'
                    : 'bg-bg/30 border border-border/20 hover:bg-bg2/30 hover:border-border/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-text truncate">{candidate.name}</p>
                    <p className="text-xs text-text3 truncate">{candidate.fileName}</p>
                  </div>
                  {candidate.score !== undefined && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star size={12} className="text-amber fill-amber" />
                      <span className="text-xs font-bold text-amber">{candidate.score}</span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {candidate.status === 'pending' && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                      Pending
                    </span>
                  )}
                  {candidate.status === 'processing' && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400 animate-pulse">
                      Processing
                    </span>
                  )}
                  {candidate.status === 'ranked' && (
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400">
                      Ranked
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Download functionality
                    }}
                    className="p-1 rounded bg-cyan/10 hover:bg-cyan/20 text-cyan text-xs"
                    title="Download"
                  >
                    <Download size={12} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteCandidate(candidate.id)
                    }}
                    className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
