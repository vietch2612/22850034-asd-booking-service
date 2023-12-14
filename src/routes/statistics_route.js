const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip_controller');

router.get('/', tripController.getStatistics);

module.exports = router;