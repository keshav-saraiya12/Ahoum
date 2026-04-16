# Nectar - Online Grocery Delivery App

A fully responsive grocery delivery web application built with React, TypeScript, Tailwind CSS, and Zustand. Converted from a mobile-first Figma design into a production-quality web app.

## Tech Stack

- **React 18** with Vite
- **TypeScript** (strict mode, no `any`)
- **Tailwind CSS** (utility-first, responsive breakpoints)
- **Zustand** (global state management with separate stores)
- **React Router** (client-side routing)

## Features

### Authentication & Onboarding
- Splash screen with auto-redirect
- 3-step onboarding carousel
- Login with email/password validation
- Sign Up with form validation
- OTP verification (4-digit code)
- Location/zone selection

### Main Application
- Home screen with categories, exclusive offers, best sellers
- Category-based product listing with filters
- Product detail page with nutrition info, reviews
- Debounced search with instant results
- Filter panel (categories, price range, sort)
- Shopping cart with quantity management
- Favorites/wishlist

### Checkout & Orders
- Multi-step checkout (address, delivery slot, payment)
- Promo code support
- Order success screen
- Order failure/error screen

### UX Enhancements
- Skeleton loaders during data fetching
- Empty states for cart, favorites, search
- Toast notifications
- Smooth transitions and animations
- Keyboard accessible

## Responsive Design

### Mobile (Primary)
- Bottom navigation bar
- Card-based layouts
- Horizontal scroll product lists
- Full-screen modals for filters

### Desktop
- Side navigation bar
- Multi-column product grids (up to 5 columns)
- Category/filter sidebar
- Sticky cart summary on checkout
- `max-w-7xl` container

## Project Structure

```
src/
├── components/
│   ├── auth/          # Auth-related components
│   ├── common/        # Shared UI (Skeleton, EmptyState, Toast, Spinner)
│   ├── layout/        # AppLayout, BottomNav, DesktopSidebar
│   ├── products/      # ProductCard, ProductGrid, FilterPanel
│   └── cart/          # Cart-related components
├── data/              # Mock JSON data
├── hooks/             # Custom hooks (useDebounce)
├── pages/             # All screen components
├── stores/            # Zustand stores (auth, cart, favorites, products, ui)
└── types/             # TypeScript interfaces and enums
```

## State Management (Zustand)

| Store | Purpose |
|-------|---------|
| `authStore` | User auth, onboarding, location |
| `cartStore` | Cart items, quantities, totals |
| `favoritesStore` | Favorite/wishlist products |
| `productStore` | Products, search, filters |
| `uiStore` | UI state (sidebar, filter, toast) |

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment

Deploy the `dist/` folder to Vercel or Netlify.
