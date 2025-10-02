#!/bin/bash
# Build script for Render deployment

echo "🚀 Starting Telesana deployment build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma Client
echo "🔄 Generating Prisma Client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build Next.js application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
