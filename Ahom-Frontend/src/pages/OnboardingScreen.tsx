import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const slides = [
  {
    emoji: '🛒',
    title: 'Welcome to nectar',
    subtitle: 'Get your groceries delivered to your doorstep',
    bg: 'from-primary/10 to-primary/5',
  },
  {
    emoji: '🥦',
    title: 'Fresh & Organic',
    subtitle: 'We source the freshest produce from local farms',
    bg: 'from-green-100 to-green-50',
  },
  {
    emoji: '🚀',
    title: 'Fast Delivery',
    subtitle: 'Get delivery within 30 minutes to your location',
    bg: 'from-blue-100 to-blue-50',
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { setOnboardingSeen } = useAuthStore();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setOnboardingSeen();
      navigate('/login', { replace: true });
    }
  };

  const handleSkip = () => {
    setOnboardingSeen();
    navigate('/login', { replace: true });
  };

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex justify-end p-6">
        <button
          onClick={handleSkip}
          className="text-grey text-sm font-medium hover:text-dark transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div
          className={`w-64 h-64 rounded-full bg-gradient-to-br ${slide.bg} flex items-center justify-center mb-12 transition-all duration-500`}
        >
          <span className="text-8xl">{slide.emoji}</span>
        </div>

        <h2 className="text-2xl font-bold text-dark text-center mb-3">
          {slide.title}
        </h2>
        <p className="text-grey text-center text-base max-w-xs">
          {slide.subtitle}
        </p>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-grey-border'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-primary text-white py-4 rounded-2xl font-semibold text-lg
                     hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
