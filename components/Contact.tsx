'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SocialIconBadge, EmailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/SocialIcons'
import { SITE, CONTACT_SOCIALS } from '@/lib/constants'

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left */}
          <motion.div
            ref={ref}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            <div>
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="accent-pill mb-4 inline-flex"
              >
                Contact
              </motion.span>
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="font-syne font-extrabold text-[#0d1f3c] mt-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Laten we samenwerken
              </motion.h2>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                className="text-[#3d6080] font-dm mt-4 leading-relaxed"
              >
                Klaar om jouw webshop naar het volgende niveau te brengen? Neem contact op en ik reageer binnen 24 uur.
              </motion.p>
            </div>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col gap-4"
            >
              <ContactCard icon={<EmailIcon size={20} className="text-[#00b4d8]" />} label="E-mail" value={SITE.email} sub="Reageer binnen 24 uur" href={`mailto:${SITE.email}`} />
              <ContactCard icon={<PhoneIcon size={20} className="text-[#00b4d8]" />} label="Telefoon" value={SITE.phone} sub="Ma–vr bereikbaar" href={`tel:${SITE.phoneTel}`} />
              <ContactCard icon={<WhatsAppCardIcon />} label="WhatsApp" value="Stuur een bericht" sub="Snel antwoord gegarandeerd" href={SITE.whatsapp} isWhatsApp />
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-dm font-semibold tracking-widest uppercase mb-4"
                style={{ background: 'rgba(0,180,216,0.08)', border: '1px solid rgba(0,180,216,0.2)', color: '#0099bb' }}>
                Volg mij
              </span>
              <h3 className="font-syne font-bold text-[#0d1f3c] text-2xl mt-4">Op social media</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CONTACT_SOCIALS.map((social, i) => (
                <SocialLinkCard key={social.platform} social={social} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WhatsAppCardIcon() {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </div>
  )
}

function ContactCard({ icon, label, value, sub, href, isWhatsApp }: {
  icon: React.ReactNode; label: string; value: string; sub: string; href: string; isWhatsApp?: boolean
}) {
  return (
    <motion.a
      href={href}
      target={isWhatsApp ? '_blank' : undefined}
      rel={isWhatsApp ? 'noopener noreferrer' : undefined}
      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
      whileHover={{ x: 4 }}
      className="light-card rounded-2xl p-5 flex items-center gap-4 group light-card-hover"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: isWhatsApp ? 'rgba(37,211,102,0.1)' : 'rgba(0,180,216,0.08)',
          border: isWhatsApp ? '1px solid rgba(37,211,102,0.25)' : '1px solid rgba(0,180,216,0.2)'
        }}>
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[#7a9bb8] font-dm text-xs">{label}</span>
        <span className="text-[#0d1f3c] font-dm font-semibold group-hover:text-[#00b4d8] transition-colors">{value}</span>
        <span className="text-[#7a9bb8] font-dm text-xs">{sub}</span>
      </div>
      <span className="ml-auto text-[#7a9bb8] group-hover:text-[#00b4d8] transition-colors">→</span>
    </motion.a>
  )
}

function SocialLinkCard({ social, index }: { social: (typeof CONTACT_SOCIALS)[0]; index: number }) {
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08 }}
      whileHover={{ y: -3 }}
      className="light-card rounded-2xl p-4 flex flex-col gap-2 group light-card-hover"
    >
      <div className="flex items-center gap-2.5">
        <SocialIconBadge platform={social.platform} badgeSize={32} iconSize={14} rounded="lg" />
        <span className="font-syne font-bold text-[#0d1f3c] text-sm">{social.platform}</span>
      </div>
      <div className="text-[#7a9bb8] font-dm text-xs">{social.handle}</div>
      {social.count && (
        <div className="text-[#00b4d8] font-syne font-bold text-lg">{social.count}</div>
      )}
    </motion.a>
  )
}
