"use client"

import React, { useEffect, useState } from 'react'

type AgentDef = { id: string; name: string; steps: string[] }

export default function AgentBuilder() {
  const [name, setName] = useState('')
  const [stepsText, setStepsText] = useState('')
  const [saved, setSaved] = useState<AgentDef[] | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('xatom_agents')
      if (raw) setSaved(JSON.parse(raw))
    } catch {
      setSaved([])
    }
  }, [])

  function saveAgent() {
    const steps = stepsText.split('\n').map((s) => s.trim()).filter(Boolean)
    if (!name || steps.length === 0) return
    const agent: AgentDef = { id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, name, steps }
    const next = [...(saved || []), agent]
    localStorage.setItem('xatom_agents', JSON.stringify(next))
    setSaved(next)
    setName('')
    setStepsText('')
  }

  return (
    <div className="rounded-[20px] border border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-6">
      <h3 className="text-lg font-semibold mb-4">Agent Builder (Local)</h3>

      <label className="block text-sm text-[#A09CB8] mb-1">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 p-2 rounded-md bg-[#09090d] border border-[rgba(255,255,255,0.04)]" />

      <label className="block text-sm text-[#A09CB8] mb-1">Steps (one per line)</label>
      <textarea value={stepsText} onChange={(e) => setStepsText(e.target.value)} rows={6} className="w-full mb-3 p-2 rounded-md bg-[#09090d] border border-[rgba(255,255,255,0.04)]" />

      <div className="flex gap-2">
        <button onClick={saveAgent} className="px-4 py-2 bg-[#7B5EFF] rounded-md text-white">Save</button>
      </div>

      {saved && saved.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-[#A09CB8] mb-2">Saved agents (local)</p>
          <ul className="space-y-2 text-sm">
            {saved.map((s) => (
              <li key={s.id} className="text-white">{s.name} — {s.steps.length} steps</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
