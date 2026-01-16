# Playwright Tests

This directory contains end-to-end tests for the Mintlify documentation site using Playwright.

## Running Tests

```bash
# Run all tests in headless mode
npm test

# Run tests with UI mode (recommended for debugging)
npm run test:ui

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

## Test Structure

- `homepage.spec.ts` - Tests for the main landing page

## Writing Tests

Tests follow the Playwright testing framework conventions:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Some text')).toBeVisible();
  });
});
```

## Configuration

See `playwright.config.ts` in the root directory for configuration options.

Key settings:
- Base URL: http://localhost:3000
- Browsers: Chromium, Firefox, WebKit
- Mobile viewports: Pixel 5, iPhone 12
- Auto-starts dev server before tests

## Best Practices

1. Keep tests isolated and deterministic
2. Use meaningful test descriptions
3. Use Playwright's built-in locators (getByRole, getByText, etc.)
4. Avoid hardcoded waits - use Playwright's auto-waiting
5. Take advantage of screenshots on failure (configured automatically)
