// ProductCard: Component for displaying a single product card with actions

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/features/cart/hooks/use-cart';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types';
import { siteConfig } from '@/config/site';
import { ShoppingCart, Star } from 'lucide-react';
import { PriceDisplay } from '@/components/currency/CurrencySelector';

interface ProductCardProps {
  product: Product;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imgError, setImgError] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) {
      toast({
        title: 'Out of Stock',
        description: `${product.name} is currently out of stock.`,
        variant: 'destructive',
      });
      return;
    }

    try {
      addToCart(product, 1);
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (err: unknown) {
      let message = 'Failed to add to cart.';
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        message = (err as { message: string }).message;
      }
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  }, [addToCart, product, toast]);

  const handleImageError = useCallback(() => {
    setImgError(true);
    setIsImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const fallbackImage =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3C/svg%3E';

  return (
    <div
      className="group bg-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-border/50 hover:border-primary/20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="group"
      aria-label={`Product: ${product.name}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-muted/20 overflow-hidden">
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center text-muted-foreground text-sm"
            aria-live="polite"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
              <p>Image unavailable</p>
            </div>
          </div>
        ) : (
          <>
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            <picture>
              <source srcSet={product.image} type="image/webp" />
              <img
                src={product.image || fallbackImage}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ minHeight: 200 }}
                loading="lazy"
                decoding="async"
              />
            </picture>
            {/* Overlay Actions */}
            <div
              className={`absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className={`h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform bg-white/90 backdrop-blur ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  aria-label={
                    product.inStock
                      ? `Quick add ${product.name} to cart`
                      : `${product.name} is out of stock`
                  }
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Rating Badge */}
        {product.rating && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur text-xs font-medium"
            >
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {product.rating.toFixed(1)}
            </Badge>
          </div>
        )}

        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-3 right-3">
            <Badge
              variant="destructive"
              className="bg-red-500/90 text-white backdrop-blur text-xs font-medium"
            >
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-6 space-y-3">
        <div className="flex-1">
          <h3
            className="font-semibold text-lg leading-tight mb-2 line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>
          <p
            className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
            title={product.description}
          >
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <PriceDisplay 
              amount={product.price} 
              originalCurrency="USD"
              className="text-xl sm:text-2xl font-bold text-primary"
            />
            {product.inStock && product.price >= siteConfig.shipping.freeShippingThreshold && (
              <span className="text-xs text-muted-foreground">
                Free shipping
              </span>
            )}
          </div>

          {/* Add to Cart Button - Always Visible */}
          <Button
            variant={product.inStock ? 'outline' : 'secondary'}
            size="sm"
            className={`h-9 sm:h-10 px-3 sm:px-4 text-sm transition-all duration-200 hover:scale-105 ${
              product.inStock
                ? 'hover:bg-primary hover:text-primary-foreground'
                : 'opacity-50 cursor-not-allowed'
            } w-auto min-w-[56px]`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={
              product.inStock
                ? `Add ${product.name} to cart`
                : `${product.name} is out of stock`
            }
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {product.inStock ? 'Add' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};
export const ProductCard = React.memo(ProductCardComponent);
