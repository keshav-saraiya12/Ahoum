import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import EmptyState from '../components/common/EmptyState';

export default function CartScreen() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your Cart is Empty"
        description="Looks like you haven't added any items to your cart yet."
        actionLabel="Start Shopping"
        onAction={() => navigate('/home')}
      />
    );
  }

  return (
    <div className="pb-6">
      <div className="sticky top-0 bg-white z-30 px-4 pt-4 pb-3 border-b border-grey-border md:px-0 md:static md:border-0">
        <h1 className="text-xl font-bold text-dark text-center md:text-left">My Cart</h1>
      </div>

      <div className="lg:flex lg:gap-8">
        <div className="flex-1 px-4 md:px-0">
          <div className="divide-y divide-grey-border">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 py-5">
                <div className="w-16 h-16 bg-grey-light/50 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-4xl">{product.image}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-dark truncate">{product.name}</h3>
                  <p className="text-xs text-grey">{product.unit}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-8 h-8 border border-grey-border rounded-lg flex items-center justify-center
                                 hover:border-primary hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="text-sm font-semibold text-dark w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white
                                 hover:bg-primary-dark transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-grey hover:text-danger transition-colors mb-2 p-1"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-base font-semibold text-dark">
                    ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-80 lg:shrink-0">
          <div className="px-4 md:px-0 lg:sticky lg:top-24">
            <div className="bg-grey-light/50 rounded-2xl p-5 mt-4 lg:mt-0 lg:border lg:border-grey-border lg:bg-white">
              <h3 className="font-semibold text-dark mb-4 lg:text-lg">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-grey">Subtotal</span>
                  <span className="text-dark font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-grey">Delivery</span>
                  <span className="text-primary font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-grey">Discount</span>
                  <span className="text-dark font-medium">-$0.00</span>
                </div>
              </div>
              <div className="border-t border-grey-border pt-3 flex justify-between mb-5">
                <span className="font-semibold text-dark">Total</span>
                <span className="font-bold text-dark text-lg">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                           hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
