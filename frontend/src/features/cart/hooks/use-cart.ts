// useCart: Custom hook for accessing cart context

import { useContext } from 'react';
import { CartContext } from '@/contexts/cart-context';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
