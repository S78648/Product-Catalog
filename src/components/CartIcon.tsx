import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

export function CartIcon() {
  const totalCount = useCart((state) => state.totalCount);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/order');
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative inline-flex items-center justify-center size-10 rounded-lg border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
      aria-label={`Shopping cart with ${totalCount} items`}
    >
      <svg
        className="size-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white shadow-sm">
          {totalCount > 99 ? '99+' : totalCount}
        </span>
      )}
    </button>
  );
}
