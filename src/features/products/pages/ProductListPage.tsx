import { useState } from 'react';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProducts } from '@/features/products/hooks/useProducts';

export function ProductListPage() {
  const { data: products = [], isError, isLoading } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      )
    : products;

  let content = null;

  if (isLoading) {
    content = (
      <div className="card p-10 text-center text-sm text-gray-400">
        Loading products...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="rounded-xl border border-red-100 bg-red-50 p-10 text-center text-sm text-red-500">
        Unable to load products. Please try again later.
      </div>
    );
  } else if (filtered.length === 0) {
    content = (
      <div className="card p-10 text-center text-sm text-gray-400">
        {search ? 'No products match your search.' : 'No products found.'}
      </div>
    );
  } else {
    content = <ProductGrid products={filtered} />;
  }

  return (
    <section aria-labelledby="products-heading">
      <div className="mb-8">
        <div className="max-w-2xl">
          <h1
            id="products-heading"
            className="text-2xl font-semibold tracking-tight text-gray-900"
          >
            Products
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Browse the current product catalog.
          </p>
        </div>

        {!isLoading && !isError && (
          <div className="relative mt-4 max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-9"
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {content}
    </section>
  );
}
