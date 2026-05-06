'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const FREEBIES = [
  { key: 'business-legendes', title: '8 Business-legendes Team', image: '/Business-legends.png' },
  { key: 'bolcom-fotograaf', title: 'Bol.com Fotograaf Eva', image: '/Eva.png' },
  { key: 'linkedin-fotograaf', title: 'LinkedIn Fotograaf', image: '/linkedin.png' },
]

export default function AccountClient({ user, profile, courses }: {
  user: any, profile: any, courses: any[]
}) {
  const router = useRouter()
  const supabase = createClient()
  const firstName = profile?.name?.split(' ')[0] || user.email?.split('@')[0]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #f0f7ff 100%)' }}>
      {/* Navbar */}
      <nav className="border-b border-[#e8f0f8] bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/trainingen" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">Trainingen</Link>
            <button onClick={handleLogout} className="text-[#7a9bb8] font-dm text-sm hover:text-[#0d1f3c] transition-colors">Uitloggen</button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
            Hey {firstName}! 👋
          </h1>
          <p className="text-[#3d6080] font-dm">Welkom in jouw persoonlijke dashboard.</p>
        </motion.div>

        {/* Freebies */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl">🎁 Jouw gratis AI Skills</h2>
            <span className="text-xs font-dm text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full border border-green-200">Alles unlocked</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FREEBIES.map((f, i) => (
              <motion.div key={f.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden group" style={{ border: '1px solid #e8f0f8', boxShadow: '0 2px 16px rgba(0,100,180,0.04)' }}>
                <div className="relative h-36 overflow-hidden">
                  <Image src={f.image} alt={f.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-syne font-bold text-[#0d1f3c] text-sm mb-3">{f.title}</h3>
                  <a href={`/api/freebies/download/${f.key}?email=${encodeURIComponent(user.email)}`}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full font-dm font-semibold text-white text-xs"
                    style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)' }}>
                    ⬇ Download gratis
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Trainingen */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-syne font-bold text-[#0d1f3c] text-xl">🎓 Mijn Trainingen</h2>
            <Link href="/trainingen" className="text-[#00b4d8] font-dm text-sm hover:underline">Bekijk alle trainingen →</Link>
          </div>

          {courses.length === 0 ? (
            <div className="rounded-2xl p-8 text-center" style={{ background: 'white', border: '1px solid #e8f0f8' }}>
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-syne font-bold text-[#0d1f3c] mb-2">Nog geen trainingen</h3>
              <p className="text-[#3d6080] font-dm text-sm mb-5">Ontdek onze trainingen en begin vandaag nog met leren.</p>
              <Link href="/trainingen">
                <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-syne font-bold text-white text-sm cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #00b4d8 100%)' }}>
                  Bekijk trainingen →
                </motion.div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course: any) => (
                <Link href={`/trainingen/${course.slug}/leer`} key={course.id}>
                  <motion.div whileHover={{ y: -3 }} className="bg-white rounded-2xl p-5 flex items-center gap-4 group cursor-pointer"
                    style={{ border: '1px solid #e8f0f8', boxShadow: '0 2px 16px rgba(0,100,180,0.04)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: 'rgba(0,180,216,0.08)' }}>🎓</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-syne font-bold text-[#0d1f3c] text-sm truncate">{course.title}</h3>
                      <p className="text-[#7a9bb8] font-dm text-xs mt-0.5">{course.level}</p>
                    </div>
                    <span className="text-[#00b4d8] group-hover:translate-x-1 transition-transform">→</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  )
}
