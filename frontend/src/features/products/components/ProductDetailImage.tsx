// ProductDetailImage: Component for displaying product image with responsive formats

import React from 'react';

interface ProductDetailImageProps {
  image: string;
  name: string;
}

export const ProductDetailImage: React.FC<ProductDetailImageProps> = ({
  image,
  name,
}) => (
  <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
    <picture>
      <source
        srcSet={image.replace(/\.jpg|\.png/, '.avif')}
        type="image/avif"
      />
      <source
        srcSet={image.replace(/\.jpg|\.png/, '.webp')}
        type="image/webp"
      />
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </picture>
  </div>
);
