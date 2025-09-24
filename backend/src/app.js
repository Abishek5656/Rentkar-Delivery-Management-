import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);       // Admin only
app.use('/api/partner', partnerRoutes);   // Partner only


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler (must be last middleware)
app.use(errorHandler);

export default app;
