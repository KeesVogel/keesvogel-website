import Image from 'next/image'
import { EmailIcon, PhoneIcon, SocialIconBadge } from '@/components/ui/SocialIcons'
import { LINKS, SITE } from '@/lib/constants'

const SOCIALS = [
  { platform: 'LinkedIn', href: SITE.linkedin },
  { platform: 'Instagram', href: SITE.instagram },
  { platform: 'TikTok', href: SITE.tiktok },
]

export default function Home() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        <Image
          src="/kees.jpg"
          alt={SITE.name}
          width={112}
          height={112}
          className="w-28 h-28 rounded-full object-cover ring-4"
          style={{ ['--tw-ring-color' as string]: 'rgba(232,23,106,0.35)' }}
          priority
        />

        <div className="flex flex-col gap-1.5">
          <h1 className="text-2xl font-bold">{SITE.name}</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {SITE.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="transition-transform hover:scale-105 active:scale-95"
            >
              <SocialIconBadge platform={s.platform} badgeSize={48} iconSize={22} rounded="full" />
            </a>
          ))}
        </div>

        <div className="w-full flex flex-col gap-3 mt-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-row"
            >
              <span className="link-row-title">{link.title}</span>
              <span className="link-row-desc">{link.description}</span>
            </a>
          ))}

          <a href={`mailto:${SITE.email}`} className="link-row link-row-compact">
            <EmailIcon size={18} />
            <span className="link-row-title">{SITE.email}</span>
          </a>

          <a href={`tel:${SITE.phoneTel}`} className="link-row link-row-compact">
            <PhoneIcon size={18} />
            <span className="link-row-title">{SITE.phone}</span>
          </a>
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--text-secondary)' }}>
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </main>
  )
}
