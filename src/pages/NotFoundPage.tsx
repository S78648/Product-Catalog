import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-normal">Page not found</h1>
      <p className="mt-3 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Go home
      </Link>
    </section>
  );
}
