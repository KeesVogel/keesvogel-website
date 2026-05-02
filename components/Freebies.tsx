'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FREEBIES } from '@/lib/constants'

export default function Freebies() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="freebies" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="accent-pill mb-4 inline-flex">Freebies</span>
          <h2 className="font-syne font-extrabold text-[#0d1f3c] mb-4 mt-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Download gratis
          </h2>
          <p className="text-[#3d6080] font-dm leading-relaxed">
            Kant-en-klare tools, templates en gidsen om direct aan de slag te gaan met AI in jouw webshop.
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FREEBIES.map((freebie) => (
            <FreebieCard key={freebie.title} freebie={freebie} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FreebieCard({ freebie }: { freebie: (typeof FREEBIES)[0] }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      whileHover={{ y: -4 }}
      className="group light-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden light-card-hover"
    >
      {/* GRATIS badge */}
      <span className="absolute top-4 right-4 text-xs font-dm font-bold px-3 py-1 rounded-full"
        style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.25)', color: '#00b4d8', letterSpacing: '0.05em' }}>
        GRATIS
      </span>

      <span className="text-4xl">{freebie.icon}</span>

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-syne font-bold text-[#0d1f3c] text-lg pr-16">{freebie.title}</h3>
        <p className="text-[#3d6080] font-dm text-sm leading-relaxed">{freebie.description}</p>
      </div>

      <motion.a
        href={freebie.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full text-center bg-[#0d1f3c] text-white font-dm font-semibold py-3 rounded-full text-sm hover:bg-[#00b4d8] transition-colors duration-200"
      >
        ⬇ Download gratis
      </motion.a>
    </motion.div>
  )
}
