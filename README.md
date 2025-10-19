# FreelancerHub - Freelancing Platform

A full-stack freelancing platform that connects freelancers with clients. Clients can post projects, and freelancers can browse opportunities and submit proposals.

## 🚀 Features

### For Freelancers
- Browse available projects
- Submit proposals for projects
- View proposal status (Pending/Accepted/Rejected)
- Update profile with skills, portfolio, hourly rate
- Track all submitted proposals

### For Clients
- Register and manage client profiles
- Post new projects with requirements and budget
- View all submitted proposals for projects
- Accept or reject proposals
- Manage multiple clients/companies

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File/image storage
- **Multer** - File upload handling
- **Cookie-Parser** - Cookie management

## 📁 Project Structure

```
FreelancingProject/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Auth & file upload
│   ├── utils/           # Database & Cloudinary config
│   ├── index.js         # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── redux/       # State management
    │   ├── hooks/       # Custom React hooks
    │   └── utils/       # API endpoints
    ├── package.json
    └── vite.config.js
```

## 🔧 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### Backend Setup

1. Navigate to backend folder:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create `.env` file in the backend folder:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:
```powershell
npm run dev
```
Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend folder:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Update API endpoints in `src/utils/constant.js` for local development:
```javascript
export const USER_API_END_POINT = "http://localhost:3000/api/v1/user";
export const PROJECT_API_END_POINT = "http://localhost:3000/api/v1/project";
export const PROPOSAL_API_END_POINT = "http://localhost:3000/api/v1/proposal";
export const CLIENT_API_END_POINT = "http://localhost:3000/api/v1/client";
```

4. Start the frontend dev server:
```powershell
npm run dev
```
Frontend will run on `http://localhost:5173`

## 🌐 Deployment on Vercel

### Prerequisites
- GitHub account
- Vercel account
- Push your code to GitHub repository

### Backend Deployment

1. **Go to Vercel Dashboard** → New Project → Import your GitHub repository

2. **Configure Project Settings:**
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: (leave default)
   - Output Directory: (leave default)

3. **Add Environment Variables** (Settings → Environment Variables):
   ```
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   NODE_ENV=production
   ```

4. **Deploy** and copy your backend URL (e.g., `https://your-backend.vercel.app`)

5. **Important Backend Changes for Production:**
   
   Update CORS in `backend/index.js`:
   ```javascript
   const corsOptions = {
     origin: [
       "http://localhost:5173",
       "https://your-frontend.vercel.app"
     ],
     credentials: true,
   };
   ```

   Update cookie settings in `backend/controllers/user.controller.js` (login function):
   ```javascript
   .cookie("token", token, {
     maxAge: 1 * 24 * 60 * 60 * 1000,
     httpOnly: true,
     secure: true,        // Changed for production
     sameSite: "none",    // Changed for cross-site
   })
   ```

### Frontend Deployment

1. **Go to Vercel Dashboard** → New Project → Import the same GitHub repository

2. **Configure Project Settings:**
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy** and copy your frontend URL

4. **Update Backend URL:**
   - Go back to your backend deployment in Vercel
   - Update the CORS origin environment variable or code to include your actual frontend URL
   - Redeploy the backend

### Post-Deployment Checklist

✅ Backend is accessible at your Vercel URL  
✅ Frontend is accessible and loads correctly  
✅ CORS is configured with correct frontend origin  
✅ Cookies are set with `secure: true` and `sameSite: 'none'`  
✅ MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or Vercel IPs  
✅ Test signup/login functionality  
✅ Test file upload (profile photo, portfolio)  
✅ Verify cookies are being set in browser DevTools  

## 🔐 Security Notes

⚠️ **Important:**
- Never commit `.env` files to Git
- Rotate all credentials if accidentally exposed
- Use strong, unique JWT secrets
- Keep MongoDB and Cloudinary credentials secure
- Enable MongoDB IP whitelist in production

## 📝 API Endpoints

### User Routes (`/api/v1/user`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /logout` - User logout
- `POST /profile/update` - Update user profile

### Client Routes (`/api/v1/client`)
- `POST /register` - Register new client
- `GET /get` - Get all clients
- `GET /get/:id` - Get client by ID
- `PUT /update/:id` - Update client info

### Project Routes (`/api/v1/project`)
- `POST /post` - Post new project (client only)
- `GET /get` - Get all projects
- `GET /get/:id` - Get project by ID
- `GET /getclientprojects` - Get projects by logged-in client

### Proposal Routes (`/api/v1/proposal`)
- `GET /submit/:id` - Submit proposal for project
- `GET /get` - Get all submitted proposals (freelancer)
- `GET /:id/proposals` - Get all proposals for a project (client)
- `POST /status/:id/update` - Update proposal status

## 🐛 Troubleshooting

### Cookies not being set in production
- Ensure `secure: true` and `sameSite: 'none'` in cookie options
- Verify CORS includes `credentials: true`
- Check frontend sends `withCredentials: true` in axios calls

### CORS errors
- Verify backend CORS origin includes exact frontend URL
- Check for trailing slashes in URLs
- Ensure `credentials: true` is set in CORS config

### MongoDB connection issues
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Ensure network access allows Vercel connections

### File upload issues
- Vercel serverless functions have ~4.5MB body limit
- For larger files, consider direct client-to-Cloudinary uploads
- Check Cloudinary credentials are correct

## 👥 User Roles

- **Freelancer**: Can browse projects and submit proposals
- **Client**: Can post projects and manage proposals

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Made with ❤️ by AbhiAbhi100**
