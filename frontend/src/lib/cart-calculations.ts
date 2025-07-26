import { Cart, CartItem, Product } from '@/types';

/**
 * Cart Calculations Utility
 * 
 * Pure functions for cart calculations, separated from context for reusability.
 * These functions have no side effects and can be easily tested.
 */

/**
 * Calculate cart totals from items
 */
export function calculateCartTotals(items: CartItem[]): { total: number; itemCount: number } {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return { total, itemCount };
}

/**
 * Update cart with new totals
 */
export function updateCartTotals(cart: Cart, items: CartItem[]): Cart {
  const { total, itemCount } = calculateCartTotals(items);
  
  return {
    ...cart,
    items,
    total,
    itemCount,
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Add item to cart items array
 */
export function addItemToCartItems(
  currentItems: CartItem[],
  product: Product,
  quantity: number,
  cartId: string
): CartItem[] {
  const existingItem = currentItems.find(
    item => item.product.id === product.id
  );

  if (existingItem) {
    return currentItems.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    return [
      ...currentItems,
      {
        id: Math.random().toString(36).substr(2, 9),
        cartId: cartId || 'local',
        productId: product.id,
        quantity,
        product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

/**
 * Remove item from cart items array
 */
export function removeItemFromCartItems(
  currentItems: CartItem[],
  productId: string
): CartItem[] {
  return currentItems.filter(item => item.product.id !== productId);
}

/**
 * Update item quantity in cart items array
 */
export function updateItemQuantityInCartItems(
  currentItems: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeItemFromCartItems(currentItems, productId);
  }

  return currentItems.map(item =>
    item.product.id === productId
      ? { ...item, quantity }
      : item
  );
}
