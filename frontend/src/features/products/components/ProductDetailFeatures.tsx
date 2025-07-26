// ProductDetailFeatures: Component for displaying product features/benefits

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Shield, RotateCcw } from 'lucide-react';

const ProductDetailFeaturesComponent: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Card>
      <CardContent className="p-4 text-center">
        <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">Free Shipping</p>
        <p className="text-xs text-muted-foreground">On orders over $50</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 text-center">
        <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">Warranty</p>
        <p className="text-xs text-muted-foreground">2 year guarantee</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4 text-center">
        <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">Easy Returns</p>
        <p className="text-xs text-muted-foreground">30-day return policy</p>
      </CardContent>
    </Card>
  </div>
);
export const ProductDetailFeatures = React.memo(ProductDetailFeaturesComponent);
