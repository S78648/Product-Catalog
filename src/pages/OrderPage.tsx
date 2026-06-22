import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/features/products/hooks/useProducts';
import { BookingForm } from '@/components/BookingForm';

export function OrderPage() {
  const cartItems = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const navigate = useNavigate();
  const { data: allProducts = [], isLoading, isError } = useProducts();
  const products = allProducts;
  const loading = isLoading && cartItems.length > 0;
  const error = isError && cartItems.length > 0;

  // Handle quantity decrement - remove item if qty is 1
  const handleDecrement = (productId: number, currentQty: number) => {
    if (currentQty === 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, currentQty - 1);
    }
  };

  // Handle quantity increment
  const handleIncrement = (productId: number, currentQty: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && currentQty < product.stock) {
      updateQuantity(productId, currentQty + 1);
    }
  };

  // Map cart items with product details
  const orderItems = cartItems
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      return product
        ? {
            productId: cartItem.productId,
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            thumbnailUrl: product.thumbnailUrl,
            subtotal: product.price * cartItem.quantity,
          }
        : null;
    })
    .filter((item) => item !== null);

  // Calculate totals
  const totalAmount = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-400">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">Your cart is empty</p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Order Summary
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Review your items and complete your booking
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="btn-secondary text-xs"
          >
            <svg
              className="mr-1.5 size-3.5"
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
            Continue Shopping
          </button>
        </div>

        {/* Order Items */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-gray-900">
            Items ({totalItems})
          </h2>

          <div className="mt-4 divide-y divide-gray-100">
            {orderItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="size-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-gray-400">
                        ₹{item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">
                      ₹{item.subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="inline-flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() =>
                          handleDecrement(item.productId, item.quantity)
                        }
                        className="flex size-7 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
                        title={
                          item.quantity === 1
                            ? 'Remove item'
                            : 'Decrease quantity'
                        }
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      <span className="min-w-[2rem] text-center text-xs font-semibold text-gray-900 tabular-nums">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleIncrement(item.productId, item.quantity)
                        }
                        disabled={
                          item.quantity >=
                          (products.find((p) => p.id === item.productId)
                            ?.stock ?? Infinity)
                        }
                        className={`flex size-7 items-center justify-center transition-colors ${
                          item.quantity >=
                          (products.find((p) => p.id === item.productId)
                            ?.stock ?? Infinity)
                            ? 'text-gray-200 cursor-not-allowed'
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                        title={
                          item.quantity >=
                          (products.find((p) => p.id === item.productId)
                            ?.stock ?? Infinity)
                            ? 'Maximum stock reached'
                            : 'Increase quantity'
                        }
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
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    <span className="text-[11px] text-gray-300">
                      {item.quantity}x ₹{item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="ml-auto sm:w-72">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="tabular-nums">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="mt-1.5 flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="tabular-nums">Free</span>
              </div>
              <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
                <span>Total</span>
                <span className="tabular-nums">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="card mt-6 p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Your Details
          </h2>
          <BookingForm cartItems={orderItems} totalAmount={totalAmount} />
        </div>
      </div>
    </div>
  );
}
