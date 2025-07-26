/**
 * Tailwind CSS Configuration - Design System and Styling Setup
 *
 * Configures Tailwind CSS with a comprehensive design system including:
 * - Custom color palette with CSS variables for theming
 * - Typography system with Inter font family
 * - Responsive container and layout utilities
 * - Custom animations and transitions
 * - E-commerce specific color schemes (price, sale, success, etc.)
 * - Dark mode support with class-based switching
 *
 * This configuration provides a consistent design language across
 * the entire e-commerce application with proper theming support.
 */

import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  // Dark mode configuration using class-based switching
  darkMode: ['class'],

  // Content paths for Tailwind to scan and generate utilities
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  // No prefix for utility classes
  prefix: '',

  // Theme customization and extensions
  theme: {
    // Container configuration for consistent layout
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px', // Max width for extra large screens
      },
    },

    // Extended theme properties
    extend: {
      // Typography system
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Modern, readable font stack
      },

      // Custom color palette using CSS variables for theming
      colors: {
        // Base UI colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary brand colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },

        // Secondary accent colors
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // Semantic colors for different states
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        // Component-specific colors
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // E-commerce specific colors
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        price: {
          DEFAULT: 'hsl(var(--price))',
          foreground: 'hsl(var(--price-foreground))',
        },
        sale: {
          DEFAULT: 'hsl(var(--sale))',
          foreground: 'hsl(var(--sale-foreground))',
        },
      },

      // Custom background gradients
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-card': 'var(--gradient-card)',
      },

      // Custom shadow system for depth and elevation
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        strong: 'var(--shadow-strong)',
      },

      // Custom transition properties for smooth animations
      transitionProperty: {
        smooth: 'var(--transition-smooth)',
        fast: 'var(--transition-fast)',
      },

      // Border radius system for consistent corner rounding
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Custom keyframes for animations
      keyframes: {
        // Accordion animations for collapsible content
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },

      // Animation utilities using the custom keyframes
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },

  // Plugins for additional functionality
  plugins: [tailwindcssAnimate], // Enables smooth animations and transitions
} satisfies Config;
