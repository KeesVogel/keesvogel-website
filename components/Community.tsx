'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CountUp } from '@/components/ui/CountUp'
import { SocialIconBadge } from '@/components/ui/SocialIcons'
import { COMMUNITY_PERKS, SITE } from '@/lib/constants'

export default function Community() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="community" className="py-24 relative overflow-hidden" style={{ background: '#edf5ff' }}>
      {/* Soft gradient right side */}
      <div className="absolute right-0 top-0 w-[50%] h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(0,180,216,0.08) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 grid-dots-light opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            ref={ref}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase"
                style={{ background: 'rgba(0,168,107,0.1)', border: '1px solid rgba(0,168,107,0.3)', color: '#00a86b' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a86b]" />
                Gratis community
              </span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="font-syne font-extrabold text-[#0d1f3c]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              De Claude Club
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="text-[#3d6080] font-dm leading-relaxed"
            >
              Jouw plek om Claude te leren beheersen en AI echt in te zetten voor jouw webshop. Samen met honderden ondernemers die dezelfde uitdagingen kennen.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-4 mt-2"
            >
              {COMMUNITY_PERKS.map((perk) => (
                <motion.div
                  key={perk.title}
                  variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)' }}>
                    {perk.icon}
                  </div>
                  <div>
                    <p className="font-dm font-semibold text-[#0d1f3c] text-sm">{perk.title}</p>
                    <p className="text-[#7a9bb8] font-dm text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — community card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="light-card rounded-3xl p-10 flex flex-col items-center gap-4 max-w-sm w-full"
              style={{ border: '1px solid rgba(0,168,107,0.2)', boxShadow: '0 8px 40px rgba(0,168,107,0.08)' }}
            >
              <SocialIconBadge platform="Skool" badgeSize={80} iconSize={36} rounded="2xl" />

              <div className="text-center">
                <h3 className="font-syne font-bold text-[#0d1f3c] text-2xl">De Claude Club</h3>
                <p className="text-[#7a9bb8] font-dm text-sm mt-1">op Skool.com</p>
              </div>

              <div className="text-center">
                <div className="font-syne font-extrabold text-5xl text-[#00b4d8]">
                  <CountUp end={460} suffix="+" />
                </div>
                <p className="text-[#7a9bb8] font-dm text-sm mt-1">actieve leden</p>
              </div>

              <motion.a
                href={SITE.skool}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full text-center font-dm font-semibold py-3.5 rounded-full text-white transition-all duration-200 mt-2"
                style={{ background: '#00a86b' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#009960' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#00a86b' }}
              >
                Word gratis lid →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
