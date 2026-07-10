import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#15171A",
          soft: "#22252A",
        },
        stone: {
          DEFAULT: "#F1EDE5",
          dim: "#E6E1D6",
        },
        fog: "#7C7669",
        bronze: {
          DEFAULT: "#B0813F",
          light: "#D4A868",
          deep: "#8A6530",
        },
        moss: {
          DEFAULT: "#232B24",
          light: "#3A4739",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(21, 23, 26, 0.25)",
        card: "0 10px 40px -12px rgba(21, 23, 26, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
