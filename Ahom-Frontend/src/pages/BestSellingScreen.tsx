import { useNavigate } from 'react-router-dom';
import { bestSelling } from '../data/products';
import ProductGrid from '../components/products/ProductGrid';

export default function BestSellingScreen() {
  const navigate = useNavigate();

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
        <h1 className="text-lg font-bold text-dark">Best Selling</h1>
      </div>
      <div className="px-4 md:px-0 pt-4">
        <ProductGrid products={bestSelling} />
      </div>
    </div>
  );
}
