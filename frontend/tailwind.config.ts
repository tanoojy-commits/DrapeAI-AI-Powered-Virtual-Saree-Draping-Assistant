import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#C2185B",
          deep: "#8F123F",
          soft: "#FBE4EE",
        },
        accent: {
          DEFAULT: "#FFD54F",
          deep: "#C99700",
        },
        ink: "#201018",
        pearl: "#FFF8FB",
        surface: "#FFFFFF",
        muted: "#6B6670",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "420px",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(194, 24, 91, 0.22)",
      },
    },
  },
  plugins: [],
} satisfies Config;
