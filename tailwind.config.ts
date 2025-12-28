/**
 * Tailwind CSS Configuration for Dating Receipts Website
 * Dark mode theme with "Red Flag" aesthetic
 */

import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Red Flag Red - Primary brand color
        'red-flag': '#FF3B30',
        'red-flag-dark': '#CC2E24',
        'red-flag-light': '#FF6B63',
        
        // Dark Mode Background
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'dark-elevated': '#2A2A2A',
        
        // Receipt White
        'receipt-white': '#FFFFFF',
        'receipt-off-white': '#FDFAF7',
        
        // Warning Yellow
        'warning-yellow': '#FFD60A',
        
        // System colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#FF3B30',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#1E1E1E',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#FF3B30',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#2A2A2A',
          foreground: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#FFD60A',
          foreground: '#121212',
        },
        popover: {
          DEFAULT: '#1E1E1E',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#1E1E1E',
          foreground: '#FFFFFF',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'chat-bubble': '16px',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Courier Prime', 'Roboto Mono', 'monospace'],
        'headline': ['Oswald', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'glow': {
          '0%': {
            boxShadow: '0 0 20px rgba(255, 59, 48, 0.3)'
          },
          '100%': {
            boxShadow: '0 0 30px rgba(255, 59, 48, 0.6)'
          }
        },
        'glitch': {
          '0%, 100%': {
            transform: 'translate(0)'
          },
          '20%': {
            transform: 'translate(-2px, 2px)'
          },
          '40%': {
            transform: 'translate(-2px, -2px)'
          },
          '60%': {
            transform: 'translate(2px, 2px)'
          },
          '80%': {
            transform: 'translate(2px, -2px)'
          }
        },
        'pulse-red': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.7'
          }
        },
        'slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite',
        'pulse-red': 'pulse-red 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
      backgroundImage: {
        'receipt-texture': 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(255, 59, 48, 0.5)',
        'red-glow-lg': '0 0 40px rgba(255, 59, 48, 0.6)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

