import type { Config } from "tailwindcss";
import Colors from "@the_human_cipher/components-library/src/theme/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "1rem",
      center: true,
    },
    screens: {
      xs: "450px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1024px",
      xxl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      minHeight: ({ theme }) => ({
        ...theme("height"),
      }),
      minWidth: ({ theme }) => ({
        ...theme("width"),
      }),
      maxWidth: ({ theme }) => ({
        ...theme("width"),
      }),
      colors: {
        ...Colors,
        custom: {
          black: "#333",
        },
        primary: "#3BAF75",
        primaryDark: "#2C8056",
        gray: "#D9D9D9",
        light: {
          gray: "#F3F3F3",
          green: "#D0FCE6",
        },
        suite: { dark: "#333333" },
        dark200: "#A6A6A6",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
