
import React, { lazy, Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/features/cart/hooks/use-cart';
import { useProductDetail } from '@/features/products/hooks/use-product-detail';
import { ProductDetailImage } from '@/features/products/components/ProductDetailImage';
import { ProductDetailInfo } from '@/features/products/components/ProductDetailInfo';
import { ProductDetailDescription } from '@/features/products/components/ProductDetailDescription';
import { ProductDetailQuantity } from '@/features/products/components/ProductDetailQuantity';
import { ProductDetailActions } from '@/features/products/components/ProductDetailActions';
import { ProductDetailFeatures } from '@/features/products/components/ProductDetailFeatures';
import { Skeleton } from '@/components/ui/skeleton';
const Toaster = lazy(() => import('@/components/ui/sonner').then(m => ({ default: m.Toaster })));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useProductDetail(id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div>
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/products')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 pl-0"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <ProductDetailImage image={product.image} name={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6 flex flex-col">
            <ProductDetailInfo product={product} />
            <ProductDetailDescription description={product.description} />
            <Separator />
            {/* Quantity and Add to Cart */}
            <div className="space-y-4 flex-shrink-0">
              <ProductDetailQuantity
                quantity={quantity}
                setQuantity={setQuantity}
                disabled={!product.inStock}
              />
              <ProductDetailActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                disabled={!product.inStock}
              />
            </div>
            <Separator />
            <ProductDetailFeatures />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
