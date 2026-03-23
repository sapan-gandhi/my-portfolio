/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#080c10',
          2: '#0d1117',
          3: '#111820',
        },
        card: {
          DEFAULT: '#131b24',
          2: '#18232f',
        },
        border: {
          DEFAULT: '#1e2d3d',
          2: '#243040',
        },
        accent: {
          cyan: '#22d3ee',
          teal: '#14b8a6',
          indigo: '#818cf8',
        },
      },
      animation: {
        blink: 'blink 1.2s infinite',
        pulse: 'pulse 2s infinite',
        marquee: 'marquee 25s linear infinite',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
