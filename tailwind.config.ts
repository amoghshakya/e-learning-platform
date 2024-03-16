import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        text: "#040a23",
        background: "#fafbfe",
        primary: {
          50: "#eaf4fb",
          100: "#d5e9f6",
          200: "#aad4ee",
          300: "#80bee5",
          400: "#56a9dc",
          500: "#2b93d4",
          600: "#2376a9",
          700: "#1a587f",
          800: "#113b55",
          900: "#091d2a",
          950: "#040f15",
        },
        secondary: {
          50: "#ebf4fa",
          100: "#d6e9f5",
          200: "#aed3ea",
          300: "#85bde0",
          400: "#5da7d5",
          500: "#3491cb",
          600: "#2a74a2",
          700: "#1f577a",
          800: "#153a51",
          900: "#0a1d29",
          950: "#050f14",
        },
        accent: {
          50: "#e9f4fb",
          100: "#d4eaf7",
          200: "#a8d4f0",
          300: "#7dbfe8",
          400: "#52aae0",
          500: "#2694d9",
          600: "#1f77ad",
          700: "#175982",
          800: "#0f3b57",
          900: "#081e2b",
          950: "#040f16",
        },
        hover: "#163D55",
        active: "#10364D",
      },
      // fontSize: {
      //   lg: "clamp(1.125rem,1vw+.6rem,1.5rem)"
      // }
    },
  },
  plugins: [],
};
export default config;
