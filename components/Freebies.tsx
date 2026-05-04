'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Link from 'next/link'

const FREEBIES_PREVIEW = [
  { title: '8 Business-legendes Team', image: '/Business-legends.png', badge: 'Claude Skill' },
  { title: 'Bol.com Fotograaf Eva', image: '/Eva.png', badge: 'Claude Skill' },
  { title: 'LinkedIn Fotograaf', image: '/linkedin.png', badge: 'Claude Skill' },
]

export default function Freebies() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="freebies" className="py-24" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #f0f7ff 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <span className="accent-pill mb-4 inline-flex">🎁 Gratis voor jou</span>
          <h2 className="font-syne font-extrabold text-[#0d1f3c] mb-4 mt-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            3 gratis AI skills —{' '}
            <span style={{ color: '#00b4d8' }}>direct te gebruiken</span>
          </h2>
          <p className="text-[#3d6080] font-dm leading-relaxed text-lg">
            Vul eenmalig je naam en e-mail in en krijg direct toegang. Geen creditcard, geen gedoe.
          </p>
        </motion.div>

        {/* Locked preview cards */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10"
        >
          {FREEBIES_PREVIEW.map((f, i) => (
            <motion.div
              key={f.title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="relative rounded-2xl overflow-hidden bg-white group"
              style={{ border: '1px solid #e8f0f8', boxShadow: '0 4px 24px rgba(0,100,180,0.06)' }}
            >
              {/* Image blurred */}
              <div className="relative h-44 overflow-hidden">
                <Image src={f.image} alt={f.title} fill className="object-cover scale-105 blur-[3px] group-hover:blur-[2px] transition-all duration-300" />
                <div className="absolute inset-0 bg-white/30" />
                {/* Lock icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(13,31,60,0.8)', backdropFilter: 'blur(4px)' }}>
                    🔒
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-dm font-bold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(0,180,216,0.9)', color: 'white' }}>
                    {f.badge}
                  </span>
                </div>
              </div>
              {/* Title */}
              <div className="p-4">
                <h3 className="font-syne font-bold text-[#0d1f3c] text-sm">{f.title}</h3>
                <p className="text-[#7a9bb8] font-dm text-xs mt-1">Ontgrendel gratis met je e-mail →</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Link href="/freebies">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-syne font-bold text-white text-lg cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)', boxShadow: '0 8px 30px rgba(0,180,216,0.3)' }}
            >
              🎁 Ontgrendel alle 3 freebies gratis →
            </motion.div>
          </Link>

          {/* Trust signals */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-[#7a9bb8] font-dm text-sm">
              <span className="text-green-500">✓</span> Geen creditcard
            </span>
            <span className="flex items-center gap-1.5 text-[#7a9bb8] font-dm text-sm">
              <span className="text-green-500">✓</span> Altijd uitschrijven
            </span>
            <span className="flex items-center gap-1.5 text-[#7a9bb8] font-dm text-sm">
              <span className="text-green-500">✓</span> 460+ gingen je voor
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
