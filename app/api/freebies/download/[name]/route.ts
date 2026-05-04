import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'fs/promises'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const FREEBIE_FILES: Record<string, {
  file: string
  filename: string
  mime: string
  fallbackUrl: string  // plug-and-pay fallback als PDF nog niet beschikbaar is
}> = {
  'business-legendes': {
    file: 'freebies/business-legendes.pdf',
    filename: '8-Business-Legendes-Team.pdf',
    mime: 'application/pdf',
    fallbackUrl: 'https://keesvogel.plugandpay.com/gratis-claude-skill-8-business-legendes',
  },
  'bolcom-fotograaf': {
    file: 'freebies/bolcom-fotograaf.pdf',
    filename: 'Bolcom-Fotograaf-Eva.pdf',
    mime: 'application/pdf',
    fallbackUrl: 'https://keesvogel.plugandpay.com/gratis-marketplace-fotograa-claude-skill',
  },
  'linkedin-fotograaf': {
    file: 'freebies/linkedin-fotograaf.pdf',
    filename: 'LinkedIn-Fotograaf.pdf',
    mime: 'application/pdf',
    fallbackUrl: 'https://keesvogel.plugandpay.com/gratis-linkedin-fotograa-claude-skill-copy',
  },
}

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const { name } = params
  const freebie = FREEBIE_FILES[name]

  if (!freebie) {
    return NextResponse.json({ error: 'Freebie niet gevonden' }, { status: 404 })
  }

  const email = req.nextUrl.searchParams.get('email') || 'anonymous'

  // Log download in Supabase (non-blocking)
  supabase
    .from('downloads')
    .insert({ email, freebie_name: name })
    .then(({ error }) => {
      if (error) console.error('Download log error:', error)
    })

  // Try to serve local PDF first
  try {
    const filePath = path.join(process.cwd(), 'public', freebie.file)
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': freebie.mime,
        'Content-Disposition': `attachment; filename="${freebie.filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch {
    // PDF not yet uploaded — redirect to plug-and-pay after tracking
    return NextResponse.redirect(freebie.fallbackUrl)
  }
}
