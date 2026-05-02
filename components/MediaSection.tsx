'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SITE } from '@/lib/constants'

const PHOTO_TAGS = ['White background', 'Lifestyle', 'AI-enhanced', '360° shots']
const VIDEO_TAGS = ['Product reels', 'Unboxing', 'How-to', 'Brand films']

export default function MediaSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="media" className="py-24" style={{ background: '#edf5ff' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="accent-pill mb-4 inline-flex">Foto & Video</span>
          <h2 className="font-syne font-extrabold text-[#0d1f3c] mt-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Beelden die converteren
          </h2>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Photo card */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -4 }}
            className="light-card rounded-3xl overflow-hidden light-card-hover"
          >
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <Image
                src="/product-collage.jng.png"
                alt="Productfotografie voorbeelden"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 bg-white">
              <h3 className="font-syne font-bold text-[#0d1f3c] text-2xl mb-3">Productfotografie</h3>
              <p className="text-[#3d6080] font-dm leading-relaxed mb-6 text-sm">
                Professionele productfoto's die je klanten overtuigen. Van strakke white-background shots tot sfeervolle lifestyle beelden — allemaal AI-enhanced voor maximale impact.
              </p>
              <div className="flex flex-wrap gap-2">
                {PHOTO_TAGS.map((tag) => (
                  <span key={tag} className="text-xs font-dm font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(0,180,216,0.1)', border: '1px solid rgba(0,180,216,0.25)', color: '#00b4d8' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Video card — with real video */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
            whileHover={{ y: -4 }}
            className="light-card rounded-3xl overflow-hidden light-card-hover"
          >
            {/* Video player — 16:9 full frame */}
            <div className="relative w-full bg-[#0d1f3c] overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video
                src="/product-demo.mp4"
                className="w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Play badge overlay */}
              <div className="absolute top-3 left-3">
                <span className="text-xs font-dm font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.45)', color: '#a78bfa' }}>
                  ▶ Product demo
                </span>
              </div>
            </div>
            <div className="p-8 bg-white">
              <h3 className="font-syne font-bold text-[#0d1f3c] text-2xl mb-3">Productvideo's</h3>
              <p className="text-[#3d6080] font-dm leading-relaxed mb-6 text-sm">
                Scroll-stoppende video's die jouw product in het beste licht zetten. Van snelle product reels tot uitgebreide how-to's — klaar voor elk platform.
              </p>
              <div className="flex flex-wrap gap-2">
                {VIDEO_TAGS.map((tag) => (
                  <span key={tag} className="text-xs font-dm font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#8b5cf6' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center bg-[#0d1f3c] text-white font-dm font-semibold px-8 py-4 rounded-full hover:bg-[#00b4d8] transition-all duration-200 hover:scale-105"
          >
            Vraag een offerte aan →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
