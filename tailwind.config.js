/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige': {
          50: '#FAF8F5',
          100: '#F5F1EA',
          200: '#EBE3D5',
          300: '#DFD2BB',
          400: '#D3C1A1',
        },
        'blue': {
          900: '#1E3A8A',
          800: '#1E40AF',
        },
        'violet': {
          800: '#5B21B6',
          700: '#6D28D9',
        }
      },
    },
  },
  plugins: [],
}