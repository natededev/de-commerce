/**
 * Cart Service — Shopping Cart Management Utilities
 *
 * This module provides comprehensive cart management functionality, including:
 *   - Local cart state management with localStorage persistence
 *   - Cart calculations (totals, item counts)
 *   - Cart item operations (add, remove, update, clear)
 *   - Backend synchronization for multi-device cart support
 *
 * The service handles both local cart operations and backend synchronization,
 * ensuring cart data persists across browser sessions and devices.
 *
 * All functions are pure or side-effectful as documented, and are safe for use in React state management.
 */

import { Cart, CartItem, Product } from '@/types';
import { apiClient } from '@/lib/api';
import { siteConfig } from '@/config/site';

/**
 * Error Logging Utility
 *
 * Centralized error logging that respects environment settings.
 * In development, logs to console. In production, could be sent to
 * error tracking services.
 */
const logError = (message: string, error: unknown) => {
  if (siteConfig.development.enableDebugLogs) {
    console.warn(`${message}:`, error);
  }
  // In production, this could be sent to an error tracking service
};

/**
 * Load Cart from Local Storage
 *
 * Retrieves cart data from localStorage and parses it back to a Cart object.
 * Returns an empty cart if no data exists or if parsing fails.
 *
 * @returns Cart object with items, total, and item count
 */
export function loadCart(): Cart {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (err) {
      // If parsing fails, return empty cart
      logError('Failed to parse saved cart', err);
    }
  }
  return {
    id: 'local-cart',
    userId: 'anonymous',
    status: 'active' as const,
    items: [],
    total: 0,
    itemCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Save Cart to Local Storage
 *
 * Persists cart data to localStorage for cross-session persistence.
 *
 * @param cart - Cart object to save
 */
export function saveCart(cart: Cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Calculate Cart Totals
 *
 * Computes the total price and item count for a given array of cart items.
 *
 * @param items - Array of cart items
 * @returns Object with total price and item count
 */
export function calculateTotals(items: CartItem[]) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
}

/**
 * Add Product to Cart
 *
 * Adds a product to the cart with specified quantity. If the product
 * already exists in the cart, increases its quantity instead of
 * creating a duplicate entry.
 *
 * @param cart - Current cart state
 * @param product - Product to add
 * @param quantity - Quantity to add (defaults to 1)
 * @returns Updated cart with new item added
 */
export function addToCart(cart: Cart, product: Product, quantity = 1): Cart {
  const existingItem = cart.items.find(item => item.id === product.id);
  let newItems: CartItem[];

  if (existingItem) {
    // Update quantity of existing item
    newItems = cart.items.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    // Add new item to cart
    const newItem: CartItem = {
      id: crypto.randomUUID(),
      cartId: cart.id,
      productId: product.id,
      quantity,
      product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    newItems = [...cart.items, newItem];
  }

  const { total, itemCount } = calculateTotals(newItems);
  return {
    ...cart,
    items: newItems,
    total,
    itemCount,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Remove Product from Cart
 *
 * Removes a product from the cart by its ID.
 *
 * @param cart - Current cart state
 * @param productId - ID of product to remove
 * @returns Updated cart with item removed
 */
export function removeFromCart(cart: Cart, productId: string): Cart {
  const newItems = cart.items.filter(item => item.id !== productId);
  const { total, itemCount } = calculateTotals(newItems);
  return {
    ...cart,
    items: newItems,
    total,
    itemCount,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Update Product Quantity in Cart
 *
 * Updates the quantity of a specific product in the cart.
 * If quantity is 0 or negative, removes the item from cart.
 *
 * @param cart - Current cart state
 * @param productId - ID of product to update
 * @param quantity - New quantity
 * @returns Updated cart with modified quantity
 */
export function updateQuantity(
  cart: Cart,
  productId: string,
  quantity: number
): Cart {
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }
  const newItems = cart.items.map(item =>
    item.id === productId
      ? { ...item, quantity, updatedAt: new Date().toISOString() }
      : item
  );
  const { total, itemCount } = calculateTotals(newItems);
  return {
    ...cart,
    items: newItems,
    total,
    itemCount,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Clear Cart
 *
 * Removes all items from the cart and resets totals.
 *
 * @returns Empty cart object
 */
export function clearCart(cart?: Cart): Cart {
  const now = new Date().toISOString();
  return {
    id: cart?.id || 'local-cart',
    userId: cart?.userId || 'anonymous',
    status: 'active' as const,
    items: [],
    total: 0,
    itemCount: 0,
    createdAt: cart?.createdAt || now,
    updatedAt: now,
  };
}

/**
 * Backend Synchronization Functions
 *
 * These functions handle synchronization between local cart state
 * and the backend server for multi-device cart support.
 */

/**
 * Sync Cart with Backend
 *
 * Sends the current cart state to the backend for synchronization.
 * This enables cart persistence across different devices and browsers.
 *
 * @param cart - Cart object to sync
 */
export async function syncCartWithBackend(cart: Cart): Promise<void> {
  try {
    await apiClient.post('/cart/sync', cart);
  } catch (error) {
    logError('Failed to sync cart with backend', error);
    // Don't throw error - cart will still work locally
  }
}

/**
 * Load Cart from Backend
 *
 * Retrieves cart data from the backend server.
 * Returns null if no cart exists or if the request fails.
 *
 * @returns Cart object from backend or null
 */
export async function loadCartFromBackend(): Promise<Cart | null> {
  try {
    const cart = await apiClient.get<Cart>('/cart');
    return cart;
  } catch (error) {
    logError('Failed to load cart from backend', error);
    return null; // Fall back to local storage
  }
}

/**
 * Add Item to Backend Cart
 *
 * Adds a product to the cart on the backend server.
 *
 * @param productId - ID of product to add
 * @param quantity - Quantity to add
 */
export async function addItemToBackendCart(
  productId: string,
  quantity: number
): Promise<void> {
  try {
    await apiClient.post('/cart/items', { productId, quantity });
  } catch (error) {
    logError('Failed to add item to backend cart', error);
    // Don't throw error - cart will still work locally
  }
}

/**
 * Remove Item from Backend Cart
 *
 * Removes a product from the cart on the backend server.
 *
 * @param productId - ID of product to remove
 */
export async function removeItemFromBackendCart(
  productId: string
): Promise<void> {
  try {
    await apiClient.delete(`/cart/items/${productId}`);
  } catch (error) {
    logError('Failed to remove item from backend cart', error);
    // Don't throw error - cart will still work locally
  }
}

/**
 * Update Quantity on Backend Cart
 *
 * Updates the quantity of a product in the cart on the backend server.
 *
 * @param productId - ID of product to update
 * @param quantity - New quantity
 */
export async function updateQuantityOnBackendCart(
  productId: string,
  quantity: number
): Promise<void> {
  try {
    await apiClient.put(`/cart/items/${productId}`, { quantity });
  } catch (error) {
    logError('Failed to update quantity on backend cart', error);
    // Don't throw error - cart will still work locally
  }
}
