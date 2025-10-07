// NextGen Smart Variants - Error Handler Middleware
const winston = require('winston');

const errorHandler = (err, req, res, next) => {
  // Default to 500 server error
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
    app: 'NextGen Smart Variants',
    appId: '285217980417',
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    error.statusCode = 400;
    error.message = 'Validation Error';
    error.details = messages;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.statusCode = 400;
    error.message = `Duplicate field: ${field}`;
    error.field = field;
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.statusCode = 401;
    error.message = 'Invalid token';
  }

  // JWT expired
  if (err.name === 'TokenExpiredError') {
    error.statusCode = 401;
    error.message = 'Token expired';
  }

  // Shopify API errors
  if (err.name === 'ShopifyError') {
    error.statusCode = err.statusCode || 400;
    error.message = `Shopify API Error: ${err.message}`;
    error.shopifyError = true;
  }

  // MongoDB connection error
  if (err.name === 'MongoError' || err.name === 'MongooseError') {
    error.statusCode = 503;
    error.message = 'Database connection error';
    error.databaseError = true;
  }

  // File upload error
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.statusCode = 413;
    error.message = 'File too large';
  }

  // Log error
  if (error.statusCode >= 500) {
    winston.error('NextGen Smart Variants Server Error:', {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      appId: '285217980417'
    });
  } else {
    winston.warn('NextGen Smart Variants Client Error:', {
      error: err.message,
      path: req.path,
      method: req.method,
      statusCode: error.statusCode,
      appId: '285217980417'
    });
  }

  // Don't expose error details in production
  if (process.env.NODE_ENV === 'production' && error.statusCode >= 500) {
    error.message = 'Internal Server Error';
    delete error.details;
    delete error.stack;
  } else if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
    error.originalError = err;
  }

  res.status(error.statusCode).json(error);
};

module.exports = errorHandler;