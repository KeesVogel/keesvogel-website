import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kees Vogel',
  description: 'Founder @ Cogenta — AI-dashboards voor e-commerce ondernemers.',
  openGraph: {
    title: 'Kees Vogel',
    description: 'Founder @ Cogenta — AI-dashboards voor e-commerce ondernemers.',
    url: 'https://keesvogel.ai',
    siteName: 'Kees Vogel',
    locale: 'nl_NL',
    type: 'website',
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
    <html lang="nl" className={poppins.variable}>
      <body>{children}</body>
    </html>
  )
}
