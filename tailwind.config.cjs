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
      boxShadow: {
        DEFAULT: '-1px 1px 4px 0px rgba(0, 0, 0, 0.4)',
      },
      minWidth: {
        80: '20rem',
      },
    },
  },
  plugins: [],
};
