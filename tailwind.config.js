/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-green": "#1DB954",
      "light-green": "#1ED760",
      jade: "#1DA67C",
      "light-jade": "#1ED79F",
      white: "#FFFFFF",
      black: "#191414",
      red: "#FB4D4D",
      gray: "#262020",
      "light-gray": "#3A3A3A",
      test: "#A4A9AD",
      gold: "#FDEE64",
      silver: "#DEE2FF",
      bronze: "#FB4D4D",
    },
    fontFamily: {
      title: ["Lobster", "sans-serif"],
      body: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
