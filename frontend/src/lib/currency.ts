/**
 * Currency Service - Multi-Currency Support
 * 
 * Provides currency conversion, formatting, and localization features.
 * Uses real-time exchange rates and supports the currencies defined in site.ts
 */

import { siteConfig } from '@/config/site';


// Local conversion rates (as of July 2025, approximate)
const LOCAL_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.78,
  NGN: 1500.0,
  CAD: 1.36,
  AUD: 1.48,
};

/**
 * Convert amount from one currency to another (local, instant)
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  const fromRate = LOCAL_RATES[fromCurrency];
  const toRate = LOCAL_RATES[toCurrency];
  if (!fromRate || !toRate) {
    // fallback: no conversion
    return amount;
  }
  // Convert to USD, then to target
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
}

/**
 * Format currency amount according to locale and currency settings
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = siteConfig.currency.default
): string {
  const currency = siteConfig.currency.supported.find(c => c.code === currencyCode);
  if (!currency) {
    return formatCurrency(amount, siteConfig.currency.default);
  }
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return currency.position === 'before'
    ? `${currency.symbol}${formattedAmount}`
    : `${formattedAmount}${currency.symbol}`;
}

/**
 * Get current user's preferred currency from localStorage or default
 */
export function getUserCurrency(): string {
  if (typeof window === 'undefined') {
    return siteConfig.currency.default;
  }
  
  const saved = localStorage.getItem('de-commerce:currency');
  if (saved && siteConfig.currency.supported.some(c => c.code === saved)) {
    return saved;
  }
  
  return siteConfig.currency.default;
}

/**
 * Set user's preferred currency
 */
export function setUserCurrency(currencyCode: string): void {
  if (typeof window === 'undefined') return;
  
  if (siteConfig.currency.supported.some(c => c.code === currencyCode)) {
    localStorage.setItem('de-commerce:currency', currencyCode);
  }
}

/**
 * Get all supported currencies
 */
export function getSupportedCurrencies() {
  return siteConfig.currency.supported;
}

/**
 * Currency hook for React components
 */
export function useCurrency() {
  const [currentCurrency, setCurrentCurrency] = React.useState(getUserCurrency());
  React.useEffect(() => {
    const handleStorageChange = () => {
      setCurrentCurrency(getUserCurrency());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  const changeCurrency = (currencyCode: string) => {
    setUserCurrency(currencyCode);
    setCurrentCurrency(currencyCode);
  };
  return {
    currentCurrency,
    changeCurrency,
    supportedCurrencies: getSupportedCurrencies(),
    formatPrice: (amount: number) => formatCurrency(amount, currentCurrency),
    convertPrice: (amount: number, fromCurrency: string = 'USD') =>
      convertCurrency(amount, fromCurrency, currentCurrency),
  };
}

// For non-React usage
import React from 'react';

/**
 * Simple currency converter function for display (sync)
 */
export function convertAndFormatPrice(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency?: string
): string {
  const targetCurrency = toCurrency || getUserCurrency();
  const convertedAmount = convertCurrency(amount, fromCurrency, targetCurrency);
  return formatCurrency(convertedAmount, targetCurrency);
}
