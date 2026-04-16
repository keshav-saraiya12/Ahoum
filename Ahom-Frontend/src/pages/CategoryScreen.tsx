import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductCategory } from '../types';
import { useProductStore } from '../stores/productStore';
import { useUIStore } from '../stores/uiStore';
import ProductGrid from '../components/products/ProductGrid';
import FilterPanel from '../components/products/FilterPanel';

export default function CategoryScreen() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { filteredProducts, setCategory, isLoading, fetchProducts } = useProductStore();
  const { isFilterOpen, toggleFilter } = useUIStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await fetchProducts();
      if (categoryName) {
        const decoded = decodeURIComponent(categoryName) as ProductCategory;
        setCategory(decoded);
      }
      setInitialized(true);
    };
    init();
  }, [categoryName, setCategory, fetchProducts]);

  const displayName = categoryName ? decodeURIComponent(categoryName) : 'All Products';

  return (
    <div className="pb-6">
      <div className="sticky top-0 bg-white z-30 px-4 pt-4 pb-3 flex items-center gap-3 md:px-0 md:static">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-grey-light transition-colors md:hidden"
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-dark flex-1">{displayName}</h1>
        <button
          onClick={toggleFilter}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-grey-light transition-colors"
          aria-label="Toggle filters"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
          </svg>
        </button>
      </div>

      <div className="px-4 md:px-0 lg:flex lg:gap-6">
        <div className="hidden lg:block lg:w-72 lg:shrink-0">
          <FilterPanel isOpen={true} onClose={toggleFilter} />
        </div>
        <div className="lg:hidden">
          <FilterPanel isOpen={isFilterOpen} onClose={toggleFilter} />
        </div>
        <div className="flex-1">
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading || !initialized}
            emptyMessage={`No products found in ${displayName}`}
          />
        </div>
      </div>
    </div>
  );
}
