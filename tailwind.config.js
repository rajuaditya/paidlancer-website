/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          950: '#200B45',
          900: '#30105F',
          800: '#3D1573',
          700: '#54228B',
          500: '#7440B8',
          400: '#8D55D5',
          200: '#D9C6F5',
          100: '#EFE6FC',
        },
        banana: { DEFAULT: '#FFE34D', warm: '#FFD84D', deep: '#E6C21F' },
      },
      fontFamily: {
        display: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        signature: ['"Great Vibes"', 'cursive'],
      },
      maxWidth: { site: '1240px' },
      opacity: { 3: '0.03', 4: '0.04', 6: '0.06', 7: '0.07', 12: '0.12' },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,.08), 0 20px 60px -20px rgba(10,0,30,.7)',
        banana: '0 5px 0 #B89A12, 0 18px 40px -10px rgba(255,227,77,.35)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translate3d(0,0,0)' }, '50%': { transform: 'translate3d(0,-10px,0)' } },
        ping2: { '0%': { transform: 'scale(1)', opacity: '.7' }, '100%': { transform: 'scale(2.6)', opacity: '0' } },
        scrolldot: { '0%': { transform: 'translateY(0)', opacity: '0' }, '30%': { opacity: '1' }, '100%': { transform: 'translateY(14px)', opacity: '0' } },
        fadeup: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        ping2: 'ping2 1.8s cubic-bezier(0,0,.2,1) infinite',
        scrolldot: 'scrolldot 1.8s ease-in-out infinite',
        fadeup: 'fadeup .6s cubic-bezier(.2,.8,.2,1) both',
        'spin-slow': 'spin 40s linear infinite',
      },
    },
  },
  plugins: [],
};
