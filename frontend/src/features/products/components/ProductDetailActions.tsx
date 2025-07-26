// ProductDetailActions: Component for product detail action buttons (add to cart, buy now, etc.)

import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';

interface ProductDetailActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  disabled?: boolean;
}

const ProductDetailActionsComponent: React.FC<ProductDetailActionsProps> = ({
  onAddToCart,
  onBuyNow,
  disabled,
}) => (
  <div className="w-full space-y-4">
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <Button
        onClick={onAddToCart}
        disabled={disabled}
        className="flex-1 w-full h-12 text-base font-medium"
      >
        <ShoppingCart className="h-5 w-5 mr-2" />
        Add to Cart
      </Button>
      <Button
        onClick={onBuyNow}
        disabled={disabled}
        variant="outline"
        className="flex-1 w-full h-12 text-base font-medium"
      >
        Buy Now
      </Button>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" size="icon" className="h-12 w-12">
        <Heart className="h-5 w-5" />
      </Button>
      <Button variant="outline" size="icon" className="h-12 w-12">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  </div>
);
export const ProductDetailActions = React.memo(ProductDetailActionsComponent);
