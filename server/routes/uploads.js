// NextGen Smart Variants - Uploads Routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Uploads endpoint',
    app: 'NextGen Smart Variants',
    appId: '285217980417'
  });
});

module.exports = router;