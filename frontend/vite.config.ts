/**
 * Vite Configuration - Build Tool and Development Server Setup
 *
 * Configures Vite for optimal development and production builds:
 * - React plugin for JSX support and Fast Refresh
 * - Path aliases for clean imports (@/ points to src/)
 * - Development server configuration
 * - Build optimization with code splitting
 * - Bundle analysis and performance tuning
 *
 * This configuration ensures fast development experience and
 * optimized production builds with proper code splitting.
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  // Plugins for framework support and development features
  plugins: [
    react(), // Enables React Fast Refresh and JSX transformation
    visualizer({
      filename: 'stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  // Path resolution configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Clean import paths with @/ prefix
    },
  },

  // Development server configuration
  server: {
    port: 8080,
    host: true, // Allows LAN access and auto-increment port if 8080 is in use
  },

  // Production build configuration
  build: {
    minify: 'esbuild', // Fast minification using esbuild
    sourcemap: true, // Generate source maps for debugging
    cssCodeSplit: true, // Split CSS into separate chunks for better caching

    // Rollup configuration for advanced bundling
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching and loading performance
        manualChunks: {
          vendor: ['react', 'react-dom'], // Core React libraries
          router: ['react-router-dom'], // Routing library
          ui: [
            '@radix-ui/react-select',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ], // UI components
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'], // Form handling
          icons: ['lucide-react'], // Icon library
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning threshold for chunk sizes
  },

  // Environment variable definitions
  define: {
    'process.env.NODE_ENV': '"production"', // Set NODE_ENV for production builds
  },

  // Dependency optimization for faster development
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // Pre-bundle these dependencies
  },
});
