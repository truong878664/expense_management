import type { Config } from 'tailwindcss'
import plugin from "tailwindcss/plugin";


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {

      },
      animation: {},
      keyframes: {}
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
        }
      })
    }),
  ],
}
export default config
