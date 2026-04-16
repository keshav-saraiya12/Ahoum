import { Product } from '../../types';
import ProductCard from './ProductCard';
import { ProductCardSkeleton } from '../common/SkeletonLoader';
import EmptyState from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  isLoading = false,
  title,
  emptyMessage = 'No products found',
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div>
        {title && <h2 className="text-xl font-bold text-dark mb-4">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No Products Found"
        description={emptyMessage}
      />
    );
  }

  return (
    <div>
      {title && <h2 className="text-xl font-bold text-dark mb-4">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
