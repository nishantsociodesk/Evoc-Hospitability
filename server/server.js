import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import bookingRoutes from './routes/bookingRoutes.js';
import googleSheetRoutes from './routes/googleSheetRoutes.js';

dotenv.config();

const app = express();


// Enable CORS for Vite frontend
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://evoc-hospitability-xi.vercel.app'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message : 'Backend is running'
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
    message: 'Internal Server Error'
  });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    console.log(`EVOC API listening on http://localhost:${port}`);
  });
}

export default app;
