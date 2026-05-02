import Image from 'next/image'
import { SITE } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-[#0d1f3c]" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="#">
          <Image src="/logo.png" alt="KeesVogel.ai" width={140} height={36} className="h-7 w-auto object-contain" />
        </a>
        <p className="text-white/35 font-dm text-sm text-center">
          © 2025 KeesVogel.ai — Webshops sneller schalen met AI
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${SITE.email}`} className="text-white/45 hover:text-[#00b4d8] font-dm text-sm transition-colors">{SITE.email}</a>
          <span className="text-white/20">·</span>
          <a href={`tel:${SITE.phoneTel}`} className="text-white/45 hover:text-[#00b4d8] font-dm text-sm transition-colors">{SITE.phone}</a>
        </div>
      </div>
    </footer>
  )
}
