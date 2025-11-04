# Deploy Telesana Appointment to Render

Simple guide to deploy your Next.js app with PostgreSQL on Render using the dashboard.

## Prerequisites

- GitHub account with your code pushed
- Render account (sign up at https://render.com)
- Clerk credentials ready

---

## Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `telesana-db`
   - **Database**: `telesana_appointment`
   - **User**: `telesana_user`
   - **Region**: Oregon (or closest to you)
   - **Plan**: Free
4. Click **"Create Database"**
5. **Important**: Copy and save the **Internal Database URL** from the database info page

---

## Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Telesana-Appoinment`
3. Configure:
   - **Name**: `telesana-appointment`
   - **Region**: Oregon (same as database)
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: 
     ```
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**: 
     ```
     npm start
     ```
   - **Plan**: Free
4. Click **"Create Web Service"**

---

## Step 3: Add Environment Variables

In your web service dashboard:

1. Go to **"Environment"** tab
2. Add these variables:

```
NODE_ENV=production
DATABASE_URL=<paste-your-internal-database-url-from-step-1>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_APP_URL=https://telesana-appointment.onrender.com
```

3. Click **"Save Changes"** (this will trigger a redeploy)

---

## Step 4: Run Database Migrations

After deployment completes:

1. In your web service dashboard, go to **"Shell"** tab
2. Run:
   ```bash
   npx prisma migrate deploy
   ```

---

## Step 5: Configure Clerk

1. Go to https://dashboard.clerk.com
2. Select your application
3. Add your Render domain to allowed domains:
   ```
   telesana-appointment.onrender.com
   ```

---

## ✅ Done!

Your app is live at: **https://telesana-appointment.onrender.com**

---

## Important Notes

### Free Tier Limitations

- **Web Service**: Spins down after 15 minutes of inactivity
- **Database**: Free for 90 days (1GB storage)
- **Cold Start**: First request after spin-down takes 30-60 seconds

### Auto-Deploy

Render automatically deploys when you push to GitHub:
```bash
git push origin main
```

### Keeping App Alive

Use [UptimeRobot](https://uptimerobot.com) to ping your app every 5 minutes to prevent spin-down.

---

## Useful Dashboard Features

### View Logs
Dashboard → Your Service → **Logs** tab

### Manual Deploy
Dashboard → Your Service → **Manual Deploy** → Deploy latest commit

### Database Console
Dashboard → Your Database → **PSQL** button

### Update Environment Variables
Dashboard → Your Service → **Environment** → Edit → Save Changes
2. Click **"Shell"** tab
3. Run commands directly in your container

### Database Access

Connect to your database:

1. Go to your database dashboard

---

## Troubleshooting

**Build fails?**
- Check build logs in the dashboard
- Verify `package.json` has all dependencies

**Database connection error?**
- Use Internal Database URL (not External)
- Verify DATABASE_URL is set correctly

**App crashes?**
- Check Logs tab for errors
- Verify all environment variables are set

**Clerk auth not working?**
- Add Render domain to Clerk dashboard
- Verify Clerk keys are correct

---

## Quick Reference

| Build Command | `npm install && npx prisma generate && npm run build` |
| Start Command | `npm start` |
| Run Migrations | `npx prisma migrate deploy` (in Shell) |
| Your App URL | https://telesana-appointment.onrender.com |

---

## Support

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com

That's it! Simple dashboard deployment. 🚀
