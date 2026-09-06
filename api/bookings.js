import express from 'express';
import bookingRoutes from '../server/routes/bookingRoutes.js';

const app = express();

app.use(express.json());
app.use('/', bookingRoutes);

export default app;