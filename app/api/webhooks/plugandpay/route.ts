import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Plug&Pay sends: customer email + product_id / custom fields
    const email = body?.customer?.email || body?.email
    const productId = body?.product_id || body?.order?.product_id || body?.subscription?.product_id
    const orderId = body?.order_id || body?.id

    if (!email || !productId) {
      console.error('Webhook missing email or product_id:', body)
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Find user by email
    const { data: users } = await supabase.auth.admin.listUsers()
    const user = users?.users?.find(u => u.email === email)

    // If user doesn't exist yet — create them (they'll complete signup via magic link)
    let userId: string
    if (!user) {
      const { data: newUser, error } = await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      })
      if (error || !newUser.user) {
        console.error('Could not create user:', error)
        return NextResponse.json({ error: 'User creation failed' }, { status: 500 })
      }
      userId = newUser.user.id
    } else {
      userId = user.id
    }

    // Find course by plugandpay_product_id
    const { data: course } = await supabase
      .from('courses')
      .select('id, title')
      .eq('plugandpay_product_id', productId)
      .single()

    if (!course) {
      console.error('No course found for product_id:', productId)
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Grant access
    const { error: accessError } = await supabase
      .from('course_access')
      .upsert({ user_id: userId, course_id: course.id, plugandpay_order_id: orderId },
        { onConflict: 'user_id,course_id' })

    if (accessError) {
      console.error('Access grant error:', accessError)
      return NextResponse.json({ error: 'Access grant failed' }, { status: 500 })
    }

    console.log(`✅ Access granted: ${email} → ${course.title}`)
    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
