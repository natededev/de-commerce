// ProductList: Component for displaying a list/grid of products with filtering and sorting

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/features/products/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProducts } from '@/features/products/hooks/use-products';
import { ProductListSkeleton } from '@/components/ui/loading-skeleton';

interface ProductListProps {
  searchQuery?: string;
  category?: string;
}

export const ProductList: React.FC<ProductListProps> = ({
  searchQuery = '',
  category = '',
}) => {
  const { products, loading, error, sortBy, setSortBy, filterBy, setFilterBy } =
    useProducts(searchQuery, category);

  const [page, setPage] = useState(1);
  const productsPerPage = 12;

  // Memoize pagination calculations
  const { totalPages, paginatedProducts } = useMemo(() => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginatedProducts = products.slice(
      (page - 1) * productsPerPage,
      page * productsPerPage
    );
    return { totalPages, paginatedProducts };
  }, [products, page, productsPerPage]);

  // Reset page when products change
  React.useEffect(() => {
    setPage(1);
  }, [products.length]);

  if (loading) {
    return <ProductListSkeleton count={8} />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex flex-col items-center mb-4">
          <svg
            width="64"
            height="64"
            fill="none"
            viewBox="0 0 64 64"
            className="text-muted-foreground mb-2"
          >
            <rect width="64" height="64" rx="12" fill="#f3f4f6" />
            <path
              d="M12 32l8-8 8 8 8-8 8 8 8-8"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-muted-foreground mb-2">
            Failed to load products: {error}
          </p>
          <Button asChild variant="outline">
            <a href="/products" aria-label="Try Again">
              Try Again
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between px-4 sm:px-0 w-full">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              id="sort-select"
              name="sort"
              className="w-full sm:w-48"
              aria-label="Sort products"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger
              id="filter-select"
              name="filter"
              className="w-full sm:w-48"
              aria-label="Filter products"
            >
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-right px-1">
          {products.length} products found
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex flex-col items-center mb-4">
            <svg
              width="64"
              height="64"
              fill="none"
              viewBox="0 0 64 64"
              className="text-muted-foreground mb-2"
            >
              <rect width="64" height="64" rx="12" fill="#f3f4f6" />
              <path
                d="M20 48c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm24 0c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM18 16h28l-3 24H21l-3-24zm6 6v12m6-12v12m6-12v12"
                stroke="#a1a1aa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-muted-foreground mb-2">
              No products found matching your criteria.
            </p>
            <Button asChild variant="outline">
              <a href="/products" aria-label="Reset Filters">
                Reset Filters
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {paginatedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={{ ...product, image: product.image }}
            />
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="px-2 py-1 text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
