export const SITE = {
  name: 'KeesVogel.ai',
  tagline: 'Ik help webshops sneller schalen met AI — van marketing tot klantenservice.',
  email: 'hallo@keesvogel.nl',
  phone: '06 28 73 72 95',
  phoneTel: '+31628737295',
  whatsapp: 'https://wa.me/31628737295',
  skool: 'https://www.skool.com/de-claude-club',
  tiktok: 'https://www.tiktok.com/@keesvogel.ai',
  instagram: 'https://www.instagram.com/keesvogel.ai',
  youtube: 'https://www.youtube.com/@keesvogel',
  linkedin: 'https://www.linkedin.com/in/kees-vogel-a50405140/',
}

export const NAV_LINKS = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Foto & Video', href: '#media' },
  { label: 'Freebies', href: '#freebies' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
]

// Hero social cards (4 cards — 2×2 grid)
export const SOCIALS = [
  {
    platform: 'TikTok',
    handle: '@keesvogel.ai',
    count: 35100,
    countLabel: '35.1K',
    href: SITE.tiktok,
  },
  {
    platform: 'Instagram',
    handle: '@keesvogel.ai',
    count: 9800,
    countLabel: '9.8K',
    href: SITE.instagram,
  },
  {
    platform: 'YouTube',
    handle: '@keesvogel',
    count: 3600,
    countLabel: '3.6K',
    href: SITE.youtube,
  },
  {
    platform: 'LinkedIn',
    handle: 'Kees Vogel',
    count: 0,
    countLabel: '',
    href: SITE.linkedin,
  },
]

export const STATS = [
  { value: 35000, label: '35K+ TikTok', suffix: '' },
  { value: 460, label: '460+ Community', suffix: '+' },
  { value: 9800, label: '9.8K Instagram', suffix: '' },
]

export type Service = { icon: string; title: string; description: string; href?: string; logo?: string }

export const SERVICES: Service[] = [
  {
    icon: '🤖',
    title: 'AI Webshop Klantenservice',
    description: 'Binnen 10 minuten gekoppeld aan je Shopify en mail — daarna 24/7 beschikbaar voor jouw klanten.',
    href: 'https://www.fureply.com',
    logo: '/fureply-logo.png',
  },
  {
    icon: '📸',
    title: 'Productfoto & Video',
    description: 'Professionele beelden die direct converteren — AI-enhanced voor maximaal impact.',
    href: '#media',
  },
  {
    icon: '🎬',
    title: 'Short Form Content',
    description: 'AI analyseert uw markt. Wij filmen één dag. U post een maand lang — en trekt organisch bezoekers naar uw webshop.',
    href: '/short-form',
  },
  {
    icon: '🎓',
    title: 'Training & Community',
    description: 'Leer zelf met AI werken via trainingen, templates en een actieve community.',
    href: 'https://www.skool.com/de-claude-club',
    logo: '/declaudeclub.jpg',
  },
]

export const CONTENT_CARDS = [
  {
    platform: 'TikTok',
    title: 'AI Product Demo',
    description: 'Hoe je in 10 minuten een AI-gegenereerde product demo maakt die converteert.',
    gradient: 'from-purple-900 via-blue-900 to-navy',
    emoji: '🎬',
  },
  {
    platform: 'Instagram',
    title: 'Branded Content',
    description: 'Template packs voor consistente Instagram posts die jouw merk laten groeien.',
    gradient: 'from-pink-900 via-rose-900 to-navy',
    emoji: '📸',
  },
  {
    platform: 'YouTube',
    title: 'Tutorial Reeks',
    description: 'Stap-voor-stap AI tutorials speciaal voor webshop eigenaren en ondernemers.',
    gradient: 'from-red-900 via-orange-900 to-navy',
    emoji: '▶️',
  },
  {
    platform: 'Ads',
    title: 'Ad Creatives',
    description: 'Scroll-stoppende advertenties gemaakt met AI — klaar in 15 minuten.',
    gradient: 'from-cyan-900 via-teal-900 to-navy',
    emoji: '🎯',
  },
  {
    platform: 'TikTok',
    title: 'Behind the Scenes',
    description: 'Authentieke BTS content die vertrouwen wekt en jouw verhaal vertelt.',
    gradient: 'from-violet-900 via-purple-900 to-navy',
    emoji: '🎥',
  },
  {
    platform: 'Instagram',
    title: 'Story Templates',
    description: 'Swipe-up stories die bezoekers omzetten in kopers — geoptimaliseerd met AI.',
    gradient: 'from-amber-900 via-yellow-900 to-navy',
    emoji: '✨',
  },
]

export const FREEBIES = [
  {
    icon: '🤖',
    title: 'Claude Prompt Gids',
    description: '50+ kant-en-klare prompts voor webshop-eigenaren. Direct inzetbaar voor marketing, klantenservice en content.',
    href: 'https://www.plugandpay.nl',
  },
  {
    icon: '📱',
    title: 'Social Media Template Pack',
    description: 'Bewezen templates voor Instagram, TikTok en LinkedIn. Maak in minuten professionele content.',
    href: 'https://www.plugandpay.nl',
  },
  {
    icon: '📈',
    title: 'AI Groei Checklist',
    description: 'Stap-voor-stap hoe je AI inzet in jouw webshop. Van tools tot workflows — alles wat je nodig hebt.',
    href: 'https://www.plugandpay.nl',
  },
  {
    icon: '✉️',
    title: 'E-mail Flows Toolkit',
    description: 'Kant-en-klare e-mailsequenties geoptimaliseerd voor conversie. Welkom, abandoned cart, winback en meer.',
    href: 'https://www.plugandpay.nl',
  },
  {
    icon: '🎯',
    title: 'Ad Creative Gids',
    description: 'Scroll-stoppende advertenties maken met AI in 15 minuten. Inclusief hooks, structuren en prompts.',
    href: 'https://www.plugandpay.nl',
  },
  {
    icon: '📸',
    title: 'Productfoto Prompt Pack',
    description: '25 AI-prompts voor professionele productfotografie. Transformeer gewone foto\'s naar studio-kwaliteit.',
    href: 'https://www.plugandpay.nl',
  },
]

export const COMMUNITY_PERKS = [
  {
    icon: '💡',
    title: 'Wekelijkse Claude tips & tricks',
    description: 'Elke week de nieuwste AI-technieken speciaal voor webshop eigenaren.',
  },
  {
    icon: '🎯',
    title: 'Bewezen prompt libraries',
    description: 'Toegang tot honderden prompts die direct resultaat opleveren.',
  },
  {
    icon: '👥',
    title: 'Community van ondernemers',
    description: 'Omring jezelf met gelijkgestemde ondernemers die AI serieus nemen.',
  },
  {
    icon: '📹',
    title: "Exclusieve video's & trainingen",
    description: 'Diepgaande tutorials die je nergens anders vindt.',
  },
]

// Contact section social links (5 platforms including Skool)
export const CONTACT_SOCIALS = [
  {
    platform: 'TikTok',
    handle: '@keesvogel.ai',
    count: '35.1K',
    href: SITE.tiktok,
  },
  {
    platform: 'Instagram',
    handle: '@keesvogel.ai',
    count: '9.8K',
    href: SITE.instagram,
  },
  {
    platform: 'YouTube',
    handle: '@keesvogel',
    count: '3.6K',
    href: SITE.youtube,
  },
  {
    platform: 'LinkedIn',
    handle: 'Kees Vogel',
    count: '',
    href: SITE.linkedin,
  },
  {
    platform: 'Skool',
    handle: 'De Claude Club',
    count: '460+',
    href: SITE.skool,
  },
]
