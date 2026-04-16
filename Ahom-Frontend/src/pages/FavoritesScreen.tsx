import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '../stores/favoritesStore';
import { useCartStore } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import EmptyState from '../components/common/EmptyState';

export default function FavoritesScreen() {
  const navigate = useNavigate();
  const { items, removeFavorite } = useFavoritesStore();
  const { addToCart } = useCartStore();
  const { showToast } = useUIStore();

  const handleAddAllToCart = () => {
    items.forEach((product) => addToCart(product));
    showToast('All favorites added to cart!');
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="❤️"
        title="No Favorites Yet"
        description="Save your favorite products here for quick access."
        actionLabel="Browse Products"
        onAction={() => navigate('/home')}
      />
    );
  }

  return (
    <div className="pb-6">
      <div className="sticky top-0 bg-white z-30 px-4 pt-4 pb-3 border-b border-grey-border md:px-0 md:static md:border-0">
        <h1 className="text-xl font-bold text-dark text-center md:text-left">Favorites</h1>
      </div>

      <div className="px-4 md:px-0">
        <div className="divide-y divide-grey-border">
          {items.map((product) => (
            <div key={product.id} className="flex items-center gap-4 py-5">
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-16 h-16 bg-grey-light/50 rounded-xl flex items-center justify-center shrink-0"
              >
                <span className="text-4xl">{product.image}</span>
              </button>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-dark truncate">{product.name}</h3>
                <p className="text-xs text-grey">{product.unit}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-base font-bold text-dark">${product.price.toFixed(2)}</span>
                <button
                  onClick={() => { addToCart(product); showToast(`${product.name} added to cart`); }}
                  className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white
                             hover:bg-primary-dark transition-colors"
                  aria-label={`Add ${product.name} to cart`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="text-grey hover:text-danger transition-colors p-1"
                  aria-label={`Remove ${product.name} from favorites`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={handleAddAllToCart}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                       hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Add All To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
