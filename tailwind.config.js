const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      fontFamily: {
        sans: ["Readex Pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.stone,
        offWhite: "#f5f3f0",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
