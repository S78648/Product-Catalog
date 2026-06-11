# Product-Catalog Features Documentation

## Overview

This document outlines all the features and components implemented in the Product-Catalog application, focusing on the cart management system and real-time product interactions.

---

## 1. Cart Management System

### Overview

A global state management system using **Zustand** to handle shopping cart operations with real-time updates.

### Location

`src/hooks/useCart.ts`

### Features

- **Add Items to Cart**: Add products with specified quantities
- **Update Quantities**: Modify quantity for existing cart items
- **Remove Items**: Delete items from cart
- **Real-time Count**: Reactive total count that updates across the app
- **Clear Cart**: Remove all items at once

### Store Schema

```typescript
interface CartItem {
  productId: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalCount: number;
  addItem: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}
```

### Usage Example

```typescript
import { useCart } from '@/hooks/useCart';

// In component
const { items, totalCount, addItem, removeItem, updateQuantity } = useCart();

// Add 2 items of product ID 1
addItem(1, 2);

// Update quantity to 5
updateQuantity(1, 5);

// Remove from cart
removeItem(1);

// Get total count
const count = useCart((state) => state.totalCount);
```

---

## 2. Cart Icon Component

### Overview

Displays shopping cart icon with a badge showing total product count in the navbar.

### Location

`src/components/CartIcon.tsx`

### Features

- **Cart Icon**: SVG icon displaying shopping cart
- **Badge Counter**: Shows total quantity of items in cart
- **Real-time Updates**: Badge updates instantly as items are added/removed
- **99+ Display**: Shows "99+" for counts exceeding 99

### Visual Feedback

- Icon appears in top-right corner of navbar (before mobile menu button)
- Red badge displays at bottom-right of icon
- Badge is hidden when cart is empty

### Usage

```typescript
import { CartIcon } from '@/components/CartIcon';

// Used in Navbar
<CartIcon />
```

---

## 3. ProductCardFooter Component

### Overview

An interactive quantity selector that expands on demand and syncs with the cart in real-time.

### Location

`src/features/products/components/ProductCardFooter.tsx`

### Behavior

#### Collapsed State

- Shows only a "+" button
- Clicking expands the component and adds 1 item to cart

#### Expanded State

- **Minus Button (−)**: Decreases quantity by 1, updates cart in real-time
  - Disabled when quantity is 1
  - Removes item completely when quantity reaches 0, collapses footer
- **Quantity Display**: Shows current quantity
- **Plus Button (+)**: Increases quantity by 1, updates cart in real-time
  - Disabled when quantity reaches stock limit

### Real-time Cart Updates

- Each click on `−` or `+` immediately updates the cart
- Cart counter in navbar updates instantly
- Changes are synchronized across all product cards

### Usage

```typescript
import { ProductCardFooter } from '@/features/products/components/ProductCardFooter';

// Used in ProductCard
<ProductCardFooter product={product} />
```

---

## 4. ProductCard Component

### Overview

Displays individual product information with the new ProductCardFooter integrated.

### Location

`src/features/products/components/ProductCard.tsx`

### Structure

```
ProductCard
├── Image (Links to detail page)
├── Product Title & Description (Links to detail page)
├── Stock & Price Info
└── ProductCardFooter (Add to cart functionality)
```

### Features

- Product image, name, description
- Stock availability and price display
- Integrated quantity selector (ProductCardFooter)
- Navigation to product detail page
- Real-time cart updates

---

## 5. ProductDetailPage

### Overview

Detailed product view with quantity selector and real-time cart functionality.

### Location

`src/features/products/pages/ProductDetailPage.tsx`

### Components

- **Product Image**: Full-size product image
- **Product Info**: Name, description, price, stock
- **Quantity Selector**:
  - Minus button (−) to decrease quantity
  - Quantity display
  - Plus button (+) to add to cart/increase quantity
- **Meta Information**: Product ID, creation date
- **Navigation**: Back to products link

### Real-time Cart Behavior

- **Click + Button**: Adds 1 item to cart, quantity increases, badge updates
- **Click − Button**: Decreases quantity, cart updates in real-time
- Stock validation prevents exceeding available quantity

---

## 6. Navbar Integration

### Location

`src/components/Navbar.tsx`

### Changes

- **CartIcon Added**: Positioned at top-right before mobile menu button
- **Real-time Updates**: Badge shows current cart count
- **Responsive**: Maintains layout on all screen sizes

### Structure

```
Navbar
├── Logo & Brand Name
├── Navigation Links (Home, Products, Contact)
├── CartIcon ← NEW
└── Mobile Menu Toggle
```

---

## User Experience Flow

### Adding Items from Product List

1. Browse products on `/products` page
2. Click "+" button on any product card
3. Product footer expands showing `− | qty | +`
4. Adjust quantity with − and + buttons
5. Cart counter updates in real-time with each click
6. Close/collapse by clicking − when quantity is at 1

### Adding Items from Product Detail

1. Navigate to product detail page via product card click
2. See quantity selector at top
3. Click "+" to add items one at a time
4. Cart counter updates instantly in navbar
5. Continue adjusting or go back to products

### Cart Tracking

- **Real-time Visibility**: Cart icon badge shows active cart count
- **Visual Feedback**: Immediate response to quantity changes
- **Cross-page Sync**: Changes on products page reflect on detail page and vice versa

---

## Technical Stack

### State Management

- **Zustand**: Lightweight, reactive state management
- No Redux boilerplate
- Automatic subscriptions and re-renders

### Frontend Framework

- **React 19.1.0**: Modern React with hooks
- **TypeScript**: Type-safe component development
- **React Router v7**: Client-side routing

### Styling

- **Tailwind CSS 3.4**: Utility-first CSS framework
- Custom button styles and layouts
- Responsive design utilities

### Build Tools

- **Vite 6.3.5**: Fast build and dev server
- **PostCSS**: CSS processing

---

## File Structure

```
src/
├── hooks/
│   └── useCart.ts                          # Cart state management
├── components/
│   ├── CartIcon.tsx                        # Cart badge icon (NEW)
│   ├── Navbar.tsx                          # Updated with CartIcon
│   └── Footer.tsx
├── features/
│   └── products/
│       ├── components/
│       │   ├── ProductCard.tsx             # Updated with footer
│       │   └── ProductCardFooter.tsx       # New quantity selector (NEW)
│       ├── pages/
│       │   └── ProductDetailPage.tsx       # Updated cart integration
│       ├── types/
│       │   └── product.ts
│       └── hooks/
│           └── useProduct.ts
└── layouts/
    └── AppLayout.tsx
```

---

## Installation & Setup

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install zustand (already included)
npm install zustand
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

---

## API Integration

### Product Endpoints

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Response Format

```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnailUrl: string;
  createdAt: string;
}
```

---

## Future Enhancements

1. **Persistent Storage**: Save cart to localStorage
2. **Cart Page**: Dedicated page to view and manage cart items
3. **Checkout Flow**: Payment integration
4. **Order History**: Track past purchases
5. **Wishlist**: Save favorite items
6. **Product Filters**: Filter by price, category, etc.
7. **Search**: Search functionality for products
8. **Reviews & Ratings**: User feedback system

---

## Contributing

When adding new features:

1. Update this documentation
2. Follow the existing code structure
3. Use TypeScript for type safety
4. Test on both product list and detail pages
5. Ensure cart updates in real-time

---

## Troubleshooting

### Cart Not Updating

- Ensure useCart hook is properly imported
- Check Zustand middleware in useCart.ts
- Verify component is re-rendering (check React DevTools)

### Real-time Badge Not Showing

- Clear browser cache
- Restart dev server
- Check CartIcon is in Navbar component

### Stock Validation Not Working

- Verify product.stock is passed correctly
- Check disabled state on buttons

---

**Last Updated**: June 11, 2024
**Version**: 1.0.0
**Author**: Development Team
