import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL || 'test@example.com';
  const password = process.env.TEST_USER_PASSWORD || 'password123';
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';

  // Navigate to root to initialize local storage
  await page.goto('/');
  
  const loginResponse = await page.evaluate(async ({ email, password }) => {
    // We can call the backend directly from the browser context
    const resp = await fetch('http://localhost:5000/auth/super-admin/login', {
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
    localStorage.setItem('tenant_id', 'system');
    
    return data;
  }, { email, password });

  console.log('Successfully authenticated via API');

  // Verify successful injection by navigating to POS
  await page.goto('/(dashboard)/pos');
  await page.waitForURL('**/pos*', { timeout: 15000 });

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
