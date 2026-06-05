const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS with configurations
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Enable built-in body parsing for JSON request bodies
app.use(express.json());

// Enable body parsing for URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Root Route (Welcome API check)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Student Portal API. Backend is running!',
  });
});

// Register Authentication Routes
app.use('/api/auth', authRoutes);

// Middleware for 404 Not Found error handling
app.use(notFound);

// Centralized error handling middleware
app.use(errorHandler);

// Define port number
const PORT = process.env.PORT || 5000;

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`CORS allowed origin: ${corsOptions.origin}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
