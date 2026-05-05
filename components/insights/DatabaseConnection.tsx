'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, ArrowRight } from 'lucide-react'

interface DatabaseConnectionProps {
  onConnect: (dbName: string, connectionString: string) => void
}

const DATABASE_TEMPLATES = [
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: '🐘',
    placeholder: 'postgresql://user:password@host:5432/dbname',
    description: 'PostgreSQL database connection',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🐬',
    placeholder: 'mysql://user:password@host:3306/dbname',
    description: 'MySQL database connection',
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    icon: '📊',
    placeholder: 'mssql://user:password@host:1433/dbname',
    description: 'SQL Server connection',
  },
  {
    id: 'bigquery',
    name: 'BigQuery',
    icon: '☁️',
    placeholder: 'bigquery://project-id/dataset',
    description: 'Google BigQuery connection',
  },
]

export default function DatabaseConnection({ onConnect }: DatabaseConnectionProps) {
  const [step, setStep] = useState<'select' | 'connect'>('select')
  const [selectedDb, setSelectedDb] = useState<string | null>(null)
  const [connectionString, setConnectionString] = useState('')

  const selectedTemplate = DATABASE_TEMPLATES.find(db => db.id === selectedDb)

  const handleSelect = (dbId: string) => {
    setSelectedDb(dbId)
    setStep('connect')
  }

  const handleConnect = () => {
    if (selectedDb && connectionString.trim()) {
      onConnect(selectedTemplate?.name || 'Database', connectionString)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl"
    >
      <div className="rounded-2xl border border-border/30 bg-bg2/80 backdrop-blur-xl p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4 text-5xl"
          >
            🗄️
          </motion.div>
          <h2 className="text-3xl font-bold gradient-cyan mb-2">Connect Your Database</h2>
          <p className="text-text2">
            {step === 'select'
              ? 'Choose your database provider to get started'
              : 'Enter your connection details'}
          </p>
        </div>

        {step === 'select' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {DATABASE_TEMPLATES.map((db, index) => (
              <motion.button
                key={db.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => handleSelect(db.id)}
                className="group relative p-5 rounded-xl border border-border/30 bg-bg/50 hover:bg-bg2/50 hover:border-purple/50 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{db.icon}</div>
                <h3 className="font-semibold text-text mb-1">{db.name}</h3>
                <p className="text-sm text-text2">{db.description}</p>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={18} className="text-purple" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Selected DB Info */}
            <div className="p-4 rounded-xl bg-purple/5 border border-purple/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{selectedTemplate?.icon}</span>
                <div>
                  <p className="text-sm text-text2">Selected Database</p>
                  <p className="font-semibold text-text">{selectedTemplate?.name}</p>
                </div>
              </div>
            </div>

            {/* Connection String Input */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Connection String
              </label>
              <textarea
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                placeholder={selectedTemplate?.placeholder}
                className="w-full px-4 py-3 rounded-lg bg-bg border border-border/30 text-text placeholder-text3 focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple/20 transition-colors resize-none"
                rows={3}
              />
              <p className="text-xs text-text2 mt-1">
                Keep your connection string secure. XATOM never stores credentials.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStep('select')
                  setSelectedDb(null)
                  setConnectionString('')
                }}
                className="flex-1 px-4 py-2 rounded-lg border border-border/30 text-text hover:bg-bg2 transition-colors font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleConnect}
                disabled={!connectionString.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-purple text-white font-semibold hover:shadow-lg hover:shadow-purple/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Connect
              </button>
            </div>
          </motion.div>
        )}

        {/* Security Note */}
        <div className="mt-8 p-4 rounded-lg bg-green/5 border border-green/20">
          <p className="text-sm text-text2">
            🔒 <span className="text-green font-semibold">End-to-end encrypted</span> - Your credentials are sent directly to your database
          </p>
        </div>
      </div>
    </motion.div>
  )
}
