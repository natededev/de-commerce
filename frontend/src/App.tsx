/**
 * Main Application Component — App Root and Configuration
 *
 * This component serves as the root of the React application and is responsible for:
 *   - Application routing with React Router
 *   - Global state management through context providers
 *   - Performance optimizations with lazy loading and Suspense
 *   - Error boundary setup for graceful error handling
 *   - Query client configuration for data fetching
 *
 * Uses a provider pattern to wrap the entire application with necessary context and functionality.
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Context Providers - Global state management
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

// Layout Components - Reusable UI structure
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

// Lazy-loaded page components for code splitting and performance
// These components are only loaded when their routes are accessed
const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Settings = lazy(() => import('@/pages/Settings'));

/**
 * Query Client Configuration
 *
 * Configures React Query for efficient data fetching and caching:
 * - staleTime: How long data is considered fresh (5 minutes)
 * - gcTime: How long to keep unused data in cache (10 minutes)
 * - retry: Number of retry attempts for failed requests
 * - retryDelay: Exponential backoff for retries
 * - refetchOnWindowFocus: Disabled to prevent unnecessary refetches
 * - refetchOnReconnect: Enabled to sync data when connection is restored
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 2,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

/**
 * Main App Component
 *
 * Renders the application with all necessary providers and routing.
 * Uses a nested provider pattern to ensure proper context availability.
 */
const App: React.FC = () => {
  // Ensure scroll is always at the top on initial mount (reload)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-background flex flex-col">
                  <Header />
                  <main className="flex-1 min-h-[calc(100vh-16rem)]">
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center h-full">
                          Loading...
                        </div>
                      }
                    >
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/products/:id"
                          element={<ProductDetail />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </div>
              </Router>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
