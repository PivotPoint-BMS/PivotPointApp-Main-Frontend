/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'rich-black': '#081320',
        primary: {
          100: '#3E85D0',
          200: '#3078C4',
          300: '#2A6BAF',
          400: '#255E9A',
          500: '#205084',
          600: '#1B4571',
          700: '#153557',
          800: '#112B47',
          900: '#0D2237',
        },
        secondary: {
          100: '#9A95D8',
          200: '#8E87D3',
          300: '#817ACE',
          400: '#685FC4',
          500: '#5B52BF',
          600: '#4F46BA',
          700: '#433BA0',
          800: '#383185',
          900: '#2D276A',
        },
      },
    },
  },
}
