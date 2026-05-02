'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CountUp } from '@/components/ui/CountUp'
import { SocialIconBadge } from '@/components/ui/SocialIcons'
import { SOCIALS, SITE } from '@/lib/constants'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [photoExists, setPhotoExists] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      bgRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white" id="hero">
      {/* Background elements */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none transition-transform duration-[150ms] ease-out">
        {/* Soft gradient mesh */}
        <div className="absolute top-0 right-0 w-[55%] h-[65%] rounded-full opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-0 left-0 w-[45%] h-[50%] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(0,150,200,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, rgba(0,180,216,0.1) 0%, transparent 70%)', filter: 'blur(50px)', animation: 'float 12s ease-in-out infinite' }} />

        {/* Grid dots */}
        <div className="absolute inset-0 grid-dots-light opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.div variants={item}>
              <span className="accent-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] animate-pulse" />
                AI voor webshops
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-syne font-extrabold leading-[1.08] text-[#0d1f3c]"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
            >
              Ik help webshops sneller schalen met{' '}
              <span className="text-[#00b4d8]">AI</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-[#3d6080] font-dm leading-relaxed max-w-lg"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)' }}
            >
              Van marketing tot klantenservice — ik zet AI in zodat jouw webshop sneller groeit,
              slimmer werkt en meer verkoopt.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center bg-[#0d1f3c] text-white font-dm font-semibold px-7 py-3.5 rounded-full hover:bg-[#00b4d8] transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Direct contact opnemen
              </a>
              <a
                href="#diensten"
                className="inline-flex items-center border-2 border-[#0d1f3c]/15 text-[#0d1f3c] font-dm font-semibold px-7 py-3.5 rounded-full hover:border-[#00b4d8] hover:text-[#00b4d8] transition-all duration-200"
              >
                Bekijk mijn diensten
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="flex flex-wrap gap-8 pt-2">
              {[
                { value: 35000, label: 'TikTok volgers' },
                { value: 460, label: 'Community leden', suffix: '+' },
                { value: 9800, label: 'Instagram volgers' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-syne font-extrabold text-2xl text-[#0d1f3c]">
                    <CountUp end={stat.value} suffix={stat.suffix ?? ''} />
                  </span>
                  <span className="text-[#7a9bb8] text-xs font-dm mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — photo + social cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            {/* Photo card */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative ring behind photo */}
              <div className="absolute -inset-3 rounded-3xl opacity-50"
                style={{ background: 'linear-gradient(135deg, rgba(0,180,216,0.15) 0%, rgba(0,150,200,0.05) 100%)', filter: 'blur(1px)' }} />

              <div className="relative rounded-3xl overflow-hidden light-card aspect-[3/4]"
                style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,180,216,0.1)' }}>
                {photoExists ? (
                  <Image
                    src="/kees.jpg"
                    alt="Kees Vogel — AI strategist voor webshops"
                    fill
                    className="object-cover object-top"
                    priority
                    onError={() => setPhotoExists(false)}
                  />
                ) : (
                  <PhotoPlaceholder />
                )}

                {/* Floating badge: name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <div className="w-2 h-2 rounded-full bg-[#00b4d8] animate-pulse" />
                    <div>
                      <p className="font-syne font-bold text-[#0d1f3c] text-sm">Kees Vogel</p>
                      <p className="text-[#7a9bb8] text-xs font-dm">AI Strateeg voor Webshops</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating social stat chips — each links to the real profile */}
              <motion.a
                href="https://www.tiktok.com/@keesvogel.ai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -right-4 top-12 bg-white rounded-2xl px-4 py-3 flex items-center gap-2.5 cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,180,216,0.08)' }}
              >
                <SocialIconBadge platform="TikTok" badgeSize={32} iconSize={14} rounded="lg" />
                <div>
                  <p className="font-syne font-bold text-[#0d1f3c] text-sm leading-none">35.1K</p>
                  <p className="text-[#7a9bb8] text-xs font-dm">volgers</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.skool.com/de-claude-club"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="absolute -left-4 top-1/3 bg-white rounded-2xl px-4 py-3 flex items-center gap-2.5 cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,180,216,0.08)' }}
              >
                <SocialIconBadge platform="Skool" badgeSize={32} iconSize={14} rounded="lg" />
                <div>
                  <p className="font-syne font-bold text-[#0d1f3c] text-sm leading-none">460+</p>
                  <p className="text-[#7a9bb8] text-xs font-dm">leden</p>
                </div>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/keesvogel.ai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -right-4 bottom-28 bg-white rounded-2xl px-4 py-3 flex items-center gap-2.5 cursor-pointer"
                style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,180,216,0.08)' }}
              >
                <SocialIconBadge platform="Instagram" badgeSize={32} iconSize={14} rounded="lg" />
                <div>
                  <p className="font-syne font-bold text-[#0d1f3c] text-sm leading-none">9.8K</p>
                  <p className="text-[#7a9bb8] text-xs font-dm">volgers</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PhotoPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#edf5ff] to-[#dceeff]">
      <div className="w-24 h-24 rounded-full bg-[#00b4d8]/20 flex items-center justify-center text-4xl">
        👤
      </div>
      <div className="text-center px-6">
        <p className="font-syne font-bold text-[#0d1f3c] text-lg">Kees Vogel</p>
        <p className="text-[#7a9bb8] text-sm font-dm mt-1">
          Sla jouw foto op als<br />
          <code className="text-[#00b4d8] text-xs">/public/kees.jpg</code>
        </p>
      </div>
    </div>
  )
}
