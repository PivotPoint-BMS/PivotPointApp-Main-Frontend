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
        sans: ['Poppins', 'Noto Sans Arabic', 'sans-serif'],
      },
      colors: {
        'rich-black': '#161c24',
        paper: {
          light: '#FFFFFF',
          dark: '#002034',
        },
        dark: '#001928',
        primary: {
          100: '#59E1A1',
          200: '#48DD98',
          300: '#38DA8E',
          400: '#27D785',
          500: '#24C87C',
          600: '#1FAA69',
          700: '#1A8E58',
          800: '#105535',
          900: '#0A3923',
        },
        secondary: {
          100: '#73C9FF',
          200: '#2DAFFF',
          300: '#009CFE',
          400: '#008EE6',
          500: '#0073BA',
          600: '#00619D',
          700: '#005183',
          800: '#004976',
          900: '#00314F',
        },
      },
    },
  },
}
