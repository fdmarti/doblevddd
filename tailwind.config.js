/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['light', 'night'],
  },
  plugins: [daisyui],
};

// {
//   light: {
//     primary: '#2563eb',
//     secondary: '#000D27',
//     accent: '#22d3ee',
//     neutral: '#f5f5f4',
//     'base-100': '#d1d5db',
//     'base-200': '#BDBDBC',
//     info: '#fbbf24',
//     success: '#22c55e',
//     warning: '#d97706',
//     error: '#ff0000',
//   },
// },
// {
//   dark: {
//     primary: '#2563eb',
//     secondary: '#F1F1E6',
//     accent: '#6b7280',
//     neutral: '#304865',
//     'base-100': '#3E4756',
//     info: '#fbbf24',
//     success: '#22c55e',
//     warning: '#d97706',
//     error: '#ff0000',
//   },
// },
