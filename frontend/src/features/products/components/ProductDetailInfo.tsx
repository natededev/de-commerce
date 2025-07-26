// ProductDetailInfo: Component for displaying product info (category, stock, etc.)

import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types';

interface ProductDetailInfoProps {
  product: Product;
}

const ProductDetailInfoComponent: React.FC<ProductDetailInfoProps> = ({
  product,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="secondary">{product.category}</Badge>
      {product.inStock ? (
        <Badge variant="default" className="bg-success">
          In Stock
        </Badge>
      ) : (
        <Badge variant="destructive">Out of Stock</Badge>
      )}
    </div>
    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
    {product.rating && (
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>
    )}
    <div className="text-3xl font-bold text-price mb-4">
      ${product.price.toFixed(2)}
    </div>
    <Separator />
  </div>
);
export const ProductDetailInfo = React.memo(ProductDetailInfoComponent);
