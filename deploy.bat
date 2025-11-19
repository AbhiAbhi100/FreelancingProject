@echo off
REM Quick Deployment Script for Freelancing Project (Windows)

echo 🚀 Starting deployment process...

echo 📦 Installing dependencies...

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
npm install

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
npm install

echo 🏗️ Building frontend...
npm run build

echo ✅ Build completed!
echo.
echo 🎯 Next Steps:
echo 1. Deploy backend to Railway/Render
echo 2. Get your backend URL
echo 3. Update frontend .env with backend URL
echo 4. Deploy frontend to Vercel
echo.
echo 📖 See DEPLOYMENT_GUIDE.md for detailed instructions

pause