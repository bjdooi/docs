# Project: AI POC Personal Site

## Overview
A Mintlify documentation site for documenting AI tools and workflows. Currently customizing to match IBM Langflow docs style (dark theme).

## Tech Stack
- Mintlify (docs framework)
- MDX files with YAML frontmatter
- JSON configuration (docs.json)

## Commands
- `mint dev` - Start local dev server at http://localhost:3000
- `mint update` - Update Mintlify CLI

## Project Structure
- `/ai-tools/` - Documentation for AI tools (Cursor, Claude Code, Windsurf)
- `/api-reference/` - API documentation examples
- `/essentials/` - Core Mintlify usage guides
- `/images/` - Image assets
- `/logo/` - Logo files (light/dark)
- `/snippets/` - Reusable MDX snippets
- `docs.json` - Main navigation and site configuration

## Conventions
- Pages are `.mdx` files
- Navigation is defined in `docs.json`
- Use frontmatter for page title and description

## Current Goals
- Customize theme to dark mode (IBM Langflow style)
- Dark navy background, clean sidebar navigation
- Professional code blocks with dark backgrounds

## Notes
- Run `mint dev` from project root (where docs.json lives)
- If page 404s, check that it's added to docs.json navigation
