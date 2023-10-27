import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import zIndex from "./tailwind/zIndex";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "c-green": "#5CB559",
      },
      zIndex: zIndex() as any,
      backgroundImage: {},
      animation: {
        "show-left": "show-left 200ms linear 1",
      },
      keyframes: {
        "show-left": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "opacity": {
          "0%": {
            opacity: "0%"
          },
          "100%": {
            opacity: "100%"
          },
        }
      },
    },
  },

  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addUtilities({
        ".scrollbar-none::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar-none": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};
export default config;
