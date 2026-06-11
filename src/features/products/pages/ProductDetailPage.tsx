import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useProduct } from '@/features/products/hooks/useProduct';
import { useCart } from '@/hooks/useCart';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, isError } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const { addItem, updateQuantity, removeItem } = useCart();

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
      addItem(product.id, 1);
    }
  };

  if (!productId) {
    return (
      <section>
        <h1 className="text-3xl font-semibold tracking-normal">
          Product not found
        </h1>
        <p className="mt-3 text-gray-600">No product was selected.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Unable to load product details. Please try again later.
      </div>
    );
  }

  return (
    <section aria-labelledby="product-detail-heading">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id="product-detail-heading"
            className="text-3xl font-semibold tracking-normal"
          >
            {product.name}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Detailed information for the selected product.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={handleDecrease}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <span className="block h-0.5 w-4 rounded-full bg-gray-700" />
            </button>

            <div className="min-w-[3rem] px-3 text-center text-sm font-semibold text-gray-950">
              {quantity}
            </div>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-gray-800 bg-gray-950 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <span className="relative inline-flex h-5 w-5 items-center justify-center">
                <span className="block h-0.5 w-3 rounded-full bg-white" />
                <span className="absolute block h-3.5 w-0.5 origin-center rounded-full bg-white" />
              </span>
            </button>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Back to products
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-950">Overview</h2>
            <p className="mt-4 text-gray-600">{product.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Price
              </h3>
              <p className="mt-3 text-2xl font-semibold text-gray-950">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Stock
              </h3>
              <p className="mt-3 text-2xl font-semibold text-gray-950">
                {product.stock}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Meta
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-gray-900">Product ID</dt>
                <dd className="mt-1">{product.id}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Created At</dt>
                <dd className="mt-1">
                  {new Date(product.createdAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
