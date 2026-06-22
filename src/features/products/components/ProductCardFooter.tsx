import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/features/products/types/product';

interface ProductCardFooterProps {
  product: Product;
}

export function ProductCardFooter({ product }: ProductCardFooterProps) {
  const cartItems = useCart((state) => state.items);
  const addItem = useCart((state) => state.addItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const existingItem = cartItems.find((i) => i.productId === product.id);
  const [isExpanded, setIsExpanded] = useState(!!existingItem);
  const [quantity, setQuantity] = useState(existingItem?.quantity ?? 1);

  const handleIncrement = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    } else {
      removeItem(product.id);
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded(true);
          setQuantity(1);
          addItem(product.id, 1);
        }}
        className="btn-primary w-full text-xs"
        aria-label="Add to cart"
      >
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-1.5">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDecrement();
        }}
        className="flex size-7 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
        aria-label="Decrease quantity"
      >
        <svg
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <span className="min-w-7 text-center text-sm font-semibold text-gray-900 tabular-nums">
        {quantity}
      </span>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleIncrement();
        }}
        className="flex size-7 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-white hover:text-gray-900 disabled:opacity-30"
        disabled={quantity >= product.stock}
        aria-label="Increase quantity"
      >
        <svg
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
