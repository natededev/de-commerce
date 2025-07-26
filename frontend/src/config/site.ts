/**
 * Site Configuration — Centralized Application Settings
 *
 * This file defines a comprehensive configuration object that centralizes all site-wide settings for the e-commerce platform, including:
 *   - Branding and company information
 *   - SEO and meta tag configurations
 *   - Navigation structure and routing
 *   - Feature flags and toggles
 *   - Design system colors and theming
 *   - E-commerce-specific settings (shipping, currency, etc.)
 *   - Contact information and business hours
 *   - Legal and compliance information
 *
 * This configuration serves as the single source of truth for all application settings and can be easily customized for different deployments or white-label solutions.
 *
 * CUSTOMIZATION GUIDE:
 *   1. Update developer/company information with your details
 *   2. Modify branding (name, logo, colors) for your project
 *   3. Adjust shipping rates and currency for your target market
 *   4. Update contact information and business hours
 *   5. Configure SEO settings for your domain
 */

import type { NavigationItem } from '@/types';

/**
 * Demo Credentials (for reviewers, QA, and portfolio review)
 *
 * The login page features a demo credentials bar just below the sign-in form.
 * Reviewers can click the copy icon to autofill the login form with these credentials:
 *   - Admin: admin@gmail.com / demo123456
 *   - User: user@gmail.com / demo123456
 * 
 * Note: New user registration requires email confirmation. Demo accounts are 
 * pre-verified for immediate access.
 * 
 * Credentials are also copied to clipboard for convenience.
 */
export const siteConfig = {
  /**
   * Trust Indicators
   *
   * Key selling points and trust signals displayed throughout the site
   * to build customer confidence and reduce purchase anxiety.
   */
  trust: {
    secureShoppingTitle: 'Secure Shopping',
    secureShoppingDesc: 'SSL Protected',
    fastDeliveryTitle: 'Fast Delivery',
    fastDeliveryDesc: '2-3 Business Days',
    returnsTitle: '30-Day Returns',
    returnsDesc: 'No Questions Asked',
    qualityTitle: 'Premium Quality',
    qualityDesc: 'Curated Selection',
  },

  /**
   * Site Information
   *
   * Core branding and identity information for the e-commerce site.
   * CUSTOMIZE: Update name, description, and URLs for your project.
   */
  name: 'DE-Commerce',
  logoText: 'DE',
  logoImage: '', // Set to image URL to use image instead of text
  description:
    'Modern, fullstack e-commerce template built with React/Vite, TypeScript, Node.js, and Supabase/PostgreSQL. Feature-rich, customizable, and production-ready for rapid launches or developer use.',
  // whyChoose: Used for the 'Why Choose Us?' section on the home page
  whyChoose:
    'DE-Commerce offers a complete, modern full-stack foundation for your e-commerce venture. Its beautiful UI is built with React/Vite, TypeScript, and Tailwind CSS. The flexible and scalable backend architecture, powered by Node.js/Express and leveraging PostgreSQL with Supabase, ensures robust data management and seamless API interactions. This boilerplate is designed to empower rapid development, seamless customization, and efficient deployment.',
  url: 'https://your-domain.com',
  ogImage: 'https://your-domain.com/og-image.png',

  /**
   * Developer/Company Information
   *
   * Information about the developer or company behind the project.
   * CUSTOMIZE: Replace with your actual information.
   */
  company: {
    name: 'DE-Commerce Team',
    email: 'contact@de-commerce.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Business St',
      city: 'Tech City',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    social: {
      twitter: 'https://twitter.com/decommerce',
      facebook: 'https://facebook.com/decommerce',
      instagram: 'https://instagram.com/decommerce',
      linkedin: 'https://linkedin.com/company/decommerce',
      github: 'https://github.com/decommerce',
    },
    founded: '2025',
    mission:
      'Empowering businesses and developers to create stunning, high-performance e-commerce experiences that drive growth and delight customers.',
  },

  /**
   * Contact Information
   *
   * Customer service and business contact details including
   * operating hours and multiple contact methods.
   * CUSTOMIZE: Update with your actual contact information.
   */
  contact: {
    email: 'support@de-commerce.com',
    phone: '+1 (555) 123-4567',
    supportEmail: 'support@de-commerce.com',
    salesEmail: 'sales@de-commerce.com',
    address: {
      street: '123 Business St',
      city: 'Tech City',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },

  /**
   * Design System - Colors
   *
   * CSS variable-based color system that supports theming and
   * maintains consistency across the application. Colors are
   * defined as HSL values for better color manipulation.
   * CUSTOMIZE: Update colors in src/index.css to match your brand.
   */
  colors: {
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
      // You can customize these CSS variables in src/index.css
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
    },
    accent: {
      DEFAULT: 'hsl(var(--accent))',
      foreground: 'hsl(var(--accent-foreground))',
    },
    destructive: {
      DEFAULT: 'hsl(var(--destructive))',
      foreground: 'hsl(var(--destructive-foreground))',
    },
    muted: {
      DEFAULT: 'hsl(var(--muted))',
      foreground: 'hsl(var(--muted-foreground))',
    },
    popover: {
      DEFAULT: 'hsl(var(--popover))',
      foreground: 'hsl(var(--popover-foreground))',
    },
    card: {
      DEFAULT: 'hsl(var(--card))',
      foreground: 'hsl(var(--card-foreground))',
    },
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
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

  /**
   * Navigation
   *
   * Site navigation structure for both main navigation and footer.
   * CUSTOMIZE: Update navigation items based on your site structure.
   */
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Cart', href: '/cart' },
    ] as NavigationItem[],
    footer: [
      { name: 'About', href: '/about' },
      { name: 'Products', href: '/products' },
      { name: 'Contact', href: '/contact' },
      { name: 'Cart', href: '/cart' },
      { name: 'Privacy Policy', href: '/privacy', disabled: true },
      { name: 'Terms of Service', href: '/terms', disabled: true },
      { name: 'Shipping Info', href: '/shipping', disabled: true },
      { name: 'Returns', href: '/returns', disabled: true },
      { name: 'FAQ', href: '/faq', disabled: true },
    ] as NavigationItem[],
  },

  /**
   * Features
   *
   * Feature flags that control which functionality is enabled
   * in the application. Useful for gradual rollouts and A/B testing.
   * CUSTOMIZE: Enable/disable features based on your requirements.
   */
  features: {
    auth: true,
    cart: true,
    wishlist: false,
    reviews: false,
    search: true,
    filters: true,
    pagination: true,
    newsletter: true,
    socialLogin: false,
    multiCurrency: true, // Enable multi-currency support
  },

  /**
   * SEO Configuration
   *
   * Search engine optimization settings including meta tags,
   * Open Graph data, and Twitter Card configurations.
   * CUSTOMIZE: Update with your actual domain and social handles.
   */
  seo: {
    titleTemplate: '%s | DE-Commerce',
    defaultTitle: 'DE-Commerce - Modern Online Store',
    defaultDescription:
      'A modern, production-ready e-commerce boilerplate built with React, TypeScript, and Tailwind CSS. Perfect for building your next online store.',
    siteUrl: 'https://de-commerce.com',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://de-commerce.com',
      siteName: 'DE-Commerce',
      images: [
        {
          url: 'https://de-commerce.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'DE-Commerce',
        },
      ],
    },
    twitter: {
      handle: '@decommerce',
      site: '@decommerce',
      cardType: 'summary_large_image',
    },
  },

  /**
   * Legal Information
   *
   * Legal pages and compliance information including
   * copyright notices and policy URLs.
   * CUSTOMIZE: Update with your company information.
   */
  legal: {
    companyName: 'DE-Commerce Team',
    copyright: '© 2025 DE-Commerce. All rights reserved.',
    privacyPolicyUrl: '/privacy',
    termsOfServiceUrl: '/terms',
    shippingPolicyUrl: '/shipping',
    returnPolicyUrl: '/returns',
  },

  /**
   * Currency and Localization
   *
   * Currency settings for international e-commerce support.
   * CUSTOMIZE: Update with your target market currencies.
   */
  currency: {
    default: 'NGN',
    supported: [
      { code: 'USD', symbol: '$', position: 'before', name: 'US Dollar' },
      { code: 'NGN', symbol: '₦', position: 'before', name: 'Nigerian Naira' },
      { code: 'EUR', symbol: '€', position: 'before', name: 'Euro' },
      { code: 'GBP', symbol: '£', position: 'before', name: 'British Pound' },
      {
        code: 'CAD',
        symbol: 'C$',
        position: 'before',
        name: 'Canadian Dollar',
      },
      {
        code: 'AUD',
        symbol: 'A$',
        position: 'before',
        name: 'Australian Dollar',
      },
    ],
    position: 'before', // "before" or "after"
  },

  /**
   * Shipping Configuration
   *
   * Shipping rates and thresholds for different shipping methods.
   * Used throughout the cart and checkout process.
   * CUSTOMIZE: Update with your actual shipping rates.
   */
  shipping: {
    freeShippingThreshold: 50,
    defaultShippingCost: 5.99,
    expressShippingCost: 15.99,
    internationalShippingCost: 25.99,
    // Currency-specific shipping rates
    rates: {
      USD: {
        freeThreshold: 50,
        standard: 5.99,
        express: 15.99,
        international: 25.99,
      },
      NGN: {
        freeThreshold: 25000,
        standard: 1500,
        express: 5000,
        international: 15000,
      },
      EUR: {
        freeThreshold: 45,
        standard: 5.5,
        express: 14.5,
        international: 23.5,
      },
    },
  },

  /**
   * Pagination Settings
   *
   * Configuration for paginated content like product listings.
   * Controls how many items are shown per page and navigation.
   */
  pagination: {
    productsPerPage: 12,
    maxPagesToShow: 5,
  },

  /**
   * Development Settings
   *
   * Configuration for development and testing features.
   * CUSTOMIZE: Adjust based on your development needs.
   */
  development: {
    useMocks: false, // Set to false in production
    apiDelay: 0, // No simulated delay for production
    enableDebugLogs: import.meta.env.DEV, // Only enable in development
  },
} as const;

export type SiteConfig = typeof siteConfig;
