import { useQuery } from '@tanstack/react-query';

import { ProductApi } from '@/features/products/services/productApi';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: ProductApi.getProducts,
  });
}
