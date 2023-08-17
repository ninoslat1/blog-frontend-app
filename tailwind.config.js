/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'pack-train': "url('../public/images/packTrain.jpg')",
    },
    extend: {
      fontFamily: {
        'rb': ['Roboto', 'sans-serif'],
        'lt': ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}

