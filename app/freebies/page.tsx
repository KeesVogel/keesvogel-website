'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const FREEBIES = [
  {
    key: 'business-legendes',
    title: '8 Business-legendes Team',
    description: 'Leer van 8 succesvolle ondernemers en hun AI-strategieën. Exclusieve Claude skills speciaal voor jouw business.',
    image: '/Business-legends.png',
    badge: 'Claude Skill',
  },
  {
    key: 'bolcom-fotograaf',
    title: 'Bol.com Fotograaf Eva',
    description: 'AI-tool die je productfoto\'s automatisch optimaliseert voor Bol.com. Hogere zichtbaarheid, meer conversies.',
    image: '/Eva.png',
    badge: 'Claude Skill',
  },
  {
    key: 'linkedin-fotograaf',
    title: 'LinkedIn Fotograaf',
    description: 'Creëer professionele LinkedIn content met AI. Van profielfoto\'s tot post-templates — alles inbegrepen.',
    image: '/linkedin.png',
    badge: 'Claude Skill',
  },
]

export default function FreebiesPage() {
  const [step, setStep] = useState<'form' | 'unlocked'>('form')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/freebies/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Er ging iets mis, probeer opnieuw.')
        return
      }

      setStep('unlocked')
    } catch {
      setError('Er ging iets mis, probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0f7ff 100%)' }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8f0f8] bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" />
          </Link>
          <Link href="/" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">
            ← Terug naar website
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-6 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
            🎁 Gratis AI Skills
          </span>
          <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Jouw gratis{' '}
            <span style={{ color: '#00b4d8' }}>AI tools</span>
          </h1>
          <p className="text-[#3d6080] font-dm text-lg max-w-xl mx-auto leading-relaxed">
            Vul je naam en e-mail in en krijg direct toegang tot 3 krachtige Claude Skills — gratis.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* STEP 1: Form */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
            >
              {/* Left: Preview cards (blurred) */}
              <div className="relative">
                <div className="grid grid-cols-1 gap-4">
                  {FREEBIES.map((f, i) => (
                    <motion.div
                      key={f.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl overflow-hidden border border-[#e8f0f8] bg-white flex items-center gap-4 p-4"
                      style={{ filter: 'blur(2px)', pointerEvents: 'none' }}
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image src={f.image} alt={f.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-xs font-dm font-bold text-[#00b4d8] uppercase tracking-wider">{f.badge}</span>
                        <h3 className="font-syne font-bold text-[#0d1f3c] text-sm mt-0.5">{f.title}</h3>
                      </div>
                      <div className="ml-auto">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">🔒</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Overlay lock */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.4)' }}>
                  <div className="text-center">
                    <div className="text-5xl mb-2">🔒</div>
                    <p className="font-syne font-bold text-[#0d1f3c] text-sm">Vul het formulier in om te ontgrendelen</p>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl p-8"
                style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 4px 40px rgba(0,100,180,0.06)' }}
              >
                <div className="mb-6">
                  <h2 className="font-syne font-extrabold text-[#0d1f3c] text-2xl mb-2">Ontgrendel alle freebies</h2>
                  <p className="text-[#7a9bb8] font-dm text-sm">Geen wachtwoord nodig — alleen je naam en e-mail.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-dm text-sm font-semibold text-[#0d1f3c] mb-1.5">Jouw naam</label>
                    <input
                      type="text"
                      placeholder="Jan de Vries"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid #e0ecf5',
                        background: '#f8fbff',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#00b4d8')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#e0ecf5')}
                    />
                  </div>

                  <div>
                    <label className="block font-dm text-sm font-semibold text-[#0d1f3c] mb-1.5">Jouw e-mailadres</label>
                    <input
                      type="email"
                      placeholder="jan@mijnwebshop.nl"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none transition-all"
                      style={{
                        border: '1.5px solid #e0ecf5',
                        background: '#f8fbff',
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#00b4d8')}
                      onBlur={e => (e.currentTarget.style.borderColor = '#e0ecf5')}
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 font-dm text-sm">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-full font-syne font-bold text-white text-sm transition-all disabled:opacity-70"
                    style={{ background: loading ? '#7a9bb8' : 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)' }}
                  >
                    {loading ? '⏳ Even geduld...' : '🎁 Ontgrendel mijn gratis AI skills →'}
                  </motion.button>

                  <p className="text-[#7a9bb8] font-dm text-xs text-center leading-relaxed">
                    Je ontvangt ook onze nieuwsbrief met wekelijkse AI tips voor webshop eigenaren. Altijd uitschrijven mogelijk.
                  </p>
                </form>

                {/* Social proof */}
                <div className="mt-6 pt-6 border-t border-[#e8f0f8] flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['👨‍💼', '👩‍💼', '🧑‍💻'].map((e, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#f0f7ff] flex items-center justify-center text-sm">{e}</div>
                    ))}
                  </div>
                  <p className="text-[#7a9bb8] font-dm text-xs">
                    <strong className="text-[#0d1f3c]">460+ ondernemers</strong> gingen je voor
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 2: Unlocked freebies */}
          {step === 'unlocked' && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Success banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="font-syne font-extrabold text-[#0d1f3c] text-3xl mb-2">
                  Welkom, {name.split(' ')[0]}!
                </h2>
                <p className="text-[#3d6080] font-dm">
                  Je 3 gratis AI skills zijn ontgrendeld. Download ze hieronder.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-dm"
                  style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
                  ✉️ Check ook je inbox — we sturen je een bevestiging!
                </div>
              </motion.div>

              {/* Freebie cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FREEBIES.map((freebie, i) => (
                  <motion.div
                    key={freebie.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl overflow-hidden bg-white flex flex-col"
                    style={{ border: '1px solid #e8f0f8', boxShadow: '0 4px 30px rgba(0,100,180,0.06)' }}
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 bg-gray-100">
                      <Image src={freebie.image} alt={freebie.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-dm font-bold px-3 py-1 rounded-full"
                          style={{ background: 'rgba(0,180,216,0.9)', color: 'white' }}>
                          {freebie.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-syne font-bold text-[#0d1f3c] text-base">{freebie.title}</h3>
                      <p className="text-[#3d6080] font-dm text-sm leading-relaxed flex-1">{freebie.description}</p>

                      <motion.a
                        href={`/api/freebies/download/${freebie.key}?email=${encodeURIComponent(email)}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-full font-syne font-bold text-white text-sm"
                        style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)' }}
                      >
                        ⬇ Download gratis
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-center rounded-3xl p-8"
                style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)' }}
              >
                <h3 className="font-syne font-bold text-white text-xl mb-2">Wil je meer leren over AI voor jouw webshop?</h3>
                <p className="text-[#7a9bb8] font-dm text-sm mb-5">Join de Claude Club — 460+ ondernemers die AI al inzetten.</p>
                <motion.a
                  href="https://www.skool.com/de-claude-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-bold text-[#0d1f3c] text-sm"
                  style={{ background: '#00b4d8' }}
                >
                  Join de Claude Club →
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
