/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Authentic Karnataka Educational Brand Identity
        karnataka: {
          yellow: '#F5C400',
          'yellow-light': '#FFF5C2',
          'yellow-hover': '#E0B200',
          maroon: '#8B1538',
          'maroon-dark': '#65102A',
          'maroon-light': '#FDF2F4',
          ivory: '#FFF9E8',
          surface: '#FFFFFF',
          text: '#282126',
          'text-secondary': '#71656A',
          border: '#E9DFD7',
          green: '#1b6535',
        },
        // Mapped Maroon Palette
        maroon: {
          50: '#FDF2F4',
          100: '#FBE4E9',
          200: '#F7CBD5',
          300: '#F0A3B5',
          400: '#E26D8A',
          500: '#B8234D',
          600: '#9B183E',
          700: '#8B1538', // Karnataka Deep Maroon
          800: '#65102A', // Dark Maroon
          900: '#4D0C20',
          950: '#330815',
        },
        // Mapped Karnataka Yellow & Gold Palette
        gold: {
          50: '#FFFDEB',
          100: '#FFF9C7',
          200: '#FFF08F',
          300: '#FFE452',
          400: '#FDD824',
          500: '#F5C400', // Karnataka Signature Yellow
          600: '#D6A600',
          700: '#B38500',
          800: '#8A6405',
          900: '#6E4E0A',
        },
        primary: {
          50: '#FDF2F4',
          100: '#FBE4E9',
          200: '#F7CBD5',
          300: '#F0A3B5',
          400: '#E26D8A',
          500: '#B8234D',
          600: '#9B183E',
          700: '#8B1538',
          800: '#65102A',
          900: '#4D0C20',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
