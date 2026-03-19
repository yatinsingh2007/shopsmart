import { test, expect } from '@playwright/test';

test('basic login flow redirects to home', async ({ page }) => {
  // Go to login page
  await page.goto('/login');

  // Ensure login page is loaded
  await expect(page).toHaveURL(/\/login/);
  await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
  await expect(page.locator('[data-testid="password-input"]')).toBeVisible();

  // Fill inputs
  await page.fill('[data-testid="email-input"]', 'user@example.com');
  await page.fill('[data-testid="password-input"]', 'password123');

  // Submit form
  await page.click('[data-testid="submit-button"]');

  // Assert redirect happened
  await expect(page).toHaveURL(/\/$/);

  // Assert homepage actually rendered
  await expect(page.locator('[data-testid="navbar"]')).toBeVisible();
});