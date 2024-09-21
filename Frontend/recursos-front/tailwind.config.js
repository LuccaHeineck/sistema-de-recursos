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
        customGreyLight: "#202020",
        customGrey: "#151314",
        customGreyDark: "#0e0c0d",
        customLightGrey: "#E8EAF6",
        customWhite1: "#D4D4D4",
        customBlue: "#1C4EAA",
        customLightBlue: "#111a2b",
        customOrange: "#E36C14",
        customLightorange: "#E89611",
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
