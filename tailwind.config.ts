import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9f3',
          100: '#d6f1e2',
          200: '#b0e3c8',
          500: '#10b981',
          600: '#059669',
          700: '#047857'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    }
  },
  plugins: []
};

export default config;
