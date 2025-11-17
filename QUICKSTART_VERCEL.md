# Quick Start: Deploy to Vercel in 5 Minutes

This is the fastest way to get Table Trek running on Vercel.

## Step 1: Set Up Database (2 minutes)

### Option A: Neon (Recommended - Free Tier)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.region.neon.tech/dbname`)

### Option B: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection string
4. Copy the connection string

**Important:** Your connection string should end with `?sslmode=require`

## Step 2: Generate Session Secret (30 seconds)

Run this command in terminal:
```bash
openssl rand -base64 32
```

Or use an online generator: [randomkeygen.com](https://randomkeygen.com/)

Copy the generated string.

## Step 3: Deploy to Vercel (2 minutes)

### Method 1: Using Vercel Dashboard (Easiest)

1. **Import Project**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your Table Trek repository

2. **Add Environment Variables**
   - Click "Environment Variables"
   - Add `DATABASE_URL` = `your-database-connection-string`
   - Add `SESSION_SECRET` = `your-generated-secret`

3. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete

### Method 2: Using CLI (For developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables when prompted
# Or set them separately:
vercel env add DATABASE_URL
vercel env add SESSION_SECRET

# Deploy to production
vercel --prod
```

## Step 4: Initialize Database (30 seconds)

After deployment, initialize your database schema:

### Option A: Using Local CLI
```bash
# Set your database URL locally
export DATABASE_URL="your-database-url"

# Push schema to database
npm run db:push

# Optional: Add sample data
npm run seed
```

### Option B: Using Vercel CLI
```bash
# Pull environment variables
vercel env pull

# Push schema
npm run db:push
```

## Step 5: Test Your Deployment (1 minute)

1. **Open your app**
   - Visit the URL Vercel provided (e.g., `your-app.vercel.app`)

2. **Test health check**
   - Go to: `your-app.vercel.app/api/health`
   - Should see: `{"status":"ok",...,"hasDatabase":true,"hasSession":true}`

3. **Create an account**
   - Click "Sign Up" on your app
   - Create a test account
   - Verify you can log in

4. **Play a game**
   - Start a game session
   - Verify coins are awarded
   - Check profile page

## ✅ Done!

Your Table Trek app is now live on Vercel!

---

## What's Next?

### Add Custom Domain
1. Go to your Vercel project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Monitor Your App
- View analytics: Vercel Dashboard → Analytics
- Check logs: Vercel Dashboard → Deployments → View Function Logs
- Monitor database: Your database provider's dashboard

### Continuous Deployment
Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: For every pull request

---

## Common Issues

### "Database not found" error
- Check `DATABASE_URL` is set correctly in Vercel
- Ensure you ran `npm run db:push` to create tables

### "Session error" 
- Verify `SESSION_SECRET` is set in Vercel
- Make sure it's at least 32 characters long

### "API returns 500"
- Check Vercel function logs for errors
- Verify database connection string includes `?sslmode=require`

### Need more help?
See detailed guide: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

---

**Quick Reference: Environment Variables**

```bash
# Required
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
SESSION_SECRET=your-32-character-random-string

# Optional
ALLOWED_ORIGINS=https://yourdomain.com
```
