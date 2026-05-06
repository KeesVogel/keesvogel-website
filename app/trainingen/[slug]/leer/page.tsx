import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import LeerClient from './LeerClient'

export default async function LeerPage({ params, searchParams }: {
  params: { slug: string }
  searchParams: { les?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/login?redirect=/trainingen/${params.slug}/leer`)

  const { data: course } = await supabase
    .from('courses').select('*').eq('slug', params.slug).single()
  if (!course) notFound()

  // Check access
  const { data: access } = await supabase
    .from('course_access')
    .select('id').eq('user_id', user.id).eq('course_id', course.id).single()

  if (!access) redirect(`/trainingen/${params.slug}`)

  // Fetch curriculum + progress
  const { data: modules } = await supabase
    .from('modules').select('*, lessons(*)').eq('course_id', course.id).order('order_index')

  const allLessons = (modules ?? []).flatMap((m: any) =>
    (m.lessons ?? []).sort((a: any, b: any) => a.order_index - b.order_index)
  )

  const { data: progressRows } = await supabase
    .from('lesson_progress').select('lesson_id, completed').eq('user_id', user.id)

  const progress: Record<string, boolean> = {}
  ;(progressRows ?? []).forEach((r: any) => { progress[r.lesson_id] = r.completed })

  const activeLessonId = searchParams.les || allLessons[0]?.id || null

  return (
    <LeerClient
      course={course}
      modules={modules ?? []}
      allLessons={allLessons}
      progress={progress}
      activeLessonId={activeLessonId}
      userId={user.id}
    />
  )
}
