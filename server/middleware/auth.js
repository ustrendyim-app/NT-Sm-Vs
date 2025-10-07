// NextGen Smart Variants - Authentication Middleware
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Simple auth middleware for development
const authMiddleware = (req, res, next) => {
  // Skip auth for health checks and webhooks
  if (req.path.includes('/health') || req.path.includes('/webhooks') || req.path.includes('/info')) {
    return next();
  }

  // For development, we'll use a simple token-based auth
  const token = req.headers.authorization?.replace('Bearer ', '') || 
                req.query.token || 
                req.headers['x-shopify-access-token'];

  if (process.env.NODE_ENV === 'development') {
    // Development mode - allow requests without token for testing
    req.shop = 'development-shop';
    req.session = {
      shop: 'development-shop',
      accessToken: 'development-token',
      scope: 'read_products,write_products'
    };
    return next();
  }

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No authentication token provided',
      app: 'NextGen Smart Variants',
      appId: '285217980417'
    });
  }

  try {
    // Verify JWT token (in production, this would verify against Shopify)
    const decoded = jwt.verify(token, process.env.SHOPIFY_API_SECRET);
    req.shop = decoded.shop;
    req.session = decoded.session;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authentication token',
      app: 'NextGen Smart Variants',
      appId: '285217980417'
    });
  }
};

// Shopify HMAC verification for webhooks
const verifyShopifyWebhook = (req, res, next) => {
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const body = req.body;
  const hash = crypto
    .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET || 'dev-secret')
    .update(JSON.stringify(body), 'utf8')
    .digest('base64');

  if (process.env.NODE_ENV === 'development') {
    // Skip verification in development
    return next();
  }

  if (!crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmac))) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Webhook verification failed',
      app: 'NextGen Smart Variants'
    });
  }

  next();
};

// Admin check middleware
const requireAdmin = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  if (!req.session?.isAdmin) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Admin access required',
      app: 'NextGen Smart Variants'
    });
  }

  next();
};

module.exports = {
  authMiddleware,
  verifyShopifyWebhook,
  requireAdmin
};