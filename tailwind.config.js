/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Biru FSTI (#2f4dd3 = 600)
        primary: {
          50: '#eef2ff',
          100: '#dfe6fe',
          200: '#c4d0fd',
          300: '#9aaefa',
          400: '#6c84f2',
          500: '#4a63e4',
          600: '#2f4dd3',
          700: '#263db0',
          800: '#22348c',
          900: '#1f2e6e',
          950: '#121a42',
        },
        // Kuning sorotan (tiket, penanda)
        sorot: {
          100: '#fff4c7',
          300: '#ffd95a',
          400: '#fbc72a',
          500: '#eeac0b',
          700: '#9a6406',
        },
        ink: {
          DEFAULT: '#151a2d',
          2: '#474f66',
          3: '#7a8297',
        },
        garis: '#e3e6ee',
        latar: '#f5f6fa',
        // Dipakai halaman lama (Tentang FSTI, Peraturan)
        secondary: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
          500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
        },
        light: { bg: '#f8fafc', card: '#ffffff', cardHover: '#f1f5f9', border: '#e2e8f0', muted: '#64748b' },
        accent: '#2f4dd3',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        kartu: '0 1px 2px rgba(21,26,45,.04), 0 4px 16px -4px rgba(21,26,45,.08)',
        angkat: '0 2px 4px rgba(21,26,45,.04), 0 18px 40px -12px rgba(31,46,110,.28)',
      },
      keyframes: {
        muncul: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        muncul: 'muncul .5s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
