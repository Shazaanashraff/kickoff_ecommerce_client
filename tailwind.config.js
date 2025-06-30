/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        breathe: 'breathe 2s ease-in-out infinite',
        stretchX: 'stretchX 0.4s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        stretchX: {
          '0%': { transform: 'scaleX(1)' },
          '50%': { transform: 'scaleX(1.1)' },
          '100%': { transform: 'scaleX(1.05)' },
        },
      },
  },
},
  plugins: [],
};
