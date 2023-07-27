const typography = require('@tailwindcss/typography');
const headlessui = require('@headlessui/tailwindcss');

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
            '--tw-prose-bullets': 'var(--tw-prose-body)',
            '--tw-prose-invert-body': 'white',
            '--tw-prose-invert-bullets': 'var(--tw-prose-invert-body)',
            maxWidth: '100%',
          },
        },
      },
    },
  },
  plugins: [
    typography,
    headlessui,
  ],
};
