'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const FREEBIES_PREVIEW = [
  { title: '8 Business-legendes Team', image: '/Business-legends.png' },
  { title: 'Bol.com Fotograaf Eva', image: '/Eva.png' },
  { title: 'LinkedIn Fotograaf', image: '/linkedin.png' },
]

function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/account'
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [newsletterConsent, setNewsletterConsent] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        data: { name, newsletter_consent: newsletterConsent },
      },
    })

    if (error) {
      setError('Er ging iets mis. Probeer opnieuw.')
      setLoading(false)
      return
    }

    // Save consent to DB
    if (newsletterConsent) {
      await fetch('/api/freebies/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, newsletterConsent }),
      })
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-6xl mb-4">📬</div>
        <h2 className="font-syne font-extrabold text-[#0d1f3c] text-2xl mb-3">Check je inbox!</h2>
        <p className="text-[#3d6080] font-dm leading-relaxed max-w-sm mx-auto">
          We stuurden een magic link naar <strong className="text-[#0d1f3c]">{email}</strong>.
          Klik op de link in de mail om in te loggen — geen wachtwoord nodig.
        </p>
        <p className="text-[#7a9bb8] font-dm text-xs mt-4">Niet ontvangen? Check je spam of <button onClick={() => setSent(false)} className="underline hover:text-[#00b4d8]">probeer opnieuw</button>.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block font-dm text-xs font-semibold text-[#0d1f3c] mb-1.5 uppercase tracking-wide">Voornaam</label>
        <input
          type="text"
          placeholder="Jan"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none"
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
          className="w-full px-4 py-3 rounded-xl font-dm text-[#0d1f3c] text-sm outline-none"
          style={{ border: '1.5px solid #e0ecf5', background: '#f8fbff' }}
          onFocus={e => (e.currentTarget.style.borderColor = '#00b4d8')}
          onBlur={e => (e.currentTarget.style.borderColor = '#e0ecf5')}
        />
      </div>

      {/* AVG-compliant newsletter opt-in */}
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative flex-shrink-0 mt-0.5">
          <input type="checkbox" checked={newsletterConsent} onChange={e => setNewsletterConsent(e.target.checked)} className="sr-only" />
          <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
            style={{ borderColor: newsletterConsent ? '#00b4d8' : '#c8dcea', background: newsletterConsent ? '#00b4d8' : 'white' }}>
            {newsletterConsent && <span className="text-white text-xs font-bold">✓</span>}
          </div>
        </div>
        <span className="text-[#3d6080] font-dm text-xs leading-relaxed">
          Ja, ik wil wekelijkse AI tips ontvangen van KeesVogel.ai. Altijd uitschrijven via de mail. Lees ons{' '}
          <Link href="/privacy" className="text-[#00b4d8] underline">privacybeleid</Link>.
        </span>
      </label>

      {error && <p className="text-red-500 font-dm text-xs">{error}</p>}

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-full font-syne font-bold text-white text-sm"
        style={{ background: loading ? '#7a9bb8' : 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)', boxShadow: '0 4px 20px rgba(0,180,216,0.25)' }}
      >
        {loading ? '⏳ Even geduld...' : '✉️ Stuur mij een magic link →'}
      </motion.button>

      <div className="flex flex-col gap-1.5 mt-1">
        {['Geen wachtwoord nodig', 'Gratis toegang tot alle freebies', 'Altijd uitschrijven mogelijk'].map(t => (
          <div key={t} className="flex items-center gap-2">
            <span className="text-green-500 text-xs">✓</span>
            <span className="text-[#7a9bb8] font-dm text-xs">{t}</span>
          </div>
        ))}
      </div>
    </form>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0f7ff 100%)' }}>
      <nav className="border-b border-[#e8f0f8] bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" /></Link>
          <Link href="/" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">← Terug naar website</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: benefits */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
            🔑 Jouw gratis account
          </span>
          <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.1 }}>
            Eén account.<br /><span style={{ color: '#00b4d8' }}>Alles unlocked.</span>
          </h1>
          <p className="text-[#3d6080] font-dm mb-8 leading-relaxed">
            Log in of maak gratis een account aan. Je krijgt direct toegang tot alle freebies en kunt trainingen volgen.
          </p>

          {/* Freebies preview */}
          <div className="flex flex-col gap-3 mb-6">
            <p className="font-syne font-bold text-[#0d1f3c] text-sm">Gratis inbegrepen:</p>
            {FREEBIES_PREVIEW.map((f) => (
              <div key={f.title} className="flex items-center gap-3 bg-white rounded-xl p-3"
                style={{ border: '1px solid #e8f0f8' }}>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={f.image} alt={f.title} fill className="object-cover" />
                </div>
                <span className="font-dm text-[#0d1f3c] text-sm font-medium">{f.title}</span>
                <span className="ml-auto text-green-600 font-dm text-xs font-bold">GRATIS</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#e8f0f8]">
            <div className="flex -space-x-2">
              {['🧑‍💼', '👩‍💼', '👨‍💻', '👩‍🔬'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#f0f7ff] flex items-center justify-center text-sm">{e}</div>
              ))}
            </div>
            <p className="text-[#7a9bb8] font-dm text-sm"><strong className="text-[#0d1f3c]">460+ ondernemers</strong> gingen je voor</p>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="rounded-3xl p-8" style={{ background: 'white', border: '1px solid #e8f0f8', boxShadow: '0 8px 40px rgba(0,100,180,0.08)' }}>
            <h2 className="font-syne font-extrabold text-[#0d1f3c] text-xl mb-1">Inloggen of aanmelden</h2>
            <p className="text-[#7a9bb8] font-dm text-sm mb-6">Nieuw of terugkerend — één formulier voor alles.</p>
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
