/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bit-blue': '#2563eb',    // Professional Blue
        'bit-orange': '#f97316',  // Accent Orange
        'emergency-red': '#dc2626', // Critical Red
      },
    },
  },
  plugins: [],
}