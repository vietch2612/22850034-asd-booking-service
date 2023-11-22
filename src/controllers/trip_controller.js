const express = require('express');
const router = express.Router();
const tripService = require('../services/trip_service'); // Adjust the path based on your project structure

// POST /trips
router.post('/trips', validateTripData, async (req, res) => {
    try {
        const tripData = req.body; // Assuming you have the trip data in the request body
        const newTrip = await tripService.createTrip(tripData);
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /trips/:id
router.get('/trips/:id', async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await tripService.getTripById(tripId);

        if (!trip) {
            res.status(404).json({ error: 'Trip not found' });
        } else {
            res.status(200).json(trip);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /trips/:id
router.put('/trips/:id', async (req, res) => {
    try {
        const tripId = req.params.id;
        const updatedTripData = req.body;

        const updatedTrip = await tripService.updateTrip(tripId, updatedTripData);
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
