import { apiClient } from './client';

export const tenantApi = {
  updateSettings: async (settings: any) => {
    return apiClient.patch('/tenants/settings', settings);
  },
  
  verifyTenant: async (slug: string) => {
    return apiClient.get(`/tenants/verify/${slug}`);
  }
};
