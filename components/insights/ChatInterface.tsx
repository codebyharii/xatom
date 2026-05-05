'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader, Trash2, Edit2, CheckCircle, RotateCcw } from 'lucide-react'
import MessageBubble from './MessageBubble'
import StreamingMessage from './StreamingMessage'

interface ChatInterfaceProps {
  onSubmit: (question: string) => void
  loading: boolean
  currentDatabase: string | null
  schema?: any
}

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: number
  status?: 'sending' | 'sent' | 'error'
  isStreaming?: boolean
  retryCount?: number
}

const SUGGESTED_QUERIES = [
  {
    emoji: '📊',
    query: 'Show me total revenue this month',
    category: 'Analytics',
  },
  {
    emoji: '👥',
    query: 'Top 10 customers by spending',
    category: 'Customers',
  },
  {
    emoji: '📈',
    query: 'Growth rate week over week',
    category: 'Trends',
  },
  {
    emoji: '🔍',
    query: 'Products with low inventory',
    category: 'Inventory',
  },
]

export default function ChatInterface({
  onSubmit,
  loading,
  currentDatabase,
  schema,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! 👋 I'm your AI BI assistant. Ask me anything about **${currentDatabase}** and I'll generate SQL and fetch results for you.`,
      timestamp: Date.now(),
      status: 'sent',
    },
  ])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat-${currentDatabase}`)
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (error) {
        console.error('Failed to load messages:', error)
      }
    }
  }, [currentDatabase])

  // Save messages to localStorage
  useEffect(() => {
    if (currentDatabase) {
      localStorage.setItem(`chat-${currentDatabase}`, JSON.stringify(messages))
    }
  }, [messages, currentDatabase])

  const handleSendMessage = (message: string = input) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: message,
      timestamp: Date.now(),
      status: 'sending',
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate sending
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg => (msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg))
      )
    }, 300)

    // Trigger query submission
    onSubmit(message)

    // Add streaming AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'ai',
        content: '',
        timestamp: Date.now(),
        isStreaming: true,
        status: 'sending',
      }
      setMessages(prev => [...prev, aiMessage])

      // Simulate streaming response
      const fullResponse = `🔄 Processing: "${message}"

**Generated SQL Query:**
\`\`\`sql
SELECT * FROM users 
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 100
\`\`\`

**Results:** 5 records found in 1.2s`

      let currentText = ''
      const words = fullResponse.split(' ')
      let wordIndex = 0

      const streamInterval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += words[wordIndex] + ' '
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessage.id ? { ...msg, content: currentText } : msg
            )
          )
          wordIndex++
        } else {
          clearInterval(streamInterval)
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiMessage.id
                ? { ...msg, isStreaming: false, status: 'sent' }
                : msg
            )
          )
        }
      }, 30)
    }, 500)
  }

  const handleEditMessage = (id: string, content: string) => {
    setEditingId(id)
    setEditContent(content)
  }

  const handleSaveEdit = (id: string) => {
    setMessages(prev =>
      prev.map(msg => (msg.id === id ? { ...msg, content: editContent } : msg))
    )
    setEditingId(null)
    setEditContent('')
  }

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id))
  }

  const handleRetry = (id: string) => {
    const message = messages.find(m => m.id === id)
    if (message && message.type === 'user') {
      handleDeleteMessage(id)
      handleSendMessage(message.content)
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: `Hi! 👋 I'm your AI BI assistant. Chat cleared. Ready for new questions about **${currentDatabase}**.`,
        timestamp: Date.now(),
        status: 'sent',
      },
    ])
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
              className="group"
            >
              {editingId === msg.id ? (
                <div className="flex gap-2 items-end">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-bg border border-border/30 text-text text-sm placeholder-text3 focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple/20 resize-none"
                    rows={2}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSaveEdit(msg.id)}
                    className="p-2 rounded-lg bg-gradient-purple text-white hover:shadow-lg"
                  >
                    <CheckCircle size={18} />
                  </motion.button>
                </div>
              ) : msg.isStreaming ? (
                <StreamingMessage content={msg.content} />
              ) : (
                <MessageBubble
                  message={msg}
                  onEdit={() => handleEditMessage(msg.id, msg.content)}
                  onDelete={() => handleDeleteMessage(msg.id)}
                  onRetry={() => handleRetry(msg.id)}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && !messages.some(m => m.isStreaming) && (
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
          className="px-4 pb-3 space-y-2 border-b border-border/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs text-text2 font-semibold">💡 Try these:</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearChat}
              className="text-xs px-2 py-1 rounded bg-bg/50 hover:bg-bg border border-border/30 text-text2 transition-colors"
            >
              Clear
            </motion.button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {SUGGESTED_QUERIES.map((item, index) => (
              <motion.button
                key={item.query}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSendMessage(item.query)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-bg border border-border/30 hover:border-purple/50 hover:bg-bg2 transition-all text-text2 hover:text-text truncate group/item"
              >
                <span className="text-sm mr-2">{item.emoji}</span>
                <span className="font-semibold">{item.category}:</span> {item.query}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="border-t border-border/30 p-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
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
        <p className="text-xs text-text3 text-center">Shift + Enter for new line</p>
      </div>
    </div>
  )
}
