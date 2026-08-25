/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './App.tsx', './index.tsx'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#060605',
          raised: '#0C0C0B',
          card: '#111110',
        },
        paper: {
          hi: '#F4F4EF',
          mid: '#9C9C94',
          low: '#5F5F58',
        },
        signal: {
          DEFAULT: '#FFB020',
          dim: 'rgba(255, 176, 32, 0.12)',
        },
        line: 'rgba(244, 244, 240, 0.08)',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
