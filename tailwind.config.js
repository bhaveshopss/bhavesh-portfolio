/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        "background-light": "#f8fafc", // Slightly cooler white
        "background-dark": "#050505",
        "card-light": "#ffffff",
        "card-dark": "#111111",
        "accent-purple": "#a855f7",
        "accent-blue": "#3b82f6",
        "accent-green": "#10b981",
        "terminal-green": "#00ff41",
        "text-high-contrast": "#E0E0E0",
        "text-light-primary": "#1f2937", // Gray-800
        "text-light-secondary": "#4b5563", // Gray-600
        "text-muted-bright": "#C0C0C0",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        'grain': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-dash': 'flow-dash 3s linear infinite',
        'scroll-log': 'scroll-log 20s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'verified-pulse': 'verified-pulse 2s infinite',
        'radar-sweep': 'radar-sweep 2s linear infinite',
        'sh-bar-anim': 'sh-bar-anim 2s infinite ease-in-out',
        'text-gradient': 'text-gradient 1.5s linear infinite',
        'pulse-color-1': 'pulse-color-1 10s ease-in-out infinite',
        'pulse-color-2': 'pulse-color-2 10s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1.5) blur(4px)' },
          '50%': { opacity: '0.6', filter: 'brightness(1) blur(0px)' },
        },
        'flow-dash': {
          'to': { 'stroke-dashoffset': '-20' }
        },
        'scroll-log': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'sh-bar-anim': {
          '0%, 100%': { height: '20%', background: 'rgba(0, 255, 65, 0.3)' },
          '50%': { height: '80%', background: 'rgba(0, 255, 65, 0.8)' }
        },
        'text-gradient': {
          '0%': { 'background-position': '0% center' },
          '100%': { 'background-position': '200% center' },
        },
        'pulse-color-1': {
          '0%, 100%': { backgroundColor: 'rgba(99, 102, 241, 0.05)', opacity: '1' },
          '50%': { backgroundColor: 'rgba(168, 85, 247, 0.05)', opacity: '0.6' },
        },
        'pulse-color-2': {
          '0%, 100%': { backgroundColor: 'rgba(168, 85, 247, 0.05)', opacity: '1' },
          '50%': { backgroundColor: 'rgba(59, 130, 246, 0.05)', opacity: '0.6' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
}
