const express = require('express');
const router = express.Router();
const carpoolController = require('../controllers/carpoolController');

router.get('/', carpoolController.getCarpools);
router.post('/', carpoolController.createCarpool);
router.put('/:id', carpoolController.updateCarpool);

module.exports = router;
