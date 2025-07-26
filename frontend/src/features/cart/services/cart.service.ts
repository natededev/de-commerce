import { apiClient } from '../../../lib/api';
import { Cart } from '../../../types';

/**
 * Service for managing shopping cart operations
 */
export const CartService = {
  /**
   * Get the current user's active cart
   */
  async getCart(): Promise<Cart> {
    return await apiClient.get<Cart>('/cart');
  },

  /**
   * Add a product to the cart
   */
  async addToCart(productId: string, quantity = 1): Promise<Cart> {
    const response = await apiClient.post<Cart>('/cart', {
      productId,
      quantity,
    });
    if (import.meta.env.DEV) console.log('CartService.addToCart response:', response);
    return response;
  },

  /**
   * Update the quantity of a product in the cart
   */
  async updateQuantity(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    const response = await apiClient.put<Cart>(`/cart/${cartId}/${productId}`, {
      quantity,
    });
    if (import.meta.env.DEV) console.log('CartService.updateQuantity response:', response);
    return response;
  },

  /**
   * Remove a product from the cart
   */
  async removeFromCart(cartId: string, productId: string): Promise<Cart> {
    const response = await apiClient.delete<Cart>(`/cart/${cartId}/${productId}`);
    if (import.meta.env.DEV) console.log('CartService.removeFromCart response:', response);
    return response;
  },

  /**
   * Clear all items from the cart
   */
  async clearCart(cartId: string): Promise<Cart> {
    return await apiClient.delete<Cart>(`/cart/${cartId}`);
  },

  /**
   * Synchronize cart state with the backend
   */
  async syncCart(cart: Cart): Promise<Cart> {
    return await apiClient.post<Cart>('/cart/sync', cart);
  },
};
