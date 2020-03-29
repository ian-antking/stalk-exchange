const express = require('express');
const priceController = require('../controllers/price');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:type', auth, priceController.addPrice);

module.exports = router;
