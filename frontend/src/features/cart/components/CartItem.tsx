// CartItem: Component for displaying and managing a single cart item in the cart

import React from 'react';
import { PriceDisplay } from '@/components/currency/CurrencySelector';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/use-cart';

interface CartItemProps {
  item: CartItemType;
}

const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.product.id);
    } else {
      updateQuantity(item.product.id, newQuantity);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-4 border border-border/40 rounded-lg">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
        <picture>
          <source
            srcSet={item.product.image.replace(/\.jpg|\.png/, '.avif')}
            type="image/avif"
          />
          <source
            srcSet={item.product.image.replace(/\.jpg|\.png/, '.webp')}
            type="image/webp"
          />
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
        <p className="text-xs text-muted-foreground truncate">
          {item.product.description}
        </p>
        <div className="flex items-center mt-1">
          <span className="text-sm font-semibold text-price">
            <PriceDisplay amount={item.product.price} />
          </span>
          <span className="text-xs text-muted-foreground ml-2">each</span>
        </div>
      </div>
      <div className="flex flex-row sm:flex-col items-center space-x-2 sm:space-x-0 sm:space-y-2 mt-2 sm:mt-0">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.product.name}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span
          className="w-8 text-center text-sm font-medium"
          aria-live="polite"
        >
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px]"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label={`Increase quantity of ${item.product.name}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col items-end justify-between h-full ml-0 sm:ml-4 mt-2 sm:mt-0">
        <div className="font-semibold text-sm">
          <PriceDisplay amount={item.product.price * item.quantity} />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 sm:h-11 sm:w-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] text-destructive hover:text-destructive"
          onClick={() => removeFromCart(item.product.id)}
          aria-label={`Remove ${item.product.name} from cart`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export const CartItem = CartItemComponent;
