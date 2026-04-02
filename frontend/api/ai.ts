import { apiClient } from './client';

export const aiApi = {
  scanInvoice: async (imageBase64: string) => {
    return apiClient.post('/ai/scan-invoice', { imageBase64 });
  }
};
