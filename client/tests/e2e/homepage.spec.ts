import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/ShopSmart/i);
  });

  test('should display main sections', async ({ page }) => {
    // Navbar
    const navbar = page.locator('[data-testid="navbar"]');
    await expect(navbar).toBeVisible();

    const logo = page.locator('[data-testid="logo"]');
    await expect(logo).toBeVisible();

    // Hero Section
    const hero = page.locator('[data-testid="hero"]');
    await expect(hero).toBeVisible();

    // Product Section
    const products = page.locator('[data-testid="products"]');
    await expect(products).toBeVisible();
  });
});