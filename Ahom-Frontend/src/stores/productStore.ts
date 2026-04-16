import { create } from 'zustand';
import { Product, ProductCategory, FilterState } from '../types';
import { products, searchProducts, getProductsByCategory } from '../data/products';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  searchQuery: string;
  filters: FilterState;
  selectedCategory: ProductCategory | null;

  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setCategory: (category: ProductCategory | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
}

const defaultFilters: FilterState = {
  categories: [],
  priceRange: [0, 50],
  sortBy: 'default',
};

export const useProductStore = create<ProductState>()((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  searchQuery: '',
  filters: { ...defaultFilters },
  selectedCategory: null,

  fetchProducts: async () => {
    set({ isLoading: true });
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set({ products, filteredProducts: products, isLoading: false });
        resolve();
      }, 600);
    });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    if (query.trim() === '') {
      get().applyFilters();
    } else {
      const results = searchProducts(query);
      set({ filteredProducts: results });
    }
  },

  setCategory: (category: ProductCategory | null) => {
    set({ selectedCategory: category });
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      set({ filteredProducts: categoryProducts });
    } else {
      set({ filteredProducts: get().products });
    }
  },

  setFilters: (filters: Partial<FilterState>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  resetFilters: () => {
    set({ filters: { ...defaultFilters }, selectedCategory: null });
    get().applyFilters();
  },

  applyFilters: () => {
    const { filters, searchQuery, selectedCategory } = get();
    let result = [...products];

    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    const [minPrice, maxPrice] = filters.priceRange;
    result = result.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    set({ filteredProducts: result });
  },
}));
