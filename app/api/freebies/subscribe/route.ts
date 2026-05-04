import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service key server-side to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Email en naam zijn verplicht' }, { status: 400 })
    }

    // 1. Save to Supabase (upsert — no duplicate emails)
    const { error: dbError } = await supabase
      .from('subscribers')
      .upsert({ email, name }, { onConflict: 'email', ignoreDuplicates: false })

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json({ error: 'Database fout' }, { status: 500 })
    }

    // 2. Subscribe to newsletter (optional — only runs if API key is set)
    if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
      const beehiivRes = await fetch(
        `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' ') || '',
            reactivate_existing: false,
            send_welcome_email: true,
            utm_source: 'keesvogel.nl',
            utm_medium: 'freebies',
            utm_campaign: 'freebies-hub',
          }),
        }
      )

      if (beehiivRes.ok) {
        await supabase
          .from('subscribers')
          .update({ beehiiv_subscribed: true })
          .eq('email', email)
      } else {
        console.error('Beehiiv error:', await beehiivRes.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Er ging iets mis' }, { status: 500 })
  }
}
