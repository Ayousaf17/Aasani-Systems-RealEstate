import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        aasani: {
          black: '#111212',
          'black-soft': '#141413',
          white: '#fffef5',
          'white-warm': '#fffefa',
          cream: '#f7f4e9',
          yellow: '#ffe24f',
          'yellow-hover': '#ffd700',
          gray: '#303030',
          'text-muted': 'rgba(255, 254, 250, 0.6)',
          maroon: '#3d001b',
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
