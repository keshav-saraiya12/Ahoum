import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import { useFavoritesStore } from '../stores/favoritesStore';
import { useUIStore } from '../stores/uiStore';
import { Product } from '../types';
import SkeletonLoader from '../components/common/SkeletonLoader';

export default function ProductDetailScreen() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showDescription, setShowDescription] = useState(true);

  const { addToCart, getItemQuantity, updateQuantity } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { showToast } = useUIStore();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const found = products.find((p) => p.id === productId);
      setProduct(found || null);
      setIsLoading(false);
    }, 400);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="pb-6 px-4 md:px-0">
        <div className="pt-4 mb-6">
          <SkeletonLoader className="h-10 w-10 rounded-xl" />
        </div>
        <SkeletonLoader className="h-64 w-full mb-6" />
        <SkeletonLoader className="h-6 w-48 mb-2" />
        <SkeletonLoader className="h-4 w-32 mb-4" />
        <SkeletonLoader className="h-20 w-full mb-4" />
        <SkeletonLoader className="h-14 w-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <span className="text-5xl mb-4">😕</span>
        <h2 className="text-xl font-bold text-dark mb-2">Product Not Found</h2>
        <p className="text-grey text-sm mb-6">This product doesn&apos;t exist or has been removed.</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-primary text-white px-8 py-3 rounded-2xl font-semibold hover:bg-primary-dark transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  const qty = getItemQuantity(product.id);
  const fav = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`);
  };

  return (
    <div className="pb-6 lg:flex lg:gap-8 lg:items-start">
      <div className="lg:flex-1">
        <div className="bg-grey-light/50 rounded-b-3xl lg:rounded-2xl">
          <div className="px-4 pt-4 flex items-center justify-between md:px-0 lg:px-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/80 transition-colors"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/80 transition-colors"
              aria-label="Go to cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center py-8 lg:py-12">
            <span className="text-[120px] lg:text-[160px]">{product.image}</span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0 lg:flex-1 lg:pt-4">
        <div className="flex items-start justify-between mt-6 lg:mt-0 mb-2">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
            <p className="text-grey text-sm mt-0.5">{product.unit}</p>
          </div>
          <button
            onClick={() => toggleFavorite(product)}
            className="p-2 -mr-2"
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={fav ? '#DF1525' : 'none'} stroke={fav ? '#DF1525' : '#7C7C7C'} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => qty > 0 && updateQuantity(product.id, qty - 1)}
              disabled={qty === 0}
              className="w-11 h-11 border border-grey-border rounded-xl flex items-center justify-center
                         hover:border-primary hover:text-primary transition-colors disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-dark w-8 text-center">
              {qty || 1}
            </span>
            <button
              onClick={() => qty > 0 ? updateQuantity(product.id, qty + 1) : handleAddToCart()}
              className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white
                         hover:bg-primary-dark transition-colors"
              aria-label="Increase quantity"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
          <div className="ml-auto">
            <span className="text-2xl font-bold text-dark">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-grey line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-grey-border pt-4 mb-4">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between py-2"
            aria-expanded={showDescription}
          >
            <span className="font-semibold text-dark">Product Detail</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform ${showDescription ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showDescription && (
            <p className="text-grey text-sm leading-relaxed pb-2">{product.description}</p>
          )}
        </div>

        {product.nutrition && product.nutrition.calories !== '-' && (
          <div className="border-t border-grey-border pt-4 mb-4">
            <button
              onClick={() => setShowNutrition(!showNutrition)}
              className="w-full flex items-center justify-between py-2"
              aria-expanded={showNutrition}
            >
              <span className="font-semibold text-dark">Nutrition</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`transition-transform ${showNutrition ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {showNutrition && (
              <div className="grid grid-cols-2 gap-3 pb-2">
                {Object.entries(product.nutrition).map(([key, value]) => (
                  <div key={key} className="bg-grey-light rounded-xl p-3">
                    <p className="text-xs text-grey capitalize">{key}</p>
                    <p className="text-sm font-semibold text-dark">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-grey-border pt-4 mb-6">
          <div className="flex items-center justify-between py-2">
            <span className="font-semibold text-dark">Review</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? '#F3603F' : '#E2E2E2'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-xs text-grey ml-1">({product.reviewCount})</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                     hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Add To Basket
        </button>
      </div>
    </div>
  );
}
