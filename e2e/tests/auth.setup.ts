import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL || 'test@example.com';
  const password = process.env.TEST_USER_PASSWORD || 'password123';
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';

  // Navigate to root to initialize local storage
  await page.goto('/');
  
  const loginResponse = await page.evaluate(async ({ email, password, baseURL }) => {
    // We can call the backend directly from the browser context
    const resp = await fetch(`${baseURL.replace('3000', '5000')}/auth/super-admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': 'system'
      },
      body: JSON.stringify({ email, password })
    });
    
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(err.message || `API Login failed: ${resp.status}`);
    }
    
    const data = await resp.json();
    
    // Store in localStorage as expected by the frontend apiClient
    localStorage.setItem('auth_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    localStorage.setItem('tenant_id', 'system');
    localStorage.setItem('restaurant_slug', 'system');
    
    return data;
  }, { email, password, baseURL });

  // Verify successful injection by navigating to POS
  await page.goto('/pos');
  
  // Wait for the Dashboard state to be active (system tenant context)
  await expect(page.getByText('Tables', { exact: true })).toBeVisible({ timeout: 60000 });

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
