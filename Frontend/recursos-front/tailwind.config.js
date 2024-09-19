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

      backdropBlur: {
        xs: "1px",
      },

      animation: {
        spin: "spin 1s linear infinite", // Default spin animation
      },
      transitionProperty: {
        transform: "transform", // Ensure transform transitions are enabled
      },
      translate: {
        "1/2": "50%", // Example of extending translate values
      },
    },
  },
  plugins: [],
};
