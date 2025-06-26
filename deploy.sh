#!/bin/bash

echo "🚀 Profile App Deployment Script"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if changes are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Please commit them first:"
    echo "   git add ."
    echo "   git commit -m 'Prepare for deployment'"
    exit 1
fi

echo "✅ Code is ready for deployment!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Deploy Backend (choose one):"
echo "   - Railway: https://railway.app/"
echo "   - Render: https://render.com/"
echo "   - Heroku: https://heroku.com/"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to: https://vercel.com/"
echo "   - Import your GitHub repository"
echo "   - Set REACT_APP_API_URL to your backend URL"
echo ""
echo "4. Update Auth0 settings with your Vercel domain"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions" 