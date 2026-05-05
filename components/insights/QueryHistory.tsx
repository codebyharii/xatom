'use client'

import { motion } from 'framer-motion'
import { Clock, Trash2 } from 'lucide-react'

interface Query {
  id: string
  question: string
  sql: string
  results: any[]
  timestamp: number
  chartType?: 'bar' | 'line' | 'pie'
}

interface QueryHistoryProps {
  queries: Query[]
  activeQuery: Query | null
  onSelectQuery: (query: Query) => void
}

export default function QueryHistory({
  queries,
  activeQuery,
  onSelectQuery,
}: QueryHistoryProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border/30">
        <p className="text-sm font-semibold text-text2 flex items-center gap-2">
          <Clock size={14} />
          Recent Queries
        </p>
      </div>

      {queries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center px-4">
          <p className="text-xs text-text3 text-center">No queries yet</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 p-3 scrollbar-thin scrollbar-thumb-purple/30 scrollbar-track-transparent">
          {queries.map((query, index) => (
            <motion.button
              key={query.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectQuery(query)}
              className={`w-full text-left p-2 rounded-lg transition-all group ${
                activeQuery?.id === query.id
                  ? 'bg-purple/20 border border-purple/40'
                  : 'bg-bg/30 border border-border/20 hover:bg-bg2/30 hover:border-border/30'
              }`}
            >
              <p className="text-xs font-semibold text-text truncate mb-1">
                {query.question}
              </p>
              <p className="text-xs text-text3">{formatTime(query.timestamp)}</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
