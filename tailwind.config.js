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
      }
    },
  },
  plugins: [],
}
