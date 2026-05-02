import type { Metadata } from 'next'
import { Montserrat, Poppins } from 'next/font/google'
import './globals.css'

const syne = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KeesVogel.ai — Webshops sneller schalen met AI',
  description:
    'Ik help webshops sneller schalen met AI — van marketing tot klantenservice. AI-strategie, automatisering, content en training voor webshop eigenaren.',
  keywords: ['AI webshop', 'AI marketing', 'AI klantenservice', 'webshop schalen', 'KeesVogel'],
  openGraph: {
    title: 'KeesVogel.ai — Webshops sneller schalen met AI',
    description:
      'Ik help webshops sneller schalen met AI — van marketing tot klantenservice.',
    url: 'https://keesvogel.ai',
    siteName: 'KeesVogel.ai',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KeesVogel.ai — Webshops sneller schalen met AI',
    description: 'Ik help webshops sneller schalen met AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <div id="scroll-progress" />
        <div id="cursor-glow" />
        <ScrollProgressBar />
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}

function ScrollProgressBar() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function updateProgress() {
              var scrollTop = window.scrollY;
              var docHeight = document.documentElement.scrollHeight - window.innerHeight;
              var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
              var bar = document.getElementById('scroll-progress');
              if (bar) bar.style.width = progress + '%';
            }
            window.addEventListener('scroll', updateProgress, { passive: true });
            updateProgress();
          })();
        `,
      }}
    />
  )
}

function CursorGlow() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var glow = document.getElementById('cursor-glow');
            if (!glow) return;
            var isMobile = window.innerWidth < 768;
            if (isMobile) { glow.style.display = 'none'; return; }
            document.addEventListener('mousemove', function(e) {
              glow.style.left = e.clientX + 'px';
              glow.style.top = e.clientY + 'px';
            }, { passive: true });
          })();
        `,
      }}
    />
  )
}
