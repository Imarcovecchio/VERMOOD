/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFC60A", // fondo modo claro
          dark: "#FA0F75",  // fondo modo oscuro
        },
        extra: {
          pink: "#FD9BC5",
          gold: "#DBCD80",
          green: "#32533D",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
