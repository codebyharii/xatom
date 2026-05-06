"use client"

import React, { useState } from 'react'
import AgentRunner from './AgentRunner'

type Agent = { id: string; name: string; desc?: string; steps?: string[] }

export default function AgentList() {
  const [agents] = useState<Agent[]>([
    { id: 'content-ops', name: 'Content Ops Loop', desc: 'Ingest → Draft → Verify → Schedule', steps: ['Ingest brief', 'Draft content', 'Verify facts', 'Schedule publication'] },
    { id: 'bug-triage', name: 'Bug Triage Agent', desc: 'Collect reports → Triage → Assign', steps: ['Collect reports', 'Classify severity', 'Assign owner'] },
  ])
  const [running, setRunning] = useState<Agent | null>(null)

  return (
    <div className="rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-6">
      <h3 className="text-lg font-semibold mb-4">Available Agents</h3>
      <div className="space-y-4">
        {agents.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-[#A09CB8]">{a.desc}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 rounded-lg bg-[#7B5EFF] text-white text-sm"
                onClick={() => setRunning(a)}
              >
                Run
              </button>
            </div>
          </div>
        ))}
      </div>

      {running && (
        <div className="mt-6">
          <AgentRunner agent={running} onClose={() => setRunning(null)} />
        </div>
      )}
    </div>
  )
}
