/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "backgroundColor":{
        "black":"rgba(0, 0, 0, 0.552)"
      }
    },
  },
  plugins: [],
}

