// Products page: displays product list, search, filter, and category selection
// Import site-wide config for branding and SEO
// Custom hook for debounced value (for search input)
// Main products page layout
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Suspense, lazy } from 'react';
const ProductList = lazy(() =>
  import('@/features/products/components/ProductList').then(m => ({
    default: m.ProductList,
  }))
);
import { useProducts } from '@/features/products/hooks/use-products';
import { siteConfig } from '@/config/site';

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const { categories } = useProducts();

  return (
    <>
      <Helmet>
        <title>Products | {siteConfig.name}</title>
        <meta
          name="description"
          content="Browse all products available at DE-Commerce."
        />
        <meta name="author" content={siteConfig.company.name} />
        <meta property="og:title" content={`Products | ${siteConfig.name}`} />
        <meta
          property="og:description"
          content="Browse all products available at DE-Commerce."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:url" content={siteConfig.url + '/products'} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Products | ${siteConfig.name}`} />
        <meta
          name="twitter:description"
          content="Browse all products available at DE-Commerce."
        />
        <meta name="twitter:image" content={siteConfig.ogImage} />
        <meta name="twitter:site" content={siteConfig.seo.twitter.site} />
        <meta name="twitter:creator" content={siteConfig.seo.twitter.handle} />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">
            Discover our complete range of carefully curated products.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <form autoComplete="off">
              <Input
                id="product-search"
                name="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                autoComplete="off"
              />
            </form>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger
              id="category-filter"
              name="category"
              className="w-full sm:w-48 h-12"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product List */}
        <div style={{ minHeight: 600 }}>
          <Suspense
            fallback={
              <div className="py-20 text-center">Loading products…</div>
            }
          >
            <ProductList
              searchQuery={debouncedSearch}
              category={selectedCategory}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Products;
