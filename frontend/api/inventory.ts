import { apiClient } from './client';

export const inventoryApi = {
  getItems: () => apiClient.get('/inventory'),
  getItem: (id: string) => apiClient.get(`/inventory/${id}`),
  createItem: (data: {
    name: string;
    stock: number;
    unit: string;
    category?: string;
    emoji?: string;
    minStock?: number;
    maxStock?: number;
    cost?: number;
  }) => apiClient.post('/inventory', data),
  updateItem: (id: string, data: {
    stock?: number;
    name?: string;
    unit?: string;
    category?: string;
    emoji?: string;
    minStock?: number;
    maxStock?: number;
    cost?: number;
  }) => apiClient.patch(`/inventory/${id}`, data),
  deleteItem: (id: string) => apiClient.delete(`/inventory/${id}`),
};
