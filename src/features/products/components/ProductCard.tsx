import { Link } from 'react-router-dom';
import type { Product } from '@/features/products/types/product';
import { ProductCardFooter } from './ProductCardFooter';

interface ProductCardProps {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        className="block overflow-hidden rounded-t-lg"
      >
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col space-y-4 p-4">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <div>
            <h2 className="text-base font-semibold text-gray-950">
              {product.name}
            </h2>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">
              {product.description}
            </p>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
            {product.stock} in stock
          </span>
          <span className="text-base font-semibold text-gray-950">
            {currencyFormatter.format(product.price)}
          </span>
        </div>

        <ProductCardFooter product={product} />
      </div>
    </article>
  );
}
