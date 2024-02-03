/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
    },
    extend: {
      colors: {
        "night-black": '#343434',
      },
    },
  },
  plugins: [],
}

