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
          50: '#eff7fb',
          100: '#d9eaf5',
          200: '#b9d9ec',
          300: '#8bc0de',
          400: '#5ea3cd',
          500: '#4c82c3',
          600: '#3d69a0',
          700: '#325482',
          800: '#2d486c',
          900: '#293d5b',
        },
      },
    },
  },
  plugins: [],
};

export default config;
