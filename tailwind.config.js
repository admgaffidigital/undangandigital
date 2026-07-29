/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slow-zoom': 'slowZoom 25s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'doorOpenLeft': 'doorOpenLeft 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'doorOpenRight': 'doorOpenRight 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'subtle-bounce': 'subtleBounce 4s ease-in-out infinite',
        'pop-in': 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '70%': { boxShadow: '0 0 0 15px rgba(212, 175, 55, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0)' },
        },
        doorOpenLeft: {
          'to': { transform: 'translateX(-100%)', opacity: '0', boxShadow: '10px 0 30px rgba(0,0,0,0.5)' },
        },
        doorOpenRight: {
          'to': { transform: 'translateX(100%)', opacity: '0', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)' },
        },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
