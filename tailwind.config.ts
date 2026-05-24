import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#181410",
        "ink-soft": "#2A231C",
        mute: "#6B5E4A",
        line: "#D7C9A4",
        "line-strong": "#BFAE82",
        paper: "#F4EBD0",
        "paper-deep": "#ECE1BD",
        "paper-deeper": "#E3D5A7",
        cream: "#F3ECD8",
        accent: "#A6491F",
        "accent-bright": "#C46A2B",
        gold: "#A77E2F",
        maroon: "#6D2017",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
        sanskrit: ["var(--font-sanskrit)", "var(--font-serif)", "serif"],
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};

export default config;
