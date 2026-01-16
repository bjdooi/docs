import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Verify page title is present
    await expect(page).toHaveTitle(/Introduction/);
  });

  test('should display main heading', async ({ page }) => {
    await page.goto('/');

    // Verify main content headings are visible
    await expect(page.getByRole('heading', { name: 'Setting up' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Make it yours' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Create beautiful pages' })).toBeVisible();
  });

  test('should have working navigation cards', async ({ page }) => {
    await page.goto('/');

    // Verify navigation cards are visible
    await expect(page.getByText('Start here')).toBeVisible();
    await expect(page.getByText('Follow our three step quickstart guide.')).toBeVisible();

    // Verify multiple cards in the grid
    await expect(page.getByText('Edit locally')).toBeVisible();
    await expect(page.getByText('Customize your site')).toBeVisible();
    await expect(page.getByText('Set up navigation')).toBeVisible();
    await expect(page.getByText('API documentation')).toBeVisible();
  });

  test('should have working external link', async ({ page }) => {
    await page.goto('/');

    // Verify external link is present
    const showcaseLink = page.getByText('See complete examples');
    await expect(showcaseLink).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify main heading is still visible on mobile
    await expect(page.getByRole('heading', { name: 'Setting up' })).toBeVisible();
  });
});
