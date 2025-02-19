/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./vivino_react/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: "#722F37",
        cream: "#F5E6D3",
        gold: "#D4B78C",
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};
