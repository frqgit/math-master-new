# Database Setup Guide

This app uses **Neon** (serverless PostgreSQL) for the database. Follow these steps to set up your database.

## Option 1: Neon Database (Recommended - Free Tier Available)

### Step 1: Create a Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account (GitHub/Google login available)
3. Create a new project

### Step 2: Get Your Connection String
1. In your Neon project dashboard, go to "Connection Details"
2. Copy the connection string (it looks like: `postgresql://username:password@hostname/database?sslmode=require`)
3. The connection string is your `DATABASE_URL`

### Step 3: Generate SESSION_SECRET

`SESSION_SECRET` is a secure random string used to encrypt session cookies. Generate one using one of these methods:

**Using Node.js (Recommended):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Using PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | ForEach-Object {[char]$_})
```

**Using OpenSSL (if installed):**
```bash
openssl rand -base64 32
```

**Online Generator:**
- Visit https://generate-secret.vercel.app/32 (or any secure random string generator)
- Copy the generated string

**Example output:** `xK9mP2qR7vT4wY8zA1bC3dE5fG6hI9jK0lM2nO4pQ6rS8tU0vW1xY3zA5bC7dE9fG`

### Step 4: Set Environment Variables

**PowerShell (Windows):**
```powershell
$env:DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
$env:SESSION_SECRET="your-generated-secret-key-here"
```

**Command Prompt (Windows):**
```cmd
set DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
set SESSION_SECRET=your-generated-secret-key-here
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
export SESSION_SECRET="your-generated-secret-key-here"
```

### Step 5: Create Database Schema
Run this command to create all the tables:
```bash
npm run db:push
```

This will create the following tables:
- `users` - User accounts
- `user_profiles` - User game statistics
- `game_sessions` - Game session history
- `achievements` - Available achievements
- `user_achievements` - User unlocked achievements
- `coin_transactions` - Coin transaction history

### Step 5: Start the Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## Option 2: Local PostgreSQL Database

If you prefer to run PostgreSQL locally:

### Step 1: Install PostgreSQL
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- **Mac**: `brew install postgresql` or download from postgresql.org
- **Linux**: `sudo apt-get install postgresql` (Ubuntu/Debian)

### Step 2: Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tabletrek;

# Exit psql
\q
```

### Step 3: Set Connection String and Generate SESSION_SECRET

**Generate SESSION_SECRET first:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Then set both environment variables:**
```powershell
$env:DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/tabletrek"
$env:SESSION_SECRET="paste-your-generated-secret-here"
```

### Step 4: Create Schema
```bash
npm run db:push
```

### Step 5: Start Server
```bash
npm run dev
```

---

## Option 3: Other PostgreSQL Providers

You can also use:
- **Supabase** (free tier): [supabase.com](https://supabase.com)
- **Railway** (free tier): [railway.app](https://railway.app)
- **Render** (free tier): [render.com](https://render.com)
- **AWS RDS**, **Google Cloud SQL**, etc.

Just get the PostgreSQL connection string and set it as `DATABASE_URL`.

---

## Troubleshooting

### "DATABASE_URL environment variable is not set"
- Make sure you've set the environment variable in your current terminal session
- On Windows PowerShell, use `$env:DATABASE_URL="..."` 
- The variable only lasts for the current session

### "Connection refused" or "Cannot connect"
- Check that your database is running (if local)
- Verify the connection string is correct
- For Neon, make sure you're using the correct connection string from the dashboard
- Check if your IP needs to be whitelisted (some cloud providers)

### "Table does not exist"
- Run `npm run db:push` to create the schema
- Make sure you're connected to the correct database

### Persistent Environment Variables (Windows)

To make environment variables persistent, you can:

1. **Create a `.env` file** (requires dotenv package):
   ```bash
   npm install --save-dev dotenv-cli
   ```
   Then modify `package.json` scripts to use `dotenv-cli`

2. **Set system environment variables**:
   - Open System Properties → Environment Variables
   - Add `DATABASE_URL` and `SESSION_SECRET` to User variables
   - Restart your terminal

---

## Quick Start Commands

```powershell
# 1. Generate SESSION_SECRET (run this first)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 2. Set your database URL (replace with your actual URL)
$env:DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# 3. Set session secret (paste the generated secret from step 1)
$env:SESSION_SECRET="paste-generated-secret-here"

# 4. Create database tables
npm run db:push

# 5. Start development server
npm run dev
```

## About SESSION_SECRET

**What is SESSION_SECRET?**
- A secure random string used to encrypt and sign session cookies
- Keeps user sessions secure and prevents session hijacking
- Should be at least 32 characters long
- Must be kept secret - never commit it to git or share it publicly

**Important Notes:**
- Use a different SESSION_SECRET for each environment (development, production)
- If you change SESSION_SECRET, all existing user sessions will be invalidated
- For production, use a strong, randomly generated secret
- Store it securely in environment variables (never hardcode it)

Your app will be available at: **http://localhost:5000**

