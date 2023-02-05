/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  plugins: [require('tailwindcss-radix')({})],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        'navbar-main': '88px',
      },
      fontFamily: {
        sans: ['Poppins', 'Tajawal', 'sans-serif'],
      },
      colors: {
        'rich-black': '#081320',
        primary: {
          100: '#FFB07C',
          200: '#FFA86D',
          300: '#FF9F5F',
          400: '#FF9650',
          500: '#FF8D42',
          600: '#FF8635',
          700: '#FF771D',
          800: '#FF6A07',
          900: '#F06000',
        },
        secondary: {
          100: '#4B6C8F',
          200: '#415E7C',
          300: '#374F69',
          400: '#2D4156',
          500: '#233242',
          600: '#212F3E',
          700: '#1E2B39',
          800: '#1C2834',
          900: '#192430',
        },
      },
    },
  },
}
