/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  plugins: [require("@tailwindcss/container-queries"), require("tailwindcss-radix")({})],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  //
  theme: {
    extend: {
      keyframes: {
        // Dropdown menu
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-right-fade": {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-left-fade": {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        // Navigation menu
        "enter-from-right": {
          "0%": { transform: "translateX(200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "enter-from-left": {
          "0%": { transform: "translateX(-200px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "exit-to-right": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(200px)", opacity: 0 },
        },
        "exit-to-left": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-200px)", opacity: 0 },
        },
        "scale-in-content": {
          "0%": { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
          "100%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
        },
        "scale-out-content": {
          "0%": { transform: "rotateX(0deg) scale(1)", opacity: 1 },
          "100%": { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "fade-out-to-hidden": {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.5 },
          "100%": { display: "none" },
        },
        // Toast
        "toast-hide": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "toast-slide-in-right": {
          "0%": { transform: `translateX(calc(100% + 1rem))` },
          "100%": { transform: "translateX(0)" },
        },
        "toast-slide-in-bottom": {
          "0%": { transform: `translateY(calc(100% + 1rem))` },
          "100%": { transform: "translateY(0)" },
        },
        "toast-swipe-out-x": {
          "0%": { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          "100%": {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        "toast-swipe-out-y": {
          "0%": { transform: "translateY(var(--radix-toast-swipe-end-y))" },
          "100%": {
            transform: `translateY(calc(100% + 1rem))`,
          },
        },
      },
      animation: {
        // Dropdown menu
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade": "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        // Navigation menu
        "enter-from-right": "enter-from-right 0.25s ease",
        "enter-from-left": "enter-from-left 0.25s ease",
        "exit-to-right": "exit-to-right 0.25s ease",
        "exit-to-left": "exit-to-left 0.25s ease",
        "scale-in-content": "scale-in-content 0.2s ease",
        "scale-out-content": "scale-out-content 0.2s ease",
        "fade-in": "fade-in 0.2s ease",
        "fade-out": "fade-out 0.2s ease",
        "fade-out-to-hidden": "fade-out-to-hidden 0.2s ease",
        // Toast
        "toast-hide": "toast-hide 100ms ease-in forwards",
        "toast-slide-in-right": "toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-slide-in-bottom": "toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "toast-swipe-out-x": "toast-swipe-out-x 100ms ease-out forwards",
        "toast-swipe-out-y": "toast-swipe-out-y 100ms ease-out forwards",
      },
      width: {
        "navbar-main": "88px",
      },
      fontFamily: {
        sans: ["Public Sans", "Noto Sans Arabic", "sans-serif"],
      },
      colors: {
        "rich-black": "#161c24",
        paper: {
          light: "#FFFFFF",
          dark: "#2E3034",
          "dark-contrast": "#3D3F45",
          "hover-dark": "#1D1E21",
        },
        dark: "#202124",
        primary: {
          100: "#59E1A1",
          200: "#48DD98",
          300: "#38DA8E",
          400: "#27D785",
          500: "#24C87C",
          600: "#1FAA69",
          700: "#1A8E58",
          800: "#105535",
          900: "#0A3923",
        },
        secondary: {
          100: "#73C9FF",
          200: "#2DAFFF",
          300: "#009CFE",
          400: "#008EE6",
          500: "#0073BA",
          600: "#00619D",
          700: "#005183",
          800: "#004976",
          900: "#00314F",
        },
      },
    },
  },
}
