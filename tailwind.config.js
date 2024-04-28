/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#008DDA",
        "txt-black": "#0D0D0D",
        "txt-white": "#FFFFFF",
        "blue-secondary": "#2171E3",
        "light-blue": "#A7E0FF",
        "light-black": "#0A0101"

      }
    },
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif']
    }
  },
  plugins: [],
}

