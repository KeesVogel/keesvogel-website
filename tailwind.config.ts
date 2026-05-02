import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          light: '#0f2040',
          mid: '#0d1c36',
        },
        cyan: {
          brand: '#00d4e8',
          glow: 'rgba(0,212,232,0.15)',
          dim: 'rgba(0,212,232,0.08)',
        },
        green: {
          community: '#00a86b',
        },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      backgroundImage: {
        'grid-dots': "radial-gradient(circle, rgba(0,212,232,0.12) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid-dots': '28px 28px',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-slower': 'float 16s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-8px)' },
        },
      },
      blur: {
        '4xl': '80px',
        '5xl': '120px',
      },
    },
  },
  plugins: [],
}

export default config
