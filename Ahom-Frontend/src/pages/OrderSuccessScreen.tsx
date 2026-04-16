import { useNavigate } from 'react-router-dom';

export default function OrderSuccessScreen() {
  const navigate = useNavigate();
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center animate-bounce-subtle">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">Order Placed!</h1>
        <p className="text-grey text-sm mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-xs text-grey mb-1">Order ID</p>
        <p className="text-sm font-semibold text-primary mb-8 font-mono">{orderId}</p>

        <div className="bg-grey-light/50 rounded-2xl p-5 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#53B175" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-grey">Estimated Delivery</p>
              <p className="text-sm font-semibold text-dark">30-45 minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#53B175" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-grey">Delivering to</p>
              <p className="text-sm font-semibold text-dark">Your saved address</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/home', { replace: true })}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                       hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/home', { replace: true })}
            className="w-full border border-grey-border text-dark py-4 rounded-2xl font-semibold text-base
                       hover:bg-grey-light transition-colors"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}
