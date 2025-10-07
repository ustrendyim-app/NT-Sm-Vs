// NextGen Smart Variants - Request Logger Middleware
const winston = require('winston');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Skip logging for health checks and static assets
  if (req.path.includes('/health') || 
      req.path.includes('/uploads') || 
      req.path.includes('/assets') ||
      req.path.includes('favicon')) {
    return next();
  }

  // Log request
  winston.info('NextGen Smart Variants Request:', {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
    appId: '285217980417'
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function(body) {
    const duration = Date.now() - start;
    
    winston.info('NextGen Smart Variants Response:', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseSize: JSON.stringify(body).length,
      appId: '285217980417'
    });

    return originalJson.call(this, body);
  };

  next();
};

module.exports = requestLogger;