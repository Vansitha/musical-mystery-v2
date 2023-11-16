/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-green": "#1DB954",
      "light-green": "#1ED760",
      white: "#FFFFFF",
      black: "#191414",
    },
    fontFamily: {
      title: ["Lobster", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
