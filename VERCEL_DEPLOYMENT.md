# Vercel Deployment Guide

This guide explains how to deploy Table Trek to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A PostgreSQL database (recommended: [Neon](https://neon.tech) or [Supabase](https://supabase.com))
3. Vercel CLI (optional): `npm install -g vercel`

## Required Environment Variables

Before deploying to Vercel, you must set the following environment variables in your Vercel project settings:

### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
  - Example: `postgresql://user:password@host:5432/database?sslmode=require`
  - For Neon: Get this from your Neon dashboard under "Connection Details"
  - For Supabase: Get this from Settings → Database → Connection string

### Session Configuration
- `SESSION_SECRET` - A secure random string for session encryption
  - Generate with: `openssl rand -base64 32`
  - Or use any random string (min 32 characters)
  - **IMPORTANT**: Keep this secret and never commit it to version control

### Optional Configuration
- `NODE_ENV` - Set to `production` (Vercel sets this automatically)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins for CORS
  - Example: `https://yourdomain.com,https://www.yourdomain.com`
  - Leave empty to allow all origins (not recommended for production)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Configure your project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:vercel` (auto-detected from vercel.json)
   - **Output Directory**: `dist/public` (auto-detected from vercel.json)
   - **Install Command**: `npm install` (auto-detected)
5. Add environment variables:
   - Click "Environment Variables"
   - Add `DATABASE_URL` and `SESSION_SECRET`
6. Click "Deploy"

### Option 2: Deploy via CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project root:
   ```bash
   vercel
   ```

4. Follow the prompts to link your project

5. Set environment variables:
   ```bash
   vercel env add DATABASE_URL
   vercel env add SESSION_SECRET
   ```

6. Deploy to production:
   ```bash
   vercel --prod
   ```

## Database Setup

After deployment, you need to initialize your database schema:

1. Set up your PostgreSQL database (Neon/Supabase/other)

2. Run database migrations using one of these methods:

   **Option A: Using Vercel CLI locally**
   ```bash
   # Set DATABASE_URL in your local environment
   export DATABASE_URL="your-database-url"
   
   # Push schema to database
   npm run db:push
   
   # Optional: Seed initial data
   npm run seed
   ```

   **Option B: Using Drizzle Studio**
   ```bash
   npm run db:studio
   ```
   Then manually create tables or import schema

   **Option C: Direct SQL execution**
   - Connect to your database using a SQL client
   - Run the migration SQL files from your schema

## Post-Deployment

1. **Test your deployment**:
   - Visit your Vercel URL (e.g., `https://your-project.vercel.app`)
   - Try creating an account
   - Test authentication and game features

2. **Set up custom domain** (optional):
   - Go to your Vercel project settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Monitor your app**:
   - Check Vercel Analytics for performance metrics
   - View logs in Vercel dashboard for any errors
   - Monitor database performance in your database provider's dashboard

## Troubleshooting

### Common Issues

**1. API routes return 500 errors**
- Check that `DATABASE_URL` is set correctly in Vercel environment variables
- Verify database connection string format includes `?sslmode=require` for secure connections
- Check Vercel function logs for detailed error messages

**2. Session/Authentication not working**
- Ensure `SESSION_SECRET` is set in environment variables
- Check that `trust proxy` is enabled (already configured in the code)
- Verify cookies are being set correctly (check browser dev tools)

**3. Database connection errors**
- Verify your database is accessible from the internet
- Check that your database provider allows connections from Vercel's IP ranges
- For Neon: Ensure your project is not paused
- For Supabase: Check that connection pooling is enabled

**4. Build failures**
- Check that all dependencies are in `dependencies` (not `devDependencies`) if needed at runtime
- Verify Node.js version compatibility (Vercel uses Node 20.x by default)
- Check build logs in Vercel dashboard for specific errors

**5. CORS issues**
- If deploying frontend and API separately, set `ALLOWED_ORIGINS` environment variable
- Check that API routes include proper CORS headers (already configured)

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to your main/master branch
- **Preview**: For every pull request and branch push

To disable auto-deployment for specific branches:
1. Go to Project Settings → Git
2. Configure branch settings

## Performance Optimization

- **Cold starts**: Vercel functions may have cold starts. Consider:
  - Using Vercel Pro for faster cold starts
  - Implementing connection pooling for database
  
- **Database connections**: Already configured to use connection pooling with `@neondatabase/serverless`

- **Caching**: Static assets are automatically cached by Vercel's CDN

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Project Issues](https://github.com/your-repo/issues)
