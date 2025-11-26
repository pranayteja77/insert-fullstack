// server.js
const express = require('express');
const pool = require('./db');
const authRoutes = require('./routes/authRoutes');
const financialRoutes = require('./routes/financialRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const profileRoutes = require('./routes/profileRoutes');
const otpRoutes = require('./routes/otpRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:5173', // Local development
    'https://insert-fullstack.onrender.com', // Your Render URL
    'https://www.insert-fullstack.onrender.com' // WWW version
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};

// Add this after your other middleware
console.log('Environment variables:', {
  DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? 'SET' : 'MISSING',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'MISSING'
});

const cors = require('cors');
app.use(cors(corsOptions));

// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/otp', otpRoutes);

// Serve static frontend files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle SPA routing (all routes should serve index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});