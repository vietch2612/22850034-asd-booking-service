// routes/trip.js
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const tripValidator = require('../validators/tripValidator');

router.get('/', tripController.getAllTrips)
router.post('/', validator.validateCreateTrip, tripController.createTripController);

router.post('/calculate-fare', tripValidator.validateCalculateTripFare, tripController.calculateFareController);

module.exports = router;