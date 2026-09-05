/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8ee',
          100: '#f5edd3',
          200: '#eddba9',
          300: '#e1c276',
          400: '#d5aa48',
          500: '#c5a059', // Primary brand gold
          600: '#a77f32',
          700: '#855f28',
          800: '#6d4c25',
          900: '#5a3f23',
          accent: '#d4af37',
          light: '#e8c97e',
          dark: '#9a752b'
        },
        dark: {
          950: '#070708',
          900: '#0c0c0e',
          850: '#111115',
          800: '#16161b',
          750: '#1c1c24',
          700: '#23232c',
          600: '#2e2e38'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'radial-gradient(ellipse at top, #1c1c24 0%, #0c0c0e 70%)',
        'gold-gradient': 'linear-gradient(135deg, #f5edd3 0%, #c5a059 50%, #9a752b 100%)',
      }
    },
  },
  plugins: [],
}
