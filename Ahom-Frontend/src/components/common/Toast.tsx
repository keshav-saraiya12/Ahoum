import { useUIStore } from '../../stores/uiStore';

export default function Toast() {
  const { toastMessage, toastType, hideToast } = useUIStore();

  if (!toastMessage) return null;

  const bgColor =
    toastType === 'success'
      ? 'bg-primary'
      : toastType === 'error'
        ? 'bg-danger'
        : 'bg-dark';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-2xl shadow-modal flex items-center gap-3 min-w-[280px]`}
      >
        <span className="text-sm font-medium flex-1">{toastMessage}</span>
        <button
          onClick={hideToast}
          className="text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
