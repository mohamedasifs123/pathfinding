/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wall: {
          "0%": {
            transform: "scale(0.6)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        traversed: {
          "0%": {
            backgroundColor: "#0000ff", // Tomato
          },
          "25%": {
            backgroundColor: "#ffa07a", // Light Salmon
          },
          "50%": {
            backgroundColor: "#ff4500", // Orange Red
          },
          "75%": {
            backgroundColor: "#ff8c00", // Dark Orange
          },
          "100%": {
            backgroundColor: "green", // Lime Green (final color)
          },
        },
        path: {
          "0%": {
            transform: "scale(0.8)",
            backgroundColor: "#0000ff", // Blue
          },
          "25%": {
            transform: "scale(1)",
            backgroundColor: "#1e90ff", // Lighter Blue
          },
          "50%": {
            transform: "scale(1.2)",
            backgroundColor: "#00bfff", // Even lighter Blue
          },
          "75%": {
            transform: "scale(1.1)",
            backgroundColor: "#4682b4", // Steel Blue
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "#32cd32", // Lime Green
          },
        },
      },
      animation: {
        wall: "wall 0.5s ease-out forwards",
        traversed: "traversed 2s ease-in-out forwards",
        path: "path 2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
