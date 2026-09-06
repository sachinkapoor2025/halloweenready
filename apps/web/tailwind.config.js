/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f3d48",
        nav: "#e11d48",
        accent: "#f59e0b",
        spooky: "#0d9488",
        pumpkin: "#e11d48",
        gold: "#d97706",
      },
      boxShadow: {
        spooky: "0 4px 24px rgba(225, 29, 72, 0.18)",
      },
    },
  },
  plugins: [],
};
