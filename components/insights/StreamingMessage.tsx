'use client'

import { motion } from 'framer-motion'

interface StreamingMessageProps {
  content: string
}

export default function StreamingMessage({ content }: StreamingMessageProps) {
  const renderContent = () => {
    const lines = content.split('\n')

    return lines.map((line, index) => {
      const trimmed = line.trim()

      if (!trimmed) {
        return <div key={index} className="h-2" />
      }

      if (/^#{1,3}\s+/.test(trimmed)) {
        return (
          <p key={index} className="mb-2 font-semibold text-white">
            {trimmed.replace(/^#{1,3}\s+/, '')}
          </p>
        )
      }

      if (/^[-*]\s+/.test(trimmed)) {
        return (
          <li key={index} className="ml-5 list-disc mb-1">
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        )
      }

      return (
        <p key={index} className="mb-2">
          {trimmed}
        </p>
      )
    })
  }

  return (
    <div className="flex justify-start">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-md"
      >
        <div className="px-4 py-2 rounded-lg bg-bg border border-border/30 text-text">
          <div className="text-sm leading-relaxed prose prose-invert max-w-none space-y-1">
            {renderContent()}
          </div>

          {/* Typing Indicator */}
          <div className="flex items-center gap-1 mt-2">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-purple"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-purple"
            />
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-purple"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
