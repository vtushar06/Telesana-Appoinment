#!/usr/bin/env bash
# Render Deployment Script
# This script helps you deploy to Render using the dashboard

set -e

echo "======================================"
echo "Render Deployment Helper Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Verify files are ready${NC}"
echo "Checking for required files..."

if [ ! -f "render.yaml" ]; then
    echo -e "${YELLOW}Warning: render.yaml not found${NC}"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo -e "${YELLOW}Warning: package.json not found${NC}"
    exit 1
fi

if [ ! -f "prisma/schema.prisma" ]; then
    echo -e "${YELLOW}Warning: prisma/schema.prisma not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All required files found${NC}"
echo ""

echo -e "${BLUE}Step 2: Ensure code is pushed to GitHub${NC}"
git status

echo ""
read -p "Do you want to commit and push changes? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg" || echo "Nothing to commit"
    git push origin main
    echo -e "${GREEN}✓ Code pushed to GitHub${NC}"
fi

echo ""
echo -e "${BLUE}Step 3: Deploy to Render${NC}"
echo ""
echo "Choose your deployment method:"
echo "1. Use Blueprint (Automatic - Recommended)"
echo "2. Manual Setup via Dashboard"
echo ""
read -p "Enter choice (1 or 2): " -n 1 -r
echo

if [[ $REPLY == "1" ]]; then
    echo ""
    echo -e "${GREEN}Using Blueprint Deployment${NC}"
    echo ""
    echo "Opening Render Blueprint in your browser..."
    echo ""
    echo -e "${YELLOW}In the browser:${NC}"
    echo "1. Select your repository: Telesana-Appoinment"
    echo "2. Click 'Apply' to create resources"
    echo "3. Wait for services to be created"
    echo ""
    open "https://dashboard.render.com/select-repo?type=blueprint"
    
elif [[ $REPLY == "2" ]]; then
    echo ""
    echo -e "${GREEN}Manual Setup${NC}"
    echo ""
    echo "Opening Render Dashboard..."
    open "https://dashboard.render.com/create?type=pserv"
    echo ""
    echo -e "${YELLOW}Follow these steps:${NC}"
    echo ""
    echo "1. Create PostgreSQL Database:"
    echo "   - Name: telesana-db"
    echo "   - Database: telesana_appointment"
    echo "   - User: telesana_user"
    echo "   - Plan: Free"
    echo ""
    echo "2. Create Web Service:"
    echo "   - Connect GitHub repo: Telesana-Appoinment"
    echo "   - Name: telesana-appointment"
    echo "   - Runtime: Node"
    echo "   - Build: npm install && npx prisma generate && npm run build"
    echo "   - Start: npm start"
    echo "   - Plan: Free"
    echo ""
fi

echo ""
echo -e "${BLUE}Step 4: Environment Variables${NC}"
echo ""
echo "After deployment, add these environment variables:"
echo ""
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = <your-clerk-key>"
echo "CLERK_SECRET_KEY = <your-clerk-secret>"
echo "NEXT_PUBLIC_APP_URL = https://telesana-appointment.onrender.com"
echo "DATABASE_URL = <auto-set-when-attaching-db>"
echo ""

read -p "Do you have your Clerk keys ready? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Opening Clerk Dashboard to get keys..."
    open "https://dashboard.clerk.com/"
fi

echo ""
echo -e "${BLUE}Step 5: After Deployment${NC}"
echo ""
echo "Once your service is deployed, you need to run migrations:"
echo ""
echo "1. Go to your web service dashboard"
echo "2. Click 'Shell' tab"
echo "3. Run: npx prisma migrate deploy"
echo ""

read -p "Press any key to open your Render dashboard..." -n 1 -r
echo
open "https://dashboard.render.com/"

echo ""
echo -e "${GREEN}======================================"
echo "Deployment process initiated!"
echo "======================================${NC}"
echo ""
echo "Monitor your deployment at:"
echo "https://dashboard.render.com/"
echo ""
echo "Your app will be available at:"
echo "https://telesana-appointment.onrender.com"
echo ""
echo "For detailed instructions, check:"
echo "RENDER_DEPLOYMENT.md"
echo ""
