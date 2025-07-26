/**
 * Main Entry Point - React Application Bootstrap
 *
 * This file serves as the entry point for the React application. It:
 * - Creates the React root and renders the main App component
 * - Sets up HelmetProvider for dynamic SEO management
 * - Imports global styles and configurations
 *
 * The HelmetProvider enables dynamic meta tag management for SEO,
 * allowing components to update document head tags programmatically.
 */

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';

// Create React root and render the application
// Using createRoot API (React 18+) for concurrent features support
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
