import { Link } from 'react-router-dom';
import type { Product } from '@/features/products/types/product';
import { ProductCardFooter } from './ProductCardFooter';

interface ProductCardProps {
  product: Product;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link
        to={`/products/${product.id}`}
        className="group block overflow-hidden"
      >
        <div className="aspect-[4/3] overflow-hidden bg-gray-50">
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-sm font-semibold leading-snug text-gray-900 transition-colors hover:text-gray-600">
            {product.name}
          </h2>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="rounded-md bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-500">
            {product.stock} in stock
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {currencyFormatter.format(product.price)}
          </span>
        </div>

        <ProductCardFooter product={product} />
      </div>
    </article>
  );
}
