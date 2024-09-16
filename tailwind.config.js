/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d3ebf2",
          200: "#a6d7e4",
          300: "#7ac3d7",
          400: "#4dafc9",
          500: "#219bbc",
          600: "#1a7c96",
          700: "#145d71",
          800: "#0d3e4b",
          900: "#071f26"
        },
      },
    },
  },
  plugins: [],
};