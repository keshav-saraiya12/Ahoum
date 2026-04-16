import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function OTPScreen() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { verifyOtp, isLoading } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 4) {
      setError('Please enter the complete code');
      return;
    }
    const success = await verifyOtp(code);
    if (success) {
      navigate('/location', { replace: true });
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6">
      <button
        onClick={() => navigate(-1)}
        className="mt-6 w-10 h-10 flex items-center justify-center rounded-xl hover:bg-grey-light transition-colors"
        aria-label="Go back"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <h2 className="text-2xl font-bold text-dark mb-2">Enter your 4-digit code</h2>
        <p className="text-grey text-sm mb-8">
          We sent a verification code to your phone number
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-16 h-16 text-center text-2xl font-bold border-2 rounded-2xl
                  ${error ? 'border-danger' : digit ? 'border-primary' : 'border-grey-border'}
                  focus:outline-none focus:border-primary transition-colors`}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {error && <p className="text-danger text-sm text-center mb-4">{error}</p>}

          <div className="text-center mb-8">
            {timer > 0 ? (
              <p className="text-grey text-sm">
                Resend code in <span className="text-primary font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || otp.some((d) => !d)}
            className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-base
                       hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                       focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center"
          >
            {isLoading ? <LoadingSpinner size="sm" color="text-white" /> : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}
