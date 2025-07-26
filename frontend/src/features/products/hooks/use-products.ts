// useProducts: Custom hook for fetching, filtering, and sorting products

import { useEffect, useState, useMemo } from 'react';
import { Product } from '@/types';
import { getProducts } from '@/features/products/services/product-service';

export function useProducts(searchQuery = '', category = '') {
  // Initialize products as an empty array
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        // Convert frontend sort values to backend sort parameters
        const sortParam =
          {
            name: 'name',
            'price-low': 'price_asc',
            'price-high': 'price_desc',
            rating: 'rating_desc',
          }[sortBy] || 'name';

        const fetchedProducts = await getProducts({
          search: searchQuery,
          category: category !== 'all' ? category : undefined,
          sortBy: sortParam,
        });

        if (isMounted) {
          // Ensure we always set an array, even if the API returns null/undefined
          setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to load products'
          );
          // Ensure products is an empty array on error
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [searchQuery, category, sortBy]);

  const filteredProducts = useMemo(() => {
    // Ensure we're working with an array
    const productsArray = Array.isArray(products) ? products : [];

    if (filterBy === 'in-stock') {
      return productsArray.filter(product => product.inStock);
    } else if (filterBy === 'out-of-stock') {
      return productsArray.filter(product => !product.inStock);
    }

    return productsArray;
  }, [products, filterBy]);

  const categories = useMemo(() => {
    // Ensure we're working with an array
    const productsArray = Array.isArray(products) ? products : [];
    const uniqueCategories = Array.from(
      new Set(productsArray.map(p => p.category))
    );
    return uniqueCategories.sort();
  }, [products]);

  return {
    products: filteredProducts,
    loading,
    error,
    categories,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    totalProducts: products.length,
  };
}
