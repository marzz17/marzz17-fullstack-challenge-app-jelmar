/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  class: true, // or 'media' or 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
