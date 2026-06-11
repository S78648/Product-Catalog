import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/features/products/types/product';

interface ProductCardFooterProps {
  product: Product;
}

export function ProductCardFooter({ product }: ProductCardFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addItem, updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      addItem(product.id, 1);
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
        className="mt-auto flex w-full items-center justify-center rounded-md bg-gray-950 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        aria-label="Add to cart"
      >
        <span className="text-lg leading-none">+</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-gray-50 p-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDecrement();
        }}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span className="min-w-8 text-center font-semibold text-gray-950">
        {quantity}
      </span>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleIncrement();
        }}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-950 text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
        disabled={quantity >= product.stock}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
