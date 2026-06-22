export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnailUrl: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnailUrl: string;
  createdAt: string;
}
