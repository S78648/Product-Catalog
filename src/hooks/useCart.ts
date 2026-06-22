import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
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

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalCount: 0,

      addItem: (productId: number, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === productId,
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            );
          } else {
            newItems = [...state.items, { productId, quantity }];
          }

          return {
            items: newItems,
            totalCount: calculateTotal(newItems),
          };
        });
      },

      removeItem: (productId: number) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.productId !== productId,
          );
          return {
            items: newItems,
            totalCount: calculateTotal(newItems),
          };
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter(
              (item) => item.productId !== productId,
            );
            return {
              items: newItems,
              totalCount: calculateTotal(newItems),
            };
          }

          const newItems = state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          );

          return {
            items: newItems,
            totalCount: calculateTotal(newItems),
          };
        });
      },

      clearCart: () => {
        set({ items: [], totalCount: 0 });
      },
    }),
    { name: 'product-catalog-cart' },
  ),
);
