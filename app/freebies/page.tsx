'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const FREEBIES = [
  {
    key: 'business-legendes',
    title: '8 Business-legendes Team',
    description: 'Combineer de kennis van 8 business legendes in één Claude skill. Altijd de juiste mindset en strategie bij de hand.',
    image: '/Business-legends.png',
    badge: 'Claude Skill',
    value: '€ 97 waarde',
  },
  {
    key: 'bolcom-fotograaf',
    title: 'Bol.com Fotograaf Eva',
    description: 'Eva optimaliseert je productfoto\'s automatisch voor Bol.com. Meer zichtbaarheid, hogere conversie — direct resultaat.',
    image: '/Eva.png',
    badge: 'Claude Skill',
    value: '€ 67 waarde',
  },
  {
    key: 'linkedin-fotograaf',
    title: 'LinkedIn Fotograaf',
    description: 'Van selfie naar professionele LinkedIn foto in 5 minuten. 100% AI-gegenereerd, klaar in 1 klik.',
    image: '/linkedin.png',
    badge: 'Claude Skill',
    value: '€ 47 waarde',
  },
]

type Step = 'loading' | 'form' | 'unlocked'

export default function FreebiesPage() {
  const [step, setStep] = useState<Step>('loading')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newsletterConsent, setNewsletterConsent] = useState(false)

  // Check localStorage for returning visitors
  useEffect(() => {
    const saved = localStorage.getItem('kv_freebies_user')
    if (saved) {
      const user = JSON.parse(saved)
      setEmail(user.email)
      setName(user.name)
      setStep('unlocked')
    } else {
      setStep('form')
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/freebies/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, newsletterConsent }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Er ging iets mis, probeer opnieuw.')
        return
      }

      // Save to localStorage for returning visits
      localStorage.setItem('kv_freebies_user', JSON.stringify({ email, name }))
      setStep('unlocked')
    } catch {
      setError('Er ging iets mis, probeer opnieuw.')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'loading') return null

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

      <div className="pt-24 pb-24 px-6 max-w-5xl mx-auto">

        <AnimatePresence mode="wait">

          {/* STEP 1: Form */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className="text-center mb-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase mb-5"
                    style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
                    🎁 3 gratis Claude Skills
                  </span>
                  <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-3"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1 }}>
                    Jouw gratis AI tools
                    <br />
                    <span style={{ color: '#00b4d8' }}>staan klaar</span>
                  </h1>
                  <p className="text-[#3d6080] font-dm text-base max-w-md mx-auto">
                    Vul je naam en e-mail in — dan ontgrendel ik ze direct voor je.
                    <strong className="text-[#0d1f3c]"> Geen creditcard. Altijd gratis.</strong>
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                {/* Left: Locked previews (3/5 width) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-3 flex flex-col gap-4"
                >
                  {FREEBIES.map((f, i) => (
                    <div key={f.key} className="bg-white rounded-2xl overflow-hidden flex items-center gap-4 p-4"
                      style={{ border: '1px solid #e8f0f8', boxShadow: '0 2px 12px rgba(0,100,180,0.04)' }}>
                      {/* Blurred image */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={f.image} alt={f.title} fill className="object-cover blur-sm scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                          <span className="text-lg">🔒</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-dm font-bold px-2 py-0.5 rounded-full"
                            style={{ background: 'rgba(0,180,216,0.1)', color: '#0099bb' }}>
                            {f.badge}
                          </span>
                          <span className="text-xs font-dm text-[#7a9bb8] line-through">{f.value}</span>
                          <span className="text-xs font-dm font-bold text-green-600">GRATIS</span>
                        </div>
                        <h3 className="font-syne font-bold text-[#0d1f3c] text-sm truncate">{f.title}</h3>
                      </div>
                      <div className="text-[#c8dcea] text-lg flex-shrink-0">→</div>
                    </div>
                  ))}

                  {/* Total value */}
                  <div className="rounded-2xl p-4 flex items-center justify-between"
                    style={{ background: 'linear-gradient(135deg, #0d1f3c, #1a3a6b)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <p className="text-[#7a9bb8] font-dm text-xs">Totale waarde</p>
                      <p className="text-white font-syne font-bold text-lg"><s className="text-[#7a9bb8] text-sm font-normal mr-2">€ 211</s>€ 0,—</p>
                    </div>
                    <div className="text-3xl">🎁</div>
                  </div>
                </motion.div>

                {/* Right: Form (2/5 width) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <div className="rounded-3xl p-7 sticky top-24"
                    style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 8px 40px rgba(0,100,180,0.08)' }}>

                    <h2 className="font-syne font-extrabold text-[#0d1f3c] text-xl mb-1">Ontgrendel nu gratis</h2>
                    <p className="text-[#7a9bb8] font-dm text-sm mb-5">Eenmalig invullen — daarna altijd toegang.</p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                      <div>
                        <label className="block font-dm text-xs font-semibold text-[#0d1f3c] mb-1.5 uppercase tracking-wide">Voornaam</label>
                        <input
                          type="text"
                          placeholder="Jan"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none transition-all"
                          style={{ border: '1.5px solid #e0ecf5', background: '#f8fbff' }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#00b4d8')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e0ecf5')}
                        />
                      </div>
                      <div>
                        <label className="block font-dm text-xs font-semibold text-[#0d1f3c] mb-1.5 uppercase tracking-wide">E-mailadres</label>
                        <input
                          type="email"
                          placeholder="jan@mijnwebshop.nl"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none transition-all"
                          style={{ border: '1.5px solid #e0ecf5', background: '#f8fbff' }}
                          onFocus={e => (e.currentTarget.style.borderColor = '#00b4d8')}
                          onBlur={e => (e.currentTarget.style.borderColor = '#e0ecf5')}
                        />
                      </div>

                      {/* Newsletter opt-in checkbox — verplicht onder AVG */}
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <input
                            type="checkbox"
                            checked={newsletterConsent}
                            onChange={e => setNewsletterConsent(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                            style={{
                              borderColor: newsletterConsent ? '#00b4d8' : '#c8dcea',
                              background: newsletterConsent ? '#00b4d8' : 'white',
                            }}
                          >
                            {newsletterConsent && <span className="text-white text-xs font-bold">✓</span>}
                          </div>
                        </div>
                        <span className="text-[#3d6080] font-dm text-xs leading-relaxed">
                          Ja, ik ontvang graag de gratis wekelijkse AI tips van KeesVogel.ai per e-mail.
                          Ik kan mij altijd uitschrijven via de afmeldlink in elke mail. Lees ons{' '}
                          <Link href="/privacy" className="text-[#00b4d8] underline hover:text-[#0099bb]">
                            privacybeleid
                          </Link>.
                        </span>
                      </label>

                      {error && <p className="text-red-500 font-dm text-xs">{error}</p>}

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-full font-syne font-bold text-white text-sm mt-1"
                        style={{ background: loading ? '#7a9bb8' : 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)', boxShadow: '0 4px 20px rgba(0,180,216,0.25)' }}
                      >
                        {loading ? '⏳ Even geduld...' : '🎁 Ja, geef mij gratis toegang →'}
                      </motion.button>
                    </form>

                    {/* Trust */}
                    <div className="mt-4 flex flex-col gap-1.5">
                      {['Geen creditcard nodig', 'Altijd uitschrijven mogelijk', 'Wekelijkse AI tips cadeau'].map(t => (
                        <div key={t} className="flex items-center gap-2">
                          <span className="text-green-500 text-xs">✓</span>
                          <span className="text-[#7a9bb8] font-dm text-xs">{t}</span>
                        </div>
                      ))}
                    </div>

                    {/* Social proof */}
                    <div className="mt-5 pt-4 border-t border-[#e8f0f8] flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {['🧑‍💼', '👩‍💼', '👨‍💻', '👩‍🔬'].map((e, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-[#f0f7ff] flex items-center justify-center text-xs">{e}</div>
                        ))}
                      </div>
                      <p className="text-[#7a9bb8] font-dm text-xs">
                        <strong className="text-[#0d1f3c]">460+ ondernemers</strong> gingen je voor
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Unlocked */}
          {step === 'unlocked' && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Welcome banner */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                  className="text-5xl mb-4"
                >
                  🎉
                </motion.div>
                <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-2"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  Welkom terug, <span style={{ color: '#00b4d8' }}>{name.split(' ')[0]}!</span>
                </h1>
                <p className="text-[#3d6080] font-dm max-w-md mx-auto">
                  Je 3 gratis AI skills staan klaar. Klik op een skill om hem direct te downloaden.
                </p>

                {/* Reset option */}
                <button
                  onClick={() => { localStorage.removeItem('kv_freebies_user'); setName(''); setEmail(''); setStep('form') }}
                  className="mt-3 text-[#7a9bb8] font-dm text-xs hover:text-[#00b4d8] transition-colors underline underline-offset-2"
                >
                  Niet {name.split(' ')[0]}? Klik hier
                </button>
              </motion.div>

              {/* Freebie cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {FREEBIES.map((freebie, i) => (
                  <motion.div
                    key={freebie.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl overflow-hidden bg-white flex flex-col group"
                    style={{ border: '1px solid #e8f0f8', boxShadow: '0 4px 30px rgba(0,100,180,0.06)' }}
                  >
                    {/* Image */}
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                      <Image
                        src={freebie.image}
                        alt={freebie.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-xs font-dm font-bold px-3 py-1 rounded-full"
                          style={{ background: 'rgba(0,180,216,0.9)', color: 'white' }}>
                          {freebie.badge}
                        </span>
                        <span className="text-xs font-dm font-bold px-2 py-1 rounded-full"
                          style={{ background: 'rgba(22,163,74,0.9)', color: 'white' }}>
                          GRATIS
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

              {/* CTA block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-3xl p-8 text-center"
                style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)' }}
              >
                <h3 className="font-syne font-bold text-white text-xl mb-2">
                  Wil je elke week nieuwe AI tips?
                </h3>
                <p className="text-[#7a9bb8] font-dm text-sm mb-5 max-w-md mx-auto">
                  Join de Claude Club — 460+ webshop eigenaren die AI al inzetten voor meer omzet.
                </p>
                <motion.a
                  href="https://www.skool.com/de-claude-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-syne font-bold text-[#0d1f3c] text-sm"
                  style={{ background: '#00b4d8' }}
                >
                  Join de Claude Club gratis →
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
