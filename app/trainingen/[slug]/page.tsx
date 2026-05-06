import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CourseDetailClient from './CourseDetailClient'

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!course) notFound()

  const { data: modules } = await supabase
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', course.id)
    .order('order_index')

  let hasAccess = false
  if (user) {
    const { data } = await supabase
      .from('course_access')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .single()
    hasAccess = !!data
  }

  return <CourseDetailClient course={course} modules={modules ?? []} user={user} hasAccess={hasAccess} />
}
