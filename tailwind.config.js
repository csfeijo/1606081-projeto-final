/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        teste: {
          50: '#0096D6'
        },
        red: {
          30: '#FF0010'
        }
      }
    },
  },
  plugins: [],
}

