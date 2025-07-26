import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Cart, CartItem, Product } from '@/types';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { toast } from '@/lib/toast';
import { CartContext } from './cart-context';
import { CartService } from '@/features/cart/services/cart.service';
import { loadLocalCart, saveLocalCart, EMPTY_CART } from '@/lib/cart-storage';
import { 
  addItemToCartItems, 
  removeItemFromCartItems, 
  updateItemQuantityInCartItems,
  updateCartTotals 
} from '@/lib/cart-calculations';

/**
 * Shopping Cart Provider
 *
 * Manages global shopping cart state and provides cart-related
 * functions throughout the application. This context handles:
 * - Cart item management (add, remove, update quantity)
 * - Cart persistence in localStorage and server synchronization
 * - Cart total calculations and item counting
 * - Loading states and error handling for cart operations
 *
 * The provider automatically loads and saves cart data to localStorage
 * and syncs with the backend when user is authenticated.
 */

/**
 * CartProvider Component
 *
 * Wraps the application with cart context and provides
 * cart state and methods to all child components.
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Cart state with default empty cart
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load cart on mount and when user changes
  useEffect(() => {
    const loadInitialCart = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (user) {
          // User is logged in - try to load from backend first
          const backendCart = await CartService.getCart();
          setCart(backendCart);
          saveLocalCart(backendCart); // Sync to localStorage
        } else {
          // User not logged in - load from localStorage only
          const localCart = loadLocalCart();
          setCart(localCart);
        }
      } catch {
        setError('Failed to load cart');
        // Fall back to localStorage
        const localCart = loadLocalCart();
        setCart(localCart);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialCart();
  }, [user]); // Re-run when user changes

  /**
   * Add Product to Cart
   *
   * Adds a product to the cart with error handling and persistence.
   * Shows toast notification for success/error states.
   */
  const addToCart = useCallback(
    async (product: Product, quantity = 1) => {
      setError(null);
      try {
        if (user) {
          // If logged in, add to backend cart
          const updatedCart = await CartService.addToCart(product.id, quantity);
          if (import.meta.env.DEV) console.log('CartContext.addToCart updatedCart:', updatedCart);
          setCart(updatedCart);
          saveLocalCart(updatedCart);
        } else {
          // If not logged in, manage cart locally
          const newItems = addItemToCartItems(cart.items, product, quantity, cart.id || 'local');
          const updatedCart = updateCartTotals(cart, newItems);

          setCart(updatedCart);
          saveLocalCart(updatedCart);
        }

        toast.success(`${product.name} added to cart`);
      } catch {
        setError('Failed to add item to cart');
        toast.error('Failed to add item to cart');
      }
    },
    [cart, user]
  );

  /**
   * Remove Product from Cart
   *
   * Removes a product from the cart with error handling and persistence.
   */
  const removeFromCart = useCallback(
    async (productId: string) => {
      setError(null);
      try {
        if (user && cart.id) {
          const updatedCart = await CartService.removeFromCart(
            cart.id,
            productId
          );
          if (import.meta.env.DEV) console.log('CartContext.removeFromCart updatedCart:', updatedCart);
          setCart(updatedCart);
          saveLocalCart(updatedCart);
        } else {
          const newItems = removeItemFromCartItems(cart.items, productId);
          const updatedCart = updateCartTotals(cart, newItems);

          setCart(updatedCart);
          saveLocalCart(updatedCart);
        }

        toast.success('Item removed from cart');
      } catch {
        setError('Failed to remove item from cart');
        toast.error('Failed to remove item from cart');
      }
    },
    [cart, user]
  );

  /**
   * Update Product Quantity
   *
   * Updates the quantity of a product in the cart with persistence.
   */
  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      setError(null);
      try {
        if (user && cart.id) {
          const updatedCart = await CartService.updateQuantity(
            cart.id,
            productId,
            quantity
          );
          if (import.meta.env.DEV) console.log('CartContext.updateQuantity updatedCart:', updatedCart);
          setCart(updatedCart);
          saveLocalCart(updatedCart);
        } else {
          const newItems = updateItemQuantityInCartItems(cart.items, productId, quantity);
          const updatedCart = updateCartTotals(cart, newItems);

          setCart(updatedCart);
          saveLocalCart(updatedCart);
        }
      } catch {
        setError('Failed to update item quantity');
        toast.error('Failed to update item quantity');
      }
    },
    [cart, user]
  );

  /**
   * Clear Cart
   *
   * Removes all items from the cart with persistence.
   */
  const clearCart = useCallback(async () => {
    setError(null);
    try {
      if (user && cart.id) {
        const emptyCart = await CartService.clearCart(cart.id);
        setCart(emptyCart);
        saveLocalCart(emptyCart);
      } else {
        setCart(EMPTY_CART);
        saveLocalCart(EMPTY_CART);
      }

      toast.success('Cart cleared');
    } catch {
      setError('Failed to clear cart');
      toast.error('Failed to clear cart');
    }
  }, [cart.id, user]);

  /**
   * Get Cart Total
   *
   * Returns the total price of all items in the cart.
   */
  const getCartTotal = useCallback((): number => {
    return cart.total;
  }, [cart.total]);

  /**
   * Get Item Count
   *
   * Returns the total number of items in the cart.
   */
  const getItemCount = useCallback((): number => {
    return cart.itemCount;
  }, [cart.itemCount]);

  /**
   * Get Cart Item by Product ID
   *
   * Utility function to find a specific item in the cart.
   */
  const getCartItem = useCallback(
    (productId: string): CartItem | undefined => {
      return cart.items.find(item => item.product.id === productId);
    },
    [cart.items]
  );

  /**
   * Check if Product is in Cart
   *
   * Utility function to check if a product exists in the cart.
   */
  const isInCart = useCallback(
    (productId: string): boolean => {
      return cart.items.some(item => item.product.id === productId);
    },
    [cart.items]
  );

  // Sync local cart to backend only once on login if backend cart is empty
  useEffect(() => {
    const syncOnLogin = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        // Get backend cart
        const backendCart = await CartService.getCart();
        if (backendCart.items.length === 0) {
          // Only sync if backend cart is empty and local cart has items
          const localCart = loadLocalCart();
          if (localCart.items.length > 0) {
            const syncedCart = await CartService.syncCart(localCart);
            setCart(syncedCart);
            saveLocalCart({ ...localCart, items: [] }); // Clear local cart after sync
            return;
          }
        }
        // Otherwise, use backend cart
        setCart(backendCart);
        saveLocalCart(backendCart);
      } catch {
        setError('Failed to sync cart with server');
      } finally {
        setIsLoading(false);
      }
    };
    syncOnLogin();
    // Only run on login // eslint-disable-next-line react-hooks/exhaustive-deps
   
  }, [user]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      cart,
      isLoading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      getCartItem,
      isInCart,
    }),
    [
      cart,
      isLoading,
      error,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getItemCount,
      getCartItem,
      isInCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
