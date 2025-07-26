import { supabase } from '../../config/database.js';
import { Cart, CartItem } from '../../types/index.js';

/**
 * Core Cart Operations Module
 * 
 * Handles basic cart CRUD operations separated from business logic.
 * This allows for better testing and reusability.
 */

export class CartOperations {
  /**
   * Get or create active cart for user
   */
  static async getOrCreateActiveCart(userId: string): Promise<Cart> {
    // Call the PostgreSQL function to get or create cart
    const { data: fnResult, error: fnError } = await supabase
      .rpc('get_or_create_active_cart', { p_user_id: userId });
    
    if (fnError) throw fnError;

    const cartId = fnResult;

    // Get cart with items
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select(`
        *,
        items:cart_items (
          *,
          product:products (*)
        )
      `)
      .eq('id', cartId)
      .single();

    if (cartError) throw cartError;

    // Calculate totals
    const total = cart.items.reduce(
      (sum: number, item: CartItem) => sum + (item.product.price * item.quantity),
      0
    );
    const itemCount = cart.items.reduce(
      (sum: number, item: CartItem) => sum + item.quantity,
      0
    );

    return {
      ...cart,
      total,
      itemCount,
    } as Cart;
  }

  /**
   * Verify cart ownership
   */
  static async verifyCartOwnership(cartId: string, userId: string): Promise<void> {
    const { error: cartError } = await supabase
      .from('carts')
      .select()
      .eq('id', cartId)
      .eq('user_id', userId)
      .single();

    if (cartError) throw cartError;
  }

  /**
   * Clear all items from cart
   */
  static async clearCartItems(cartId: string): Promise<void> {
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId);

    if (deleteError) throw deleteError;
  }
}
