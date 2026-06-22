import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnailUrl: string;
  subtotal: number;
}

interface BookingFormProps {
  cartItems: OrderItem[];
  totalAmount: number;
}

export function BookingForm({ cartItems, totalAmount }: BookingFormProps) {
  const clearCart = useCart((state) => state.clearCart);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate phone
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length < 8) {
      newErrors.phone = 'Phone number must be at least 8 digits';
    } else if (phoneDigits.length > 15) {
      newErrors.phone = 'Phone number must not exceed 15 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field as user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Build WhatsApp message
  const buildWhatsAppMessage = (): string => {
    const phoneDigits = formData.phone.replace(/\D/g, '');
    const lines = [
      `*NEW ORDER*`,
      ``,
      `*Customer Details:*`,
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      ``,
      `*Order Items:*`,
      ...cartItems.map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₹${item.subtotal.toFixed(2)}`,
      ),
      ``,
      `*Order Total:* ₹${totalAmount.toFixed(2)}`,
      ``,
      `Thank you for your order!`,
    ];

    return lines.join('\n');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setIsSubmitting(true);

    try {
      const message = buildWhatsAppMessage();

      const whatsappNumber =
        import.meta.env.VITE_WHATSAPP_NUMBER ?? '918077315043';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');

      setSubmitSuccess(true);
      clearCart();
      setFormData({ name: '', phone: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✓ Order sent to WhatsApp! A chat window will open to confirm your
            order.
          </p>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.name
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-blue-500'
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+91 98765 43210 or 9876543210"
          disabled={isSubmitting}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.phone
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-blue-500'
          } disabled:bg-gray-100 disabled:cursor-not-allowed`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Include country code if using international format
        </p>
      </div>

      {/* Form-level error */}
      {errors.form && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{errors.form}</p>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-800">
            This will open WhatsApp to send your order. Your cart will be
            cleared after submission.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Confirm & Open WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || cartItems.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            isSubmitting || cartItems.length === 0
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            <>📱 Book via WhatsApp</>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Clicking "Book via WhatsApp" will open WhatsApp
          with your order details. You can then confirm and send the message to
          complete your booking.
        </p>
      </div>
    </form>
  );
}
