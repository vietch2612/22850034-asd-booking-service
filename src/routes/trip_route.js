const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip_controller');
const tripValidator = require('../validators/trip_validator');

router.get('/', tripController.getAllTrips)
router.get('/:id', tripController.getTripById)
router.post('/:id/rating', tripController.updateTripRating)
router.post('/', tripValidator.validateTripData, tripController.createTrip);
router.post('/calculate-fare', tripController.calculateFare);
router.get('/statistics', tripController.getStatistics);

module.exports = router;