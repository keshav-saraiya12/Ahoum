import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await login(email, password);
    if (success) {
      navigate('/location', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-end justify-center pb-8 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="text-center relative z-10">
          <span className="text-5xl mb-2 block">🥕</span>
          <h1 className="text-lg font-semibold text-dark">nectar</h1>
        </div>
      </div>

      <div className="flex-1 px-6 pt-8">
        <h2 className="text-2xl font-bold text-dark mb-1">Log In</h2>
        <p className="text-grey text-sm mb-8">Enter your email and password</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-grey-dark mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-2xl border ${
                errors.email ? 'border-danger' : 'border-grey-border'
              } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors`}
              placeholder="Enter your email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-grey-dark mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border ${
                  errors.password ? 'border-danger' : 'border-grey-border'
                } text-dark text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors pr-12`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-grey hover:text-dark transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger text-xs mt-1.5">{errors.password}</p>
            )}
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-grey hover:text-primary transition-colors">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                       hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center gap-2"
          >
            {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-grey mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-grey-border" />
          <span className="text-grey text-xs">OR</span>
          <div className="flex-1 h-px bg-grey-border" />
        </div>

        <div className="space-y-3 pb-8">
          <button className="w-full flex items-center justify-center gap-3 border border-grey-border py-3.5 rounded-2xl text-sm font-medium text-dark hover:bg-grey-light transition-colors">
            <span className="text-xl">G</span>
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-dark text-white py-3.5 rounded-2xl text-sm font-medium hover:bg-dark-light transition-colors">
            <span className="text-xl"></span>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
