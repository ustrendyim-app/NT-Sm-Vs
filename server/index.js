// NextGen Smart Variants - Main Server
// Product Image Variant Management App

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const winston = require('winston');
const cron = require('node-cron');

// Import routes
const productRoutes = require('./routes/products');
const variantRoutes = require('./routes/variants');
const settingsRoutes = require('./routes/settings');
const uploadRoutes = require('./routes/uploads');
const webhookRoutes = require('./routes/webhooks');
const dashboardRoutes = require('./routes/dashboard');

// Import services
const shopifyService = require('./services/shopifyService');
const variantDetectionService = require('./services/variantDetectionService');
const imageProcessingService = require('./services/imageProcessingService');

// Import middleware
const { authMiddleware } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

// App configuration
const app = express();
const PORT = process.env.NEXTGEN_APP_PORT || 3001;
const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/nextgen_smart_variants';

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'nextgen-smart-variants',
    appId: '285217980417'
  },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

// Database connection (optional in development)
if (process.env.NODE_ENV !== 'development') {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('🗄️  NextGen Smart Variants - MongoDB connected successfully');
  })
  .catch((err) => {
    logger.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
} else {
  logger.info('🗄️  NextGen Smart Variants - Running in development mode without database');
}

// Middleware setup
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      scriptSrc: ["'self'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://admin.shopify.com'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'https://admin.shopify.com'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(requestLogger);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/assets', express.static(path.join(__dirname, '../client/dist/assets')));

// API Routes
app.use('/api/products', authMiddleware, productRoutes);
app.use('/api/variants', authMiddleware, variantRoutes);
app.use('/api/settings', authMiddleware, settingsRoutes);
app.use('/api/uploads', authMiddleware, uploadRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);

// Webhook routes (no auth needed)
app.use('/webhooks', webhookRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'NextGen Smart Variants',
    appId: '285217980417',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// App info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'NextGen Smart Variants',
    appId: '285217980417',
    version: '1.0.0',
    description: 'Product Image Variant Management App',
    features: [
      'Automatic variant detection',
      'Smart image management',
      'Category-based automation',
      'Custom variant display',
      'Price position control',
      'Theme integration'
    ],
    endpoints: {
      products: '/api/products',
      variants: '/api/variants',
      settings: '/api/settings',
      uploads: '/api/uploads',
      dashboard: '/api/dashboard',
      webhooks: '/webhooks'
    },
    status: 'active',
    port: PORT
  });
});

// Serve React app for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Default route for development
app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  } else {
    res.json({
      message: '🚀 NextGen Smart Variants API is running!',
      app: 'NextGen Smart Variants',
      appId: '285217980417',
      environment: 'development',
      port: PORT,
      docs: '/api/info',
      health: '/api/health',
      dashboard: 'http://localhost:3000/dashboard'
    });
  }
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    app: 'NextGen Smart Variants',
    appId: '285217980417',
    message: `${req.method} ${req.originalUrl} is not a valid endpoint`
  });
});

// Background jobs - Automatic variant processing
cron.schedule('0 */6 * * *', async () => {
  logger.info('🔄 Starting automatic variant processing...');
  try {
    await variantDetectionService.processAllProducts();
    logger.info('✅ Automatic variant processing completed');
  } catch (error) {
    logger.error('❌ Automatic variant processing failed:', error);
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('🛑 NextGen Smart Variants - Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('🛑 NextGen Smart Variants - Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
🎉 NextGen Smart Variants Server Started!
📱 App ID: 285217980417
🌐 URL: http://localhost:${PORT}
🔗 Dashboard: https://dev.shopify.com/dashboard/185211679/apps/285217980417
📊 Health: http://localhost:${PORT}/api/health
📖 API Info: http://localhost:${PORT}/api/info
🚨 This is NextGen Smart Variants ONLY!
  `);
  
  logger.info('NextGen Smart Variants server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    appId: '285217980417'
  });
});

// Handle server errors
server.on('error', (error) => {
  logger.error('❌ Server error:', error);
  process.exit(1);
});

module.exports = app;