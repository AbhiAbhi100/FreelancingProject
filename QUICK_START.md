# 🚀 Quick Start Deployment Guide

## 📋 What You'll Need

- GitHub account
- MongoDB Atlas account (free)
- Railway/Render account (free)
- Vercel account (free)

## ⚡ 30-Minute Deployment

### Step 1: Database (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free cluster → Create database user → Allow all IPs
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Step 2: Backend (10 minutes)

1. Go to [Railway](https://railway.app) or [Render](https://render.com)
2. Deploy from GitHub or upload `backend` folder
3. Add environment variables:
   - `MONGO_URI`: Your Atlas connection string
   - `SECRET_KEY`: Any long random string
   - `CLOUD_NAME`, `API_KEY`, `API_SECRET`: Your existing Cloudinary values
4. Note your backend URL: `https://yourapp.railway.app`

### Step 3: Frontend (10 minutes)

1. Update `frontend/src/utils/constant.js`:
   ```javascript
   const API_BASE_URL = "https://yourapp.railway.app"; // Your backend URL
   ```
2. Go to [Vercel](https://vercel.com)
3. Deploy `frontend` folder
4. Framework: Vite, Build command: `npm run build`

### Step 4: Final Setup (5 minutes)

1. Update backend CORS with your Vercel URL
2. Redeploy backend
3. Test your app!

## 🎯 That's It!

Your freelancing platform is now live!

**Next:** Check `DEPLOYMENT_CHECKLIST.md` for detailed verification steps.

## 🆘 Quick Fixes

- **CORS errors**: Add frontend URL to backend CORS
- **API errors**: Check backend URL in frontend constants
- **Database errors**: Verify MongoDB connection string
- **Build errors**: Check all dependencies are in package.json
