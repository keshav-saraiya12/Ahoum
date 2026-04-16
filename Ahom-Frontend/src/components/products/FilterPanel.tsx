import { ProductCategory } from '../../types';
import { useProductStore } from '../../stores/productStore';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A-Z' },
] as const;

export default function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const { filters, setFilters, applyFilters, resetFilters } = useProductStore();

  const handleCategoryToggle = (category: ProductCategory) => {
    const current = filters.categories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setFilters({ categories: updated });
  };

  const handleApply = () => {
    applyFilters();
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto
                    lg:static lg:rounded-2xl lg:border lg:border-grey-border lg:max-h-none
                    transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}`}
      >
        <div className="sticky top-0 bg-white px-6 pt-6 pb-3 border-b border-grey-border flex items-center justify-between lg:border-0">
          <h3 className="text-lg font-bold text-dark">Filters</h3>
          <button onClick={onClose} className="lg:hidden text-grey hover:text-dark" aria-label="Close filters">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-dark mb-3">Categories</h4>
            <div className="space-y-2">
              {Object.values(ProductCategory).map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-5 h-5 rounded-md border-grey-border text-primary focus:ring-primary/50 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-grey-dark group-hover:text-dark transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-dark mb-3">Sort By</h4>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="sortBy"
                    checked={filters.sortBy === option.value}
                    onChange={() => setFilters({ sortBy: option.value })}
                    className="w-5 h-5 text-primary focus:ring-primary/50 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-grey-dark group-hover:text-dark transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-dark mb-3">
              Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </h4>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({ priceRange: [filters.priceRange[0], Number(e.target.value)] })
              }
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-grey-border flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-2xl border border-grey-border text-grey-dark font-semibold text-sm
                       hover:bg-grey-light transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-2xl bg-primary text-white font-semibold text-sm
                       hover:bg-primary-dark transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  );
}
