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

const cors = require('cors');
app.use(cors());

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