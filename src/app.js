const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

module.exports = app;
