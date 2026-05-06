import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AccountClient from './AccountClient'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch profile + accessible courses
  const [{ data: profile }, { data: accessRows }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('course_access').select('course_id, granted_at, courses(*)').eq('user_id', user.id),
  ])

  const courses = (accessRows ?? []).map((r: any) => ({ ...r.courses, granted_at: r.granted_at }))

  return <AccountClient user={user} profile={profile} courses={courses} />
}
