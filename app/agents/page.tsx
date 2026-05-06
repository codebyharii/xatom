import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ArrowUpRight, Bot, CalendarCheck2, Layers3, PlayCircle, Workflow } from 'lucide-react'

export const metadata: Metadata = {
  title: 'XATOM Agents - Autonomous Workflows',
  description:
    'Design and run autonomous AI agents that plan tasks, call tools, and hand off work across systems.',
  keywords: ['AI agents', 'workflow automation', 'tool calling', 'orchestration'],
}

const capabilities = [
  'Visual workflow planning',
  'Tool execution with guardrails',
  'Multi-step reasoning and handoff',
  'Reusable agent templates',
]

const stages = [
  { title: 'Plan', body: 'Break a goal into smaller actions and choose the right tools.' },
  { title: 'Execute', body: 'Call APIs, run tasks, and collect results automatically.' },
  { title: 'Verify', body: 'Review outputs before the agent marks work as complete.' },
  { title: 'Repeat', body: 'Loop back through the workflow when new information appears.' },
]

export default function AgentsPage() {
  return (
    <main className="bg-[#060608] text-white">
      <Navbar />

      <section className="pt-40 pb-16 px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-[#7B5EFF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="max-w-[1180px] mx-auto relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300 mb-5">
              <Bot size={14} /> Phase 6 - XATOM Agents
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 max-w-[12ch]">
              Autonomous agents that actually <span className="gradient-cyan">finish work</span>
            </h1>
            <p className="text-[#A09CB8] text-lg md:text-xl leading-relaxed max-w-[620px] mb-8">
              Orchestrate long-running AI workflows that plan, act, validate, and hand off with
              enough structure to trust in production.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="#workflow"
                className="px-6 py-3 rounded-xl bg-[#7B5EFF] text-white font-semibold hover:bg-[#9B7FFF] transition-colors"
              >
                See the workflow
              </Link>
              <Link
                href="/chat"
                className="px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.10)] text-[#F0EFFE] hover:border-cyan-400 hover:text-white transition-colors"
              >
                Open Chat
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/4 p-4 backdrop-blur-sm text-sm text-[#D9D6EA]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-[#7B5EFF]/10 to-cyan-500/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#0D0D12] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)]">
                <div>
                  <p className="text-sm font-semibold text-white">Agent Builder</p>
                  <p className="text-xs text-[#5A5670]">Runbooks and tool access</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-300">
                  <Workflow size={14} /> Live orchestration
                </div>
              </div>

              <div className="p-6 space-y-4">
                {[
                  { icon: Layers3, title: 'Planner', text: 'Splits the request into safe, executable steps.' },
                  { icon: PlayCircle, title: 'Executor', text: 'Calls tools and records outputs for each step.' },
                  { icon: CalendarCheck2, title: 'Verifier', text: 'Checks the result against the original goal.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/4 p-4 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-cyan-300 shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-[#A09CB8]">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100 flex items-start gap-3">
                  <ArrowUpRight size={16} className="mt-0.5 shrink-0" />
                  <span>
                    The first agent workflow is a content ops loop: ingest brief, draft, verify,
                    and schedule publication.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="py-16 px-[5%]">
        <div className="max-w-[1180px] mx-auto grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.title} className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-6">
              <p className="text-xs uppercase tracking-widest text-cyan-300 mb-3">Step 0{index + 1}</p>
              <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
              <p className="text-sm text-[#A09CB8] leading-relaxed">{stage.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}