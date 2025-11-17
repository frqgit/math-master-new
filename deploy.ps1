# PowerShell script for Windows deployment

Write-Host "🚀 Table Trek - Railway Deployment Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Railway CLI is installed
Write-Host "Checking Railway CLI..." -ForegroundColor Yellow
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Railway CLI not found. Installing..." -ForegroundColor Red
    npm install -g @railway/cli
}
Write-Host "✅ Railway CLI ready" -ForegroundColor Green
Write-Host ""

# Login to Railway
Write-Host "Logging into Railway..." -ForegroundColor Yellow
railway login
Write-Host "✅ Logged in to Railway" -ForegroundColor Green
Write-Host ""

# Initialize project
Write-Host "Initializing Railway project..." -ForegroundColor Yellow
railway init
Write-Host "✅ Railway project initialized" -ForegroundColor Green
Write-Host ""

# Ask to open Railway dashboard to add PostgreSQL database
$openDashboard = Read-Host "Do you want to open Railway dashboard to add PostgreSQL database? (y/n)"
if ($openDashboard -eq "y") {
    railway open
}
Write-Host ""

# Set environment variables
Write-Host "Setting environment variables..." -ForegroundColor Yellow
railway variables set SESSION_SECRET=$(openssl rand -base64 32)
railway variables set NODE_ENV=production
Write-Host "✅ Environment variables set" -ForegroundColor Green
Write-Host ""

# Push database schema
Write-Host "Pushing database schema..." -ForegroundColor Yellow
railway run npm run db:push
Write-Host "✅ Database schema pushed" -ForegroundColor Green
Write-Host ""

# Seed achievements
Write-Host "Seeding achievements..." -ForegroundColor Yellow
railway run npm run db:seed
Write-Host "✅ Achievements seeded" -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "Checking git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Ask to commit changes
$commit = Read-Host "Do you want to commit changes? (y/n)"
if ($commit -eq "y") {
    $message = Read-Host "Enter commit message"
    git add .
    git commit -m "$message"
    git push origin main
    Write-Host "✅ Changes committed and pushed" -ForegroundColor Green
}
Write-Host ""

# Deploy to Railway
Write-Host "🚀 Deploying to Railway..." -ForegroundColor Cyan
railway up

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run 'railway status' to get your URL" -ForegroundColor White
Write-Host "2. Run 'railway logs' to view logs" -ForegroundColor White
Write-Host "3. Run 'railway open' to open dashboard" -ForegroundColor White