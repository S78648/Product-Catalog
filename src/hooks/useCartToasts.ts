import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';

export function useCartToasts() {
  const addToast = useToast((state) => state.addToast);

  useEffect(() => {
    const unsub = useCart.subscribe((state, prevState) => {
      const currentCount = state.totalCount;
      const prevCount = prevState.totalCount;

      if (currentCount > prevCount) {
        addToast('Item added to cart', 'success');
      } else if (currentCount < prevCount) {
        addToast('Item removed from cart', 'info');
      }

      if (state.items.length === 0 && prevState.items.length > 0) {
        addToast('Cart cleared', 'info');
      }
    });
    return unsub;
  }, [addToast]);
}
