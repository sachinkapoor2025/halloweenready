/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a0a2e",
        nav: "#ff6b00",
        accent: "#e11d48",
        spooky: "#7c3aed",
        pumpkin: "#ff6b00",
        gold: "#d97706",
      },
      boxShadow: {
        spooky: "0 4px 24px rgba(255, 107, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
