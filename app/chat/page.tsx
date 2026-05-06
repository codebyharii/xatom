import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Bot, Clock3, Layers3, MessageSquare, Sparkles, Wifi, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'XATOM Chat - Team Memory with AI',
  description:
    'XATOM Chat helps teams capture decisions, search context, and keep conversations grounded in long-term memory.',
  keywords: ['AI chat', 'team memory', 'search', 'workspace assistant'],
  openGraph: {
    title: 'XATOM Chat',
    description: 'A memory-first AI chat workspace for teams.',
    type: 'website',
  },
}

const promptChips = [
  'Summarize this project thread',
  'Find the latest decision about pricing',
  'Draft a response using prior context',
  'What changed since last week?',
]

const memoryItems = [
  'Persistent conversation memory',
  'Vector search across team notes',
  'Source-linked answers and citations',
  'Realtime handoff between teammates and AI',
]

const statusItems = [
  { label: 'Memory window', value: '12 months' },
  { label: 'Latency', value: '< 350 ms' },
  { label: 'Connected docs', value: '248' },
]

export default function ChatPage() {
  return (
    <main className="bg-[#060608] text-white">
      <Navbar />

      <section className="pt-40 pb-16 px-[5%] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-48 right-10 w-72 h-72 rounded-full bg-[#7B5EFF]/10 blur-3xl" />
        </div>

        <div className="max-w-[1180px] mx-auto relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300 mb-5">
              <Sparkles size={14} /> Phase 5 - XATOM Chat
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6 max-w-[12ch]">
              Chat that remembers the whole <span className="gradient-cyan">conversation</span>
            </h1>
            <p className="text-[#A09CB8] text-lg md:text-xl leading-relaxed max-w-[640px] mb-8">
              Build a memory-first workspace where every answer can search prior chats, documents,
              and decisions before it responds.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="#preview"
                className="px-6 py-3 rounded-xl bg-[#7B5EFF] text-white font-semibold hover:bg-[#9B7FFF] transition-colors"
              >
                Explore the preview
              </Link>
              <Link
                href="/blog"
                className="px-6 py-3 rounded-xl border border-[rgba(255,255,255,0.10)] text-[#F0EFFE] hover:border-cyan-400 hover:text-white transition-colors"
              >
                Read the docs
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/4 p-4 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-widest text-[#5A5670] mb-2">{item.label}</p>
                  <p className="text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="preview" className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-cyan-500/10 to-[#7B5EFF]/10 blur-2xl" />
            <div className="relative rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#0D0D12] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-white/3">
                <div>
                  <p className="text-sm font-semibold text-white">Project Atlas</p>
                  <p className="text-xs text-[#5A5670]">Shared memory enabled</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-cyan-300">
                  <Wifi size={14} /> Realtime
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300">
                    <Bot size={18} />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-white/5 border border-[rgba(255,255,255,0.06)] p-4 max-w-[440px] text-sm text-[#D9D6EA]">
                    I searched the last 180 days of team decisions and the pricing doc. The latest
                    agreement is to keep the free tier at 14 days and move enterprise trials to a
                    guided onboarding flow.
                  </div>
                </div>

                <div className="flex gap-3 items-start justify-end">
                  <div className="rounded-2xl rounded-tr-none bg-[#7B5EFF] p-4 max-w-[420px] text-sm text-white">
                    Can you draft a reply that references the previous launch note and the support
                    backlog?
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/8 flex items-center justify-center text-white border border-[rgba(255,255,255,0.08)]">
                    <MessageSquare size={18} />
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-100">
                  Draft ready. I included the launch note, linked the backlog items, and kept the
                  tone aligned with the last approved update.
                </div>
              </div>

              <div className="px-6 pb-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {promptChips.map((chip) => (
                    <button
                      key={chip}
                      className="text-left rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/4 px-4 py-3 text-sm text-[#D9D6EA] hover:border-cyan-400/40 hover:bg-white/6 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-[5%]">
        <div className="max-w-[1180px] mx-auto grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="rounded-[28px] border border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-8">
            <p className="text-xs uppercase tracking-widest text-cyan-300 mb-3">Core capabilities</p>
            <h2 className="font-display text-3xl font-black mb-4">Memory, context, and speed in one place.</h2>
            <p className="text-[#A09CB8] leading-relaxed mb-8">
              Phase 5 turns XATOM Chat into the memory layer for the product suite: support,
              research, onboarding, and internal ops can all reuse the same context graph.
            </p>

            <div className="space-y-4">
              {memoryItems.map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#D9D6EA]">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Clock3, title: 'Fast recall', body: 'Answers search long-term memory before generating.' },
              { icon: Layers3, title: 'Structured context', body: 'Threads, docs, and notes stay connected.' },
              { icon: Zap, title: 'Action-ready', body: 'Turn a message into a task, summary, or follow-up.' },
              { icon: Bot, title: 'Assistant ready', body: 'Use one assistant across every workspace.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[rgba(255,255,255,0.06)] bg-[#0D0D12] p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-cyan-300 mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[#A09CB8] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}