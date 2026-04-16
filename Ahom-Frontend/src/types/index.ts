export enum ProductCategory {
  FreshFruits = 'Fresh Fruits & Vegetables',
  CookingOil = 'Cooking Oil & Ghee',
  MeatFish = 'Meat & Fish',
  BakerySnacks = 'Bakery & Snacks',
  DairyEggs = 'Dairy & Eggs',
  Beverages = 'Beverages',
  Pulses = 'Pulses & Grains',
  CleaningEssentials = 'Cleaning Essentials',
}

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Processing = 'processing',
  OutForDelivery = 'out_for_delivery',
  Delivered = 'delivered',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: ProductCategory;
  unit: string;
  quantity: number;
  rating: number;
  reviewCount: number;
  nutrition?: NutritionInfo;
  inStock: boolean;
}

export interface NutritionInfo {
  calories: string;
  fat: string;
  protein: string;
  carbs: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  zone: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  image: string;
  color: string;
  borderColor: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  deliveryAddress: Address;
}

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number];
  sortBy: 'default' | 'price_asc' | 'price_desc' | 'rating' | 'name';
}
