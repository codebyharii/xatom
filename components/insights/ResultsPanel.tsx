'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Download, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

const BarChart = dynamic(() => import('./charts/BarChart'), { ssr: false })
const LineChart = dynamic(() => import('./charts/LineChart'), { ssr: false })
const PieChart = dynamic(() => import('./charts/PieChart'), { ssr: false })

interface Query {
  id: string
  question: string
  sql: string
  results: any[]
  timestamp: number
  chartType?: 'bar' | 'line' | 'pie'
}

interface ResultsPanelProps {
  query: Query
}

export default function ResultsPanel({ query }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'table' | 'chart' | 'sql'>('table')
  const [copied, setCopied] = useState(false)
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>(query.chartType || 'bar')

  const handleCopySQL = () => {
    navigator.clipboard.writeText(query.sql)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadCSV = () => {
    if (query.results.length === 0) return

    const headers = Object.keys(query.results[0])
    const csv = [
      headers.join(','),
      ...query.results.map(row =>
        headers.map(header => {
          const value = row[header]
          return typeof value === 'string' && value.includes(',')
            ? `"${value}"`
            : value
        }).join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `query-${query.id}-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border/30 px-6 py-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-text2 mb-1">Your Question</p>
            <h3 className="text-lg font-semibold text-text">{query.question}</h3>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCSV}
              className="p-2 rounded-lg bg-bg hover:bg-bg2 border border-border/30 transition-colors"
              title="Download as CSV"
            >
              <Download size={18} className="text-text2" />
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['table', 'chart', 'sql'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-gradient-purple text-white'
                  : 'bg-bg hover:bg-bg2 text-text2 border border-border/30'
              }`}
            >
              {tab === 'table'
                ? `Results (${query.results.length})`
                : tab === 'chart'
                  ? 'Chart'
                  : 'SQL'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'table' && (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-auto p-6"
            >
              {query.results.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center">
                  <p className="text-text2">No results found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-bg2 border-b border-border/30">
                      <tr>
                        {Object.keys(query.results[0]).map(header => (
                          <th
                            key={header}
                            className="px-4 py-2 text-left font-semibold text-text2 whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {query.results.map((row, idx) => (
                        <motion.tr
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02 }}
                          className="border-b border-border/20 hover:bg-bg2/50 transition-colors"
                        >
                          {Object.values(row).map((value, colIdx) => (
                            <td key={colIdx} className="px-4 py-2 text-text">
                              {String(value)}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'chart' && (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col p-6"
            >
              {/* Chart Type Selector */}
              <div className="flex gap-2 mb-4">
                {(['bar', 'line', 'pie'] as const).map(type => {
                  const Icon = type === 'bar' ? BarChart3 : type === 'line' ? LineChartIcon : PieChartIcon
                  return (
                    <button
                      key={type}
                      onClick={() => setChartType(type)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        chartType === type
                          ? 'bg-gradient-purple text-white'
                          : 'bg-bg hover:bg-bg2 text-text2 border border-border/30'
                      }`}
                    >
                      <Icon size={16} />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  )
                })}
              </div>

              {/* Chart */}
              <div className="flex-1">
                {chartType === 'bar' && <BarChart data={query.results} />}
                {chartType === 'line' && <LineChart data={query.results} />}
                {chartType === 'pie' && <PieChart data={query.results} />}
              </div>
            </motion.div>
          )}

          {activeTab === 'sql' && (
            <motion.div
              key="sql"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm text-text2">Generated SQL Query</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopySQL}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg text-sm bg-bg hover:bg-bg2 border border-border/30 transition-colors text-text2"
                >
                  <Copy size={14} />
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>
              <pre className="flex-1 p-4 rounded-lg bg-bg border border-border/30 overflow-auto text-text font-mono text-xs leading-relaxed">
                {query.sql}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
