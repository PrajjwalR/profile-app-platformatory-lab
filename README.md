# Profile Management App

A full-stack web application with OIDC authentication, profile management, and Temporal workflow integration.

## 🚀 Features

- **OIDC Authentication** using Auth0
- **Profile Management** with editable fields (First Name, Last Name, Phone, City, Pincode)
- **MongoDB Atlas** for data persistence
- **Temporal Workflow** for background processing
- **Modern UI** built with Material-UI
- **Responsive Design** for all devices

## 🛠️ Tech Stack

### Frontend

- React 18
- Material-UI (MUI)
- Auth0 React SDK
- Vite (for development)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Temporal SDK
- CORS enabled

### Infrastructure

- MongoDB Atlas (Database)
- Auth0 (Authentication)
- Temporal (Workflow Engine)

## 📁 Project Structure

```
project-root/
├── profile-app/          # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/               # Node.js backend
│   ├── index.js
│   ├── Profile.js
│   ├── temporal/
│   │   ├── profileWorkflow.js
│   │   ├── activities.js
│   │   └── worker.js
│   ├── package.json
│   └── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account
- Auth0 account
- Docker (optional, for local Temporal)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-name>
```

### 2. Backend Setup

```bash
cd server
npm install
```

#### Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/profiledb?retryWrites=true&w=majority
PORT=4000
```

#### Start Backend

```bash
node index.js
```

### 3. Frontend Setup

```bash
cd profile-app
npm install
```

#### Environment Variables

Create a `.env.local` file in the `profile-app` directory:

```env
REACT_APP_API_URL=http://localhost:4000
```

#### Start Frontend

```bash
npm run dev
```

### 4. Auth0 Configuration

1. Create a new application in Auth0 dashboard
2. Set application type to "Single Page Application"
3. Configure URLs:

   - **Allowed Callback URLs:** `http://localhost:5173`
   - **Allowed Logout URLs:** `http://localhost:5173`
   - **Allowed Web Origins:** `http://localhost:5173`

4. Update `src/index.js` with your Auth0 credentials:

```jsx
<Auth0Provider
  domain="YOUR_AUTH0_DOMAIN"
  clientId="YOUR_AUTH0_CLIENT_ID"
  authorizationParams={{
    redirect_uri: window.location.origin,
  }}
>
  <App />
</Auth0Provider>
```

### 5. Temporal Setup (Optional)

#### Using Docker

```bash
cd server
docker compose up
```

#### Using Temporal CLI

```bash
temporal server start-dev
```

#### Start Worker

```bash
cd server
node temporal/worker.js
```

## 🔧 API Endpoints

### Profile Management

- `GET /profile/:userId` - Get user profile
- `POST /profile/:userId` - Save/update user profile

### Request/Response Format

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890",
  "city": "New York",
  "pincode": "10001"
}
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `REACT_APP_API_URL`: Your backend URL
4. Deploy

### Backend (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect to your preferred platform
3. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: Platform will set this automatically

### Update Auth0 Settings for Production

- **Allowed Callback URLs:** `https://your-domain.vercel.app`
- **Allowed Logout URLs:** `https://your-domain.vercel.app`
- **Allowed Web Origins:** `https://your-domain.vercel.app`

## 🔄 Temporal Workflow

The app includes a Temporal workflow that:

1. Saves profile data to MongoDB
2. Waits 10 seconds
3. Sends data to external API (crudcrud.com)

### Workflow Files

- `temporal/profileWorkflow.js` - Main workflow logic
- `temporal/activities.js` - External API calls
- `temporal/worker.js` - Worker process

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Check your connection string
   - Ensure IP is whitelisted in Atlas
   - Verify username/password

2. **Auth0 Login Issues**

   - Verify callback URLs in Auth0 dashboard
   - Check domain and client ID
   - Ensure CORS is properly configured

3. **Temporal Connection Issues**
   - Ensure Temporal server is running
   - Check worker is started
   - Verify task queue names match

## 📝 Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb+srv://...
PORT=4000
```

### Frontend (.env.local)

```env
REACT_APP_API_URL=http://localhost:4000
```

### Frontend (.env.production)

```env
REACT_APP_API_URL=https://your-backend-url.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Auth0 for authentication
- MongoDB Atlas for database
- Temporal for workflow orchestration
- Material-UI for UI components
