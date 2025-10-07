// NextGen Smart Variants - Settings Routes
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Settings endpoint',
    app: 'NextGen Smart Variants',
    appId: '285217980417'
  });
});

module.exports = router;