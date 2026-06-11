import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useProducts } from '@/features/products/hooks/useProducts';

export function ProductListPage() {
  const { data: products = [], isError, isLoading } = useProducts();

  let content = null;

  if (isLoading) {
    content = (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
        Loading products...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center text-red-700">
        Unable to load products. Please try again later.
      </div>
    );
  } else if (products.length === 0) {
    content = (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-600">
        No products found.
      </div>
    );
  } else {
    content = <ProductGrid products={products} />;
  }

  return (
    <section aria-labelledby="products-heading">
      <div className="mb-8 max-w-2xl">
        <h1
          id="products-heading"
          className="text-3xl font-semibold tracking-normal"
        >
          Products
        </h1>
        <p className="mt-3 text-gray-600">
          Browse the current product catalog.
        </p>
      </div>

      {content}
    </section>
  );
}
