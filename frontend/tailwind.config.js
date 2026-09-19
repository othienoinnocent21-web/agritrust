/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#166534",
        secondary: "#4F46E5",
        "dark-green": "#14532D",
        "light-green": "#DCFCE7",
        gold: "#F59E0B",
        "light-gold": "#FEF3C7",
        background: "#F8FAFC",
        text: "#0F172A",
        muted: "#64748B",
        border: "#E2E8F0",
      },
    },
  },
  plugins: [],
};
