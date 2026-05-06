'use client'

import { useState, useOptimistic, useTransition } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LeerClient({ course, modules, allLessons, progress, activeLessonId, userId }: {
  course: any, modules: any[], allLessons: any[], progress: Record<string, boolean>,
  activeLessonId: string | null, userId: string
}) {
  const router = useRouter()
  const supabase = createClient()
  const [activeId, setActiveId] = useState(activeLessonId)
  const [done, setDone] = useState<Record<string, boolean>>(progress)
  const [isPending, startTransition] = useTransition()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeLesson = allLessons.find(l => l.id === activeId) || allLessons[0]
  const completedCount = Object.values(done).filter(Boolean).length
  const progressPct = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0

  const currentIndex = allLessons.findIndex(l => l.id === activeId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  async function markComplete(lessonId: string, completed: boolean) {
    setDone(prev => ({ ...prev, [lessonId]: completed }))
    await supabase.from('lesson_progress').upsert(
      { user_id: userId, lesson_id: lessonId, completed, completed_at: completed ? new Date().toISOString() : null },
      { onConflict: 'user_id,lesson_id' }
    )
  }

  function goToLesson(id: string) {
    setActiveId(id)
    setSidebarOpen(false)
    router.replace(`?les=${id}`, { scroll: false })
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8fbff] overflow-hidden">
      {/* Top bar */}
      <div className="h-14 flex items-center px-4 gap-4 flex-shrink-0 border-b border-[#e8f0f8] bg-white z-20">
        <Link href="/account" className="text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors flex items-center gap-1">
          <span>←</span><span className="hidden sm:block">Mijn account</span>
        </Link>
        <div className="w-px h-5 bg-[#e8f0f8]" />
        <span className="font-syne font-bold text-[#0d1f3c] text-sm flex-1 truncate">{course.title}</span>

        {/* Progress bar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-32 h-2 rounded-full bg-[#e8f0f8] overflow-hidden">
            <motion.div className="h-full rounded-full bg-[#00b4d8]" initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} />
          </div>
          <span className="font-dm text-xs text-[#7a9bb8]">{progressPct}%</span>
        </div>

        {/* Mobile sidebar toggle */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 text-[#3d6080]">☰</button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <aside className={`
          w-72 border-r border-[#e8f0f8] bg-white overflow-y-auto flex-shrink-0 z-10
          md:block ${sidebarOpen ? 'block absolute inset-y-0 left-0 shadow-xl' : 'hidden'}
        `}>
          {modules.map((module: any) => (
            <div key={module.id}>
              <div className="px-4 py-3 sticky top-0 bg-[#f8fbff] border-b border-[#e8f0f8]">
                <h3 className="font-syne font-bold text-[#0d1f3c] text-xs uppercase tracking-wider">{module.title}</h3>
              </div>
              {(module.lessons ?? [])
                .sort((a: any, b: any) => a.order_index - b.order_index)
                .map((lesson: any) => {
                  const isActive = lesson.id === activeId
                  const isComplete = done[lesson.id]
                  return (
                    <button key={lesson.id} onClick={() => goToLesson(lesson.id)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-[#f0f7ff]"
                      style={{ background: isActive ? 'rgba(0,180,216,0.06)' : 'white' }}>
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                        style={{
                          borderColor: isComplete ? '#22c55e' : isActive ? '#00b4d8' : '#c8dcea',
                          background: isComplete ? '#22c55e' : 'transparent',
                        }}>
                        {isComplete && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="font-dm text-xs leading-snug flex-1"
                        style={{ color: isActive ? '#0d1f3c' : '#3d6080', fontWeight: isActive ? 600 : 400 }}>
                        {lesson.title}
                      </span>
                      {lesson.duration_seconds > 0 && (
                        <span className="text-[#7a9bb8] font-dm text-xs flex-shrink-0">
                          {Math.floor(lesson.duration_seconds / 60)}:{String(lesson.duration_seconds % 60).padStart(2, '0')}
                        </span>
                      )}
                    </button>
                  )
                })}
            </div>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {activeLesson ? (
            <div className="max-w-4xl mx-auto p-6">
              {/* Video player */}
              <div className="rounded-2xl overflow-hidden bg-black mb-6"
                style={{ aspectRatio: '16/9', boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>
                {activeLesson.video_url ? (
                  <video
                    key={activeLesson.id}
                    src={activeLesson.video_url}
                    controls
                    className="w-full h-full"
                    controlsList="nodownload"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/40 gap-3">
                    <span className="text-5xl">🎬</span>
                    <span className="font-dm text-sm">Video wordt binnenkort toegevoegd</span>
                  </div>
                )}
              </div>

              {/* Lesson info */}
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <h1 className="font-syne font-bold text-[#0d1f3c] text-xl mb-1">{activeLesson.title}</h1>
                  {activeLesson.duration_seconds > 0 && (
                    <span className="text-[#7a9bb8] font-dm text-sm">
                      ⏱ {Math.floor(activeLesson.duration_seconds / 60)} minuten
                    </span>
                  )}
                </div>
                <button
                  onClick={() => markComplete(activeLesson.id, !done[activeLesson.id])}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-dm font-semibold text-sm transition-all flex-shrink-0"
                  style={{
                    background: done[activeLesson.id] ? '#22c55e' : 'linear-gradient(135deg, #0d1f3c, #00b4d8)',
                    color: 'white',
                  }}>
                  {done[activeLesson.id] ? '✓ Voltooid' : 'Markeer als voltooid'}
                </button>
              </div>

              {/* Prev / Next */}
              <div className="flex items-center justify-between pt-6 border-t border-[#e8f0f8]">
                {prevLesson ? (
                  <button onClick={() => goToLesson(prevLesson.id)}
                    className="flex items-center gap-2 text-[#3d6080] font-dm text-sm hover:text-[#00b4d8] transition-colors">
                    ← {prevLesson.title}
                  </button>
                ) : <div />}
                {nextLesson ? (
                  <button onClick={() => { markComplete(activeLesson.id, true); goToLesson(nextLesson.id) }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-dm font-semibold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #0d1f3c, #00b4d8)' }}>
                    Volgende les →
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full font-dm font-semibold text-sm text-white"
                    style={{ background: '#22c55e' }}>
                    🎉 Training voltooid!
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#7a9bb8] font-dm">Selecteer een les uit de sidebar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
