/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#53B175',
          light: '#69C98A',
          dark: '#3A9B5C',
          50: '#E8F5ED',
          100: '#C6E7D2',
          200: '#A1D8B4',
          300: '#7BC996',
          400: '#53B175',
          500: '#3A9B5C',
          600: '#2D7A48',
          700: '#205A34',
          800: '#133A20',
          900: '#061A0D',
        },
        dark: {
          DEFAULT: '#181725',
          light: '#30313D',
        },
        grey: {
          light: '#F2F3F2',
          DEFAULT: '#7C7C7C',
          dark: '#4C4F4D',
          border: '#E2E2E2',
        },
        danger: '#DF1525',
        warning: '#F3603F',
      },
      fontFamily: {
        sans: ['Gilroy', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '18px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.04)',
        nav: '0 -4px 20px rgba(0, 0, 0, 0.06)',
        modal: '0 8px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
