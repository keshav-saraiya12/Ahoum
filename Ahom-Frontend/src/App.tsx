import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AppLayout from './components/layout/AppLayout';
import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import LoginScreen from './pages/LoginScreen';
import SignUpScreen from './pages/SignUpScreen';
import OTPScreen from './pages/OTPScreen';
import LocationScreen from './pages/LocationScreen';
import HomeScreen from './pages/HomeScreen';
import SearchScreen from './pages/SearchScreen';
import CategoryScreen from './pages/CategoryScreen';
import CategoriesListScreen from './pages/CategoriesListScreen';
import ProductDetailScreen from './pages/ProductDetailScreen';
import CartScreen from './pages/CartScreen';
import FavoritesScreen from './pages/FavoritesScreen';
import CheckoutScreen from './pages/CheckoutScreen';
import OrderSuccessScreen from './pages/OrderSuccessScreen';
import OrderFailedScreen from './pages/OrderFailedScreen';
import AccountScreen from './pages/AccountScreen';
import OffersScreen from './pages/OffersScreen';
import BestSellingScreen from './pages/BestSellingScreen';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<PublicRoute><OnboardingScreen /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginScreen /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUpScreen /></PublicRoute>} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/location" element={<LocationScreen />} />

        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/categories" element={<CategoriesListScreen />} />
          <Route path="/category/:categoryName" element={<CategoryScreen />} />
          <Route path="/product/:productId" element={<ProductDetailScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/account" element={<AccountScreen />} />
          <Route path="/offers" element={<OffersScreen />} />
          <Route path="/best-selling" element={<BestSellingScreen />} />
        </Route>

        <Route path="/order-success" element={<OrderSuccessScreen />} />
        <Route path="/order-failed" element={<OrderFailedScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
