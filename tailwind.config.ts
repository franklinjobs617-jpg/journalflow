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
        forest: {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332',
        },
        sage: {
          DEFAULT: '#95D5B2',
          light: '#D8F3DC',
          dark: '#52B788',
        },
        amber: {
          warm: '#F4A261',
          light: '#FDECD5',
        },
        ink: '#1A1A2E',
        paper: '#FAFAF8',
        muted: '#6B7280',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        prose: ['var(--font-lora)', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1A1A2E',
            a: { color: '#2D6A4F' },
            h1: { fontFamily: 'Playfair Display, Georgia, serif' },
            h2: { fontFamily: 'Playfair Display, Georgia, serif' },
            h3: { fontFamily: 'Playfair Display, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
