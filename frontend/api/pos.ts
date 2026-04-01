import { apiClient } from './client';

export const posApi = {
  getProducts: () => apiClient.get('/pos/products'),
  createProduct: (data: {
    name: string;
    price: number;
    category?: string;
    emoji?: string;
    description?: string;
    isAvailable?: boolean;
    modifiers?: string[];
    ingredients?: any[];
  }) => apiClient.post('/pos/products', data),
  updateProduct: (id: string, data: Partial<{
    name: string;
    price: number;
    category: string;
    emoji: string;
    description: string;
    isAvailable: boolean;
    modifiers: string[];
  }>) => apiClient.patch(`/pos/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/pos/products/${id}`),
  createOrder: (
    items: { productId: string; quantity: number; notes?: string; modifiers?: string[] }[],
    tableNumber?: number,
  ) => apiClient.post('/pos/orders', { items, tableNumber }),
  getOrders: () => apiClient.get('/pos/orders'),
};
