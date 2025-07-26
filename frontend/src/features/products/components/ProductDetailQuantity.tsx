// ProductDetailQuantity: Component for selecting product quantity

import React from 'react';

interface ProductDetailQuantityProps {
  quantity: number;
  setQuantity: (q: number) => void;
  disabled?: boolean;
}

const ProductDetailQuantityComponent: React.FC<ProductDetailQuantityProps> = ({
  quantity,
  setQuantity,
  disabled,
}) => (
  <div className="flex items-center gap-4 w-full">
    <span className="font-medium whitespace-nowrap">Quantity:</span>
    <div className="flex items-center border border-border rounded-lg">
      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        className="p-2 hover:bg-muted transition-colors"
        disabled={disabled}
        type="button"
      >
        -
      </button>
      <span className="px-4 py-2 border-l border-r border-border min-w-[3rem] text-center">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity(quantity + 1)}
        className="p-2 hover:bg-muted transition-colors"
        disabled={disabled}
        type="button"
      >
        +
      </button>
    </div>
  </div>
);
export const ProductDetailQuantity = React.memo(ProductDetailQuantityComponent);
