# 📋 Deployment Checklist

## Pre-Deployment Preparation

- [ ] **Code is working locally** - Test all features
- [ ] **Dependencies installed** - Run `npm install` in both frontend and backend
- [ ] **Environment variables ready** - Prepare production environment variables
- [ ] **Git repository ready** - Push code to GitHub for some deployment options

## Database Setup (MongoDB Atlas)

- [ ] **Account created** - Sign up for MongoDB Atlas
- [ ] **Cluster created** - Use free M0 tier
- [ ] **Database user created** - With read/write permissions
- [ ] **Network access configured** - Allow access from anywhere (0.0.0.0/0)
- [ ] **Connection string obtained** - Copy the connection URI
- [ ] **Database name decided** - Choose a name for your production database

## Backend Deployment

### Option A: Railway

- [ ] **Railway account created** - Sign up at railway.app
- [ ] **Railway CLI installed** - `npm install -g @railway/cli`
- [ ] **Project initialized** - Run `railway init` in backend directory
- [ ] **Environment variables set** - Add all required env vars in Railway dashboard
- [ ] **Deployment completed** - Run `railway up`
- [ ] **Backend URL obtained** - Save the Railway-provided URL

### Option B: Render

- [ ] **Render account created** - Sign up at render.com
- [ ] **GitHub connected** - Connect your GitHub account
- [ ] **Web service created** - Choose Node.js
- [ ] **Build settings configured** - Build: `npm install`, Start: `npm start`
- [ ] **Environment variables set** - Add all required env vars
- [ ] **Deployment completed** - Wait for successful build
- [ ] **Backend URL obtained** - Save the Render-provided URL

## Frontend Deployment (Vercel)

- [ ] **Backend URL updated** - Update frontend/.env with production backend URL
- [ ] **Vercel account created** - Sign up at vercel.com
- [ ] **Project connected** - Connect GitHub repo or upload directly
- [ ] **Build settings configured** - Framework: Vite, Output: dist
- [ ] **Environment variables set** - Add VITE_API_BASE_URL
- [ ] **Deployment completed** - Wait for successful build
- [ ] **Frontend URL obtained** - Save the Vercel-provided URL

## Final Configuration

- [ ] **CORS updated** - Add frontend URL to backend CORS settings
- [ ] **Redeploy backend** - After updating CORS configuration
- [ ] **Custom domain (optional)** - Add custom domain to Vercel

## Testing & Verification

- [ ] **Health check** - Visit backend-url/health
- [ ] **Frontend loads** - Visit your Vercel URL
- [ ] **API calls work** - Test login/signup functionality
- [ ] **File uploads work** - Test image upload features
- [ ] **Database operations** - Test create/read/update/delete operations
- [ ] **Cross-origin requests** - Ensure frontend can call backend APIs

## Production Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
SECRET_KEY=your-super-secret-jwt-key
CLOUD_NAME=your-cloudinary-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_BASE_URL=https://your-backend.railway.app
```

## Common Issues & Solutions

### ❌ CORS Errors

- **Issue**: "Access to fetch blocked by CORS policy"
- **Solution**: Add your frontend URL to backend CORS configuration

### ❌ API Not Found

- **Issue**: 404 errors when calling APIs
- **Solution**: Check that VITE_API_BASE_URL is correctly set

### ❌ Database Connection Failed

- **Issue**: "MongoServerError: bad auth"
- **Solution**: Verify MongoDB Atlas connection string and credentials

### ❌ Environment Variables Not Loading

- **Issue**: undefined values for process.env variables
- **Solution**: Ensure variables are set in deployment platform dashboard

### ❌ Build Failures

- **Issue**: Deployment fails during build
- **Solution**: Check build logs, ensure all dependencies are in package.json

## Post-Deployment Optimization

### Performance

- [ ] **CDN setup** - Vercel includes CDN by default
- [ ] **Image optimization** - Ensure Cloudinary transformations are used
- [ ] **Database indexing** - Add indexes for frequently queried fields

### Monitoring

- [ ] **Error tracking** - Set up Sentry or similar
- [ ] **Performance monitoring** - Use built-in platform analytics
- [ ] **Uptime monitoring** - Set up UptimeRobot or similar

### Security

- [ ] **HTTPS enabled** - Ensure SSL certificates are active
- [ ] **Environment variables secure** - Never expose secrets in frontend
- [ ] **API rate limiting** - Consider adding rate limiting middleware
- [ ] **Input validation** - Ensure all inputs are properly validated

## 🎉 Success Criteria

Your deployment is successful when:

- ✅ Users can access your frontend application
- ✅ Users can register and login
- ✅ Users can upload images and files
- ✅ All CRUD operations work correctly
- ✅ No CORS errors in browser console
- ✅ Backend health check returns 200 OK

## 📞 Need Help?

- Check deployment platform documentation
- Review error logs in deployment dashboards
- Test locally first to isolate deployment-specific issues
- Ensure all environment variables are correctly set

---

**📝 Notes:**

- Free tier limitations may apply (storage, bandwidth, compute hours)
- Keep track of your URLs and credentials in a secure location
- Consider setting up monitoring and backups for production use
