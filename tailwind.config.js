export default {
  content: ["./index.css", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: {
        min: "0px",
        max: "480px",
      },
      sm: "481px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      fontFamily: {
        sans: "Inter",
      },
      spacing: {
        "safe-bottom": "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
};
