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
    await page.waitForLoadState('networkidle');

    // Verify navigation cards are visible using headings (more specific than text)
    await expect(page.getByRole('heading', { name: 'Start here' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Edit locally' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Customize your site' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Set up navigation' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'API documentation' })).toBeVisible();
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
