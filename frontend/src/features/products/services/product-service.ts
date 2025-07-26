// product-service: Product-related API calls for fetching products, categories, etc.

import { Product } from '@/types';
import { apiClient } from '@/lib/api';
import { siteConfig } from '@/config/site';

/**
 * Error Logging Utility
 */
const logError = (message: string, error: unknown) => {
  if (siteConfig.development.enableDebugLogs) {
    console.warn(`${message}:`, error);
  }
};

export async function getProducts(params?: {
  search?: string;
  category?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const products = await apiClient.get<Product[]>(endpoint);
    return products;
  } catch (error) {
    logError('Failed to fetch products', error);
    throw error;
  }
}

export async function getProduct(id: string): Promise<Product> {
  try {
    const product = await apiClient.get<Product>(`/products/${id}`);
    return product;
  } catch (error) {
    logError('Failed to fetch product', error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await apiClient.get<{ data: string[] }>(
      '/products/categories'
    );
    // The API client returns the backend JSON directly
    const backendResponse = response as unknown as { data: string[] };
    return backendResponse.data;
  } catch (error) {
    logError('Failed to fetch categories', error);
    throw error;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await apiClient.get<{ data: Product[] }>(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    // The API client returns the backend JSON directly
    const backendResponse = response as unknown as { data: Product[] };
    return backendResponse.data;
  } catch (error) {
    logError('Failed to search products', error);
    throw error;
  }
}
