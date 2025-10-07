// NextGen Smart Variants - Products Routes
const express = require('express');
const router = express.Router();

// Basic products endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Products endpoint',
    app: 'NextGen Smart Variants',
    appId: '285217980417'
  });
});

module.exports = router;