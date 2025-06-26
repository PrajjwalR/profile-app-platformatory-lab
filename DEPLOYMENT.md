# Deployment Guide

This guide will help you deploy your Profile Management App to production.

## 🚀 Quick Deployment Overview

1. **Backend**: Deploy to Railway/Render/Heroku
2. **Frontend**: Deploy to Vercel
3. **Update Auth0**: Configure production URLs
4. **Test**: Verify everything works

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway/Render/Heroku account (free tier available)
- Auth0 account
- MongoDB Atlas account

---

## 🔧 Step 1: Prepare Your Code

### A. Update Frontend for Production

In your `profile-app/src/App.jsx`, make sure you're using environment variables:

```jsx
// Replace hardcoded localhost URLs with:
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

// Use API_URL in your fetch calls:
fetch(`${API_URL}/profile/${encodeURIComponent(user.sub)}`);
```

### B. Create Production Environment Files

**In `profile-app/.env.production`:**

```env
REACT_APP_API_URL=https://your-backend-url.com
```

**In `server/.env` (for local testing):**

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=4000
```

### C. Push Code to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## 🌐 Step 2: Deploy Backend

### Option A: Railway (Recommended)

1. **Go to [railway.app](https://railway.app/)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Add your `server` folder as a service**
6. **Set environment variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: Railway will set this automatically
7. **Deploy**
8. **Copy the generated URL** (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Go to [render.com](https://render.com/)**
2. **Sign up and create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name**: `profile-app-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. **Add environment variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
6. **Deploy**
7. **Copy the generated URL**

### Option C: Heroku

1. **Go to [heroku.com](https://heroku.com/)**
2. **Create a new app**
3. **Connect your GitHub repository**
4. **Set environment variables:**
   - `MONGO_URI`: Your MongoDB Atlas connection string
5. **Deploy**
6. **Copy the generated URL**

---

## 🎨 Step 3: Deploy Frontend to Vercel

### Method A: Using Vercel CLI

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   cd profile-app
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set environment variables when prompted

### Method B: Using Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com/)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure:**
   - **Framework Preset**: Vite
   - **Root Directory**: `profile-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. **Add environment variable:**
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend URL (from Step 2)
7. **Deploy**

---

## 🔐 Step 4: Update Auth0 Settings

1. **Go to your Auth0 dashboard**
2. **Applications → Your App → Settings**
3. **Update these URLs with your Vercel domain:**
   - **Allowed Callback URLs:** `https://your-app.vercel.app`
   - **Allowed Logout URLs:** `https://your-app.vercel.app`
   - **Allowed Web Origins:** `https://your-app.vercel.app`
4. **Save Changes**

---

## ✅ Step 5: Test Your Deployment

1. **Visit your Vercel URL**
2. **Test login functionality**
3. **Test profile creation/editing**
4. **Check MongoDB Atlas** to verify data is being saved
5. **Test logout functionality**

---

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure your backend has CORS configured for your Vercel domain
   - Check that your backend URL is correct in environment variables

2. **Auth0 Login Issues**

   - Verify all Auth0 URLs are updated with your production domain
   - Check that the domain and client ID are correct

3. **MongoDB Connection Issues**

   - Ensure your MongoDB Atlas IP whitelist includes your hosting provider's IPs
   - Verify your connection string is correct

4. **Environment Variables**
   - Double-check all environment variables are set correctly
   - Ensure variable names match exactly (case-sensitive)

### Debugging Steps

1. **Check browser console** for frontend errors
2. **Check hosting platform logs** for backend errors
3. **Verify environment variables** are set correctly
4. **Test API endpoints** directly using tools like Postman

---

## 📊 Monitoring

### Vercel Analytics

- Enable Vercel Analytics to monitor frontend performance
- Track user interactions and errors

### Backend Monitoring

- Use your hosting platform's built-in monitoring
- Set up error tracking (e.g., Sentry)

---

## 🔄 Continuous Deployment

Once set up, your app will automatically deploy when you push changes to your GitHub repository.

### Workflow:

1. Make changes locally
2. Test locally
3. Push to GitHub
4. Automatic deployment to production

---

## 🎉 Success!

Your Profile Management App is now live and accessible to users worldwide!

**Your app URL:** `https://your-app.vercel.app`

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review hosting platform documentation
3. Check Auth0 and MongoDB Atlas documentation
4. Verify all environment variables are set correctly
