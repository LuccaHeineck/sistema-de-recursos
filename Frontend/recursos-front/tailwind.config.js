/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },

      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },

      colors: {
        customGrey: "#151314",
        customLightGrey: "#E8EAF6",
      },
    },
  },
  plugins: [],
};
