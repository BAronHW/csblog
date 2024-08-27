const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        lightmode: '#c0c7c2',
        lightmodeheader: '#7A8678'
      }
    },
  },
  plugins: [],
}

