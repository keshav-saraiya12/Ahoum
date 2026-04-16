import { useNavigate } from 'react-router-dom';

export default function OrderFailedScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm w-full">
        <div className="w-32 h-32 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-20 h-20 bg-danger rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">Oops! Order Failed</h1>
        <p className="text-grey text-sm mb-8">
          Something went wrong while processing your order. Please try again.
        </p>

        <div className="bg-grey-light/50 rounded-2xl p-5 mb-8 text-left">
          <h3 className="text-sm font-semibold text-dark mb-2">Possible reasons:</h3>
          <ul className="space-y-1.5">
            <li className="text-xs text-grey flex items-start gap-2">
              <span className="text-danger mt-0.5">&#8226;</span>
              Payment processing failed
            </li>
            <li className="text-xs text-grey flex items-start gap-2">
              <span className="text-danger mt-0.5">&#8226;</span>
              Network connectivity issue
            </li>
            <li className="text-xs text-grey flex items-start gap-2">
              <span className="text-danger mt-0.5">&#8226;</span>
              Some items may be out of stock
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/checkout', { replace: true })}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                       hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/home', { replace: true })}
            className="w-full border border-grey-border text-dark py-4 rounded-2xl font-semibold text-base
                       hover:bg-grey-light transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
