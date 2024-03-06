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
        primary: "#2f4ce4",
        secondary: "#d87fef",
        accent: "#e952d5",
        hover: "#4463FF",
        active: "#2741C4",
      },
      // fontSize: {
      //   lg: "clamp(1.125rem,1vw+.6rem,1.5rem)"
      // }
    },
  },
  plugins: [],
};
export default config;
