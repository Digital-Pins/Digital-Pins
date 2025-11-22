/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#b7d1ff',
          300: '#8bb4ff',
          400: '#6096ff',
          500: '#3778ff',
          600: '#205fe6',
          700: '#1749b4',
          800: '#123987',
          900: '#0f306d'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
