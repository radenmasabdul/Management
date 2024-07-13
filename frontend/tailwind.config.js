/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      JakartaSans: ["'Plus Jakarta Sans', sans-serif;"],
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

