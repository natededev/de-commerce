// ProductDetailDescription: Component for displaying product description

import React from 'react';

interface ProductDetailDescriptionProps {
  description: string;
}

const ProductDetailDescriptionComponent: React.FC<
  ProductDetailDescriptionProps
> = ({ description }) => (
  <div>
    <h3 className="font-semibold mb-2">Description</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);
export const ProductDetailDescription = React.memo(
  ProductDetailDescriptionComponent
);
