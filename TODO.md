# TODO - Product Creation Feature (React + TS)

## Step 1: Create API/types/mutation/store/page

- [ ] Create `src/features/products/types/createProduct.ts` with:
  - `CreateProductRequest`
  - `ProductResponse`
- [ ] Update `src/features/products/services/productApi.ts`:
  - add `createProduct()` calling `POST /api/v1/products`
- [ ] Create `src/features/products/hooks/useCreateProduct.ts`:
  - `useMutation` calling `ProductApi.createProduct`
  - update Zustand store (loading/success/error)
- [ ] Create `src/features/products/stores/useProductCreateStore.ts`:
  - `isSubmitting`, `lastCreatedProduct`, `error`
- [ ] Create `src/features/products/pages/ProductCreatePage.tsx`:
  - form fields + validation rules
  - submit disable + loading state
  - success toast with click-to-redirect to `/products`
  - reset form on success
  - error toast on failure

## Step 2: Routing integration

- [ ] Update `src/routes/router.tsx` to add:
  - `products/create` -> `ProductCreatePage`

## Step 3: Build/lint

- [ ] Run `npm run lint`
- [ ] Run `npm run build`
