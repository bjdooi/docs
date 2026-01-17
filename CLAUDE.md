# Project: AI POC Personal Site

## Overview
A Mintlify documentation site for documenting AI tools and workflows. Dark theme with blue accents.

## Tech Stack
- Mintlify (docs framework)
- MDX files with YAML frontmatter
- JSON configuration (docs.json)
- Playwright for testing (functional + a11y)
- GitHub Actions for CI

## Commands
- `mint dev` - Start local dev server at http://localhost:3000
- `npm test` - Run all Playwright tests
- `npm run test:a11y` - Run accessibility tests only
- `mint update` - Update Mintlify CLI

## Project Structure
- `/ai-tools/` - Documentation for AI tools (Cursor, Claude Code, Windsurf)
- `/api-reference/` - API documentation examples
- `/essentials/` - Core Mintlify usage guides
- `/images/` - Image assets
- `/logo/` - Logo files (light/dark)
- `/snippets/` - Custom React components (auto-discovered by Mintlify)
- `/tests/` - Playwright tests (homepage.spec.ts, a11y/)
- `/agent-summaries/` - Context persistence for specialized agents
- `docs.json` - Main navigation and site configuration

## Conventions
- Pages are `.mdx` files
- Navigation is defined in `docs.json`
- Use frontmatter for page title and description
- Custom React components go in `/snippets/` (no imports needed in MDX)

## Testing
- Tests require `mint dev` running on port 3000
- Playwright config auto-starts server in CI
- A11y tests use axe-core for WCAG 2.1 AA compliance

## CI/CD
- GitHub Actions runs on push/PR to main
- Tests run with Chromium browser
- Reports uploaded as artifacts on failure

## Multi-Agent Workflow
This project uses specialized agents for parallel work:
- **Test Specialist** - Playwright tests, TDD approach
- **A11y Specialist** - WCAG compliance, axe-core audits
- **Frontend Specialist** - Custom components, theming
- Agent summaries stored in `/agent-summaries/` for context persistence

## Notes
- Run `mint dev` from project root (where docs.json lives)
- If page 404s, check that it's added to docs.json navigation
- Mintlify free tier has limited CSS customization
- GitHub token needs `workflow` scope to push Actions files
