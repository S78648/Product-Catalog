/**
 * Demo/Test file to visualize the Order page with sample cart items
 * This helps verify the layout and functionality without needing the backend
 *
 * To test:
 * 1. Run: npm run dev
 * 2. Open browser DevTools console
 * 3. Paste this code to add mock items to cart
 */

import { useCart } from '@/hooks/useCart';

export function addMockCartItems() {
  // This function can be run in browser console to add demo items
  const { addItem } = useCart.getState();

  // Add mock products to cart
  addItem(1, 2); // Product 1, quantity 2
  addItem(2, 1); // Product 2, quantity 1
  addItem(3, 3); // Product 3, quantity 3

  console.log('✅ Mock cart items added! Navigate to /order to see them.');
}

// Usage in browser console:
// Copy entire OrderPageDemo.tsx file to a test environment
// Or manually in console:
/*
const { addItem } = zustand.useCart.getState();
addItem(1, 2);
addItem(2, 1);
addItem(3, 3);
*/

// Expected cart state after calling addMockCartItems():
export const mockCartState = {
  items: [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
    { productId: 3, quantity: 3 },
  ],
  totalCount: 6,
};

// Expected order items (with product details):
export const mockOrderItems = [
  {
    productId: 1,
    name: 'Laptop',
    price: 50000,
    quantity: 2,
    thumbnailUrl: 'https://via.placeholder.com/150?text=Laptop',
    subtotal: 100000,
  },
  {
    productId: 2,
    name: 'Mouse',
    price: 500,
    quantity: 1,
    thumbnailUrl: 'https://via.placeholder.com/150?text=Mouse',
    subtotal: 500,
  },
  {
    productId: 3,
    name: 'Keyboard',
    price: 2000,
    quantity: 3,
    thumbnailUrl: 'https://via.placeholder.com/150?text=Keyboard',
    subtotal: 6000,
  },
];

export const mockOrderTotal = 106500;
