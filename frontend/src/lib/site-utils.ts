// site-utils: Site-wide formatting utilities for currency and address

import { siteConfig } from '@/config/site';

// Currency formatting
export const formatCurrency = (amount: number): string => {
  const defaultCurrency =
    siteConfig.currency.supported.find(
      curr => curr.code === siteConfig.currency.default
    ) || siteConfig.currency.supported[0];

  const { symbol, position } = defaultCurrency;
  const formattedAmount = amount.toFixed(2);

  return position === 'before'
    ? `${symbol}${formattedAmount}`
    : `${formattedAmount}${symbol}`;
};

// Address formatting
export const formatAddress = (
  address: typeof siteConfig.contact.address
): string => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}, ${address.country}`;
};

export const formatFullAddress = (): string => {
  return formatAddress(siteConfig.contact.address);
};

// Contact information formatting
export const formatPhone = (phone: string): string => {
  // Basic phone formatting - you can enhance this
  return phone;
};

export const getContactInfo = () => {
  return {
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    supportEmail: siteConfig.contact.supportEmail,
    salesEmail: siteConfig.contact.salesEmail,
    address: formatFullAddress(),
    hours: siteConfig.contact.hours,
  };
};

// Company information
export const getCompanyInfo = () => {
  return {
    name: siteConfig.company.name,
    email: siteConfig.company.email,
    phone: siteConfig.company.phone,
    address: formatAddress(siteConfig.company.address),
    social: siteConfig.company.social,
  };
};

// Navigation helpers
export const getMainNavigation = () => siteConfig.navigation.main;
export const getFooterNavigation = () => siteConfig.navigation.footer;

// SEO helpers
export const getPageTitle = (title?: string): string => {
  if (!title) return siteConfig.seo.defaultTitle;
  return siteConfig.seo.titleTemplate.replace('%s', title);
};

export const getPageDescription = (description?: string): string => {
  return description || siteConfig.seo.defaultDescription;
};

// Legal helpers
export const getCopyright = (): string => {
  const currentYear = new Date().getFullYear();
  return siteConfig.legal.copyright.replace('2024', currentYear.toString());
};

// Feature flags
export const isFeatureEnabled = (
  feature: keyof typeof siteConfig.features
): boolean => {
  return siteConfig.features[feature];
};

// Shipping calculations
export const calculateShipping = (subtotal: number): number => {
  if (subtotal >= siteConfig.shipping.freeShippingThreshold) {
    return 0;
  }
  return siteConfig.shipping.defaultShippingCost;
};

// Pagination helpers
export const getProductsPerPage = (): number => {
  return siteConfig.pagination.productsPerPage;
};

export const getMaxPagesToShow = (): number => {
  return siteConfig.pagination.maxPagesToShow;
};
