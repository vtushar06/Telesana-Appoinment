#!/usr/bin/env bash
# Render Build Script

set -e

echo "Installing dependencies..."
npm install

echo "Generating Prisma Client..."
npx prisma generate

echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
