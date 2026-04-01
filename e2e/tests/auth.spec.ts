import { test, expect } from '@playwright/test';

test.describe('Authentication flows', () => {
  // Clear storageState for these tests if testing login specifically
  test.use({ storageState: { cookies: [], origins: [] } });

  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Welcome Back!')).toBeVisible({ timeout: 10000 }).catch(() => {});
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('you@example.com').fill('invalid@example.com');
    await page.getByPlaceholder('Enter your password').fill('wrongpassword');

    // Wait for the native alert dialog to assert invalid credentials
    const dialogPromise = page.waitForEvent('dialog');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    const dialog = await dialogPromise;
    expect(dialog.message()).toContain('Invalid credentials');
    await dialog.accept();
  });
});
