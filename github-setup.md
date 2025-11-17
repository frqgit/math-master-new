# Deployment Guide

## Vercel Deployment

This app is configured to deploy to Vercel. Follow these steps:

### Prerequisites
1. A GitHub repository with your code
2. A Neon PostgreSQL database (or any PostgreSQL database)
3. A Vercel account

### Environment Variables

Before deploying, you'll need to set these environment variables in Vercel:

1. **DATABASE_URL** - Your PostgreSQL connection string (e.g., `postgresql://user:password@host:5432/database`)
   - If using Neon: Get this from your Neon project dashboard
   - Format: `postgresql://username:password@hostname/database?sslmode=require`

2. **SESSION_SECRET** - A secure random string for session encryption
   - Generate a secure random string (e.g., using `openssl rand -base64 32`)
   - Keep this secret and don't commit it to git

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Set Environment Variables**
   - In your Vercel project settings, go to "Environment Variables"
   - Add `DATABASE_URL` and `SESSION_SECRET`
   - Make sure to add them for Production, Preview, and Development environments

4. **Deploy**
   - Vercel will automatically build and deploy your app
   - The build command runs: `npm run build`
   - Static files are served from `dist/public`
   - API routes are handled by serverless functions in `api/`

### Database Setup

Before deploying, make sure your database schema is set up:

```bash
# Set your DATABASE_URL environment variable locally
export DATABASE_URL="your-database-url"

# Push the schema to your database
npm run db:push
```

### Post-Deployment

After deployment:
- Your app will be available at `https://your-project.vercel.app`
- API routes will be at `https://your-project.vercel.app/api/*`
- Static files (React app) will be served automatically

### Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **API routes not working**: Verify `api/index.ts` exports the Express app correctly
- **Database connection errors**: Check that `DATABASE_URL` is set correctly in Vercel
- **Session issues**: Ensure `SESSION_SECRET` is set and cookies are working (check browser console)