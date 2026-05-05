'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

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

interface HireContextType {
  // Candidates
  candidates: Candidate[]
  addCandidates: (candidates: Candidate[]) => void
  updateCandidate: (id: string, updates: Partial<Candidate>) => void
  deleteCandidate: (id: string) => void
  clearCandidates: () => void

  // Active candidate
  activeCandidate: Candidate | null
  setActiveCandidate: (candidate: Candidate | null) => void

  // Job description
  jobDescription: string
  setJobDescription: (description: string) => void

  // Ranking state
  isRanking: boolean
  setIsRanking: (ranking: boolean) => void

  // Statistics
  getStats: () => {
    total: number
    ranked: number
    averageScore: number
  }
}

const HireContext = createContext<HireContextType | undefined>(undefined)

export function HireProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isRanking, setIsRanking] = useState(false)

  const addCandidates = (newCandidates: Candidate[]) => {
    setCandidates(prev => [...newCandidates, ...prev])
  }

  const updateCandidate = (id: string, updates: Partial<Candidate>) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id ? { ...candidate, ...updates } : candidate
      )
    )

    if (activeCandidate?.id === id) {
      setActiveCandidate({ ...activeCandidate, ...updates })
    }
  }

  const deleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id))
    if (activeCandidate?.id === id) {
      setActiveCandidate(null)
    }
  }

  const clearCandidates = () => {
    setCandidates([])
    setActiveCandidate(null)
  }

  const getStats = () => {
    const ranked = candidates.filter(c => c.status === 'ranked')
    const scores = ranked.map(c => c.score || 0)
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b) / scores.length) : 0

    return {
      total: candidates.length,
      ranked: ranked.length,
      averageScore,
    }
  }

  const value: HireContextType = {
    candidates,
    addCandidates,
    updateCandidate,
    deleteCandidate,
    clearCandidates,
    activeCandidate,
    setActiveCandidate,
    jobDescription,
    setJobDescription,
    isRanking,
    setIsRanking,
    getStats,
  }

  return <HireContext.Provider value={value}>{children}</HireContext.Provider>
}

export function useHire() {
  const context = useContext(HireContext)
  if (context === undefined) {
    throw new Error('useHire must be used within HireProvider')
  }
  return context
}
