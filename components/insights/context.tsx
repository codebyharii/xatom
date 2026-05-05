'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Query {
  id: string
  question: string
  sql: string
  results: any[]
  timestamp: number
  chartType?: 'bar' | 'line' | 'pie'
}

interface InsightsContextType {
  // Connection state
  isConnected: boolean
  currentDatabase: string | null
  setConnected: (connected: boolean, dbName?: string | null) => void

  // Queries
  queries: Query[]
  addQuery: (query: Query) => void
  clearQueries: () => void

  // Active query
  activeQuery: Query | null
  setActiveQuery: (query: Query | null) => void

  // Loading state
  loading: boolean
  setLoading: (loading: boolean) => void
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined)

export function InsightsProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null)
  const [queries, setQueries] = useState<Query[]>([])
  const [activeQuery, setActiveQuery] = useState<Query | null>(null)
  const [loading, setLoading] = useState(false)

  const setConnected = (connected: boolean, dbName: string | null = null) => {
    setIsConnected(connected)
    setCurrentDatabase(dbName)
    if (!connected) {
      setQueries([])
      setActiveQuery(null)
    }
  }

  const addQuery = (query: Query) => {
    setQueries(prev => [query, ...prev])
  }

  const clearQueries = () => {
    setQueries([])
    setActiveQuery(null)
  }

  const value: InsightsContextType = {
    isConnected,
    currentDatabase,
    setConnected,
    queries,
    addQuery,
    clearQueries,
    activeQuery,
    setActiveQuery,
    loading,
    setLoading,
  }

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  )
}

export function useInsights() {
  const context = useContext(InsightsContext)
  if (context === undefined) {
    throw new Error('useInsights must be used within InsightsProvider')
  }
  return context
}
