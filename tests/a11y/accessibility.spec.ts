import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility Tests for Mintlify Documentation Site
 * Tests WCAG 2.1 AA compliance using axe-core
 */

test.describe('Accessibility Audit', () => {
  test('homepage should not have automatically detectable accessibility violations', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Log violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== ACCESSIBILITY VIOLATIONS DETECTED ===\n');

      accessibilityScanResults.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. ${violation.id.toUpperCase()}`);
        console.log(`   Impact: ${violation.impact}`);
        console.log(`   Description: ${violation.description}`);
        console.log(`   Help: ${violation.help}`);
        console.log(`   Help URL: ${violation.helpUrl}`);
        console.log(`   Affected elements: ${violation.nodes.length}`);

        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`\n   Element ${nodeIndex + 1}:`);
          console.log(`     HTML: ${node.html}`);
          console.log(`     Target: ${node.target.join(', ')}`);
          if (node.failureSummary) {
            console.log(`     Failure: ${node.failureSummary}`);
          }
        });
      });

      console.log('\n=====================================\n');
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('quickstart page should not have accessibility violations', async ({ page }) => {
    await page.goto('/quickstart');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log(`\nQuickstart page violations: ${accessibilityScanResults.violations.length}`);
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('development page should not have accessibility violations', async ({ page }) => {
    await page.goto('/development');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log(`\nDevelopment page violations: ${accessibilityScanResults.violations.length}`);
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => {
      const element = document.activeElement;
      return {
        tagName: element?.tagName,
        role: element?.getAttribute('role'),
        ariaLabel: element?.getAttribute('aria-label')
      };
    });

    // Verify that focus is on a valid interactive element
    const validTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
    expect(validTags).toContain(focusedElement.tagName);
  });

  test('color contrast should meet WCAG AA standards', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include(['color-contrast'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== COLOR CONTRAST VIOLATIONS ===');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`\n${violation.id}: ${violation.description}`);
        violation.nodes.forEach((node) => {
          console.log(`  - ${node.html}`);
        });
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include(['image-alt'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form elements should have labels', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include(['label'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('page should have a valid document structure', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .include(['document-title', 'html-has-lang', 'landmark-one-main'])
      .analyze();

    if (accessibilityScanResults.violations.length > 0) {
      console.log('\n=== DOCUMENT STRUCTURE VIOLATIONS ===');
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`\n${violation.id}: ${violation.description}`);
      });
    }

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
