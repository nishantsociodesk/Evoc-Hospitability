import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import { connectDB, getDbStatus } from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import googleSheetRoutes from './routes/googleSheetRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Vite frontend
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'EVOC Hospitality MERN Backend',
    // databaseConnected: getDbStatus(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/google-sheet', googleSheetRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Unhandled Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
const startServer = async () => {
  // await connectDB();
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`✦ EVOC Hospitality API running on port ${PORT}`);
    console.log(`✦ Health check: http://localhost:${PORT}/api/health`);
    console.log(`=========================================`);
  });
};

startServer();
