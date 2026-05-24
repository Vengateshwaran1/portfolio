/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07080B',
          900: '#0B0D11',
          800: '#11141A',
          700: '#171B23',
          600: '#1E232D',
          500: '#272D39',
        },
        amber: {
          DEFAULT: '#A78BFA',
          50: '#F5F2FF',
          100: '#E9E2FF',
          200: '#D4C7FF',
          300: '#B8A4FA',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        silver: {
          50: '#F8F9FB',
          100: '#EEF0F5',
          200: '#DDE0E9',
          300: '#C5C9D6',
          400: '#A8AEBF',
          500: '#8B92A6',
        },
        glass: {
          white: 'rgba(255,255,255,0.04)',
          line: 'rgba(255,255,255,0.08)',
          edge: 'rgba(167,139,250,0.22)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        ultratight: '-0.06em',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '40px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.08)',
        amber: '0 10px 40px -10px rgba(167,139,250,0.55)',
        ring: '0 0 0 1px rgba(167,139,250,0.45), 0 8px 24px -6px rgba(124,58,237,0.35)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.4'/></svg>\")",
        'aurora':
          'radial-gradient(at 20% 20%, rgba(167,139,250,0.28), transparent 50%), radial-gradient(at 80% 0%, rgba(124,58,237,0.20), transparent 50%), radial-gradient(at 50% 100%, rgba(197,201,214,0.10), transparent 60%)',
        'metallic':
          'linear-gradient(135deg, #F8F9FB 0%, #C5C9D6 25%, #A78BFA 60%, #6D28D9 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: 0.6 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0, 0 0' },
          '100%': { backgroundPosition: '64px 64px, 64px 64px' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%,-62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-slow': 'marquee 75s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        pulseRing: 'pulseRing 2.4s cubic-bezier(0.215,0.61,0.355,1) infinite',
        gridPan: 'gridPan 24s linear infinite',
        spotlight: 'spotlight 1.4s ease forwards',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
