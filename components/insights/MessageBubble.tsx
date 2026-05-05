'use client'

import { motion } from 'framer-motion'
import { Edit2, Trash2, AlertCircle, RotateCcw, Copy } from 'lucide-react'

interface MessageBubbleProps {
  message: {
    id: string
    type: 'user' | 'ai' | 'system'
    content: string
    timestamp: number
    status?: 'sending' | 'sent' | 'error'
  }
  onEdit?: () => void
  onDelete?: () => void
  onRetry?: () => void
}

export default function MessageBubble({
  message,
  onEdit,
  onDelete,
  onRetry,
}: MessageBubbleProps) {
  const isUser = message.type === 'user'
  const isError = message.status === 'error'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  const renderContent = () => {
    const lines = message.content.split('\n')

    return lines.map((line, index) => {
      const trimmed = line.trim()

      if (!trimmed) {
        return <div key={index} className="h-2" />
      }

      if (/^#{1,3}\s+/.test(trimmed)) {
        const text = trimmed.replace(/^#{1,3}\s+/, '')
        return (
          <p key={index} className="mb-2 font-semibold text-white">
            {text}
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

      const codeMatch = trimmed.match(/^`(.+)`$/)
      if (codeMatch) {
        return (
          <code key={index} className="bg-bg/50 px-2 py-1 rounded text-xs font-mono">
            {codeMatch[1]}
          </code>
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={`group relative max-w-sm ${isUser ? '' : 'max-w-md'}`}
      >
        {/* Main Bubble */}
        <div
          className={`px-4 py-2 rounded-lg transition-colors ${
            isUser
              ? 'bg-gradient-purple text-white'
              : isError
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : 'bg-bg border border-border/30 text-text'
          }`}
        >
          <div className="text-sm leading-relaxed prose prose-invert max-w-none">
            {message.type === 'ai' ? (
              <div className="space-y-1">{renderContent()}</div>
            ) : (
              <p>{message.content}</p>
            )}
          </div>
        </div>

        {/* Action Buttons (shown on hover) */}
        <div className="absolute -top-8 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isError && onRetry && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRetry}
              className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Retry"
            >
              <RotateCcw size={14} />
            </motion.button>
          )}

          {isUser && onEdit && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onEdit}
              className="p-1 rounded-lg bg-purple/10 hover:bg-purple/20 text-purple transition-colors"
              title="Edit"
            >
              <Edit2 size={14} />
            </motion.button>
          )}

          {!isUser && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopy}
              className="p-1 rounded-lg bg-cyan/10 hover:bg-cyan/20 text-cyan transition-colors"
              title="Copy"
            >
              <Copy size={14} />
            </motion.button>
          )}

          {onDelete && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDelete}
              className="p-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </motion.button>
          )}
        </div>

        {/* Status Indicator */}
        {message.status === 'sending' && (
          <div className="text-xs text-text3 mt-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse"></div>
              Sending...
            </div>
          </div>
        )}

        {isError && (
          <div className="text-xs text-red-400 mt-1 flex items-center gap-1">
            <AlertCircle size={12} />
            Failed to process
          </div>
        )}
      </motion.div>
    </div>
  )
}
