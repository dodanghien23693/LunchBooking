/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-green-1': '#439D0D',
        'light-green-1': '#9DDC4C',
        'light-green-2': '#8AD769',
        'light-green-3': '#CAF5B1',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border|from)-green-1/,
    },
    {
      pattern: /(bg|text|border|from)-secondary-color/,
    },
    {
      pattern: /(bg|text|border|to)-light-color/,
    },
  ],
}
