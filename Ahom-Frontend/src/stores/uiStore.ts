import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isFilterOpen: boolean;
  isCartOpen: boolean;
  activeTab: string;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info';

  toggleSidebar: () => void;
  toggleFilter: () => void;
  toggleCart: () => void;
  setActiveTab: (tab: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isSidebarOpen: false,
  isFilterOpen: false,
  isCartOpen: false,
  activeTab: 'shop',
  toastMessage: null,
  toastType: 'success',

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleFilter: () =>
    set((state) => ({ isFilterOpen: !state.isFilterOpen })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setActiveTab: (tab: string) => set({ activeTab: tab }),
  showToast: (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    set({ toastMessage: message, toastType: type });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3000);
  },
  hideToast: () => set({ toastMessage: null }),
}));
