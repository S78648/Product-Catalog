import { useMutation } from '@tanstack/react-query';

import { ProductApi } from '@/features/products/services/productApi';
import type {
  CreateProductRequest,
  ProductResponse,
} from '@/features/products/types/createProduct';
import { useProductCreateStore } from '@/features/products/stores/useProductCreateStore';

export function useCreateProduct() {
  const { setIsSubmitting, setLastCreatedProduct, setError } =
    useProductCreateStore();

  return useMutation<ProductResponse, Error, CreateProductRequest>({
    mutationFn: async (payload) => {
      setIsSubmitting(true);
      setError(null);

      return ProductApi.createProduct(payload);
    },
    onSuccess: (data) => {
      setLastCreatedProduct(data);
      setIsSubmitting(false);
    },
    onError: (err) => {
      setError(err?.message ?? 'Failed to create product');
      setIsSubmitting(false);
    },
  });
}
