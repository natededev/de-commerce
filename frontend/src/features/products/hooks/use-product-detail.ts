// useProductDetail: Custom hook for fetching and managing product detail state

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { getProduct } from '@/features/products/services/product-service';

export function useProductDetail(id?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
      } catch {
        setError('Failed to load product details.');
        setProduct(null);
        // Error is already handled by the service layer
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
