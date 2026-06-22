import { api } from '@/services/api';

import type { Product } from '@/features/products/types/product';
import type {
  CreateProductRequest,
  ProductResponse,
} from '@/features/products/types/createProduct';

export const ProductApi = {
  async getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/api/v1/products');
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/api/v1/products/${id}`);
    return response.data;
  },

  async createProduct(request: CreateProductRequest): Promise<ProductResponse> {
    const response = await api.post<ProductResponse>(
      '/api/v1/products',
      request,
    );
    return response.data;
  },
};
