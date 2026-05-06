'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const LEVEL_COLORS: Record<string, string> = {
  Beginner: '#22c55e',
  Gevorderd: '#f59e0b',
  Expert: '#ef4444',
}

const COURSE_EMOJIS: Record<string, string> = {
  'basics-van-claude': '🤖',
  'ai-prompting': '✍️',
  'ai-beeldcreatie': '🎨',
}

export default function TrainingenClient({ courses, user, accessCourseIds }: {
  courses: any[], user: any, accessCourseIds: string[]
}) {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-[#e8f0f8] bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-8 w-auto" /></Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors hidden md:block">Home</Link>
            {user
              ? <Link href="/account" className="inline-flex items-center gap-2 bg-[#0d1f3c] text-white font-dm font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#00b4d8] transition-colors">👤 Mijn account</Link>
              : <Link href="/login" className="inline-flex items-center gap-2 bg-[#00b4d8] text-white font-dm font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#0099bb] transition-colors">Inloggen</Link>
            }
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
            🎓 Online Trainingen
          </span>
          <h1 className="font-syne font-extrabold text-[#0d1f3c] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Leer AI toepassen<br /><span style={{ color: '#00b4d8' }}>voor jouw business</span>
          </h1>
          <p className="text-[#3d6080] font-dm text-lg max-w-xl mx-auto leading-relaxed">
            Praktische trainingen speciaal voor ondernemers. Geen theorie — directe resultaten.
          </p>
        </motion.div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => {
            const hasAccess = accessCourseIds.includes(course.id)
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link href={`/trainingen/${course.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden h-full flex flex-col"
                    style={{ border: '1px solid #e8f0f8', boxShadow: '0 4px 24px rgba(0,100,180,0.06)', transition: 'box-shadow 0.2s', }}>
                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%)' }}>
                      {course.thumbnail
                        ? <Image src={course.thumbnail} alt={course.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-6xl">{COURSE_EMOJIS[course.slug] ?? '🎓'}</span>
                          </div>
                        )
                      }
                      {hasAccess && (
                        <div className="absolute top-3 right-3">
                          <span className="text-xs font-dm font-bold px-3 py-1 rounded-full"
                            style={{ background: 'rgba(34,197,94,0.9)', color: 'white' }}>
                            ✓ Toegang
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-dm font-bold px-2 py-1 rounded-full text-white"
                          style={{ background: `${LEVEL_COLORS[course.level] ?? '#00b4d8'}cc` }}>
                          {course.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h2 className="font-syne font-bold text-[#0d1f3c] text-base leading-snug group-hover:text-[#00b4d8] transition-colors">
                        {course.title}
                      </h2>
                      {course.tagline && (
                        <p className="text-[#3d6080] font-dm text-sm leading-relaxed flex-1">{course.tagline}</p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-[#e8f0f8]">
                        <span className="font-syne font-extrabold text-[#0d1f3c] text-xl">
                          € {Number(course.price).toFixed(0)},—
                        </span>
                        <span className="font-dm font-semibold text-sm px-4 py-2 rounded-full text-white"
                          style={{ background: hasAccess ? '#22c55e' : 'linear-gradient(135deg, #0d1f3c, #00b4d8)' }}>
                          {hasAccess ? 'Start training →' : 'Meer info →'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        {!user && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-14 rounded-3xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #0d1f3c, #1a3a6b)' }}>
            <h3 className="font-syne font-bold text-white text-xl mb-2">Maak gratis een account aan</h3>
            <p className="text-[#7a9bb8] font-dm text-sm mb-5">En krijg direct toegang tot alle freebies. Betaalde trainingen koop je daarna eenvoudig bij.</p>
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-syne font-bold text-[#0d1f3c] text-sm cursor-pointer"
                style={{ background: '#00b4d8' }}>
                Gratis account aanmaken →
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}
