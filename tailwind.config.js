/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['emerald', 'halloween'],
  },
  plugins: [daisyui],
};
