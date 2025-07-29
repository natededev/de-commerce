/**
 * Main Site Header Component
 *
 * Provides the primary navigation and branding for the e-commerce site.
 * This component handles:
 * - Site branding and logo display
 * - Main navigation menu with dropdown support
 * - Search functionality
 * - Shopping cart access with item count
 * - User authentication status and actions
 * - Responsive design with mobile menu
 * - Top bar with shipping and contact information
 *
 * The header is sticky and includes backdrop blur effects for modern UX.
 */

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  User,
  Menu,
  Search,
  ChevronDown,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/features/cart/hooks/use-cart';
import { useAuth } from '@/features/auth/hooks/use-auth';
// Import site-wide config for branding, logo, and company info
import { siteConfig } from '@/config/site';
import { getMainNavigation } from '@/lib/site-utils';
import { CurrencySelector } from '@/components/currency/CurrencySelector';

/**
 * Header Component
 *
 * Renders the main site header with navigation, search, cart, and user actions.
 * Uses responsive design to adapt to different screen sizes.
 */
export const Header: React.FC = () => {
  // Get cart item count and user info from context
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  // State for mobile menu and search bar focus
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  const cartItemCount = getItemCount();
  const navigate = useNavigate();

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isUserMenuOpen && !target.closest('[data-user-menu]')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    // Sticky header with backdrop blur for modern glass effect
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      {/* Top Bar: displays shipping and contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs">
            {/* Shipping and returns info */}
            <div className="flex items-center space-x-4">
              <span>
                Free shipping on orders over $
                {siteConfig.shipping.freeShippingThreshold}
              </span>
              <span>•</span>
              <span>30-day returns</span>
            </div>
            {/* Contact info (phone/email) for desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hover:underline"
                aria-label={`Phone: ${siteConfig.contact.phone}`}
              >
                {siteConfig.contact.phone}
              </a>
              <span>•</span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="hover:underline"
                aria-label={`Email: ${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header: logo, navigation, search, cart, user */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo: shows image if set, otherwise text */}
          <Link
            to="/"
            className="flex items-center space-x-3 group mr-4 md:mr-6 lg:mr-8"
            aria-label="Go to homepage"
          >
            <div className="relative">
              {siteConfig.logoImage ? (
                <img
                  src={siteConfig.logoImage}
                  alt={siteConfig.name + ' logo'}
                  className="h-10 w-10 rounded-xl object-cover shadow-lg"
                />
              ) : (
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg text-logo">
                  {siteConfig.logoText}
                </div>
              )}
              {/* Accent dot on logo for visual interest */}
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-accent rounded-full border-2 border-background"></div>
            </div>
            <div className="flex flex-col">
              {/* Site name and tagline */}
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
              <span className="text-xs text-muted-foreground -mt-1 hidden sm:block">
                Premium Lifestyle
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {/* Desktop navigation menu with dropdown support */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            aria-label="Main navigation"
          >
            {getMainNavigation().map(item => {
              // Highlight parent link for subpages (e.g., /products/123 keeps Products active)
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <div key={item.href} className="relative group">
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors flex items-center space-x-1 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                      ${isActive ? 'text-primary font-bold underline underline-offset-4 bg-accent/30' : 'text-muted-foreground hover:text-primary hover:bg-accent/10'}`}
                    tabIndex={0}
                    {...(isActive ? { 'aria-current': 'page' } : {})}
                  >
                    <span>{item.name}</span>
                    {/* Show dropdown arrow for Products */}
                    {item.name === 'Products' && (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </Link>
                  {/* Products dropdown menu */}
                  {item.name === 'Products' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-popover border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-4 space-y-2">
                        <Link
                          to="/products"
                          className="block text-sm hover:text-primary transition-colors"
                          aria-label="All Products"
                        >
                          All Products
                        </Link>
                        <Link
                          to="/products?category=furniture"
                          className="block text-sm hover:text-primary transition-colors"
                          aria-label="Furniture Products"
                        >
                          Furniture
                        </Link>
                        <Link
                          to="/products?category=decor"
                          className="block text-sm hover:text-primary transition-colors"
                          aria-label="Home Decor Products"
                        >
                          Home Decor
                        </Link>
                        <Link
                          to="/products?category=kitchen"
                          className="block text-sm hover:text-primary transition-colors"
                          aria-label="Kitchen and Dining Products"
                        >
                          Kitchen & Dining
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Bar */}
          {/* Desktop search bar with focus animation */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div
              className={`relative w-full transition-all duration-200 ${isSearchFocused ? 'scale-105' : ''}`}
            >
          <Input
            id="header-search-desktop"
            name="search"
            type="search"
            placeholder="Search for premium products..."
            className="w-full pl-12 pr-4 h-12 rounded-full border-2 transition-colors"
            aria-label="Search products"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
              {/* Search icon */}
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Right Side Actions */}
          {/* Cart, user menu, and mobile menu button */}
          <div className="flex items-center space-x-2">
            {/* Currency Selector Dropdown (desktop only) */}
            <div className="hidden lg:block">
              <CurrencySelector className="w-32" />
            </div>
            {/* Cart button with item count badge */}
            <Link to="/cart" className="relative" aria-label="View cart">
              <Button variant="ghost" size="icon" aria-label="View cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs font-medium"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* User menu: shows sign in or user icon */}
            {user ? (
              <div className="relative" data-user-menu>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="User menu"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="h-5 w-5" />
                </Button>
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-popover border rounded-lg shadow-lg z-50">
                    <div className="p-2 space-y-1">
                      <div className="px-3 py-2 text-sm font-medium text-muted-foreground border-b">
                        {user.name}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigate('/settings');
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" aria-label="Sign in">
                <Button variant="ghost" className="hidden sm:flex">
                  Sign In
                </Button>
              </Link>
            )}
            {/* Mobile menu toggle button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu: navigation and search for small screens */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-6 bg-background/95 backdrop-blur">
            {/* Currency Selector for mobile */}
            <div className="mb-4">
              <CurrencySelector className="w-full" />
            </div>
            {/* Mobile navigation links */}
            <nav
              className="flex flex-col space-y-3 mb-6"
              aria-label="Mobile navigation"
            >
              {getMainNavigation().map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-primary py-3 px-2 rounded-lg hover:bg-muted/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {/* Mobile search bar and auth buttons */}
            <div className="space-y-4">
              <div className="relative">
                <Input
                  id="header-search-mobile"
                  name="search"
                  type="search"
                  placeholder="Search for premium products..."
                  className="w-full pl-12 pr-4 h-12 rounded-full border-2 transition-colors"
                  aria-label="Search products"
                />
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Mobile auth buttons */}
              {!user && (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    aria-label="Sign in"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Sign In</Button>
                  </Link>
                  <Link
                    to="/register"
                    aria-label="Create account"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
