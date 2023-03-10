/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'gotham': ['Gotham', 'sans-serif'],
      },
      gridRowEnd: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      },
      gridTemplateColumns: {
        // Simple 26 column grid
        '13': 'repeat(13, 10vh)',
        '19': 'repeat(19, 10vh)',
        '26': 'repeat(26, 10vh)',
        '33': 'repeat(33, 10vh)',
      },
      gridTemplateRows: {
        // Simple 10 column grid
        '10': 'repeat(10, 10vh)',
      },
      height:{
        'section': '100vh',
      },
    },
    screens:{
      'xl': '1280px',
    }
  },
  plugins: [require("daisyui")],
}
