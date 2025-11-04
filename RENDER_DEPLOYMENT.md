# Render.com Deployment Guide for Telesana Appointment

This guide will walk you through deploying your Next.js application to Render.com with PostgreSQL database.

## Why Render?

✅ **Easier setup** - No CLI required, everything via web dashboard  
✅ **Free tier** - Free PostgreSQL database + free web service  
✅ **Auto-deploy** - Automatically deploys on git push  
✅ **No credit card required** for free tier  
✅ **Built-in SSL** - Free HTTPS certificates  

## Prerequisites

- A Render.com account (sign up at https://render.com)
- Your code pushed to GitHub
- Clerk account credentials ready

## Deployment Methods

You can deploy in two ways:

### Method 1: Quick Deploy (Recommended) - Using render.yaml

### Method 2: Manual Setup via Dashboard

---

## Method 1: Quick Deploy with Blueprint (render.yaml)

I've already created a `render.yaml` file for you! This is the fastest method.

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 2: Create New Blueprint on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Select your repository: `Telesana-Appoinment`
5. Render will detect the `render.yaml` file automatically
6. Click **"Apply"**

### Step 3: Set Environment Variables

After the blueprint is created, you need to add your Clerk credentials:

1. Go to your web service in the Render dashboard
2. Click **"Environment"** tab
3. Add these environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_publishable_key
CLERK_SECRET_KEY = your_clerk_secret_key
NEXT_PUBLIC_APP_URL = https://telesana-appointment.onrender.com
```

4. Click **"Save Changes"**

### Step 4: Run Database Migrations

Once the service is deployed:

1. In your web service dashboard, go to **"Shell"** tab
2. Run this command:

```bash
npx prisma migrate deploy
```

### Step 5: Access Your App

Your app will be available at:
```
https://telesana-appointment.onrender.com
```

---

## Method 2: Manual Setup via Dashboard

If you prefer manual setup or the blueprint doesn't work:

### Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in the details:
   - **Name**: `telesana-db`
   - **Database**: `telesana_appointment`
   - **User**: `telesana_user`
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **Save the connection details** (especially the Internal Database URL)

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Fill in the details:
   - **Name**: `telesana-appointment`
   - **Region**: Same as database (e.g., Oregon)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Runtime**: **Node**
   - **Build Command**: 
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Plan**: **Free**

### Step 3: Add Environment Variables

In the Environment section, add:

```bash
NODE_ENV=production
DATABASE_URL=<your-internal-database-url-from-step-1>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_APP_URL=https://telesana-appointment.onrender.com
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying your app
3. Wait for the deployment to complete (5-10 minutes for first deploy)

### Step 5: Run Database Migrations

After deployment completes:

1. Go to your web service dashboard
2. Click **"Shell"** tab on the left
3. Run:
   ```bash
   npx prisma migrate deploy
   ```

---

## Post-Deployment Configuration

### 1. Update Clerk Dashboard

Add your Render domain to Clerk's allowed domains:

1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to **"Domains"** or **"Settings"**
4. Add: `telesana-appointment.onrender.com`

### 2. Test Your Application

Visit your app at: `https://telesana-appointment.onrender.com`

Test these features:
- ✅ Sign up / Sign in
- ✅ View doctors
- ✅ Book appointments
- ✅ Database connectivity

---

## Important Notes About Render Free Tier

⚠️ **Free tier limitations:**

1. **Web Service**:
   - Spins down after 15 minutes of inactivity
   - First request after spin-down takes 30-60 seconds (cold start)
   - 750 hours/month of runtime

2. **PostgreSQL Database**:
   - Free for 90 days, then expires
   - 1GB storage limit
   - 100 connections max
   - No automatic backups on free tier

3. **Solutions**:
   - **Keep app alive**: Use a service like [UptimeRobot](https://uptimerobot.com) to ping your app every 5 minutes
   - **Database**: After 90 days, create a new free instance or upgrade to paid ($7/month)

---

## Auto-Deploy on Git Push

Render automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Render will detect the push and redeploy automatically!

---

## Useful Commands & Tips

### View Logs

1. Go to your service dashboard
2. Click **"Logs"** tab
3. View real-time logs

### Manual Deploy

1. Go to your service dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Shell Access

1. Go to your service dashboard
2. Click **"Shell"** tab
3. Run commands directly in your container

### Database Access

Connect to your database:

1. Go to your database dashboard
2. Copy the **External Database URL**
3. Use with any PostgreSQL client:

```bash
psql <external-database-url>
```

Or use the built-in PSQL shell in the database dashboard.

### Environment Variables

To update environment variables:

1. Go to service dashboard
2. Click **"Environment"**
3. Edit variables
4. Click **"Save Changes"** (triggers auto-redeploy)

---

## Troubleshooting

### Build Failures

**Check build logs:**
1. Go to service dashboard
2. Click on the failed build
3. Expand build logs to see errors

**Common issues:**
- Missing dependencies → Check `package.json`
- Prisma errors → Ensure `npx prisma generate` is in build command
- Memory issues → Free tier has 512MB RAM limit

### Database Connection Issues

**Verify DATABASE_URL:**
1. Check Environment variables
2. Use Internal Database URL (not External)
3. Format: `postgresql://user:password@host:5432/database`

**Test connection:**
```bash
# In Shell tab
npx prisma db push
```

### Application Crashes

**Check logs:**
1. Go to Logs tab
2. Look for error messages

**Common issues:**
- Missing environment variables
- Database not accessible
- Port binding (Render uses PORT env var)

### Cold Starts (Slow First Load)

Free tier spins down after 15 minutes of inactivity.

**Solutions:**
1. Use [UptimeRobot](https://uptimerobot.com) to ping every 5-10 minutes
2. Upgrade to paid tier ($7/month for always-on)
3. Accept the cold start delay

---

## Upgrading Database After 90 Days

When your free database expires:

### Option 1: Create New Free Instance

1. Create new PostgreSQL database
2. Export data from old database
3. Import into new database
4. Update DATABASE_URL

### Option 2: Upgrade to Paid

1. Go to database dashboard
2. Click **"Upgrade"**
3. Select plan ($7/month for Starter)
4. Benefits: Persistent, backups, better performance

---

## Custom Domain (Optional)

To add a custom domain:

1. Go to service dashboard
2. Click **"Settings"**
3. Scroll to **"Custom Domain"**
4. Click **"Add Custom Domain"**
5. Follow DNS configuration instructions
6. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Monitoring & Maintenance

### Health Checks

Render automatically monitors your app via the health check path (`/`).

### Manual Restarts

If your app becomes unresponsive:
1. Go to service dashboard
2. Click **"Manual Deploy"** → **"Clear build cache & deploy"**

### Database Backups

⚠️ Free tier doesn't include automatic backups.

**Manual backup:**
```bash
# Export database
pg_dump <external-database-url> > backup.sql

# Restore from backup
psql <external-database-url> < backup.sql
```

---

## Performance Tips

1. **Optimize Cold Starts:**
   - Use smaller dependencies
   - Implement ISR (Incremental Static Regeneration)
   - Use edge functions for critical paths

2. **Database Optimization:**
   - Add indexes for frequently queried fields
   - Use connection pooling
   - Implement caching (Redis on paid tier)

3. **Monitoring:**
   - Set up monitoring with [Better Stack](https://betterstack.com)
   - Use Render's metrics dashboard
   - Monitor database connection count

---

## Cost Comparison

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Web Service | Free (spins down) | $7/mo (always on) |
| PostgreSQL | Free 90 days | $7/mo (Starter) |
| **Total** | **FREE** | **$14/mo** |

---

## Migration from Other Platforms

### From Railway/Fly.io

1. Export your database
2. Create new Render PostgreSQL
3. Import data
4. Deploy web service
5. Update DNS (if using custom domain)

### From Vercel (Frontend Only)

1. Keep frontend on Vercel
2. Deploy API routes on Render
3. Update API endpoints in Vercel env vars

---

## Support Resources

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Next.js on Render**: https://render.com/docs/deploy-nextjs
- **Status Page**: https://status.render.com

---

## Quick Reference

```bash
# Build Command
npm install && npx prisma generate && npm run build

# Start Command
npm start

# Run Migrations (in Shell)
npx prisma migrate deploy

# Check Database Connection (in Shell)
npx prisma db push

# View Database (in Shell)
npx prisma studio
```

---

## Next Steps After Deployment

1. ✅ Test all functionality
2. ✅ Set up UptimeRobot monitoring
3. ✅ Configure custom domain (optional)
4. ✅ Set up error monitoring (Sentry)
5. ✅ Implement database backups
6. ✅ Add analytics (Vercel Analytics, Google Analytics)
7. ✅ Set up CI/CD notifications

---

## Success! 🎉

Your application should now be live at:
```
https://telesana-appointment.onrender.com
```

For any issues, check the troubleshooting section or Render's community forum.
