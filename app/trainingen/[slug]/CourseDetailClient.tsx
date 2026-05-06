'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const COURSE_EMOJIS: Record<string, string> = {
  'basics-van-claude': '🤖',
  'ai-prompting': '✍️',
  'ai-beeldcreatie': '🎨',
}

export default function CourseDetailClient({ course, modules, user, hasAccess }: {
  course: any, modules: any[], user: any, hasAccess: boolean
}) {
  const totalLessons = modules.reduce((acc: number, m: any) => acc + (m.lessons?.length ?? 0), 0)

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-[#e8f0f8] bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/trainingen" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">← Alle trainingen</Link>
            {user
              ? <Link href="/account" className="bg-[#0d1f3c] text-white font-dm font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#00b4d8] transition-colors">👤 Account</Link>
              : <Link href="/login" className="bg-[#00b4d8] text-white font-dm font-semibold text-sm px-4 py-2 rounded-full">Inloggen</Link>
            }
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)' }} className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-dm font-bold mb-5"
              style={{ background: 'rgba(0,180,216,0.2)', color: '#00b4d8', border: '1px solid rgba(0,180,216,0.3)' }}>
              🎓 Online Training · {course.level}
            </span>
            <h1 className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.1 }}>
              {course.title}
            </h1>
            {course.tagline && <p className="text-[#7a9bb8] font-dm text-lg mb-6 leading-relaxed">{course.tagline}</p>}

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="flex items-center gap-2 text-[#7a9bb8] font-dm text-sm">
                <span>📚</span><span>{totalLessons} lessen</span>
              </div>
              <div className="flex items-center gap-2 text-[#7a9bb8] font-dm text-sm">
                <span>⏱</span><span>{course.duration_minutes} minuten</span>
              </div>
              <div className="flex items-center gap-2 text-[#7a9bb8] font-dm text-sm">
                <span>🏆</span><span>{course.level}</span>
              </div>
            </div>

            {hasAccess ? (
              <Link href={`/trainingen/${course.slug}/leer`}>
                <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-syne font-bold text-[#0d1f3c] text-base cursor-pointer"
                  style={{ background: '#00b4d8' }}>
                  ▶ Start training →
                </motion.div>
              </Link>
            ) : (
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-syne font-extrabold text-white text-4xl">€ {Number(course.price).toFixed(0)},—</span>
                <a href={`https://keesvogel.plugandpay.com/${course.slug}`} target="_blank" rel="noopener noreferrer">
                  <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-syne font-bold text-[#0d1f3c] text-base cursor-pointer"
                    style={{ background: '#00b4d8' }}>
                    Koop nu →
                  </motion.div>
                </a>
              </div>
            )}
          </motion.div>

          {/* Emoji thumbnail */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="rounded-2xl flex items-center justify-center h-56 lg:h-72"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {course.thumbnail
              ? <Image src={course.thumbnail} alt={course.title} fill className="object-cover rounded-2xl" />
              : <span className="text-8xl">{COURSE_EMOJIS[course.slug] ?? '🎓'}</span>
            }
          </motion.div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="font-syne font-bold text-[#0d1f3c] text-2xl mb-8">Wat ga je leren?</h2>

        {modules.length === 0 ? (
          <div className="rounded-2xl p-8 text-center" style={{ background: '#f8fbff', border: '1px solid #e8f0f8' }}>
            <p className="text-[#7a9bb8] font-dm">Curriculum wordt binnenkort toegevoegd.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {modules.map((module: any, mi: number) => (
              <motion.div key={module.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: mi * 0.08 }}
                className="rounded-2xl overflow-hidden" style={{ border: '1px solid #e8f0f8' }}>
                <div className="flex items-center gap-3 p-4" style={{ background: '#f8fbff' }}>
                  <span className="w-7 h-7 rounded-full bg-[#0d1f3c] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {mi + 1}
                  </span>
                  <h3 className="font-syne font-bold text-[#0d1f3c] text-sm">{module.title}</h3>
                  <span className="ml-auto text-[#7a9bb8] font-dm text-xs">{module.lessons?.length ?? 0} lessen</span>
                </div>
                {module.lessons?.sort((a: any, b: any) => a.order_index - b.order_index).map((lesson: any) => (
                  <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 border-t border-[#e8f0f8]">
                    <span className="text-sm">{lesson.is_free_preview ? '▶' : '🔒'}</span>
                    <span className="font-dm text-[#3d6080] text-sm flex-1">{lesson.title}</span>
                    {lesson.duration_seconds > 0 && (
                      <span className="text-[#7a9bb8] font-dm text-xs">
                        {Math.floor(lesson.duration_seconds / 60)}:{String(lesson.duration_seconds % 60).padStart(2, '0')}
                      </span>
                    )}
                    {lesson.is_free_preview && (
                      <span className="text-xs font-dm font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(0,180,216,0.1)', color: '#0099bb' }}>Gratis preview</span>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        {!hasAccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-12 rounded-3xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0d1f3c, #1a3a6b)' }}>
            <h3 className="font-syne font-bold text-white text-xl mb-2">Klaar om te beginnen?</h3>
            <p className="text-[#7a9bb8] font-dm text-sm mb-5">Eenmalig aanschaffen, levenslang toegang.</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <span className="font-syne font-extrabold text-white text-3xl">€ {Number(course.price).toFixed(0)},—</span>
              <a href={`https://keesvogel.plugandpay.com/${course.slug}`} target="_blank" rel="noopener noreferrer">
                <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-syne font-bold text-[#0d1f3c] text-sm cursor-pointer"
                  style={{ background: '#00b4d8' }}>
                  Koop nu →
                </motion.div>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
