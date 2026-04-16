import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

type PaymentMethod = 'card' | 'cash' | 'upi';

interface DeliverySlot {
  id: string;
  label: string;
  time: string;
}

const deliverySlots: DeliverySlot[] = [
  { id: 'slot-1', label: 'Express', time: '30-45 min' },
  { id: 'slot-2', label: 'Standard', time: '1-2 hours' },
  { id: 'slot-3', label: 'Scheduled', time: 'Tomorrow 9-11 AM' },
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { selectedLocation } = useAuthStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [selectedSlot, setSelectedSlot] = useState('slot-1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const total = getTotal();
  const deliveryFee = total > 30 ? 0 : 2.99;
  const discount = promoCode === 'NECTAR20' ? total * 0.2 : 0;
  const finalTotal = total + deliveryFee - discount;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const isSuccess = Math.random() > 0.15;
      if (isSuccess) {
        clearCart();
        navigate('/order-success', { replace: true });
      } else {
        navigate('/order-failed', { replace: true });
      }
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart', { replace: true });
    return null;
  }

  return (
    <div className="pb-6">
      <div className="sticky top-0 bg-white z-30 px-4 pt-4 pb-3 flex items-center gap-3 border-b border-grey-border md:px-0 md:static md:border-0">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-grey-light transition-colors md:hidden"
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-dark flex-1 md:text-left text-center">Checkout</h1>
      </div>

      <div className="lg:flex lg:gap-8">
        <div className="flex-1 px-4 md:px-0 space-y-6 pt-4">
          <section>
            <h2 className="font-semibold text-dark mb-3">Delivery Address</h2>
            <div className="border border-grey-border rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">
                    {selectedLocation?.street || '123 Main Street'}
                  </p>
                  <p className="text-xs text-grey mt-0.5">
                    {selectedLocation?.city || 'San Francisco'}, {selectedLocation?.state || 'CA'} {selectedLocation?.zip || '94102'}
                  </p>
                  <p className="text-xs text-primary mt-1">{selectedLocation?.zone || 'Zone A'}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-dark mb-3">Delivery Time</h2>
            <div className="grid grid-cols-3 gap-3">
              {deliverySlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-3 rounded-2xl border-2 text-center transition-all ${
                    selectedSlot === slot.id
                      ? 'border-primary bg-primary/5'
                      : 'border-grey-border hover:border-grey'
                  }`}
                >
                  <p className="text-sm font-semibold text-dark">{slot.label}</p>
                  <p className="text-xs text-grey mt-0.5">{slot.time}</p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-dark mb-3">Payment Method</h2>
            <div className="space-y-3">
              {([
                { id: 'card' as const, label: 'Credit / Debit Card', icon: '💳' },
                { id: 'upi' as const, label: 'UPI Payment', icon: '📱' },
                { id: 'cash' as const, label: 'Cash on Delivery', icon: '💵' },
              ]).map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary bg-primary/5'
                      : 'border-grey-border hover:border-grey'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <span className="text-sm font-medium text-dark">{method.label}</span>
                  <div className="ml-auto">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id ? 'border-primary' : 'border-grey-border'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-dark mb-3">Promo Code</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-3 rounded-2xl border border-grey-border text-sm
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <button className="px-5 py-3 bg-dark text-white rounded-2xl text-sm font-semibold hover:bg-dark-light transition-colors">
                Apply
              </button>
            </div>
            {promoCode === 'NECTAR20' && (
              <p className="text-primary text-xs mt-2 font-medium">20% discount applied!</p>
            )}
          </section>

          <section>
            <h2 className="font-semibold text-dark mb-3">Order Items ({items.length})</h2>
            <div className="space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="text-2xl">{product.image}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{product.name}</p>
                    <p className="text-xs text-grey">x{quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-dark">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:w-80 lg:shrink-0 px-4 md:px-0">
          <div className="lg:sticky lg:top-24 mt-6 lg:mt-4">
            <div className="bg-grey-light/50 rounded-2xl p-5 lg:border lg:border-grey-border lg:bg-white">
              <h3 className="font-semibold text-dark mb-4 lg:text-lg">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-grey">Subtotal</span>
                  <span className="text-dark font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-grey">Delivery</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-primary' : 'text-dark'}`}>
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-grey">Discount</span>
                    <span className="text-primary font-medium">-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-grey-border pt-3 flex justify-between mb-5">
                <span className="font-semibold text-dark">Total</span>
                <span className="font-bold text-dark text-lg">${finalTotal.toFixed(2)}</span>
              </div>

              <p className="text-xs text-grey mb-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                           hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" color="text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  `Place Order - $${finalTotal.toFixed(2)}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
