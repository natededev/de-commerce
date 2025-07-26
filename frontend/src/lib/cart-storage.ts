import { Cart } from '@/types';

/**
 * Cart Storage Utility
 * 
 * Handles localStorage operations for cart persistence.
 * Separated from context for better testing and reusability.
 */

// Local storage key for cart
const CART_STORAGE_KEY = 'de-commerce:cart';

// Default empty cart
export const EMPTY_CART: Cart = {
  id: '',
  userId: '',
  status: 'active',
  items: [],
  total: 0,
  itemCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Load cart from localStorage
 */
export function loadLocalCart(): Cart {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that the parsed object has the expected structure
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error);
  }
  return EMPTY_CART;
}

/**
 * Save cart to localStorage
 */
export function saveLocalCart(cart: Cart): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error);
  }
}

/**
 * Clear cart from localStorage
 */
export function clearLocalCart(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear cart from localStorage:', error);
  }
}
