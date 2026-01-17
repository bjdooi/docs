# Accessibility Testing

This directory contains accessibility tests for the Mintlify documentation site using Playwright and axe-core.

## Prerequisites

- Node.js and npm installed
- Dependencies installed: `npm install`

## Running the Tests

### Option 1: Manual Server Start (Recommended)

1. Start the Mintlify dev server in one terminal:
   ```bash
   mint dev
   ```

2. In another terminal, run the accessibility tests:
   ```bash
   npm run test:a11y
   ```

### Option 2: Auto-start Server

Uncomment the `webServer` block in `playwright.config.ts` and run:
```bash
npm run test:a11y
```

The tests will automatically start the Mintlify server before running.

## What Gets Tested

The accessibility test suite checks for:

1. **WCAG 2.1 AA Compliance** - Homepage and key pages
2. **Keyboard Navigation** - All interactive elements should be keyboard accessible
3. **Color Contrast** - Text and backgrounds must meet WCAG AA contrast ratios
4. **Image Alt Text** - All images must have descriptive alt text
5. **Form Labels** - All form elements must have associated labels
6. **Document Structure** - Valid HTML structure with proper landmarks and headings

## Understanding Results

### Violation Severity Levels

- **Critical**: Must fix immediately (e.g., missing alt text, no keyboard access)
- **Serious**: Major barriers to accessibility (e.g., poor color contrast)
- **Moderate**: Noticeable barriers (e.g., missing landmarks)
- **Minor**: Less impactful but still important (e.g., non-descriptive link text)

### Common Violations

After running the tests, violations will be logged to the console with:
- **ID**: The axe-core rule that failed
- **Impact**: Severity level (critical, serious, moderate, minor)
- **Description**: What the violation is
- **Help URL**: Link to axe-core documentation for fixing
- **Affected Elements**: HTML snippets showing where the issue occurs

## Fixing Violations

1. Review the console output from failed tests
2. Click the Help URL for detailed guidance on each violation
3. Make fixes to the affected MDX files or Mintlify config
4. Re-run tests to verify fixes

## Test Reports

After running tests, a detailed HTML report is available:
```bash
npx playwright show-report
```

This opens an interactive report in your browser with full details on all tests.
