'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface StreamingMessageProps {
  content: string
}

export default function StreamingMessage({ content }: StreamingMessageProps) {
  return (
    <div className="flex justify-start">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="max-w-md"
      >
        <div className="px-4 py-2 rounded-lg bg-bg border border-border/30 text-text">
          <div className="text-sm leading-relaxed prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2">{children}</p>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-bg/50 px-2 py-1 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-bg/50 p-3 rounded-lg overflow-x-auto mb-2 text-xs">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                ),
                li: ({ children }) => <li>{children}</li>,
              }}
            >
              {content}
            </ReactMarkdown>
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
