# 🚂 Railway Deployment Guide - Telesana

Complete guide to deploy Telesana healthcare platform on Railway with MySQL database.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Railway Account](#create-railway-account)
3. [Setup MySQL Database](#setup-mysql-database)
4. [Deploy Your Application](#deploy-your-application)
5. [Environment Variables](#environment-variables)
6. [Domain Configuration](#domain-configuration)
7. [Troubleshooting](#troubleshooting)

---

## 🔑 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account with your code pushed
- ✅ Railway account (sign up at [railway.app](https://railway.app))
- ✅ Clerk API keys (Dashboard: [clerk.com](https://clerk.com))
- ✅ (Optional) Vonage API keys for video calls

---

## 🎯 Step 1: Create Railway Account

1. Go to **[railway.app](https://railway.app)**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub** (recommended)
4. Authorize Railway to access your repositories

💡 **Free Tier**: Railway offers **$5/month** free credits (no credit card required for trial)

---

## 🗄️ Step 2: Setup MySQL Database

### Create Database

1. **Click "New Project"** in Railway dashboard
2. Select **"Provision MySQL"**
3. Railway will automatically create a MySQL database
4. Wait for deployment to complete (~30 seconds)

### Get Database Connection String

1. Click on the **MySQL service** in your project
2. Go to **"Variables"** tab
3. Copy the **`DATABASE_URL`** value
   - Format: `mysql://username:password@host:port/database`
   - Example: `mysql://root:ABcd1234XYZ@containers.railway.app:7856/railway`

4. **Important**: Add `?sslmode=require` to the end:
   ```
   mysql://root:ABcd1234XYZ@containers.railway.app:7856/railway?sslmode=require
   ```

---

## 🚀 Step 3: Deploy Your Application

### Option A: Deploy from GitHub (Recommended)

1. In Railway dashboard, click **"New"** → **"GitHub Repo"**
2. Select your repository: **`vtushar06/Telesana-Appoinment`**
3. Railway will automatically:
   - Detect it's a Node.js/Next.js project
   - Install dependencies
   - Build your application
   - Deploy it

### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Deploy
railway up
```

---

## ⚙️ Step 4: Environment Variables

### Add Environment Variables in Railway

1. Click on your **web service** (not database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add each variable:

#### Required Variables:

```bash
# Database (copy from MySQL service)
DATABASE_URL=mysql://root:password@containers.railway.app:7856/railway?sslmode=require

# Clerk Authentication (from clerk.com dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Node Environment
NODE_ENV=production
NODE_VERSION=20
```

#### Optional Variables (for video calls):

```bash
VONAGE_API_KEY=your_vonage_api_key
VONAGE_API_SECRET=your_vonage_api_secret
VONAGE_APPLICATION_ID=your_vonage_application_id
```

### Link Database URL Automatically

Instead of copying manually:
1. In Variables tab, click **"+ New Variable"**
2. Select **"Add Reference"**
3. Choose your **MySQL service** → **`DATABASE_URL`**
4. Railway will automatically keep it synced!

---

## 🔧 Step 5: Configure Build & Start Commands

Railway should auto-detect, but verify:

1. Click on your **web service**
2. Go to **"Settings"** tab
3. Scroll to **"Build & Deploy"** section

**Build Command**:
```bash
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

**Start Command**:
```bash
npm start
```

**Install Command** (should auto-detect):
```bash
npm install
```

---

## 🌐 Step 6: Domain Configuration

### Get Your Railway Domain

1. Click on your **web service**
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. Railway auto-generates: `your-app.up.railway.app`

### Add Custom Domain (Optional)

1. Click **"+ Add Domain"**
2. Enter your domain: `telesana.com`
3. Add DNS records to your domain provider:
   - **CNAME**: `www` → `your-app.up.railway.app`
   - **A Record**: `@` → Railway's IP

### Update Clerk Domain

⚠️ **Important**: Update Clerk with your production domain!

1. Go to [clerk.com dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **"Domains"** → **"Add domain"**
4. Enter: `your-app.up.railway.app` (or your custom domain)
5. Update authorized redirect URLs:
   ```
   https://your-app.up.railway.app/sign-in
   https://your-app.up.railway.app/sign-up
   ```

---

## 🎉 Step 7: Deploy & Verify

### Trigger Deployment

1. Railway deploys automatically on:
   - New GitHub push
   - Environment variable changes
   - Manual redeploy

2. Watch deployment logs:
   - Click on your service
   - Go to **"Deployments"** tab
   - Click latest deployment
   - View build & deploy logs

### Verify Database Migration

Check if Prisma migrations ran successfully:

```bash
# In Railway logs, you should see:
✔ Generated Prisma Client
✔ Applying migration `20251001111232_init`
✔ Database migrations applied successfully
```

### Test Your Application

1. Visit your Railway domain: `https://your-app.up.railway.app`
2. Test key features:
   - ✅ Sign up / Sign in (Clerk auth)
   - ✅ Browse doctors
   - ✅ Book appointment
   - ✅ Video call (if Vonage configured)

---

## 🔍 Troubleshooting

### Issue: "Cannot connect to database"

**Solution**:
1. Check `DATABASE_URL` is correct
2. Ensure you added `?sslmode=require`
3. Verify MySQL service is running
4. Check if database reference is linked

### Issue: "Clerk authentication not working"

**Solution**:
1. Verify you're using **production keys** (`pk_live_xxx`, not `pk_test_xxx`)
2. Update Clerk dashboard with Railway domain
3. Check redirect URLs match exactly
4. Clear browser cache and cookies

### Issue: "Build fails with Prisma error"

**Solution**:
```bash
# In Railway Settings → Build Command, add:
npm install && npx prisma generate && npx prisma migrate deploy && npm run build
```

### Issue: "Application crashes after deployment"

**Check logs**:
1. Go to **"Deployments"** → Click failed deployment
2. Check for errors in logs
3. Common fixes:
   - Missing environment variables
   - Database connection issues
   - Prisma Client not generated

### Issue: "Slow cold starts"

Railway free tier has cold starts (apps sleep after inactivity).

**Solutions**:
- Upgrade to **Hobby plan** ($5/month) for always-on
- Use a cron job to ping your app every 10 minutes
- Deploy to Railway Pro for better performance

---

## 💰 Railway Pricing

### Free Trial
- **$5 in credits** per month
- No credit card required
- Good for testing & small projects

### Hobby Plan
- **$5/month** base
- Pay for usage beyond
- Always-on applications
- Better performance

### Pro Plan
- **$20/month** base
- Priority support
- Higher resource limits
- Team collaboration

**Estimate for Telesana**:
- Web Service: ~$5-10/month
- MySQL Database: ~$5/month
- **Total**: ~$10-15/month for production

💡 **Tip**: Start with free trial, upgrade when you get users!

---

## 🔐 Security Checklist

Before going live:

- [ ] Use production Clerk keys (`pk_live_`, `sk_live_`)
- [ ] Enable SSL/HTTPS (automatic on Railway)
- [ ] Set `NODE_ENV=production`
- [ ] Rotate database password after initial setup
- [ ] Enable Railway project access control
- [ ] Set up monitoring & alerts
- [ ] Configure CORS if needed
- [ ] Review Prisma migration history
- [ ] Backup database regularly
- [ ] Use secrets for sensitive data

---

## 📊 Monitoring & Maintenance

### View Logs

```bash
# Railway CLI
railway logs

# Or in dashboard:
# Service → Deployments → Click deployment → View logs
```

### Database Backups

Railway doesn't auto-backup free tier databases!

**Manual backup**:
```bash
# Export database
railway run npx prisma db pull
railway run npx prisma db push
```

**Recommended**: Use Railway Pro for automatic backups

### Performance Monitoring

Add monitoring tools:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Railway Metrics** (built-in)

---

## 🎯 Quick Deploy Checklist

- [ ] Push code to GitHub
- [ ] Create Railway account
- [ ] Provision MySQL database
- [ ] Deploy from GitHub
- [ ] Add environment variables
- [ ] Link `DATABASE_URL` reference
- [ ] Update Clerk domain
- [ ] Verify deployment logs
- [ ] Test application endpoints
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring

---

## 🆘 Need Help?

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **Railway Status**: [status.railway.app](https://status.railway.app)
- **Clerk Docs**: [clerk.com/docs](https://clerk.com/docs)

---

## 🚀 Next Steps

1. **Deploy to Railway**: Follow this guide
2. **Test thoroughly**: Check all features work
3. **Set up monitoring**: Add error tracking
4. **Configure backups**: Don't lose data!
5. **Launch**: Share your app! 🎉

---

**Happy Deploying! 🚂✨**

Your Telesana healthcare platform will be live in minutes!
