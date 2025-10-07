// NextGen Smart Variants - Webhooks Routes
const express = require('express');
const router = express.Router();

router.post('/products/create', (req, res) => {
  res.json({
    message: 'Product created webhook',
    app: 'NextGen Smart Variants',
    received: true
  });
});

router.post('/products/update', (req, res) => {
  res.json({
    message: 'Product updated webhook',
    app: 'NextGen Smart Variants', 
    received: true
  });
});

module.exports = router;