// NextGen Smart Variants - Product Image Variant App
// DO NOT CONFUSE WITH OTHER APPS!

require('dotenv').config();
const express = require('express');
const app = express();

// NextGen Smart Variants specific configuration
const PORT = process.env.NEXTGEN_APP_PORT || 8081;
const APP_NAME = process.env.NEXTGEN_APP_NAME || 'NextGen Smart Variants';

console.log(`🚀 Starting ${APP_NAME} on port ${PORT}`);
console.log(`📱 App ID: 285217980417`);
console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NextGen Smart Variants routes
app.get('/', (req, res) => {
  res.json({
    app: 'NextGen Smart Variants',
    version: '1.0.0',
    status: 'running',
    port: PORT,
    appId: '285217980417',
    description: 'Product Image Variant Management App'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'NextGen Smart Variants',
    timestamp: new Date().toISOString()
  });
});

// Shopify auth routes
app.get('/api/auth/callback', (req, res) => {
  res.json({
    message: 'NextGen Smart Variants - Auth callback',
    app: 'NextGen Smart Variants',
    appId: '285217980417'
  });
});

// NextGen specific API routes
app.get('/api/nextgen/variants', (req, res) => {
  res.json({
    message: 'NextGen Smart Variants API',
    endpoint: 'variants',
    app: 'NextGen Smart Variants'
  });
});

app.get('/api/nextgen/products', (req, res) => {
  res.json({
    message: 'NextGen Smart Variants API',
    endpoint: 'products',
    app: 'NextGen Smart Variants'
  });
});

// Webhook endpoints
app.post('/webhooks/nextgen/products', (req, res) => {
  console.log('NextGen Smart Variants - Product webhook received');
  res.json({ received: true, app: 'NextGen Smart Variants' });
});

app.post('/webhooks/nextgen/variants', (req, res) => {
  console.log('NextGen Smart Variants - Variant webhook received');
  res.json({ received: true, app: 'NextGen Smart Variants' });
});

// App proxy route
app.all('/api/proxy/nextgen-variants*', (req, res) => {
  res.json({
    message: 'NextGen Smart Variants App Proxy',
    path: req.path,
    method: req.method,
    app: 'NextGen Smart Variants'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('NextGen Smart Variants Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    app: 'NextGen Smart Variants',
    appId: '285217980417'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎉 NextGen Smart Variants is running!`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`📱 App ID: 285217980417`);
  console.log(`🔗 Dashboard: https://dev.shopify.com/dashboard/185211679/apps/285217980417`);
  console.log(`\n🚨 This is NextGen Smart Variants ONLY - not Admin Price Sort!`);
});

module.exports = app;