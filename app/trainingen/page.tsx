import { createClient } from '@/lib/supabase/server'
import TrainingenClient from './TrainingenClient'

export default async function TrainingenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: true })

  let accessCourseIds: string[] = []
  if (user) {
    const { data } = await supabase
      .from('course_access')
      .select('course_id')
      .eq('user_id', user.id)
    accessCourseIds = (data ?? []).map((r: any) => r.course_id)
  }

  return <TrainingenClient courses={courses ?? []} user={user} accessCourseIds={accessCourseIds} />
}
