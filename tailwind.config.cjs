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

        'w-navy': '#001F3F',
        'w-blue': '#0074D9',
        'w-aqua': '#7FDBFF',
        'w-teal': '#39CCCC',
        'w-olive': '#3D9970',
        'w-green': '#2ECC40',
        'w-lime': '#01FF70',
        'w-yellow': '#FFDC00',
        'w-orange': '#FF851B',
        'w-red': '#FF4136',
        'w-fuchsia': '#F012BE',
        'w-purple': '#B10DC9',
        'w-maroon': '#85144B',
        'w-white': '#FFFFFF',
        'w-silver': '#DDDDDD',
        'w-gray': '#AAAAAA',
        'w-black': '#111111'
      },
    },
  },
  // @ts-ignore
  plugins: [require("tailwindcss-animate")],
};
