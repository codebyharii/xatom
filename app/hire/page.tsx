'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ResumeUploader from '@/components/hire/ResumeUploader'
import CandidatesList from '@/components/hire/CandidatesList'
import RankingPanel from '@/components/hire/RankingPanel'
import JobDescriptionInput from '@/components/hire/JobDescriptionInput'
import { extractCandidateName, extractResumeData, inferResumeTextFromFileName, parseResumeFile, scoreCandidate } from '@/lib/resume-parser'

interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  fileName: string
  uploadedAt: number
  profileText?: string
  score?: number
  reasoning?: string
  skills?: string[]
  experience?: string
  education?: string
  status?: 'pending' | 'processing' | 'ranked'
}

export default function HirePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [ranking, setRanking] = useState(false)

  const handleResumeUpload = async (file: File) => {
    const profileText = await parseResumeFile(file)
    const parsedResume = extractResumeData(profileText)
    const candidateName = parsedResume.name !== 'Unknown' ? parsedResume.name : extractCandidateName(profileText)

    const newCandidate: Candidate = {
      id: Math.random().toString(36).substr(2, 9),
      name: candidateName || file.name.replace(/\.[^/.]+$/, ''),
      email: parsedResume.email,
      phone: parsedResume.phone,
      fileName: file.name,
      uploadedAt: Date.now(),
      profileText,
      skills: parsedResume.skills,
      experience: parsedResume.experience,
      education: parsedResume.education,
      status: 'pending',
    }

    setCandidates(prev => [newCandidate, ...prev])
  }

  const handleBulkUpload = async (files: File[]) => {
    const parsedCandidates = await Promise.all(
      files.map(async (file) => {
        const profileText = await parseResumeFile(file)
        const parsedResume = extractResumeData(profileText)
        const candidateName = parsedResume.name !== 'Unknown' ? parsedResume.name : extractCandidateName(profileText)

        return {
          id: Math.random().toString(36).substr(2, 9),
          name: candidateName || file.name.replace(/\.[^/.]+$/, ''),
          email: parsedResume.email,
          phone: parsedResume.phone,
          fileName: file.name,
          uploadedAt: Date.now(),
          profileText,
          skills: parsedResume.skills,
          experience: parsedResume.experience,
          education: parsedResume.education,
          status: 'pending' as const,
        }
      })
    )

    setCandidates(prev => [...parsedCandidates, ...prev])
  }

  const handleRankCandidates = async () => {
    if (!jobDescription.trim() || candidates.length === 0) return

    setRanking(true)

    // Simulate processing while the scoring engine evaluates each candidate.
    await new Promise(resolve => setTimeout(resolve, 900))

    // Update all candidates with scored profiles
    setCandidates(prev =>
      prev.map(candidate => {
        const resumeText = candidate.profileText || inferResumeTextFromFileName(candidate.fileName, candidate.name)
        const parsedResume = extractResumeData(resumeText)
        const scoring = scoreCandidate(parsedResume, jobDescription)

        return {
          ...candidate,
          name: parsedResume.name !== 'Unknown' ? parsedResume.name : candidate.name,
          email: parsedResume.email,
          phone: parsedResume.phone,
          score: scoring.score,
          reasoning: scoring.reasoning,
          status: 'ranked',
          skills: parsedResume.skills,
          experience: parsedResume.experience,
          education: parsedResume.education,
        }
      })
    )

    setRanking(false)
  }

  const handleDeleteCandidate = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id))
    if (activeCandidate?.id === id) {
      setActiveCandidate(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg2 to-bg">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber/0.1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/0.1 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {candidates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <div className="max-w-2xl w-full">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4 text-6xl"
                >
                  🎯
                </motion.div>
                <h1 className="text-4xl font-bold gradient-amber mb-3">XATOM Hire</h1>
                <p className="text-text2 text-lg mb-8">
                  Upload hundreds of resumes. AI scores and ranks every candidate with detailed reasoning.
                </p>
              </div>

              {/* Upload Area */}
              <ResumeUploader
                onSingleUpload={handleResumeUpload}
                onBulkUpload={handleBulkUpload}
              />

              {/* Benefits */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: '⚡', title: 'Fast Screening', desc: 'Rank 1000s of resumes in minutes' },
                  { icon: '🧠', title: 'AI Powered', desc: 'Advanced NLP scoring & analysis' },
                  { icon: '📊', title: 'Detailed Reports', desc: 'Skills match, experience fit, recommendations' },
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-lg border border-border/30 bg-bg2/50 backdrop-blur-md text-center"
                  >
                    <div className="text-3xl mb-2">{benefit.icon}</div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-sm text-text2">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-border/30 bg-bg/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
              <div className="flex items-center justify-between max-w-[1400px] mx-auto">
                <div>
                  <h1 className="text-xl font-bold gradient-amber">XATOM Hire</h1>
                  <p className="text-text2 text-sm">
                    <span className="text-amber font-semibold">{candidates.length}</span> candidate
                    {candidates.length !== 1 ? 's' : ''} uploaded
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCandidates([])
                    setActiveCandidate(null)
                    setJobDescription('')
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex gap-6 p-6">
              {/* Left Panel - Job Description & Upload */}
              <div className="w-96 flex flex-col gap-4 overflow-hidden">
                {/* Job Description */}
                <div className="flex-1 min-h-0 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                  <JobDescriptionInput
                    value={jobDescription}
                    onChange={setJobDescription}
                    onRank={handleRankCandidates}
                    isRanking={ranking}
                    candidateCount={candidates.length}
                  />
                </div>

                {/* Upload More */}
                <div className="rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                  <ResumeUploader
                    onSingleUpload={handleResumeUpload}
                    onBulkUpload={handleBulkUpload}
                    compact
                  />
                </div>
              </div>

              {/* Middle Panel - Candidates List */}
              <div className="w-80 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                <CandidatesList
                  candidates={candidates}
                  activeCandidate={activeCandidate}
                    onSelectCandidate={(candidate) => setActiveCandidate(candidate)}
                  onDeleteCandidate={handleDeleteCandidate}
                />
              </div>

              {/* Right Panel - Ranking Results */}
              <div className="flex-1 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                {activeCandidate ? (
                  <RankingPanel candidate={activeCandidate} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-5xl mb-3 opacity-30"
                      >
                        👤
                      </motion.div>
                      <p className="text-text2">Select a candidate to view details</p>
                      <p className="text-text3 text-sm mt-1">
                        First, add job description and rank
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
