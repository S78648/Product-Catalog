import { api } from '@/services/api';
import type { Product } from '@/features/products/types/product';

export const ProductApi = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/api/v1/products');
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/api/v1/products/${id}`);
    return response.data;
  },
};
