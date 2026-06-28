/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1a0a2e",
        nav: "#ff6b00",
        accent: "#39ff14",
        spooky: "#7c3aed",
        pumpkin: "#ff6b00",
        ghost: "#e2e8f0",
      },
      boxShadow: {
        spooky: "0 4px 24px rgba(255, 107, 0, 0.25)",
        glow: "0 0 20px rgba(57, 255, 20, 0.35)",
      },
    },
  },
  plugins: [],
};
