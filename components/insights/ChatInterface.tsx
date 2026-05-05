'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader } from 'lucide-react'

interface ChatInterfaceProps {
  onSubmit: (question: string) => void
  loading: boolean
  currentDatabase: string | null
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: number
}

const SUGGESTED_QUERIES = [
  'Show me total sales this month',
  'Top 5 products by revenue',
  'User growth over time',
  'Revenue by region',
]

export default function ChatInterface({
  onSubmit,
  loading,
  currentDatabase,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! 👋 I'm your AI BI assistant. Ask me anything about ${currentDatabase} and I'll generate SQL and fetch results for you.`,
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (message: string = input) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: message,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Trigger query submission
    onSubmit(message)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'ai',
        content: '🔄 Processing your query... This will take a moment.',
        timestamp: Date.now(),
      }
      setMessages(prev => [...prev, aiMessage])
    }, 500)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple/30 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-gradient-purple text-white'
                    : 'bg-bg border border-border/30 text-text'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-bg border border-border/30 px-4 py-2 rounded-lg flex items-center gap-2">
              <Loader size={16} className="text-purple animate-spin" />
              <span className="text-sm text-text2">Generating SQL...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Queries */}
      {messages.length === 1 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-3 space-y-2"
        >
          <p className="text-xs text-text2 font-semibold">Try these:</p>
          <div className="grid grid-cols-1 gap-2">
            {SUGGESTED_QUERIES.map((query, index) => (
              <motion.button
                key={query}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSendMessage(query)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-bg border border-border/30 hover:border-purple/50 hover:bg-bg2 transition-all text-text2 hover:text-text truncate"
              >
                "{query}"
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="border-t border-border/30 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about your data..."
            className="flex-1 px-4 py-2 rounded-lg bg-bg border border-border/30 text-text text-sm placeholder-text3 focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple/20 transition-colors"
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || loading}
            className="p-2 rounded-lg bg-gradient-purple text-white hover:shadow-lg hover:shadow-purple/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
