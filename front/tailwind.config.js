/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  // ...existing code...
  theme: {
    extend: {
      colors: {
        // simple token
        primary: {
          100: "#FFE99A",
          200: "#FFD586",
        },
        // shades (use with e.g. bg-primary-500 or text-primary-600)
        secondary: {
          100: "#FFAAAA",
          200: "#FF9898",
        },
        surface: "#ffffff",
        background: "#f8fafc",
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "System"],
        display: ["Poppins"],
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
  // ...existing code...
};
