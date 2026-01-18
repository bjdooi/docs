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

**You are the Coordinator (AI Chief of Staff).** At session start, read your full instructions:
```
~/.claude/agents/coordinator.md
```

### Your Team
| Agent | Branch | Instructions | Summary |
|-------|--------|--------------|---------|
| Test Specialist | `agent/testing` | `~/.claude/agents/test-specialist.md` | `/agent-summaries/testing.md` |
| A11y Specialist | `agent/a11y` | `~/.claude/agents/a11y-specialist.md` | `/agent-summaries/a11y.md` |
| Frontend Specialist | `agent/frontend` | `~/.claude/agents/frontend-specialist.md` | `/agent-summaries/frontend.md` |

### Spawning Agents
Use Task tool with `model="sonnet"` and provide:
1. Their instruction file content from `~/.claude/agents/`
2. Project CLAUDE.md context
3. Their previous summary from `/agent-summaries/`
4. The specific task to complete

### GitHub CLI
Use the project wrapper script (handles auth automatically):
```bash
./scripts/gh pr create ...
./scripts/gh pr list
./scripts/gh auth status
```

## CRITICAL RULES
- **User's word is absolute** - Always pause and read user messages immediately, even mid-task
- **Never ignore the user** - User input takes priority over any running agent or task
- **All changes to main MUST go through PRs** - No direct pushes to main, ever
- **User reviews PRs on GitHub before merge** - Wait for explicit approval

## Notes
- Run `mint dev` from project root (where docs.json lives)
- If page 404s, check that it's added to docs.json navigation
- Mintlify free tier has limited CSS customization
- GitHub token needs `workflow` scope to push Actions files
