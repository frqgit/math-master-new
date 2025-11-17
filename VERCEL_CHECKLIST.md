# Vercel Deployment Checklist

Use this checklist to ensure your Table Trek deployment to Vercel is successful.

## Pre-Deployment Checklist

### 1. Database Setup
- [ ] PostgreSQL database is created (Neon, Supabase, or other)
- [ ] Database connection string is available
- [ ] Database connection uses SSL (`?sslmode=require` in connection string)
- [ ] Database schema has been pushed (`npm run db:push`)
- [ ] Optional: Sample data seeded (`npm run seed`)

### 2. Environment Variables Prepared
- [ ] `DATABASE_URL` - Your PostgreSQL connection string
- [ ] `SESSION_SECRET` - Generated random secret (min 32 characters)
  - Generate with: `openssl rand -base64 32`
  - Or online: https://randomkeygen.com/
- [ ] Optional: `ALLOWED_ORIGINS` - If you need specific CORS origins

### 3. Code Repository
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.vercelignore` file is present (auto-created)
- [ ] `vercel.json` configuration is present (auto-configured)
- [ ] `package.json` has `build:vercel` script (already added)

## Deployment Steps

### Via Vercel Dashboard
1. [ ] Logged into Vercel dashboard
2. [ ] Clicked "Add New Project"
3. [ ] Repository imported
4. [ ] Environment variables added:
   - [ ] `DATABASE_URL`
   - [ ] `SESSION_SECRET`
   - [ ] Optional: `ALLOWED_ORIGINS`
5. [ ] Build settings confirmed (should auto-detect from vercel.json)
6. [ ] Clicked "Deploy"
7. [ ] Deployment completed successfully

### Via Vercel CLI
1. [ ] Vercel CLI installed (`npm install -g vercel`)
2. [ ] Logged in (`vercel login`)
3. [ ] Project deployed (`vercel`)
4. [ ] Environment variables set:
   ```bash
   vercel env add DATABASE_URL
   vercel env add SESSION_SECRET
   ```
5. [ ] Production deployment (`vercel --prod`)

## Post-Deployment Verification

### 1. Basic Functionality
- [ ] Site loads at Vercel URL
- [ ] Homepage displays correctly
- [ ] Static assets (images, sounds) load correctly
- [ ] No console errors in browser

### 2. API Endpoints
- [ ] Health check works: `https://your-app.vercel.app/api/health`
  - Should return: `{"status":"ok","timestamp":"...","hasDatabase":true,"hasSession":true}`
- [ ] API routes are accessible (test with network tab in DevTools)

### 3. Authentication
- [ ] Can create a new account
- [ ] Can log in with created account
- [ ] Session persists after page refresh
- [ ] Can log out successfully

### 4. Game Features
- [ ] Can start a game
- [ ] Game mechanics work correctly
- [ ] Score tracking works
- [ ] Coins are awarded
- [ ] Profile page shows correct data

### 5. Database
- [ ] User data is saved
- [ ] Game sessions are recorded
- [ ] Achievements unlock correctly
- [ ] Leaderboard displays correctly

## Troubleshooting

If any checks fail, consult [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) troubleshooting section.

### Quick Fixes

**Site loads but API fails:**
- Check Vercel function logs for errors
- Verify `DATABASE_URL` is set correctly
- Check database is accessible from internet

**Authentication doesn't work:**
- Verify `SESSION_SECRET` is set
- Check browser cookies are enabled
- Review CORS settings if frontend is on different domain

**Database connection errors:**
- Ensure connection string includes `?sslmode=require`
- Check database is not paused (Neon) or sleeping
- Verify firewall allows Vercel IP ranges

## Performance Monitoring

After deployment, monitor:
- [ ] Vercel Analytics dashboard
- [ ] Function execution logs
- [ ] Database query performance
- [ ] Error rates in Vercel logs

## Custom Domain Setup (Optional)

- [ ] Custom domain purchased
- [ ] Domain added in Vercel project settings
- [ ] DNS records configured as instructed
- [ ] SSL certificate issued (automatic)
- [ ] Domain is accessible

## Continuous Deployment

- [ ] Verified auto-deployment on push to main branch
- [ ] Tested preview deployments for pull requests
- [ ] Configured deployment notifications (optional)

---

**Deployment Date:** _____________

**Deployed By:** _____________

**Vercel URL:** _____________

**Custom Domain:** _____________ (if applicable)

**Notes:**
