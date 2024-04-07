import type { Config } from "tailwindcss";
import flowbitePlugin from "flowbite/plugin";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      "2xl": {"max": "1535px"},

      "xl": {"max": "1279px"},

      "lg": {"max": "1023px"},

      "md": {"max": "767px"},

      "sm": {"max": "639px"},
      "xs": {"max": "480px"}
    },
    extend: {
      fontWeight: {
        medium: "500",
        light: "300",
        bold: "700",
      },
      fontSize: {
        lg: "2rem",
        sm: "0.875rem",
        md: "1.5rem",
      },
      lineHeight: {
        lg: "1.8em",
        rg: "1.5em",
        md: "1.6em",
        sm: "1.4em",
      },
      spacing: {
        lg: "2em",
        md: "1.5em",
        rg: "1em",
        sm: "0.5em",
      },
      margin: {
        lg: "2em",
        md: "1.5em",
        rg: "1em",
        sm: "0.75em",
      },
      gap: {
        lg: "2em",
        md: "1.5em",
        rg: "1em",
        sm: "0.75em",
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(320px, 1fr))",
        "auto-fit": "repeat(auto-fit, minmax(320px, 1fr))",
      },
    },
  },
  plugins: [flowbitePlugin],
};
export default config;