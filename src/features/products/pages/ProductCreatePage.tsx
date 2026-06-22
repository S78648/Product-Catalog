import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer } from '@/components/ToastContainer';
import { useToast } from '@/hooks/useToast';
import { useCreateProduct } from '@/features/products/hooks/useCreateProduct';
import type { CreateProductRequest } from '@/features/products/types/createProduct';

type FormErrors = Partial<Record<keyof CreateProductRequest, string>> & {
  form?: string;
};

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function ProductCreatePage() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { mutateAsync, isPending } = useCreateProduct();
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    thumbnailUrl: '',
  });

  const numericForm = useMemo(() => {
    return {
      priceText: String(form.price),
      stockText: String(form.stock),
    };
  }, [form.price, form.stock]);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    const name = form.name.trim();
    if (!name) nextErrors.name = 'Product Name is required';
    else if (name.length > 160)
      nextErrors.name = 'Product Name must be at most 160 characters';

    const description = form.description.trim();
    if (!description) nextErrors.description = 'Description is required';

    if (form.price === null || form.price === undefined)
      nextErrors.price = 'Price is required';
    else if (Number.isNaN(form.price))
      nextErrors.price = 'Price must be a valid number';
    else if (form.price < 0) nextErrors.price = 'Price must be >= 0';

    if (form.stock === null || form.stock === undefined)
      nextErrors.stock = 'Stock is required';
    else if (Number.isNaN(form.stock))
      nextErrors.stock = 'Stock must be a valid number';
    else if (form.stock < 0) nextErrors.stock = 'Stock must be >= 0';

    const thumbnailUrl = form.thumbnailUrl.trim();
    if (!thumbnailUrl) nextErrors.thumbnailUrl = 'Thumbnail URL is required';
    else if (!isValidUrl(thumbnailUrl))
      nextErrors.thumbnailUrl = 'Thumbnail URL must be a valid URL';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onChange =
    (key: keyof CreateProductRequest) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
      const value = e.target.value;

      setForm((prev) => {
        if (key === 'price') {
          const num = value === '' ? 0 : Number(value);
          return { ...prev, price: num };
        }

        if (key === 'stock') {
          const num = value === '' ? 0 : Number(value);
          return { ...prev, stock: num };
        }

        return { ...prev, [key]: value };
      });

      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const [successAck, setSuccessAck] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessAck(false);
    if (!validate()) return;

    try {
      const created = await mutateAsync(form);
      addToast(`Product "${created.name}" created successfully!`, 'success');

      setForm({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        thumbnailUrl: '',
      });
      setErrors({});
      setSuccessAck(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to create product';
      addToast(message, 'error');
      setErrors({ form: message });
      setSuccessAck(false);
    }
  };

  return (
    <section aria-labelledby="create-product-heading">
      <div className="mb-6 max-w-xl">
        <h1
          id="create-product-heading"
          className="text-2xl font-semibold tracking-tight text-gray-900"
        >
          Create Product
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Add a new product to the catalog.
        </p>
      </div>

      <form onSubmit={onSubmit} className="max-w-xl space-y-4" noValidate>
        {successAck && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="text-sm text-green-800 font-medium">
              ✓ Product created successfully.
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {errors.form && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{errors.form}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={onChange('name')}
            disabled={isPending}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.name
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="e.g. Wireless Mouse"
            maxLength={160}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            value={form.description}
            onChange={onChange('description')}
            disabled={isPending}
            className={`w-full min-h-[96px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.description
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              inputMode="decimal"
              value={numericForm.priceText}
              onChange={onChange('price')}
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.price
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              min={0}
              step="0.01"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock
            </label>
            <input
              id="stock"
              type="number"
              value={numericForm.stockText}
              onChange={onChange('stock')}
              disabled={isPending}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.stock
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              min={0}
              step="1"
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="thumbnailUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Thumbnail URL
          </label>
          <input
            id="thumbnailUrl"
            type="url"
            value={form.thumbnailUrl}
            onChange={onChange('thumbnailUrl')}
            disabled={isPending}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.thumbnailUrl
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.thumbnailUrl && (
            <p className="mt-1 text-sm text-red-600">{errors.thumbnailUrl}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
              isPending
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {isPending ? (
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
                Creating...
              </>
            ) : (
              <>Create Product</>
            )}
          </button>
        </div>
      </form>

      {/* Ensure toasts are rendered on this page as well */}
      <ToastContainer />
    </section>
  );
}
