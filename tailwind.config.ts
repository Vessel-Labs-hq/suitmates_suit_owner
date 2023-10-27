import type { Config } from "tailwindcss";
import Colors from "@the_human_cipher/components-library/src/theme/colors";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
      "@desktop": "1440px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        slideUp: {
          from: {
            bottom: "-100px",
          },
          to: {
            bottom: "0",
          },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
