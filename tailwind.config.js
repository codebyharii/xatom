/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060608',
        'bg2': '#0D0D12',
        'bg3': '#12121A',
        'surface': '#16161F',
        'surface2': '#1C1C28',
        'border': 'rgba(255,255,255,0.06)',
        'border2': 'rgba(255,255,255,0.10)',
        'purple': '#7B5EFF',
        'purple2': '#9B7FFF',
        'cyan': '#00D4FF',
        'cyan2': '#00F0FF',
        'text': '#F0EFFE',
        'text2': '#A09CB8',
        'text3': '#5A5670',
        'success': '#00E5A0',
        'amber': '#FFB347',
        'coral': '#FF6B6B',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
        'base': '15px',
        'lg': '17px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '52px',
        '5xl': ['clamp(36px, 5vw, 64px)', { lineHeight: '1.1' }],
        'hero': ['clamp(44px, 7vw, 88px)', { lineHeight: '1.02' }],
      },
      spacing: {
        'nav-h': '68px',
        'section': '100px',
      },
      borderRadius: {
        'card': '16px',
        'section': '20px',
        'button': '10px',
        'pill': '100px',
      },
      backdropBlur: {
        'nav': 'blur(20px)',
      },
      boxShadow: {
        'purple': '0 16px 48px rgba(123,94,255,0.35)',
        'glow': '0 0 24px rgba(123,94,255,0.2)',
      },
    },
  },
  plugins: [],
}
