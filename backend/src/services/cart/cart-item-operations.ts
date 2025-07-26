import { supabase } from '../../config/database.js';

/**
 * Cart Items Operations Module
 * 
 * Handles database operations specifically for cart items.
 * Separated from main cart service for better organization.
 */

export class CartItemOperations {
  /**
   * Get existing cart item
   */
  static async getExistingCartItem(cartId: string, productId: string) {
    const { data: existing, error: existingError } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('cart_id', cartId)
      .eq('product_id', productId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') throw existingError;
    return existing;
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItemQuantity(cartId: string, productId: string, quantity: number): Promise<void> {
    const { error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (updateError) throw updateError;
  }

  /**
   * Insert new cart item
   */
  static async insertCartItem(cartId: string, productId: string, quantity: number): Promise<void> {
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cartId,
        product_id: productId,
        quantity
      });

    if (insertError) throw insertError;
  }

  /**
   * Remove cart item
   */
  static async removeCartItem(cartId: string, productId: string): Promise<void> {
    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId)
      .eq('product_id', productId);

    if (deleteError) throw deleteError;
  }

  /**
   * Bulk insert cart items for sync
   */
  static async bulkInsertCartItems(cartId: string, items: Array<{ product: { id: string }, quantity: number }>): Promise<void> {
    const { error: insertError } = await supabase
      .from('cart_items')
      .insert(
        items.map(item => ({
          cart_id: cartId,
          product_id: item.product.id,
          quantity: item.quantity
        }))
      );

    if (insertError) throw insertError;
  }
}
