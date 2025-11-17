import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f2f7',
          100: '#d1e5ef',
          200: '#a3cbe0',
          300: '#75b1d0',
          400: '#4797c1',
          500: '#197db1',
          600: '#0b5394',
          700: '#094176',
          800: '#072f59',
          900: '#051d3b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
