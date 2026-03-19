import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to Login page', async ({ page }) => {
    await page.click('[data-testid="login-link"]');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should navigate to Signup page', async ({ page }) => {
    await page.click('[data-testid="signup-link"]');
    await expect(page).toHaveURL(/\/signup/);
  });
});