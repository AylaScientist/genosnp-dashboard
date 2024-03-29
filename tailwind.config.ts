import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        logo: {
          name: '#F4E2DE',
          background: '#6A2055',
          500: '#6A2055',
          400: '#6A2045',
          600: '#6A2060',
        },
        custom: {
          customBlue: '#007bff',
          customRed: 'rgb(255, 99, 71)',
          customGreen: 'hsl(125, 50%, 50%)',
          customPurple: 'rgba(128, 0, 128, 0.5)',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
