import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useAuthStore } from '../stores/authStore';
import HorizontalProductList from '../components/products/HorizontalProductList';
import { categories } from '../data/products';
import { exclusiveOffers, bestSelling } from '../data/products';
import { CategorySkeleton } from '../components/common/SkeletonLoader';

export default function HomeScreen() {
  const { fetchProducts, isLoading } = useProductStore();
  const { selectedLocation } = useAuthStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="pb-6">
      <div className="bg-gradient-to-b from-primary/5 to-transparent px-4 pt-6 pb-4 md:px-0">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl">🥕</span>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-dark">nectar</p>
          <div className="flex items-center justify-center gap-1 text-grey text-sm mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{selectedLocation?.zone || 'Select Location'}</span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0">
        <Link to="/search" className="block mb-6">
          <div className="flex items-center gap-3 bg-grey-light rounded-2xl px-4 py-3.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C7C7C" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-grey text-sm">Search products...</span>
          </div>
        </Link>

        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-1">Fresh Vegetables</p>
            <h3 className="text-xl font-bold mb-1">Get Up To 40% OFF</h3>
            <p className="text-xs opacity-70">On your first order</p>
          </div>
          <span className="absolute right-4 bottom-2 text-5xl opacity-20">🥬</span>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-dark">Categories</h2>
            <Link to="/categories" className="text-primary text-sm font-semibold hover:underline">
              See All
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x md:grid md:grid-cols-4 lg:grid-cols-8 md:overflow-visible">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)
              : categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${encodeURIComponent(cat.name)}`}
                    className={`min-w-[140px] md:min-w-0 snap-start flex flex-col items-center gap-2 p-4 rounded-2xl border ${cat.borderColor} ${cat.color} hover:shadow-card transition-all`}
                  >
                    <span className="text-4xl">{cat.image}</span>
                    <span className="text-xs font-semibold text-dark text-center leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                ))}
          </div>
        </section>

        <div className="mb-8">
          <HorizontalProductList
            title="Exclusive Offer"
            products={exclusiveOffers}
            viewAllLink="/offers"
          />
        </div>

        <div className="mb-8">
          <HorizontalProductList
            title="Best Selling"
            products={bestSelling}
            viewAllLink="/best-selling"
          />
        </div>
      </div>
    </div>
  );
}
