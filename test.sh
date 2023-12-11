#!/bin/bash -e

echo "Running NestJS unit tests..."
npm run test --workspace nest

echo "Running NestJS e2e tests..."
npm run test:e2e --workspace nest

echo "Running Playwright e2e tests..."
npm run test:ci --workspace e2e
