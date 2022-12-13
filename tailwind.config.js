/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': { 'min': '0px', 'max': '480px' },
      'ls': { 'min': '481px', 'max': '768px' },
      'tab': { 'min': '769px', 'max': '1024px' },
      'lp': { 'min': '1025px', 'max': '1366px' },
    }
  },
  plugins: [],
}