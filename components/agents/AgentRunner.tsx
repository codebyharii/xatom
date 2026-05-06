"use client"

import React, { useEffect, useState } from 'react'

type Agent = { id: string; name: string; desc?: string; steps?: string[] }

export default function AgentRunner({ agent, onClose }: { agent: Agent; onClose: () => void }) {
  const steps = agent.steps || []
  const [index, setIndex] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    if (index >= steps.length) return
    const t = setTimeout(() => {
      setLog((l) => [...l, `✅ ${steps[index]}`])
      setIndex((i) => i + 1)
    }, 900)
    return () => clearTimeout(t)
  }, [index, running])

  useEffect(() => {
    if (index === steps.length && steps.length > 0) setRunning(false)
  }, [index])

  return (
    <div className="rounded-md border border-[rgba(255,255,255,0.06)] bg-[#09090d] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold">{agent.name}</p>
          <p className="text-sm text-[#A09CB8]">{index}/{steps.length} steps</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setRunning(!running)} className="px-3 py-1 bg-white/6 rounded">{running ? 'Pause' : 'Resume'}</button>
          <button onClick={onClose} className="px-3 py-1 bg-white/6 rounded">Close</button>
        </div>
      </div>

      <div className="space-y-2 max-h-40 overflow-auto">
        {log.map((l, i) => (
          <div key={i} className="text-sm text-[#D9D6EA]">{l}</div>
        ))}
        {running && index < steps.length && <div className="text-sm text-[#A09CB8]">Running: {steps[index]}</div>}
        {!running && index >= steps.length && <div className="text-sm text-cyan-300">Agent completed.</div>}
      </div>
    </div>
  )
}
