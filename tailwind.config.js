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
        crospor: ['Crospor', 'Arial',  'sans-serif'], // Add custom font
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
      colors: {
        white: '#FFFFFF', // Background, cards
        'light-gray': '#D4D4D4', // Secondary elements, borders
        'medium-gray': '#B3B3B3', // Text/icons on white
        'dark-gray': '#2B2B2B', // Headings, primary text
      },
  },
},
  plugins: [],
};
