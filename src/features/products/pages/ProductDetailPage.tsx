import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useProduct } from '@/features/products/hooks/useProduct';
import { useCart } from '@/hooks/useCart';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useProduct(productId);
  const cartItems = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const existingItem = cartItems.find((i) => i.productId === Number(productId));
  const [quantity, setQuantity] = useState(existingItem?.quantity ?? 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product!.id, newQuantity);
    } else {
      removeItem(product!.id);
    }
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  if (!productId) {
    return (
      <section>
        <h1 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h1>
        <p className="mt-2 text-sm text-gray-500">No product was selected.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-10 text-center text-sm text-gray-500">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-10 text-center text-sm text-red-600">
        Unable to load product details. Please try again later.
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/products"
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-gray-600"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to products
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">{product.description}</p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2">
            <button
              type="button"
              onClick={handleDecrease}
              className="flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Decrease quantity"
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
                  d="M20 12H4"
                />
              </svg>
            </button>

            <span className="min-w-[2.5rem] text-center text-sm font-semibold text-gray-900 tabular-nums">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
              aria-label="Increase quantity"
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
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
        <div className="card overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-gray-50">
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-gray-900">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              {product.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Price
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }).format(product.price)}
              </p>
            </div>

            <div className="card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Stock
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-900">
                {product.stock}
              </p>
            </div>
          </div>

          <div className="card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Details
            </p>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-400">Product ID</dt>
                <dd className="font-medium text-gray-900">{product.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-400">Created</dt>
                <dd className="font-medium text-gray-900">
                  {new Date(product.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
