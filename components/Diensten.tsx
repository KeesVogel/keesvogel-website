'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SERVICES, type Service } from '@/lib/constants'

export default function Diensten() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="diensten" className="py-24" style={{ background: '#edf5ff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="accent-pill mb-4 inline-flex">Wat ik doe</span>
          <h2 className="font-syne font-extrabold text-[#0d1f3c] mb-4 mt-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Diensten die jouw webshop laten groeien
          </h2>
          <p className="text-[#3d6080] font-dm leading-relaxed">
            Van AI-strategie tot uitvoering — ik help jou op alle vlakken om meer uit je webshop te halen.
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const cardContent = (
    <>
      {service.logo ? (
        <div className="mb-1">
          <Image
            src={service.logo}
            alt={service.title}
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
          />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.2)' }}>
          {service.icon}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-syne font-bold text-[#0d1f3c] text-lg">{service.title}</h3>
        <p className="text-[#3d6080] font-dm text-sm leading-relaxed">{service.description}</p>
      </div>
      <span className="mt-auto text-[#00b4d8]/60 text-sm font-dm group-hover:text-[#00b4d8] transition-colors">
        Meer info →
      </span>
    </>
  )

  if (service.href) {
    const isExternal = service.href.startsWith('http')
    return (
      <motion.a
        href={service.href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
        whileHover={{ y: -4 }}
        className="group light-card rounded-2xl p-6 flex flex-col gap-4 cursor-pointer light-card-hover"
      >
        {cardContent}
      </motion.a>
    )
  }

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
      whileHover={{ y: -4 }}
      className="group light-card rounded-2xl p-6 flex flex-col gap-4 cursor-default light-card-hover"
    >
      {cardContent}
    </motion.div>
  )
}
