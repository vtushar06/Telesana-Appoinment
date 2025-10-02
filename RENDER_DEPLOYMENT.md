# 🚀 Deploying Telesana to Render

Complete guide to deploy your Telesana healthcare platform on Render.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with your project pushed
- ✅ Render account (free tier available)
- ✅ Clerk account with API keys
- ✅ Database ready (MySQL or PostgreSQL)
- ✅ (Optional) Vonage account for video calls

---

## 🗄️ Step 1: Set Up Database

### Option A: Use Render's Managed MySQL/PostgreSQL (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → Select **"MySQL"** or **"PostgreSQL"**
3. **Configure database**:
   - Name: `telesana-db`
   - Database: `telesana`
   - User: `telesana_user`
   - Region: Choose closest to you
   - Plan: **Starter (Free)**
4. **Click "Create Database"**
5. **Copy the Internal Connection String** (you'll need this later)

### Option B: Use External Database

If using external database (PlanetScale, AWS RDS, etc.):
- Get your database connection string
- Ensure it's accessible from Render's IP addresses

---

## 📦 Step 2: Prepare Your Repository

### 1. Push to GitHub

If not already done:

```bash
cd /Users/tusharverma/Telesana-Appoinment

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Telesana Healthcare Platform"

# Add remote
git remote add origin https://github.com/vtushar06/Telesana-Appoinment.git

# Push to GitHub
git push -u origin main
```

### 2. Verify Files

Make sure these files exist in your repository:
- ✅ `render-build.sh` (build script)
- ✅ `package.json`
- ✅ `prisma/schema.prisma`
- ✅ `.gitignore` (should include `.env`, `node_modules`)

---

## 🌐 Step 3: Deploy to Render

### Method 1: Using Render Dashboard (Easiest)

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Click "New +"** → Select **"Web Service"**

3. **Connect Your Repository**:
   - Click "Connect GitHub"
   - Authorize Render
   - Select `Telesana-Appoinment` repository

4. **Configure Web Service**:
   
   **Basic Settings:**
   - **Name**: `telesana-app`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `./render-build.sh`
   - **Start Command**: `npm start`

5. **Select Plan**: 
   - Choose **"Starter"** (Free tier)
   - Or **"Standard"** for production

6. **Click "Advanced"** and configure:

   **Environment Variables** (Click "Add Environment Variable"):

   ```
   NODE_VERSION = 20.11.0
   DATABASE_URL = [Your database connection string]
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = [Your Clerk publishable key]
   CLERK_SECRET_KEY = [Your Clerk secret key]
   NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
   NODE_ENV = production
   ```

   **Optional (for video calls):**
   ```
   VONAGE_API_KEY = [Your Vonage API key]
   VONAGE_API_SECRET = [Your Vonage API secret]
   VONAGE_APPLICATION_ID = [Your Vonage app ID]
   ```

7. **Click "Create Web Service"**

8. **Wait for Deployment** (5-10 minutes first time)

### Method 2: Using render.yaml (Blueprint)

1. In your repository, the `render.yaml` file is already configured
2. Go to Render Dashboard
3. Click "New +" → "Blueprint"
4. Connect repository and select `render.yaml`
5. Configure environment variables in the dashboard

---

## 🔑 Step 4: Get Database Connection String

### From Render MySQL/PostgreSQL:

1. Go to your database in Render dashboard
2. Copy the **Internal Connection String**
3. It looks like:
   ```
   mysql://user:password@host:port/database
   # or
   postgresql://user:password@host:port/database
   ```

### Update in Render:

1. Go to your web service
2. Click "Environment" in the left sidebar
3. Find `DATABASE_URL` variable
4. Paste your connection string
5. Click "Save Changes"

---

## 🔐 Step 5: Configure Clerk for Production

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com
2. **Select your application**
3. **Go to "API Keys"**:
   - Copy `Publishable Key` (starts with `pk_live_` or `pk_test_`)
   - Copy `Secret Key` (starts with `sk_live_` or `sk_test_`)

4. **Configure Allowed URLs**:
   - Go to "Paths" or "Domains"
   - Add your Render URL: `https://telesana-app.onrender.com`
   - Add callback URLs:
     - `https://telesana-app.onrender.com/sign-in`
     - `https://telesana-app.onrender.com/sign-up`

5. **Update Environment Variables in Render**:
   - Add/update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - Add/update `CLERK_SECRET_KEY`

---

## 📹 Step 6: Configure Vonage (Optional - For Video Calls)

1. **Go to Vonage Dashboard**: https://dashboard.nexmo.com
2. **Create/Select Application**
3. **Get credentials**:
   - API Key
   - API Secret
   - Application ID
4. **Download private key** and add to your repository
5. **Update Environment Variables in Render**

---

## 🔄 Step 7: Initial Database Setup

After first deployment, you may need to seed data or run additional migrations:

### Option A: Using Render Shell

1. Go to your web service in Render
2. Click "Shell" tab
3. Run:
   ```bash
   npx prisma migrate deploy
   npx prisma db push
   ```

### Option B: Using Local Connection

```bash
# Connect to production database locally
DATABASE_URL="your-render-db-url" npx prisma studio
```

---

## ✅ Step 8: Verify Deployment

1. **Check Build Logs**:
   - Go to your service in Render
   - Click "Logs" tab
   - Look for: `✅ Build completed successfully!`

2. **Test Your Application**:
   - Visit: `https://telesana-app.onrender.com`
   - Try signing up
   - Test doctor/patient flows
   - Check database connections

3. **Common URLs**:
   - Home: `https://telesana-app.onrender.com`
   - Sign In: `https://telesana-app.onrender.com/sign-in`
   - Sign Up: `https://telesana-app.onrender.com/sign-up`
   - Doctors: `https://telesana-app.onrender.com/doctors`

---

## 🎯 Post-Deployment Configuration

### 1. Custom Domain (Optional)

1. Go to "Settings" in your Render service
2. Click "Custom Domain"
3. Add your domain: `www.telesana.com`
4. Update DNS records as instructed
5. SSL is automatic and free!

### 2. Environment-Specific Settings

Update Clerk with your custom domain if added:
- Allowed URLs
- Redirect URLs
- Webhook URLs

### 3. Monitoring

Render provides:
- ✅ Automatic health checks
- ✅ Deployment notifications
- ✅ Log streaming
- ✅ Metrics dashboard

---

## 🔧 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Solution: Make sure all dependencies are in package.json
npm install [missing-package] --save
git commit and push
```

**Error: "Prisma generate failed"**
```bash
# Solution: Check DATABASE_URL is set correctly
# Verify prisma/schema.prisma exists
```

### Application Crashes

**Check Logs:**
1. Go to Render dashboard
2. Click "Logs" tab
3. Look for error messages

**Common Issues:**
- Database connection string incorrect
- Missing environment variables
- Port configuration (Render uses `PORT` env var automatically)

### Database Connection Issues

**Error: "Can't reach database server"**
- ✅ Use **Internal Connection String** from Render
- ✅ Verify database is in same region
- ✅ Check firewall settings

### Clerk Authentication Issues

**Error: "Invalid publishable key"**
- ✅ Use production keys (pk_live_ / sk_live_)
- ✅ Add Render URL to allowed domains in Clerk
- ✅ Update redirect URLs

---

## 🚀 Deployment Commands

### Trigger Manual Deploy

```bash
# In Render Dashboard
1. Go to your service
2. Click "Manual Deploy"
3. Select branch: main
4. Click "Deploy"
```

### View Logs

```bash
# Real-time logs
1. Go to service
2. Click "Logs" tab
3. Toggle "Live" for real-time
```

### Restart Service

```bash
# In Render Dashboard
1. Go to service
2. Click "Manual Deploy" → "Clear build cache & deploy"
```

---

## 💰 Pricing

### Free Tier
- ✅ 750 hours/month
- ✅ Automatic sleep after 15 min inactivity
- ✅ Free SSL
- ✅ 100 GB bandwidth
- ⚠️ Spins down with inactivity (cold starts)

### Starter ($7/month)
- ✅ Always on
- ✅ No sleep
- ✅ 1 GB RAM
- ✅ Custom domains

### Standard ($25/month)
- ✅ 2 GB RAM
- ✅ Better performance
- ✅ Priority support

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

1. **Render Built-in**:
   - Go to "Metrics" tab
   - View CPU, Memory, Response time

2. **External Monitoring** (Recommended):
   - [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
   - [Sentry](https://sentry.io) - Error tracking
   - [LogRocket](https://logrocket.com) - Session replay

### Regular Maintenance

```bash
# Update dependencies monthly
npm update
git commit -m "Update dependencies"
git push

# Database backups (Render does this automatically)
# Manual backup:
pg_dump $DATABASE_URL > backup.sql
```

---

## 🔒 Security Checklist

- ✅ All secrets in environment variables (never in code)
- ✅ `.env` file in `.gitignore`
- ✅ Production keys for Clerk (pk_live_, sk_live_)
- ✅ SSL enabled (automatic on Render)
- ✅ Database uses strong password
- ✅ Regular dependency updates
- ✅ CORS configured properly

---

## 📚 Useful Links

- **Render Docs**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Clerk Docs**: https://clerk.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## 🆘 Getting Help

### Render Support
- Dashboard: https://dashboard.render.com
- Community: https://community.render.com
- Status: https://status.render.com

### Project Issues
- GitHub Issues: https://github.com/vtushar06/Telesana-Appoinment/issues
- Email: support@telesana.com

---

## 🎉 Congratulations!

Your Telesana healthcare platform is now live on Render! 

**Next Steps:**
1. Test all functionality
2. Add custom domain
3. Set up monitoring
4. Share with users!

**Your app is live at**: `https://telesana-app.onrender.com`

---

**Deployed with ❤️ using Render**
