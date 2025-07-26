/**
 * Home Page — Main Landing Page
 *
 * This is the primary landing page for the e-commerce site. It features:
 *   - Hero section with a compelling call-to-action
 *   - SEO-optimized meta tags and structured data
 *   - Lazy-loaded sections for performance optimization
 *   - Featured products showcase
 *   - Trust indicators and social proof
 *   - Newsletter signup for lead generation
 *
 * Uses React Helmet for dynamic SEO management and React.lazy for optimal performance and user experience.
 */

import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Lazy-load product list for performance
const ProductList = lazy(() =>
  import('@/features/products/components/ProductList').then(module => ({
    default: module.ProductList,
  }))
);

// Import site-wide config for branding and SEO
import { siteConfig } from '@/config/site';

// Lazy-load page sections for code splitting and performance
const FeaturesSection = lazy(() => import('./HomeFeaturesSection'));
const TestimonialsSection = lazy(() => import('./HomeTestimonialsSection'));
const NewsletterSection = lazy(() => import('./HomeNewsletterSection'));

/**
 * Home Component
 *
 * Renders the main landing page with all sections and SEO optimization.
 * Uses lazy loading to improve initial page load performance.
 */
const Home: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags and Structured Data */}
      <Helmet>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="author" content={siteConfig.company.name} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />

        {/* Open Graph tags for social media sharing */}
        <meta property="og:title" content={siteConfig.seo.defaultTitle} />
        <meta
          property="og:description"
          content={siteConfig.seo.defaultDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content={siteConfig.name} />

        {/* Twitter Card tags for Twitter sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteConfig.seo.defaultTitle} />
        <meta
          name="twitter:description"
          content={siteConfig.seo.defaultDescription}
        />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:site" content={siteConfig.seo.twitter.site} />
        <meta name="twitter:creator" content={siteConfig.seo.twitter.handle} />
      </Helmet>

      {/* Hero Section - Main value proposition and CTA */}
      <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden text-center">
        {/* Background pattern for visual interest */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Premium quality badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            <Award className="h-4 w-4 mr-2" />
            Premium Quality Guaranteed
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            DE-Commerce
          </h1>

          {/* Value proposition */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            {siteConfig.description}
          </p>

          {/* Call-to-action buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 min-h-20 px-4"
            style={{ minHeight: '5rem' }}
          >
            <Link to="/products" aria-label={`Shop ${siteConfig.name}`}>
              <Button
                size="lg"
                className="w-full sm:min-w-48 h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8"
              >
                Shop Now
                <ArrowRight
                  className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                  width={20}
                  height={20}
                />
              </Button>
            </Link>
            <Link to="/about" aria-label={`About ${siteConfig.name}`}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:min-w-48 h-12 sm:h-14 text-base sm:text-lg px-6 sm:px-8"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - Social proof and guarantees */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-muted-foreground px-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>
                Free Shipping Over ${siteConfig.shipping.freeShippingThreshold}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>30-Day Returns</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto flex items-center justify-center px-4">
            {siteConfig.company.mission}
          </p>
        </div>
      </section>

      {/* Features Section - Lazy loaded for performance */}
      <div style={{ minHeight: 400 }}>
        <Suspense
          fallback={<div className="py-20 text-center">Loading features…</div>}
        >
          <FeaturesSection />
        </Suspense>
      </div>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-muted-foreground">
                {siteConfig.description.split('.')[0]}
              </p>
            </div>
            <Link
              to="/products"
              aria-label={`View All ${siteConfig.name} Products`}
            >
              <Button variant="outline" size="lg" className="hidden md:flex">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Product list with loading state */}
          <Suspense
            fallback={
              <div className="py-20 text-center">Loading products…</div>
            }
          >
            <ProductList />
          </Suspense>

          {/* Mobile CTA button */}
          <div className="text-center mt-12">
            <Link
              to="/products"
              aria-label={`View All ${siteConfig.name} Products`}
            >
              <Button size="lg" className="md:hidden">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Lazy loaded for performance */}
      <div style={{ minHeight: 400 }}>
        <Suspense
          fallback={
            <div className="py-20 text-center">Loading testimonials…</div>
          }
        >
          <TestimonialsSection />
        </Suspense>
      </div>

      {/* Newsletter Section - Lazy loaded for performance */}
      <div style={{ minHeight: 300 }}>
        <Suspense
          fallback={
            <div className="py-20 text-center">Loading newsletter…</div>
          }
        >
          <NewsletterSection />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
