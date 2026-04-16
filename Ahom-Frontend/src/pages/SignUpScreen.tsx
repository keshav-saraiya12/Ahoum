import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Min 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await signup(name, email, password);
    if (success) {
      navigate('/otp', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-36 bg-gradient-to-br from-primary/10 to-primary/5 flex items-end justify-center pb-6">
        <div className="text-center">
          <span className="text-4xl mb-1 block">🥕</span>
          <h1 className="text-base font-semibold text-dark">nectar</h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6">
        <h2 className="text-2xl font-bold text-dark mb-1">Sign Up</h2>
        <p className="text-grey text-sm mb-6">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-grey-dark mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-2xl border ${
                errors.name ? 'border-danger' : 'border-grey-border'
              } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors`}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {errors.name && <p className="text-danger text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-grey-dark mb-1.5">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-2xl border ${
                errors.email ? 'border-danger' : 'border-grey-border'
              } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-grey-dark mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border ${
                  errors.password ? 'border-danger' : 'border-grey-border'
                } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors pr-12`}
                placeholder="Create a password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-grey hover:text-dark"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {errors.password && <p className="text-danger text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-grey-dark mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-2xl border ${
                errors.confirmPassword ? 'border-danger' : 'border-grey-border'
              } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors`}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                         hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center gap-2"
            >
              {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Sign Up'}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-grey mt-5 pb-8">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
