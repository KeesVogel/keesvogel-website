'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CONTENT_CARDS, SITE } from '@/lib/constants'

export default function ContentShowcase() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="content" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="accent-pill mb-4 inline-flex">Content</span>
            <h2 className="font-syne font-extrabold text-[#0d1f3c] mt-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Social media content die werkt
            </h2>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 border-2 border-[#00b4d8] text-[#00b4d8] font-dm font-semibold px-6 py-3 rounded-full hover:bg-[#00b4d8] hover:text-white transition-all duration-200 whitespace-nowrap"
          >
            Werk met mij →
          </a>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CONTENT_CARDS.map((card) => (
            <ContentCard key={card.title} card={card} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center text-[#7a9bb8] font-dm text-sm mt-12 max-w-2xl mx-auto italic"
        >
          Wil je jouw eigen content zien? Stuur een berichtje en ik laat je voorbeelden zien die passen bij jouw merk.
        </motion.p>
      </div>
    </section>
  )
}

function ContentCard({ card }: { card: (typeof CONTENT_CARDS)[0] }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      whileHover={{ y: -4 }}
      className="group light-card rounded-2xl overflow-hidden light-card-hover"
    >
      <div className={`relative aspect-[4/3] flex items-center justify-center bg-gradient-to-br ${card.gradient} overflow-hidden`}>
        <motion.span className="text-5xl" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
          {card.emoji}
        </motion.span>
        <span className="absolute top-3 left-3 text-xs font-dm font-semibold px-3 py-1 rounded-full"
          style={{ background: 'rgba(0,180,216,0.2)', border: '1px solid rgba(0,180,216,0.4)', color: '#00b4d8' }}>
          {card.platform}
        </span>
      </div>
      <div className="p-5 bg-white">
        <h3 className="font-syne font-bold text-[#0d1f3c] mb-1.5">{card.title}</h3>
        <p className="text-[#3d6080] font-dm text-sm leading-relaxed">{card.description}</p>
      </div>
    </motion.div>
  )
}
