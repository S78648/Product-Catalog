# Quick Start Guide

## Project Overview

**Product-Catalog** is a modern e-commerce product showcase application with real-time shopping cart functionality.

---

## Setup

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:S78648/Product-Catalog.git
cd Product-Catalog

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port)

---

## Features

### 1. Product Listing

- Browse all available products on `/products`
- View product name, description, price, and stock
- Product images with lazy loading

### 2. Real-time Cart

- **Cart Icon**: Shows total items in cart (top-right navbar)
- **Quick Add**: Click "+" to expand quantity selector
- **Real-time Updates**: Cart badge updates immediately as you adjust quantities

### 3. Product Details

- Click any product to view full details at `/products/:id`
- Detailed product information and specifications
- Quantity selector with real-time cart sync

### 4. Quantity Management

- **Increment**: Click "+" to add one more item
- **Decrement**: Click "−" to remove one item
- **Stock Validation**: Cannot exceed available stock

---

## User Guide

### Adding Items (Product List)

1. Navigate to `/products`
2. Find desired product
3. Click "+" button on product card
4. See footer expand with quantity controls
5. Cart badge updates in real-time
6. Adjust quantity with − and + buttons

### Adding Items (Product Detail)

1. Click any product to view details
2. Use quantity selector at top
3. Click "+" to add items
4. Cart badge updates immediately
5. Return to products or browse more

### Tracking Your Cart

- **Visual Indicator**: Red badge on cart icon shows count
- **Real-time Sync**: Badge updates across all pages
- **Stock Aware**: Cannot add more than available

---

## Project Structure

```
Product-Catalog/
├── src/
│   ├── hooks/
│   │   └── useCart.ts              # Cart state management
│   ├── components/
│   │   ├── CartIcon.tsx            # Cart badge icon
│   │   ├── Navbar.tsx              # Top navigation
│   │   └── Footer.tsx              # Footer
│   ├── features/
│   │   └── products/
│   │       ├── components/
│   │       │   ├── ProductCard.tsx
│   │       │   └── ProductCardFooter.tsx  # Quantity selector
│   │       ├── pages/
│   │       │   ├── ProductListPage.tsx
│   │       │   └── ProductDetailPage.tsx
│   │       ├── types/
│   │       │   └── product.ts
│   │       └── hooks/
│   │           └── useProduct.ts
│   ├── layouts/
│   │   └── AppLayout.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code with ESLint
npm run lint

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

---

## Tech Stack

| Technology   | Version | Purpose          |
| ------------ | ------- | ---------------- |
| React        | 19.1.0  | UI Framework     |
| TypeScript   | 5.8.3   | Type Safety      |
| React Router | 7.6.2   | Routing          |
| Zustand      | Latest  | State Management |
| Tailwind CSS | 3.4.17  | Styling          |
| Vite         | 6.3.5   | Build Tool       |
| Axios        | 1.9.0   | HTTP Client      |
| React Query  | 5.80.6  | Data Fetching    |

---

## API Integration

### Base URL

The app connects to a local API for product data.

### Endpoints Used

- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Product Schema

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- --port 5174
```

### Dependencies Issue

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear build cache
rm -rf dist
npm run build
```

### Cart Not Updating

1. Check browser console for errors
2. Clear browser cache
3. Restart dev server
4. Check that Zustand is installed

---

## Performance Tips

- **Lazy Loading**: Product images load on demand
- **Code Splitting**: Components loaded with React Router
- **Tree Shaking**: Unused code removed in production build
- **Minification**: Code optimized in production

---

## Contributing

### Adding New Features

1. Create a new branch from `main`
2. Implement your feature
3. Test thoroughly
4. Submit a pull request
5. Update documentation

### Code Standards

- Use TypeScript for type safety
- Follow existing code style
- Add comments for complex logic
- Test on desktop and mobile

---

## Documentation Files

- **FEATURES.md** - Detailed feature documentation
- **IMPLEMENTATION.md** - Implementation guide and decisions
- **README.md** - Project overview
- **QUICKSTART.md** - This file

---

## Support

For issues or questions:

1. Check the documentation files
2. Review the code comments
3. Open an issue on GitHub

---

**Version**: 1.0.0  
**Last Updated**: June 11, 2024  
**Status**: Production Ready ✓

Happy shopping! 🛒
