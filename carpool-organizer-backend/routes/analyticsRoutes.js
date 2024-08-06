const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

//Define Routes
router.get('/', analyticsController.getAnalytics);
router.post('/', analyticsController.createAnalytics);

module.exports = router;
