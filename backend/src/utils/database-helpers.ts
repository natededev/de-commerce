import { supabase } from '../config/database.js';

/**
 * Database Query Helpers
 * 
 * Reusable query builders and common database operations.
 * Reduces code duplication and improves maintainability.
 */

/**
 * Product query builder
 */
export class ProductQueries {
  /**
   * Get product with stock validation
   */
  static async getProductWithStock(productId: string) {
    const { data, error } = await supabase
      .from('products')
      .select('in_stock, stock_count, name')
      .eq('id', productId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get product categories
   */
  static async getDistinctCategories() {
    const { data, error } = await supabase
      .from('products')
      .select('category');

    if (error) throw error;
    
    // Extract unique categories
    return Array.from(
      new Set((data as { category: string }[]).map(cat => cat.category))
    );
  }

  /**
   * Build filtered product query
   */
  static buildFilteredQuery(filters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    let query = supabase.from('products').select('*', { count: 'exact' });

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    return query;
  }
}

/**
 * Cart query builder
 */
export class CartQueries {
  /**
   * Get cart with items and products
   */
  static async getCartWithItems(cartId: string) {
    const { data, error } = await supabase
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

    if (error) throw error;
    return data;
  }

  /**
   * Verify cart ownership
   */
  static async verifyCartOwnership(cartId: string, userId: string) {
    const { data, error } = await supabase
      .from('carts')
      .select('id')
      .eq('id', cartId)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  }
}

/**
 * Common database operations
 */
export class DatabaseHelpers {
  /**
   * Check if record exists
   */
  static async recordExists(table: string, field: string, value: string): Promise<boolean> {
    const { data, error } = await supabase
      .from(table)
      .select('id')
      .eq(field, value)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }

  /**
   * Get record count with filters
   */
  static async getRecordCount(table: string, filters: Record<string, unknown> = {}): Promise<number> {
    let query = supabase.from(table).select('*', { count: 'exact', head: true });

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { count, error } = await query;
    if (error) throw error;
    
    return count || 0;
  }
}
