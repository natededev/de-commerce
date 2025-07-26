// cart-context: Context and type for cart state and actions

import { createContext } from 'react';
import { Cart, CartItem, Product } from '@/types';

export interface CartContextType {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getItemCount: () => number;
  getCartItem: (productId: string) => CartItem | undefined;
  isInCart: (productId: string) => boolean;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
