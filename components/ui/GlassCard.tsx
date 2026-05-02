'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import clsx from 'clsx'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverLift?: boolean
  hoverCyanBorder?: boolean
  onClick?: () => void
}

export function GlassCard({
  children,
  className = '',
  hoverLift = true,
  hoverCyanBorder = true,
  onClick,
}: GlassCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      animate={{
        y: hoverLift && hovered ? -4 : 0,
        borderColor: hoverCyanBorder && hovered
          ? 'rgba(0, 212, 232, 0.5)'
          : 'rgba(255, 255, 255, 0.08)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx(
        'glass rounded-2xl',
        hoverLift && 'cursor-pointer',
        className,
      )}
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered && hoverCyanBorder
          ? '0 0 20px rgba(0,212,232,0.08), 0 8px 32px rgba(0,0,0,0.3)'
          : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {children}
    </motion.div>
  )
}
