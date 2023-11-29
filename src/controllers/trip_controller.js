const FareService = require('../services/fare_service');
const tripService = require('../services/trip_service'); // Adjust the path based on your project structure
const { validateTripData } = require('../validators/trip_validator'); // Adjust the path based on your project structure

async function createTrip(req, res) {
    try {
        validateTripData(req, res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const tripData = req.body; // Assuming you have the trip data in the request body
        const newTrip = await tripService.createTrip(tripData);
        res.status(201).json(newTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getTripById(req, res) {
    try {
        const tripId = req.params.id;
        const trip = await tripService.getTripById(tripId);

        if (!trip) {
            res.status(404).json({ error: 'Trip not found' });
        } else {
            res.status(200).json(trip);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllTrips(req, res) {
    try {
        const trips = await tripService.getAllTrips();
        res.status(200).json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function updateTrip(req, res) {
    try {
        const tripId = req.params.id;
        const updatedTripData = req.body;

        const updatedTrip = await tripService.updateTrip(tripId, updatedTripData);
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function calculateFare(req, res) {
    try {
        const tripData = req.body;
        const fare = await FareService.calculateFare(tripData.length / 1000, tripData.tripServiceType);
        console.log(tripData.length);
        res.status(200).json({ fare: fare });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add more functions as needed

module.exports = {
    createTrip,
    getTripById,
    updateTrip,
    getAllTrips,
    calculateFare
};