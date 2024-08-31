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
      }
    },
  },
  plugins: [],
}
