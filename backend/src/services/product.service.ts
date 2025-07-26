import { supabase } from '../config/database.js';
import { Product } from '../types/index.js';
import { ProductQueries } from '../utils/database-helpers.js';

interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

// Database field mapping helper
function mapDatabaseToProduct(dbProduct: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  in_stock: boolean;
  stock_count?: number;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
}): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    image: dbProduct.image,
    category: dbProduct.category,
    inStock: dbProduct.in_stock, // Map snake_case to camelCase
    stockCount: dbProduct.stock_count ?? 0, // Map snake_case to camelCase
    rating: dbProduct.rating,
    reviewCount: dbProduct.review_count ?? 0, // Map snake_case to camelCase
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}

export class ProductService {
  static async getAllProducts(
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string,
    minPrice?: number,
    maxPrice?: number
  ): Promise<ProductsResponse> {
    // Calculate offset
    const offset = (page - 1) * limit;

    // Build filtered query using helper
    const query = ProductQueries.buildFilteredQuery({
      category,
      search,
      minPrice,
      maxPrice,
    });

    // Add pagination
    const finalQuery = query.range(offset, offset + limit - 1);

    // Execute query
    const { data, error, count } = await finalQuery;

    if (error) {
      console.error('Supabase error in getAllProducts:', error);
      throw error;
    }

    return {
      data: data ? data.map(mapDatabaseToProduct) : [],
      total: count || 0,
      page,
      limit,
    };
  }

  static async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data ? mapDatabaseToProduct(data) : null;
  }

  static async createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    if (error) throw error;
    return mapDatabaseToProduct(data);
  }

  static async updateProduct(
    id: string,
    updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return mapDatabaseToProduct(data);
  }

  static async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  }

  static async getCategories(): Promise<string[]> {
    return ProductQueries.getDistinctCategories();
  }
}
