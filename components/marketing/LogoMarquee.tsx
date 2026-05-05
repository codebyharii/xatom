import Image from 'next/image'

export function LogoMarquee() {
  const logos = [
    'Next.js',
    'Supabase',
    'Vercel',
    'LangChain',
    'Anthropic',
    'PostgreSQL',
    'OpenAI',
    'GitHub',
  ]

  return (
    <section className="border-t border-b border-[rgba(255,255,255,0.06)] py-6">
      <div className="text-center mb-6">
        <p className="text-xs font-medium text-[#5A5670] tracking-widest uppercase">
          Trusted by teams at
        </p>
      </div>

      {/* Marquee Container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: 'marqueeLeft 30s linear infinite',
          }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 text-[#5A5670] hover:text-[#F0EFFE] transition-colors opacity-40 hover:opacity-90 cursor-pointer px-4">
              <div className="w-5 h-5 rounded bg-[#5A5670]" />
              <span className="text-sm font-medium">{logo}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
