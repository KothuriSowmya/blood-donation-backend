const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 5002; // Backend will run on port 5001

// --- Middlewares ---
// Allow your React app to call this server
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ["http://localhost:5173"];

console.log('🔧 FRONTEND_URL from env:', process.env.FRONTEND_URL);
console.log('✅ Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    console.log('📨 Request from origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('❌ Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Allow the server to understand JSON
app.use(express.json()); 

// --- Database Connection ---
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return;
  }

  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in environment variables');
    throw new Error('MONGO_URI not defined');
  }

  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    isConnected = true;
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    throw err;
  }
};

// Connect to database
connectDB().catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(503).json({ error: 'Database connection failed' });
    }
  }
  next();
});

// --- A Test Route ---
app.get('/', (req, res) => {
  res.send('BloodDonation API is up and running!');
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/DonorRoutes'));
app.use('/api/inventory', require('./routes/InventoryRoutes'));
app.use('/api/request', require('./routes/RequestRoutes'));
app.use("/api/host-drive", require("./routes/hostDriveRoutes"));
app.use("/api/donorRegistration", require("./routes/DonorRegistrationRoutes"));

// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- Start Server ---
// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;