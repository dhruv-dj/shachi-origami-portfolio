/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        parchment: "#EDE4D3",
        wall: "#E8DFD0",
        wood: {
          light: "#C4973B",
          DEFAULT: "#8B6242",
          dark: "#5C3E25",
          deeper: "#3D2810",
        },
        ink: "#2C2C2C",
        muted: "#7A7065",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
