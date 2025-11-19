# Blood Donation System - Backend API

Backend API for Blood Donation Management System built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- CORS

## 📁 Project Structure

```
├── config/           # Database configuration
├── controllers/      # Route controllers
├── middleware/       # Authentication middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── server.js        # Entry point
└── package.json
```

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5002
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

3. Start server:
```bash
npm start
```

Server will run on http://localhost:5002

## 🌐 API Endpoints

- `GET /` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/donors` - Get all donors
- `POST /api/donors` - Add new donor
- `GET /api/inventory` - Get blood inventory
- `POST /api/inventory` - Update inventory
- `GET /api/request` - Get blood requests
- `POST /api/request` - Create blood request
- `POST /api/host-drive` - Host blood drive
- `POST /api/donorRegistration` - Register for drive

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import this repository
4. Add environment variables in Vercel Dashboard
5. Deploy

### Environment Variables for Vercel:
- `MONGO_URI`
- `PORT`
- `JWT_SECRET`
- `FRONTEND_URL`

## 📝 Models

- **User** - User authentication
- **Admin** - Admin users
- **Donor** - Donor information
- **Inventory** - Blood inventory
- **Request** - Blood requests
- **HostDrive** - Blood drive events
- **DonorRegistration** - Drive registrations

## 📄 License

MIT
