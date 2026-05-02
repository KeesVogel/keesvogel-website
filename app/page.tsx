'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Diensten from '@/components/Diensten'
import MediaSection from '@/components/MediaSection'
import Freebies from '@/components/Freebies'
import Community from '@/components/Community'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />
      <Hero />
      <Diensten />
      <MediaSection />
      <Freebies />
      <Community />
      <Contact />
      <Footer />
    </motion.main>
  )
}
