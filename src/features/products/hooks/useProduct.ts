import { useQuery } from '@tanstack/react-query';

import { ProductApi } from '@/features/products/services/productApi';

export function useProduct(productId?: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!productId) {
        throw new Error('Product ID is required');
      }

      return ProductApi.getProductById(Number(productId));
    },
    enabled: Boolean(productId),
  });
}
