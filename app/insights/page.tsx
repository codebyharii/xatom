'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import DatabaseConnection from '@/components/insights/DatabaseConnection'
import ChatInterface from '@/components/insights/ChatInterface'
import ResultsPanel from '@/components/insights/ResultsPanel'
import QueryHistory from '@/components/insights/QueryHistory'

interface Query {
  id: string
  question: string
  sql: string
  results: any[]
  timestamp: number
  chartType?: 'bar' | 'line' | 'pie'
}

export default function InsightsPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null)
  const [queries, setQueries] = useState<Query[]>([])
  const [activeQuery, setActiveQuery] = useState<Query | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDatabaseConnect = (dbName: string, connectionString: string) => {
    setIsConnected(true)
    setCurrentDatabase(dbName)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setCurrentDatabase(null)
    setQueries([])
    setActiveQuery(null)
  }

  const handleQuerySubmit = async (question: string) => {
    if (!isConnected) return

    setLoading(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))

    const newQuery: Query = {
      id: Math.random().toString(36).substr(2, 9),
      question,
      sql: `SELECT * FROM users WHERE created_at > NOW() - INTERVAL '30 days'`,
      results: [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2026-04-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2026-04-18' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', created_at: '2026-04-20' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', created_at: '2026-04-22' },
        { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', created_at: '2026-04-25' },
      ],
      timestamp: Date.now(),
      chartType: 'bar',
    }

    setQueries([newQuery, ...queries])
    setActiveQuery(newQuery)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg2 to-bg">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple/0.1 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/0.1 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {!isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center px-4"
          >
            <DatabaseConnection onConnect={handleDatabaseConnect} />
          </motion.div>
        ) : (
          <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-border/30 bg-bg/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
              <div className="flex items-center justify-between max-w-[1400px] mx-auto">
                <div>
                  <h1 className="text-xl font-bold gradient-purple">XATOM Insights</h1>
                  <p className="text-text2 text-sm">
                    Connected to <span className="text-purple font-semibold">{currentDatabase}</span>
                  </p>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden flex gap-6 p-6">
              {/* Chat & History Panel (Left) */}
              <div className="w-96 flex flex-col gap-4 overflow-hidden">
                {/* Chat Interface */}
                <div className="flex-1 min-h-0 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden flex flex-col">
                  <ChatInterface
                    onSubmit={handleQuerySubmit}
                    loading={loading}
                    currentDatabase={currentDatabase}
                  />
                </div>

                {/* Query History */}
                <div className="h-48 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                  <QueryHistory
                    queries={queries}
                    activeQuery={activeQuery}
                    onSelectQuery={setActiveQuery}
                  />
                </div>
              </div>

              {/* Results Panel (Right) */}
              <div className="flex-1 rounded-2xl border border-border/30 bg-bg2/50 backdrop-blur-md overflow-hidden">
                {activeQuery ? (
                  <ResultsPanel query={activeQuery} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-5xl mb-3 opacity-30"
                      >
                        💡
                      </motion.div>
                      <p className="text-text2">Ask a question to get started</p>
                      <p className="text-text3 text-sm mt-1">E.g., "Show me sales by region"</p>
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
