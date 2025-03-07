/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          fsti: {
            primary: '#2f4dd3',
            secondary: '#3b5bdb',
            light: '#5978ff',
            dark: '#202540',
            accent: '#4f46e5',
          },
          dark: {
            bg: '#0f0f17',
            card: '#1a1a27',
            cardHover: '#222236',
            border: '#2c2c44',
            muted: '#6b7280',
          },
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Lexend', 'sans-serif'],
        },
        zIndex: {
          '-1': '-1',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        boxShadow: {
          'glow': '0 0 15px rgba(47, 77, 211, 0.5)',
          'glow-lg': '0 0 25px rgba(47, 77, 211, 0.6)',
        },
      },
    },
    plugins: [
      function({ addUtilities, theme }) {
        const newUtilities = {
          '.animation-delay-2000': {
            'animation-delay': '2s',
          },
          '.animation-delay-3000': {
            'animation-delay': '3s',
          },
          '.animation-delay-5000': {
            'animation-delay': '5s',
          },
          '.animation-delay-7000': {
            'animation-delay': '7s',
          },
          '.animation-delay-11000': {
            'animation-delay': '11s',
          },
          // Menambahkan negative z-index jika belum ada
          '.z-\\[-1\\]': {
            'z-index': '-1',
          },
        }
        addUtilities(newUtilities)
      },
    ],
  }