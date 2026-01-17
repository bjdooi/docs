#!/bin/bash

# Accessibility Testing Runner
# This script helps run a11y tests by managing the dev server

set -e

echo "🔍 Starting accessibility testing for Mintlify site..."
echo ""

# Check if mint dev is already running on port 3000
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "✓ Dev server already running on port 3000"
    echo "  Running tests..."
    npm run test:a11y
else
    echo "⚠ Dev server not running on port 3000"
    echo ""
    echo "Please start the dev server in another terminal:"
    echo "  mint dev"
    echo ""
    echo "Then run this script again or run: npm run test:a11y"
    exit 1
fi
