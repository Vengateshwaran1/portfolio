/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate1: {
          '0%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-3px)' },
          '50%': { transform: 'translateY(3px)' },
          '75%': { transform: 'translateY(-3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        vibrate2: {
          '0%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(3px)' },
          '50%': { transform: 'translateY(-3px)' },
          '75%': { transform: 'translateY(3px)' },
          '100%': { transform: 'translateY(0)' },
        },
        vibrate3: {
          '0%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(3px)' },
          '50%': { transform: 'translateY(-3px)' },
          '75%': { transform: 'translateY(3px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        vibrate1: 'vibrate1 5s infinite',
        vibrate2: 'vibrate2 5s infinite',
        vibrate3: 'vibrate3 2s infinite',
      },
    },
  },
  plugins: [],
}