import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#14b8a6',
          light: '#5eead4',
          dark: '#0d9488',
        },
        bg: {
          deep: '#050505',
          card: '#0A0A0A',
        },
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'beam': 'beam 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%) skewX(-15deg)' },
          to: { transform: 'translateX(200%) skewX(-15deg)' },
        },
        beam: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
