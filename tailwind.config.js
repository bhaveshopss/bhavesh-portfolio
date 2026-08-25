/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './App.tsx', './index.tsx'],
  theme: {
    extend: {
      colors: {
        cream: '#EFEFEA',
        paper: '#F7F7F4',
        ink: {
          DEFAULT: '#131311',
          soft: '#3D3D38',
          mid: '#6E6E66',
          low: '#9A9A90',
        },
        signal: {
          DEFAULT: '#2B4BF2',
          soft: '#E4E9FE',
        },
        blush: '#E879B9',
        line: 'rgba(19, 19, 17, 0.1)',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
