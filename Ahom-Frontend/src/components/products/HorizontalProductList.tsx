import { Product } from '../../types';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

interface HorizontalProductListProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function HorizontalProductList({
  title,
  products,
  viewAllLink,
}: HorizontalProductListProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-dark">{title}</h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-primary text-sm font-semibold hover:underline"
          >
            See All
          </Link>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:overflow-visible">
        {products.map((product) => (
          <div key={product.id} className="min-w-[160px] md:min-w-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
