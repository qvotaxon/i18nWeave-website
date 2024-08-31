/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      fontFamily:
      {
        'sans': ['-apple-system', 'Roboto', 'sans-serif', 'serif']
      },
      colors: {
        'primary': '#1f2937',
        'secondary': '#3b82f6',
        'highlight': '#f8dc7c',
        'variant-1': '#3b82f6',
        'variant-2': '#a9d864',
        'variant-3': '#e0564c',
        'variant-4': '#f2b34c',
      }
    },
  },
  plugins: [],
}
