'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/lib/constants'

const STEPS = [
  {
    number: '01',
    title: 'AI analyseert uw markt',
    description: 'Voordat we filmen analyseren we met AI wat al werkt in uw niche — welke hooks, formats en onderwerpen het meeste organisch bereik genereren op TikTok en Instagram.',
    icon: '🧠',
  },
  {
    number: '02',
    title: 'Één filmdag',
    description: 'We komen fysiek naar u toe en filmen in één dag een volledige maand aan content. Efficiënt, professioneel en op maat — klaar voor elk platform.',
    icon: '🎬',
  },
  {
    number: '03',
    title: 'Een maand lang posten',
    description: "U krijgt kant-en-klare video's, captions en een postschema. Elke dag relevante content die organisch bezoekers naar uw webshop trekt.",
    icon: '📈',
  },
]

// Placeholder videos — vervang src met echte video bestanden in /public/
const EXAMPLE_VIDEOS = [
  { id: 1, title: 'Product reveal hook', platform: 'TikTok', src: '/product-demo.mp4' },
  { id: 2, title: 'Behind the scenes', platform: 'Instagram', src: '/product-demo.mp4' },
  { id: 3, title: 'Klant testimonial', platform: 'TikTok', src: '/product-demo.mp4' },
  { id: 4, title: 'How it works', platform: 'Instagram', src: '/product-demo.mp4' },
  { id: 5, title: 'Unboxing moment', platform: 'TikTok', src: '/product-demo.mp4' },
  { id: 6, title: 'Voor & na', platform: 'Instagram', src: '/product-demo.mp4' },
]

export default function ShortFormPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1f3c]/95 backdrop-blur-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="KeesVogel.ai" width={160} height={40} className="h-8 w-auto object-contain" priority />
          </Link>
          <Link
            href="/"
            className="text-white/60 hover:text-white font-dm text-sm transition-colors flex items-center gap-2"
          >
            ← Terug naar home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6" style={{ background: 'linear-gradient(180deg, #0d1f3c 0%, #1a3a5c 60%, #edf5ff 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[#00b4d8] font-dm text-sm font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b4d8] animate-pulse" />
              Short Form Content
            </span>
            <h1
              className="font-syne font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            >
              Één filmdag.<br />
              <span className="text-[#00b4d8]">Een maand lang</span> organisch bereik.
            </h1>
            <p className="text-white/65 font-dm leading-relaxed max-w-2xl mx-auto mb-10" style={{ fontSize: '1.1rem' }}>
              AI analyseert uw markt. Wij komen fysiek filmen. U post een maand lang content die uw doelgroep aanspreekt en bezoekers naar uw webshop trekt — zonder gokken wat werkt.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center bg-[#00b4d8] text-white font-dm font-semibold px-8 py-4 rounded-full hover:bg-[#0099bb] transition-all duration-200 hover:scale-105"
            >
              Plan een gratis kennismaking →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="accent-pill mb-4 inline-flex">Hoe het werkt</span>
            <h2 className="font-syne font-extrabold text-[#0d1f3c] mt-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              Van AI-analyse tot gepubliceerde content
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="light-card rounded-2xl p-7 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-syne font-extrabold text-[#00b4d8]/30 text-3xl leading-none">{step.number}</span>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="font-syne font-bold text-[#0d1f3c] text-lg">{step.title}</h3>
                <p className="text-[#3d6080] font-dm text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6" style={{ background: '#edf5ff' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="accent-pill mb-4 inline-flex">Investering</span>
            <h2 className="font-syne font-extrabold text-[#0d1f3c] mt-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              Goedkoper dan een social media manager
            </h2>
            <p className="text-[#3d6080] font-dm mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Eén filmdag levert 12 kant-en-klare content stukken op. Geen vast contract, geen salaris — gewoon resultaat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Pricing card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0d1f3c] rounded-3xl p-8 flex flex-col gap-6"
            >
              <div>
                <p className="text-[#00b4d8] font-dm font-semibold text-sm uppercase tracking-widest mb-2">Short Form Content — filmdag</p>
                <div className="flex items-end gap-2">
                  <span className="font-syne font-extrabold text-white" style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)' }}>€1.499</span>
                  <span className="text-white/40 font-dm text-sm mb-3">per filmdag</span>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  '12 kant-en-klare video content stukken',
                  'Professioneel editwerk inbegrepen',
                  'Captions & hashtags per platform',
                  'Postschema voor een volledige maand',
                  'TikTok & Instagram Reels formaat',
                  'AI-analyse van uw markt vooraf',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/75 font-dm text-sm">
                    <span className="text-[#00b4d8] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-auto inline-flex items-center justify-center bg-[#00b4d8] text-white font-dm font-semibold px-6 py-3.5 rounded-full hover:bg-[#0099bb] transition-all duration-200 hover:scale-105"
              >
                Plan uw filmdag →
              </a>
            </motion.div>

            {/* Vergelijking */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="light-card rounded-3xl p-8 flex flex-col gap-6"
            >
              <p className="font-syne font-bold text-[#0d1f3c] text-lg">Waarom geen social media manager in dienst?</p>

              {/* Kosten vergelijking */}
              <div className="flex flex-col gap-3">
                <p className="text-[#7a9bb8] font-dm text-xs uppercase tracking-wider font-semibold">Kosten in dienst nemen</p>
                {[
                  { label: 'Bruto salaris', cost: '€2.500–€3.500/mnd', bad: true },
                  { label: 'Werkgeverslasten (+30%)', cost: '€750–€1.050/mnd', bad: true },
                  { label: 'Tools & software', cost: '€100–€300/mnd', bad: true },
                  { label: 'Inwerkperiode', cost: '4–8 weken', bad: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 flex-shrink-0 text-xs">✕</span>
                      <span className="text-[#3d6080] font-dm text-sm">{row.label}</span>
                    </div>
                    <span className="text-red-400 font-syne font-bold text-xs flex-shrink-0">{row.cost}</span>
                  </div>
                ))}
              </div>

              {/* Wat je mist */}
              <div className="flex flex-col gap-3 pt-2 border-t border-[#e8f0f8]">
                <p className="text-[#7a9bb8] font-dm text-xs uppercase tracking-wider font-semibold">Wat je nooit meer nodig hebt</p>
                {[
                  'Ziektedagen & vervanging regelen',
                  'Vakantiegeld & opzegtermijn',
                  'Functioneringsgesprekken',
                  'Content briefen & corrigeren',
                  'Maandelijkse salarisadministratie',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-[#00b4d8] flex-shrink-0 text-xs">✓</span>
                    <span className="text-[#3d6080] font-dm text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-4 mt-auto" style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)' }}>
                <p className="text-[#0d1f3c] font-dm text-sm leading-relaxed">
                  <span className="font-bold">Conclusie:</span> voor minder dan één maandsalaris filmen wij een volledige maand professionele content — geen gedoe, geen overhead, gewoon resultaat.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voorbeelden */}
      <section className="py-20 px-6" style={{ background: '#edf5ff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="accent-pill mb-4 inline-flex">Voorbeelden</span>
            <h2 className="font-syne font-extrabold text-[#0d1f3c] mt-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              Zo ziet het er in de praktijk uit
            </h2>
            <p className="text-[#3d6080] font-dm mt-3 max-w-xl mx-auto text-sm">
              Klik op play en hoor hoe de video's klinken — dit is wat uw bezoekers te zien krijgen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {EXAMPLE_VIDEOS.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0d1f3c] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
            Klaar om te groeien?
          </h2>
          <p className="text-white/55 font-dm mb-8 leading-relaxed">
            Plan een gratis kennismaking en ontdek wat één filmdag kan opleveren voor uw webshop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center justify-center bg-[#00b4d8] text-white font-dm font-semibold px-8 py-4 rounded-full hover:bg-[#0099bb] transition-all duration-200 hover:scale-105"
            >
              Neem contact op →
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center border border-white/20 text-white/70 hover:text-white font-dm font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:border-white/40"
            >
              Terug naar home
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

function VideoCard({ video, index }: { video: typeof EXAMPLE_VIDEOS[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden bg-[#0d1f3c] cursor-pointer group"
      style={{ aspectRatio: '9/16' }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Platform badge */}
      <div className="absolute top-3 left-3">
        <span className="text-xs font-dm font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: video.platform === 'TikTok' ? 'rgba(1,1,1,0.7)' : 'rgba(139,92,246,0.35)',
            border: video.platform === 'TikTok' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(139,92,246,0.5)',
            color: 'white',
          }}>
          {video.platform === 'TikTok' ? '♪ TikTok' : '▷ Reels'}
        </span>
      </div>

      {/* Play/pause button */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <span className="text-white text-xl ml-1">{playing ? '⏸' : '▶'}</span>
        </div>
      </div>

      {/* Sound toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-10 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors"
      >
        <span className="text-white text-xs">{muted ? '🔇' : '🔊'}</span>
      </button>

      {/* Title */}
      <div className="absolute bottom-3 left-3 right-3">
        <p className="text-white font-dm font-semibold text-xs">{video.title}</p>
      </div>
    </motion.div>
  )
}
