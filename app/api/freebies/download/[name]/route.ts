import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { readFile } from 'fs/promises'
import path from 'path'

// Map freebie names to their actual files
const FREEBIE_FILES: Record<string, { file: string; filename: string; mime: string }> = {
  'business-legendes': {
    file: 'freebies/business-legendes.pdf',
    filename: '8-Business-Legendes-Team.pdf',
    mime: 'application/pdf',
  },
  'bolcom-fotograaf': {
    file: 'freebies/bolcom-fotograaf.pdf',
    filename: 'Bolcom-Fotograaf-Eva.pdf',
    mime: 'application/pdf',
  },
  'linkedin-fotograaf': {
    file: 'freebies/linkedin-fotograaf.pdf',
    filename: 'LinkedIn-Fotograaf.pdf',
    mime: 'application/pdf',
  },
}

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  try {
    const { name } = params
    const freebie = FREEBIE_FILES[name]

    if (!freebie) {
      return NextResponse.json({ error: 'Freebie niet gevonden' }, { status: 404 })
    }

    // Get email from query param (set when user unlocked freebies)
    const email = req.nextUrl.searchParams.get('email') || 'anonymous'

    // Log download in Supabase (async, non-blocking)
    supabase
      .from('downloads')
      .insert({ email, freebie_name: name })
      .then(({ error }) => {
        if (error) console.error('Download log error:', error)
      })

    // Read file from /public/freebies/
    const filePath = path.join(process.cwd(), 'public', freebie.file)
    const fileBuffer = await readFile(filePath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': freebie.mime,
        'Content-Disposition': `attachment; filename="${freebie.filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Download error:', err)
    return NextResponse.json({ error: 'Bestand niet gevonden' }, { status: 404 })
  }
}
