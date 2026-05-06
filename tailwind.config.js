/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#faf9f9',
        bg2: '#f4f3f3',
        bg3: '#eeeeee',
        surface: '#ffffff',
        surface2: '#e8e8e8',
        border: 'rgba(64,73,68,0.16)',
        border2: 'rgba(64,73,68,0.24)',
        purple: '#174d38',
        purple2: '#003524',
        cyan: '#8f4a48',
        cyan2: '#ffb3af',
        text: '#1a1c1c',
        text2: '#404944',
        text3: '#707973',
        success: '#174d38',
        amber: '#693534',
        coral: '#e79f9c',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'sans-serif'],
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
