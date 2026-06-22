import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <section>
      <div className="card p-10 sm:p-14">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Welcome to Product Catalog
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
          Browse our curated collection of products. Add items to your cart and
          place orders directly via WhatsApp.
        </p>
        <Link to="/products" className="btn-primary mt-8">
          Browse Products
          <svg
            className="ml-1.5 size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
