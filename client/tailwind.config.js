module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#2563eb', // Your exact blue color
        'accent-light': '#93c5fd', // Lighter variant
        'accent-lighter': '#dbeafe', // Lightest variant
      },
    },
  },
  plugins: [],
}