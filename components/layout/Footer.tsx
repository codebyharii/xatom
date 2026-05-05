import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const links = {
    products: [
      { label: 'Insights', href: '/features#insights' },
      { label: 'Hire', href: '/features#hire' },
      { label: 'Chat', href: '/features#chat' },
      { label: 'Agents', href: '/features#agents' },
    ],
    company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    resources: [
      { label: 'Docs', href: '/blog' },
      { label: 'API Reference', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Status', href: '#' },
    ],
    legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
      { label: 'Licenses', href: '#' },
    ],
  }

  const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ]

  return (
    <footer className="bg-[#060608] border-t border-[rgba(255,255,255,0.06)] py-16 px-[5%]">
      <div className="max-w-[1100px] mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-cyan-400" />
              <span className="font-display text-lg font-black">XATOM</span>
            </div>
            <p className="text-xs text-[#5A5670] mb-6">Where Intelligence Meets Automation</p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 border border-[rgba(255,255,255,0.10)] rounded-full flex items-center justify-center text-[#5A5670] hover:border-[#7B5EFF] hover:text-[#7B5EFF] hover:bg-rgba(123,94,255,0.08) transition-all duration-200"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-xs text-[#5A5670] mt-6">© 2025 XATOM.IN</p>
          </div>

          {/* Links Sections */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {title === 'products' && 'Products'}
                {title === 'company' && 'Company'}
                {title === 'resources' && 'Resources'}
                {title === 'legal' && 'Legal'}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#5A5670] hover:text-[#A09CB8] transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(255,255,255,0.06)] my-8" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-xs text-[#5A5670]">
            Built with <span className="text-cyan-400">Claude AI</span> · Deployed on{' '}
            <span className="text-cyan-400">Vercel</span> · Powered by{' '}
            <span className="text-cyan-400">Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
