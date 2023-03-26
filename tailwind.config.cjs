const {
  black,
  white,
} = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: '#ee6e00',
      black,
      white,
    },
    extend: {
      minWidth: {
        80: '20rem',
      },
    },
  },
  plugins: [],
};
