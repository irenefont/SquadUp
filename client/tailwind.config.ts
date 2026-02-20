import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de fondo
        primary: '#121218',
        surface: '#1e1e26',
        'surface-hover': 'rgba(18, 18, 24, 0.5)',
        // Color de marca
        brand: '#6c5ce7',
        'brand-hover': 'rgba(108, 92, 231, 0.8)',
        // Texto
        'text-primary': '#ffffff',
        'text-secondary': '#b2bec3',
        'text-muted': '#636e72',
        // Bordes
        border: '#5c5a5a',
        'border-light': '#2d2d3a',
        // Estados
        error: '#e74c3c',
        success: '#27ae60',
        // Otros
        placeholder: '#d9d9d9',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      borderRadius: {
        'sm': '12px',
        'md': '16px',
        'lg': '32px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '20px',
        'xl': '24px',
        '2xl': '26px',
      },
      boxShadow: {
        'card': '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
        'hover': '0px 8px 20px 0px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config
