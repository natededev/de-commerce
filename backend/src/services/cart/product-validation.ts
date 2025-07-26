import { supabase } from '../../config/database.js';

/**
 * Product Validation Module
 * 
 * Handles product stock checking and validation logic.
 * Separated for better reusability across different services.
 */

export class ProductValidation {
  /**
   * Check if product exists and has sufficient stock
   */
  static async validateProductStock(productId: string, quantity: number): Promise<void> {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('in_stock, stock_count')
      .eq('id', productId)
      .single();

    if (productError) throw productError;
    
    if (!product.in_stock || product.stock_count < quantity) {
      throw new Error('Product is out of stock');
    }
  }

  /**
   * Validate multiple products for cart sync
   */
  static async validateProductsStock(items: Array<{ product: { id: string; name: string }, quantity: number }>): Promise<void> {
    for (const item of items) {
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('in_stock, stock_count')
        .eq('id', item.product.id)
        .single();

      if (productError) throw productError;
      
      if (!product.in_stock || product.stock_count < item.quantity) {
        throw new Error(`Product ${item.product.name} is out of stock`);
      }
    }
  }
}
