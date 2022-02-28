const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          ...colors.purple,
          1000: '#4c0094',
          1100: '#630db5',
        },
        gray: {
          ...colors.gray,
          1000: '#2b2b2b',
        },
        green: {
          ...colors.green,
          1000: '#8cc63f',
          1100: '#39b54a',
        },
      },
    },
  },
  plugins: [],
}
