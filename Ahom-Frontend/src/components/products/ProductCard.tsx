import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import { useFavoritesStore } from '../../stores/favoritesStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getItemQuantity, updateQuantity } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const qty = getItemQuantity(product.id);
  const fav = isFavorite(product.id);

  return (
    <div className="border border-grey-border rounded-2xl p-4 flex flex-col group hover:shadow-card transition-shadow relative">
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
        className="absolute top-3 right-3 z-10 p-1"
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? '#DF1525' : 'none'} stroke={fav ? '#DF1525' : '#7C7C7C'} strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      <Link to={`/product/${product.id}`} className="flex flex-col flex-1">
        <div className="flex items-center justify-center h-24 mb-3">
          <span className="text-6xl">{product.image}</span>
        </div>

        <h3 className="text-sm font-semibold text-dark line-clamp-2 mb-0.5 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-grey mb-3">{product.unit}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-dark">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-grey line-through ml-1.5">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white
                         hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={`Add ${product.name} to cart`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
              <button
                onClick={() => updateQuantity(product.id, qty - 1)}
                className="w-8 h-8 border border-grey-border rounded-lg flex items-center justify-center text-grey
                           hover:border-primary hover:text-primary transition-colors"
                aria-label="Decrease quantity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-dark w-6 text-center">{qty}</span>
              <button
                onClick={() => updateQuantity(product.id, qty + 1)}
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white
                           hover:bg-primary-dark transition-colors"
                aria-label="Increase quantity"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
