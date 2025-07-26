import { supabase } from '../config/database.js';
import { Cart } from '../types/index.js';
import { CartOperations } from './cart/cart-operations.js';
import { ProductValidation } from './cart/product-validation.js';
import { CartItemOperations } from './cart/cart-item-operations.js';

export class CartService {
  /**
   * Get or create active cart for user
   */
  static async getOrCreateActiveCart(userId: string): Promise<Cart> {
    return CartOperations.getOrCreateActiveCart(userId);
  }

  /**
   * Add item to cart
   */
  static async addToCart(
    userId: string,
    productId: string,
    quantity: number = 1
  ): Promise<Cart> {
    // Validate product stock
    await ProductValidation.validateProductStock(productId, quantity);

    // Get or create active cart
    const { data: cartId, error: cartError } = await supabase
      .rpc('get_or_create_active_cart', { p_user_id: userId });
    
    if (cartError) throw cartError;

    // Check if item already exists in cart
    const existing = await CartItemOperations.getExistingCartItem(cartId, productId);

    if (existing) {
      // Update existing item
      const newQuantity = existing.quantity + quantity;
      await ProductValidation.validateProductStock(productId, newQuantity);
      await CartItemOperations.updateCartItemQuantity(cartId, productId, newQuantity);
    } else {
      // Insert new item
      await CartItemOperations.insertCartItem(cartId, productId, quantity);
    }

    // Return updated cart
    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItemQuantity(
    userId: string,
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    // Verify cart belongs to user
    await CartOperations.verifyCartOwnership(cartId, userId);

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await CartItemOperations.removeCartItem(cartId, productId);
    } else {
      // Check stock and update quantity
      await ProductValidation.validateProductStock(productId, quantity);
      await CartItemOperations.updateCartItemQuantity(cartId, productId, quantity);
    }

    // Return updated cart
    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(
    userId: string,
    cartId: string,
    productId: string
  ): Promise<Cart> {
    // Verify cart belongs to user
    await CartOperations.verifyCartOwnership(cartId, userId);

    // Remove item
    await CartItemOperations.removeCartItem(cartId, productId);

    // Return updated cart
    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Clear cart
   */
  static async clearCart(
    userId: string,
    cartId: string
  ): Promise<Cart> {
    // Verify cart belongs to user
    await CartOperations.verifyCartOwnership(cartId, userId);

    // Remove all items
    await CartOperations.clearCartItems(cartId);

    // Return empty cart
    return this.getOrCreateActiveCart(userId);
  }

  /**
   * Sync cart with frontend state
   */
  static async syncCart(userId: string, cart: Cart): Promise<Cart> {
    // Get or create active cart
    const { data: cartId, error: cartError } = await supabase
      .rpc('get_or_create_active_cart', { p_user_id: userId });
    
    if (cartError) throw cartError;

    // Clear existing items
    await CartOperations.clearCartItems(cartId);

    if (!cart.items || cart.items.length === 0) {
      return this.getOrCreateActiveCart(userId);
    }

    // Validate all products are in stock
    await ProductValidation.validateProductsStock(cart.items);

    // Insert new items
    await CartItemOperations.bulkInsertCartItems(cartId, cart.items);

    // Return updated cart
    return this.getOrCreateActiveCart(userId);
  }
}
