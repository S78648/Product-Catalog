import { create } from 'zustand';

import type { ProductResponse } from '@/features/products/types/createProduct';

interface ProductCreateStore {
  isSubmitting: boolean;
  lastCreatedProduct: ProductResponse | null;
  error: string | null;

  setIsSubmitting: (isSubmitting: boolean) => void;
  setLastCreatedProduct: (product: ProductResponse | null) => void;
  setError: (error: string | null) => void;
}

export const useProductCreateStore = create<ProductCreateStore>((set) => ({
  isSubmitting: false,
  lastCreatedProduct: null,
  error: null,

  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setLastCreatedProduct: (product) => set({ lastCreatedProduct: product }),
  setError: (error) => set({ error }),
}));
