// Cart page: displays user's shopping cart, items, and checkout actions

import React, { lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/features/cart/hooks/use-cart';
import { CartItem } from '@/features/cart/components/CartItem';
import { calculateShipping } from '@/lib/site-utils';
import { PriceDisplay } from '@/components/currency/CurrencySelector';
import { siteConfig } from '@/config/site';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
const Toaster = lazy(() => import('@/components/ui/sonner').then(m => ({ default: m.Toaster })));

const Cart: React.FC = () => {
  const { cart, clearCart, isLoading, error } = useCart();
  const { toast } = useToast();
  const subtotal = cart.total;
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Cart Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          <div className="flex justify-center mb-6">
            <svg
              width="96"
              height="96"
              fill="none"
              viewBox="0 0 96 96"
              className="text-muted-foreground"
            >
              <rect width="96" height="96" rx="16" fill="#f3f4f6" />
              <path
                d="M32 72c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm32 0c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zM28 24h40l-4 32H32l-4-32zm8 8v16m8-16v16m8-16v16"
                stroke="#a1a1aa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-muted-foreground mb-8">
            Your cart is empty. Start shopping to add items.
          </p>
          <Button asChild>
            <a href="/products" aria-label="Continue Shopping">
              Continue Shopping
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded">
              {error}
            </div>
          )}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            style={{ minHeight: 400 }}
          >
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Skeleton className="h-4 w-16 inline-block align-middle mr-2" />
                  ) : null}
                  Clear Cart
                </Button>
                <Button asChild disabled={isLoading}>
                  <a href="/products" aria-label="Continue Shopping">
                    Continue Shopping
                  </a>
                </Button>
              </div>
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-4 sm:p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span><PriceDisplay amount={subtotal} /></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : <PriceDisplay amount={shipping} />}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span><PriceDisplay amount={total} /></span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg">
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Free shipping on orders over <PriceDisplay amount={siteConfig.shipping.freeShippingThreshold} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
