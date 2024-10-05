/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        default: "3px 2px 5px white",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
