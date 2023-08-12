const typography = require('@tailwindcss/typography');
const headlessui = require('@headlessui/tailwindcss');
const {
  gray,
  neutral,
  black,
  white,
} = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,tsx}',
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      current: 'currentColor',
      inherit: 'inherit',
      transparent: 'transparent',
      primary: '#ee6e00',
      black,
      white,
      dark: neutral[800],
      light: neutral[50],
      gray,
      neutral,
    },
    extend: {
      boxShadow: {
        DEFAULT: '-1px 1px 4px 0px rgba(0, 0, 0, 0.4)',
      },
      spacing: {
        sidebarGap: '0.25rem',
        sidebar: '20rem',
        'titlebar-area-x': 'env(titlebar-area-x, 0)',
        'titlebar-area-y': 'env(titlebar-area-y, 0)',
        'titlebar-area-width': 'env(titlebar-area-width, 0)',
        'titlebar-area-height': 'env(titlebar-area-height, 0)',
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
