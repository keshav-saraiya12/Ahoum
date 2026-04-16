import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Address } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  selectedLocation: Address | null;
  hasSeenOnboarding: boolean;

  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  setLocation: (address: Address) => void;
  logout: () => void;
  setOnboardingSeen: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
      selectedLocation: null,
      hasSeenOnboarding: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const user: User = {
              id: 'user-1',
              name: 'John Doe',
              email,
              phone: '+1234567890',
              address: {
                street: '123 Market Street',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102',
                zone: 'Zone A',
              },
            };
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1000);
        });
      },

      signup: async (name: string, email: string, _password: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const user: User = {
              id: 'user-1',
              name,
              email,
              phone: '',
            };
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1000);
        });
      },

      sendOtp: async (_phone: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            set({ otpSent: true, isLoading: false });
            resolve(true);
          }, 800);
        });
      },

      verifyOtp: async (_otp: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            set({ isLoading: false });
            resolve(true);
          }, 800);
        });
      },

      setLocation: (address: Address) => {
        set((state) => ({
          selectedLocation: address,
          user: state.user ? { ...state.user, address } : null,
        }));
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          otpSent: false,
        });
      },

      setOnboardingSeen: () => {
        set({ hasSeenOnboarding: true });
      },
    }),
    {
      name: 'nectar-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedLocation: state.selectedLocation,
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
    }
  )
);
