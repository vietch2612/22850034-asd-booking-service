// routes/trip.js
const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { validateCalculateTripFare, validateCreateTrip } = require('../validators/tripValidator');


router.post('/calculate-fare', validateCalculateTripFare, tripController.calculateFareController);
router.post('/create', validateCreateTrip, tripController.createTripController);


module.exports = router;
