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
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",   // ✅ allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// Allow the server to understand JSON
app.use(express.json()); 

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- A Test Route ---
// Go to http://localhost:5001 in your browser to see this
app.get('/', (req, res) => {
  res.send('BloodDonation API is up and running!');
});

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donors', require('./routes/DonorRoutes'));
app.use('/api/inventory', require('./routes/InventoryRoutes'));
app.use('/api/request', require('./routes/RequestRoutes'));
app.use("/api/host-drive", require("./routes/hostDriveRoutes"));
app.use("/api/donorRegistration", require("./routes/DonorRegistrationRoutes"));






// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});