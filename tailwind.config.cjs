const typography = require('@tailwindcss/typography');

const sidebarWidth = 20;
const sidebarGap = 0.25;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#ee6e00',
      },
      boxShadow: {
        DEFAULT: '-1px 1px 4px 0px rgba(0, 0, 0, 0.4)',
      },
      spacing: {
        sidebarGap: `${sidebarGap}rem`,
        sidebarAdjusted: `${sidebarWidth - (sidebarGap)}rem`,
        sidebar: `${sidebarWidth}rem`,
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};
