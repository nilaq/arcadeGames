/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'lime': '#C7EF00',
        'vermillion': '#FF312E',
        'jet': '#333138',
        'dwhite': '#FBFBFB',
      },
    },
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")],
};
