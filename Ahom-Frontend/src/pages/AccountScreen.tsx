import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const menuItems = [
  { icon: '📦', label: 'Orders', path: '/home' },
  { icon: '📍', label: 'Delivery Address', path: '/location' },
  { icon: '💳', label: 'Payment Methods', path: '/home' },
  { icon: '🎟️', label: 'Promo Codes', path: '/home' },
  { icon: '🔔', label: 'Notifications', path: '/home' },
  { icon: '❓', label: 'Help', path: '/home' },
  { icon: '📋', label: 'About', path: '/home' },
];

export default function AccountScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="pb-6">
      <div className="bg-gradient-to-br from-primary/5 to-transparent px-4 pt-8 pb-6 md:px-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-2xl shrink-0">
            {user?.avatar || '👤'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-dark">{user?.name || 'Guest User'}</h1>
            <p className="text-grey text-sm">{user?.email || 'guest@example.com'}</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-0 max-w-lg">
        <div className="divide-y divide-grey-border">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-4 py-4 hover:bg-grey-light/50 transition-colors -mx-2 px-2 rounded-xl"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-medium text-dark">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C7C7C" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 flex items-center justify-center gap-3 border border-grey-border py-4 rounded-2xl
                     text-primary font-semibold hover:bg-primary/5 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Log Out
        </button>
      </div>
    </div>
  );
}
