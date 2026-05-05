'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'

const articles = [
  {
    title: 'Getting Started with XATOM Insights',
    excerpt: 'Learn how to connect your database and ask questions in natural language.',
    author: 'Sarah',
    date: 'Mar 15, 2025',
    category: 'Getting Started',
  },
  {
    title: 'Building with XATOM Agents',
    excerpt: 'A comprehensive guide to creating autonomous AI agents for your workflows.',
    author: 'Alex',
    date: 'Mar 10, 2025',
    category: 'Tutorials',
  },
  {
    title: 'AI Resume Screening with XATOM Hire',
    excerpt: 'How companies are using AI to streamline their hiring process.',
    author: 'Jordan',
    date: 'Mar 5, 2025',
    category: 'Case Studies',
  },
]

export default function BlogPage() {
  return (
    <main className="bg-[#060608]">
      <Navbar />

      {/* Blog Hero */}
      <section className="pt-40 pb-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-black mb-6">
              Blog & <span className="gradient-cyan">Docs</span>
            </h1>
            <p className="text-lg text-[#A09CB8] max-w-[600px] mx-auto">
              Learn how to build with XATOM and discover best practices from the community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.div
                key={i}
                className="border border-[rgba(255,255,255,0.06)] rounded-[16px] bg-[#16161F] p-8 hover:bg-[#1C1C28] transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-full h-32 bg-gradient-to-br from-[#7B5EFF] to-[#00D4FF] rounded-lg mb-6 group-hover:scale-105 transition-transform duration-300" />
                <p className="text-xs text-[#7B5EFF] uppercase tracking-widest font-semibold mb-2">
                  {article.category}
                </p>
                <h3 className="font-display text-xl font-black mb-3 text-white">
                  {article.title}
                </h3>
                <p className="text-[#A09CB8] text-sm mb-6">{article.excerpt}</p>
                <div className="flex items-center justify-between pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="text-xs text-[#5A5670]">
                    <p className="font-semibold text-[#A09CB8]">{article.author}</p>
                    <p>{article.date}</p>
                  </div>
                  <span className="text-[#7B5EFF]">→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
