import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#fdf4ee",
          "bg-alt": "#f7c9d9",
          "bg-raised": "#fffaf6",
          "bg-inset": "#fbe9ee",
          line: "#f0c9d6",
          "line-soft": "#f6dde6",
          ink: "#5a3341",
          "ink-soft": "#8a5a6a",
          "ink-faint": "#8f6070",
          accent: "#e0709e",
          "accent-strong": "#c94f7f",
          "accent-deep": "#b83d6b",
          "accent-soft": "#f7c9d9",
          "accent-ink": "#fff9f6",
          gold: "#cf9f5f",
          "gold-soft": "#e8d3ad",
          stamp: "#c94f7f",
          "stamp-ink": "#fff9f6",
          paper: "#fffaf3",
          "paper-ink": "#5a3341",
        },
      },
      fontFamily: {
        display: ['"Alex Brush"', '"Segoe Script"', "cursive"],
        hand: ['"Caveat"', '"Segoe Script"', "cursive"],
        sans: ['"Poppins"', '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        card: "0 14px 28px -12px rgba(201, 79, 127, 0.28), 0 3px 8px rgba(90, 51, 65, 0.1)",
        badge: "0 16px 32px -12px rgba(201, 79, 127, 0.35), 0 4px 10px rgba(207, 159, 95, 0.18)",
      },
      borderRadius: {
        card: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
